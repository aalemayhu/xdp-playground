#!/bin/bash

apt-get install -y npm
make setup
npm install
npm cache clean -f
npm install -g n 
n stable
make tester
make systemd
