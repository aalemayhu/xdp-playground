#!/bin/bash

set -x
set -e

EXPECTED_USER=vagrant
branch=xdp-playground.zip
kernel_dir=/home/$EXPECTED_USER/linux
build_helper=/$EXPECTED_USER/scripts/linux-dev

if [ ! -d $kernel_dir ]; then
  wget -nv https://github.com/scanf/linux/archive/$branch
  mkdir -pv $kernel_dir
  cd $kernel_dir
  unzip -nj ../$branch
  cp `ls -1 /boot/config*|head -n1` $kernel_dir/.config
  $build_helper build
  $build_helper install
  sudo reboot
else
  echo $kernel_dir already there, skipping
fi
sudo chown -R $EXPECTED_USER:$EXPECTED_USER /home/$EXPECTED_USER
