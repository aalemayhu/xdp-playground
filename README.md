# XDP Playground

A place to experiment with [XDP][0]. The idea is to have a interactive place
with some challenges that teach you more about XDP while you experiment. This
is a work in progress and the framework for writing a challenge is in the works
also the program execution part is progressing.

## Adding a challenge

HTML is used for the tasks so that the challenge writer has flexibility to
present the challenge. To create a new challenge you just need to add a file to
`public/tasks` which has a `.html` suffix and is listed in the `Challenges`
array. You can use the [public/tasks/TEMPLATE.html][t] as base. So your challenge
could be in e.g. `public/tasks/7.html` or some other number.  Please note that
using numbers is not a strong requirement, but encouraged.  If you'd like to
use a different name to ease some kind of logical grouping, that is okay.

- TODO: mention limitations of the angular html bindining (&lt, &gt).
- TODO: explain how tasks are verified by [`bpf_prog_test_run_xdp`][1].

## Run XDP Playground on your machine

Install the JavaScript dependencies for the server

    make setup

Start the application

     make serve

Should be running at `http://localhost:8080`.

[0]: http://prototype-kernel.readthedocs.io/en/latest/networking/XDP/introduction.html#what-is-xdp
[1]: https://patchwork.ozlabs.org/patch/745468/
[t]: public/tasks/TEMPLATE.html
