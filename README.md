# XDP Playground

A place to experiment with [XDP][0]. The idea is to have a interactive place
with some challenges that teach you more about XDP while you experiment. This
is a work in progress and the framework for writing a challenge is in the works
also the program execution part is progressing.

## Run XDP Playground on your machine

Install the JavaScript dependencies for the server

    make setup

Start the application

     make serve

Should be running at `http://localhost:8080`.

## Adding a challenge

HTML is used for the tasks so that the challenge writer has flexibility to
present the challenge. To create a new challenge you need to

- Create a new HTML file in `public/tasks`, for example `public/tasks/7.html`
  or some other free number.  You can use the [public/tasks/TEMPLATE.html][t]
  as base. This file will describe your challenge to the user. You might want
  to include some background information or other descriptions before
  presenting the task.
- When you are happy with the challenge description, the next thing is to write
  a program which uses [`bpf_prog_test_run_xdp`][1] to verify the users input.
  This program must be placed in the directory `public/tasks/7/`. The directory
  name has to match the HTML file so it gets loaded properly. You also have to
  include a Makefile which produces the test program `test_run`.  You can use
  the template at `public/tasks/TEMPLATE.Makefile`. The BPF program you are
  loading should have the same name as the challenge e.g.
  `bpf_prog_load("7.o", ...)`.

If you have done the above correctly you should end up with something like

    public/tasks/
    ├── 7
    │   ├── Makefile
    │   └── test_run.c
    └── 7.html

### Troubleshooting

The environment has a couple of restrictions which should be listed below.

The challenge file name must be a unique valid number and have a `.html`
suffix.  If you'd like to use a name to ease some kind of logical grouping,
that is fine but check the `public/tasks` directory first to prevent
conflicts.

If your HTML files contain `<` or `>` you might have to replace them with `&lt`
and `&gt`. Please review your challenge description for visual defects and
report them to [issue tracker][it].

Thanks.

[0]: http://prototype-kernel.readthedocs.io/en/latest/networking/XDP/introduction.html#what-is-xdp
[1]: https://patchwork.ozlabs.org/patch/745468/
[t]: public/tasks/TEMPLATE.html
[it]: https://github.com/scanf/xdp-playground/issues
[aa]: https://github.com/scanf/xdp-playground/blob/master/public/app.js#L1
