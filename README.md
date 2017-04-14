# XDP playground

This is a open list challenge to help you learn to write real XDP programs.  The
playground consists of pages which can eiterher be interactive tasks or reading
material. In the interactive tasks you are expected to write XDP programs which
get verified by the playground.

A running instance of the playground is available at https://playground.xdp.no/
If you'd like to submit a challenge for inclusion to the playground, please
[Adding a challenge][./Challenge.md]. Writing new challenges is welcomed and
appreciated but other contributions like rewording or typo fixes are also very
welcome.

> NOTE: This is a work in progress and the framework for writing a challenge is
> mostly ready what remains is the verification bits and execution verdict of
> the XDP program. These should hopefully be done soon. You are invited to send
> patches if you want to see it ready faster.

## Run XDP playground on your machine

Install the JavaScript dependencies for the server

    make setup

Start the application

     make serve

Should be running at `http://localhost:8080`.

[0]: http://prototype-kernel.readthedocs.io/en/latest/networking/XDP/introduction.html#what-is-xdp
