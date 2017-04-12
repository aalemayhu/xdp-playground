# XDP Playground

A place to experiment with [XDP][0]. The idea is to have a interactive place
with some challenges that teach you more about XDP while you experiment. This
is a work in progress and the framework for writing a challenge is in the works
also the program execution part is progressing.

## Adding a challenge

HTML is used for the tasks so that the challenge writer has flexibility to
present the challenge. To create a new challenge you need to

- Create a new HTML file in `public/tasks`, for example `public/tasks/7.html`
  or some other number.  You can use the [public/tasks/TEMPLATE.html][t] as
  base.  Please note that using numbers is not a strong requirement, but the
  file must have `.html` suffix.  If you'd like to use a different name to ease
  some kind of logical grouping, that is fine.
- TODO: Write test program to verify the user program by using
  [`bpf_prog_test_run_xdp`][1].
- Add your task to the `Challenges` array.

If your files contain `<` or `>` you might have to replace them with `&lt` and
`&gt`. Please review your challenge description for visual defects and report
the it on the [issue tracker][it].

## Run XDP Playground on your machine

Install the JavaScript dependencies for the server

    make setup

Start the application

     make serve

Should be running at `http://localhost:8080`.

[0]: http://prototype-kernel.readthedocs.io/en/latest/networking/XDP/introduction.html#what-is-xdp
[1]: https://patchwork.ozlabs.org/patch/745468/
[t]: public/tasks/TEMPLATE.html
[it]: https://github.com/scanf/xdp-playground/issues
