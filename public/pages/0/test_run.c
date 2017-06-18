/* Copyright (c) 2017 Facebook
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2 of the GNU General Public
 * License as published by the Free Software Foundation.
 */
// Header is keept above because this based on [0].
// [0]: $KDIR/tools/testing/selftests/bpf/test_progs.c
#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <assert.h>
#include <stdlib.h>

#include <linux/types.h>

#include <sys/wait.h>
#include <sys/resource.h>
typedef __u16 __sum16;
#include <linux/if_ether.h>
#include <linux/ipv6.h>
#include <linux/tcp.h>
#include <linux/bpf.h>
#include <linux/err.h>
#include <bpf/bpf.h>
#include <bpf/libbpf.h>
#include "bpf_util.h"
#include "bpf_endian.h"

/* ipv6 test vector */
static struct {
        struct ethhdr eth;
        struct ipv6hdr iph;
        struct tcphdr tcp;
} __packed pkt_v6 = {
        .eth.h_proto = bpf_htons(ETH_P_IPV6),
        .iph.nexthdr = 6,
        .iph.payload_len = bpf_htons(123),
        .tcp.urg_ptr = 123,
};

static int bpf_prog_load(const char *file, enum bpf_prog_type type,
			 struct bpf_object **pobj, int *prog_fd)
{
	struct bpf_program *prog;
	struct bpf_object *obj;
	int err;

	obj = bpf_object__open(file);
	if (IS_ERR(obj))
		return -ENOENT;

	prog = bpf_program__next(NULL, obj);
	if (!prog) {
		bpf_object__close(obj);
		return -ENOENT;
	}

	bpf_program__set_type(prog, type);
	err = bpf_object__load(obj);
	if (err) {
		bpf_object__close(obj);
		return -EINVAL;
	}

	*pobj = obj;
	*prog_fd = bpf_program__fd(prog);
	return 0;
}

int main(void)
{
	struct rlimit rinf = { RLIM_INFINITY, RLIM_INFINITY };
	__u32 duration, retval, size;
	const char *file = "./xdp.o";
	struct bpf_object *obj;
	int err, prog_fd;
	char buf[128];

	setrlimit(RLIMIT_MEMLOCK, &rinf);

	err = bpf_prog_load(file, BPF_PROG_TYPE_XDP, &obj, &prog_fd);
	if (err)
		return 1;

	err = bpf_prog_test_run(prog_fd, 1, &pkt_v6, sizeof(pkt_v6),
				buf, &size, &retval, &duration);

	if (retval != XDP_DROP) {
		switch (retval) {
		case XDP_PASS:
			printf("XDP_PASS");
			break;
		case XDP_TX:
			printf("XDP_TX");
			break;
		case XDP_ABORTED:
			printf("XDP_ABORTED");
			break;
		}
		printf(" != XDP_DROP\n");
		printf("verdict=fail;");
	} else {
		printf("verdict=pass;");
	}

	bpf_object__close(obj);

	return 0;
}
