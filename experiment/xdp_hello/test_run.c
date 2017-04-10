int main(void)
{
	const char *file = "xdp_hello.o";
	struct bpf_object *obj;
	int err, fd;

	err = bpf_prog_load(file, BPF_PROG_TYPE_XDP, &obj, &fd);

	if (err) {
		// TODO: give user feedback here.
		return;
	}

	err = bpf_prog_test_run(fd, ...);

	bpf_object__close(obj);

	return 0;
}
