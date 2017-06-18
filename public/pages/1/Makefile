KDIR ?= /lib/modules/$(shell uname -r)/build
LIBDIR := $(KDIR)/tools/lib
BPFDIR := $(LIBDIR)/bpf
APIDIR := $(KDIR)/tools/include/uapi
GENDIR := $(KDIR)/include/generated
GENHDR := $(GENDIR)/autoconf.h

ifneq ($(wildcard $(GENHDR)),)
  GENFLAGS := -DHAVE_GENHDR
endif

CFLAGS += -Wall -O2 -I$(APIDIR) -I$(LIBDIR) -I$(GENDIR) $(GENFLAGS) -I$(KDIR)/tools/include \
			-I$(KDIR)/tools/testing/selftests/bpf -I/srv/app/public/include \

LDLIBS += -lcap -lelf

TEST_GEN_PROGS = test_run

TEST_PROGS := test_kmod.sh

include $(KDIR)/tools/testing/selftests/lib.mk

BPFOBJ := $(OUTPUT)/libbpf.a

$(TEST_GEN_PROGS): $(BPFOBJ)

.PHONY: force

# force a rebuild of BPFOBJ when its dependencies are updated
force:

$(BPFOBJ): force
	$(MAKE) -C $(BPFDIR) OUTPUT=$(OUTPUT)/

run:
	sudo ./test_run
