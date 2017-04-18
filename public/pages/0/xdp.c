#include <linux/bpf.h>

#ifndef __section
# define __section(NAME) \
  __attribute__((section(NAME), used))
#endif

__section("prog")
int xdp_drop(struct xdp_md *ct)
{
	return XDP_PASS;
}

int __version __section("version") = 1;
char __license[] __section("license") = "GPL";
