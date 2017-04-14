## Run XDP playground

If you follow any of the instructions below successfully the application should
be running at `http://localhost:8080`.

### Locally

Install the JavaScript dependencies for the server

    make setup

Start the application

     make serve

### Vagrant

Spin up the VM

    make vbox
    vagrant ssh
    make -C /vagrant/ serve

[0]: http://prototype-kernel.readthedocs.io/en/latest/networking/XDP/introduction.html#what-is-xdp

