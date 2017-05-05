KDIR ?= ~/linux
LIBDIR := $(KDIR)/tools/lib
BPFDIR := $(LIBDIR)/bpf
APIDIR := $(KDIR)/tools/include/uapi
GENDIR := $(KDIR)/include/generated
GENHDR := $(GENDIR)/autoconf.h

ifneq ($(wildcard $(GENHDR)),)
  GENFLAGS := -DHAVE_GENHDR
endif

CFLAGS += -Wall -O2 -I$(APIDIR) -I$(LIBDIR) -I$(GENDIR) $(GENFLAGS) -I$(KDIR)/tools/include
LDLIBS += -lcap -lelf

TEST_GEN_PROGS = test_run

TEST_PROGS := test_kmod.sh

TEST_GEN_FILES = xdp

include $(KDIR)/tools/testing/selftests/lib.mk

BPFOBJ := $(OUTPUT)/libbpf.a

$(TEST_GEN_PROGS): $(BPFOBJ)

.PHONY: force

# force a rebuild of BPFOBJ when its dependencies are updated
force:

$(BPFOBJ): force
	$(MAKE) -C $(BPFDIR) OUTPUT=$(OUTPUT)/

CLANG ?= clang

%.o: %.c
	$(CLANG) -I$(KDIR)/tools/include/uapi -I$(KDIR)/samples/bpf \
		-D__x86_64__ -Wno-compare-distinct-pointer-types \
		-O2 -target bpf -c $< -o $@
