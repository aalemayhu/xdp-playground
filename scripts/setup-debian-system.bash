#!/bin/bash

apt-get install -y npm nginx
make setup

if [[ "`pwd`" != "/srv/app" ]]; then
 ln -s `pwd` /srv/app
fi

cp nginx.conf.sigil /etc/nginx/sites-enabled/default

systemctl enable nginx
systemctl start nginx
