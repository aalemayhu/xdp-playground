#!/bin/bash

set -x
set -e

EXPECTED_USER=vagrant
branch=xdp-playground.zip
kernel_dir=/home/$EXPECTED_USER/linux
build_helper=/$EXPECTED_USER/scripts/linux-dev

if [ ! -d $kernel_dir ]; then
  cd /home/$EXPECTED_USER
  git clone --depth 1 git://git.kernel.org/pub/scm/linux/kernel/git/davem/net-next.git $kernel_dir
  cd $kernel_dir
  cp `ls -1 /boot/config*|head -n1` $kernel_dir/.config
  $build_helper build
  $build_helper install
  sudo reboot
else
  echo $kernel_dir already there, skipping
fi
sudo chown -R $EXPECTED_USER:$EXPECTED_USER /home/$EXPECTED_USER
