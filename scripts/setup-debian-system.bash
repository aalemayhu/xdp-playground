#!/bin/bash

apt-get install -y npm nginx
make setup

if ! id -u tester; then
  make tester
fi

if [[ "`pwd`" != "/srv/app" ]]; then
 ln -s `pwd` /srv/app
fi
make systemd

cp nginx.conf.sigil /etc/nginx/sites-enabled/default

systemctl enable nginx
systemctl start nginx
