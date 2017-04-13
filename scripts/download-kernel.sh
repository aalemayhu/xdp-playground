#!/bin/bash

branch=xdp-playground.zip
kernel_dir=~/linux

if [ ! -d $kernel_dir ]; then
  wget https://github.com/scanf/linux/archive/$branch
  unzip $branch -d $kernel_dir
else
  echo $kernel_dir already there, skipping
fi
