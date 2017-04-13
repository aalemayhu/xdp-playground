#include <linux/bpf.h>
#include <string.h>

// from kernel tree
#define BPF_LOG_BUF_SIZE 65536

int main(void)
{
	static char log_buf[BPF_LOG_BUF_SIZE];
	const char *file = "0.o";
	struct bpf_object *obj;
	int err, fd;

	memset(log_buf, 0, sizeof(log_buf));

	err = bpf_prog_load(file, BPF_PROG_TYPE_XDP, &obj, &fd);

	if (err) {
		// TODO: give user feedback here.
		return -1;
	}

	//err = bpf_prog_test_run(fd, ...);

	bpf_object__close(obj);

	return 0;
}
