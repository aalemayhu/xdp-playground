#!/bin/bash

apt-get install -y npm nginx
make setup
npm install
npm cache clean -f
npm install -g n 
n stable

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
