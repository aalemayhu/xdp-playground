## Adding a challenge

HTML is used for the tasks so that the challenge writer has flexibility to
present the challenge. To create a new challenge you need to

- Create a new HTML file in `public/pages`, for example `public/pages/7.html`
  or some other available number.  You can use [public/pages/0.html][t]
  as base. This file will describe your challenge to the user. You might want
  to include some background information or other descriptions before
  presenting the task.
- When you are happy with the challenge description, the next thing is to write
  a program which uses [`bpf_prog_test_run_xdp`][1] to verify the users input.
  This program must be placed in the directory `public/pages/7/`. The directory
  name has to match the HTML file so it gets loaded properly. You also have to
  include a Makefile which produces the test program `test_run`.  You can use
  the template at `public/pages/0/Makefile`. The program you load has to be
  `xdp.o` in `test_run` is the one handling it.
  There are also some restrictions on output, if the user writes a program
  which passes your checks you need to print out `verdict=pass;` or `verdict=fail;`
  for invalid input. You should also print out useful debug output before the verdict.
  These messages can be useful for users when they need to debug.

If you have done the above correctly you should end up with something like

    public/pages/
    ├── 7
    │   ├── Makefile
    │   └── test_run.c
    └── 7.html

### Troubleshooting

The environment has a couple of restrictions which should be listed below.

The challenge file name must be a unique valid number and have a `.html`
suffix.  If you'd like to use a name to ease some kind of logical grouping,
that is fine but check the `public/pages` directory first to prevent
conflicts.

If your HTML files contain `<` or `>` you might have to replace them with `&lt`
and `&gt`. Please review your challenge description for visual defects and
report them to the [issue tracker][it].

Thanks.

[it]: https://github.com/scanf/xdp-playground/issues
[1]: https://patchwork.ozlabs.org/patch/745468/
[t]: public/pages/TEMPLATE.html
