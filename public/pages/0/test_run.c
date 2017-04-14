#include <linux/bpf.h>
#include <string.h>
#include <error.h>
#include <unistd.h>
#include <linux/bpf.h>
#include <linux/err.h>
#include <bpf/bpf.h>
#include <bpf/libbpf.h>
#include "bpf_util.h"

// This file is based on examples from the kernel tree.
#define BPF_LOG_BUF_SIZE 65536

int main(void)
{
	static char log_buf[BPF_LOG_BUF_SIZE];
	const char *file = "./0.o";
	struct bpf_object *obj;
	u32 duration, retval;
	int err, prog_fd;

	memset(log_buf, 0, sizeof(log_buf));

	err = bpf_prog_load(file, BPF_PROG_TYPE_XDP, &obj, &prog_fd);
	if (err) {// TODO: how do we get log_buf info?
		fprintf(stderr, "Failed to load prog\n%s\n", log_buf);
		return -1;
	}

	// Why not bpf_prog_test_run_xdp(...) ?
	err = bpf_prog_test_run(prog_fd, 3, NULL, 0, NULL, NULL, &retval, &duration);
	CHECK(err || errno || retval, "", "err %d errno %d retval %d duration %d\n",
	      err, errno, retval, duration);

	bpf_object__close(obj);

	return 0;
}
