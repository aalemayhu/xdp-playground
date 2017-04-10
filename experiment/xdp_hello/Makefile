all:
	clang -O2 -Wall -target bpf -c xdp_hello.c -o xdp_hello.o

inspect: all
	readelf -a xdp_hello.o
