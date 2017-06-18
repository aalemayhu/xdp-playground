#ifndef _PLAYGROUND_SHARED
#define _PLAYGROUND_SHARED

char *print_action(int action)
{
		switch (action) {
		case XDP_ABORTED: return "XDP_ABORTED";
		case XDP_DROP: return "XDP_DROP";
		case XDP_PASS: return "XDP_PASS";
		case XDP_TX: return "XDP_TX";
		}

		return "UNKNOWN";
}

void print_verdict(int expected, int actual)
{
	if (expected != actual) {
		printf("%s != %s\n", print_action(expected), print_action(actual));
		printf("verdict=fail;");
	} else {
		printf("verdict=pass;");
	}
}

#endif /* playground_shared.h */
