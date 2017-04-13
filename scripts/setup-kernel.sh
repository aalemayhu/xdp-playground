#!/bin/bash

branch=xdp-playground.zip
kernel_dir=~/linux
build_helper=/vagrant/scripts/linux-dev

if [ ! -d $kernel_dir ]; then
  wget https://github.com/scanf/linux/archive/$branch
  unzip $branch -d $kernel_dir
  cp `ls -1 /boot/config*|head -n1` $kernel_dir/.config
else
  echo $kernel_dir already there, skipping
fi

cd $kernel_dir
$build_helper build
$build_helper install
systemctl reboot
