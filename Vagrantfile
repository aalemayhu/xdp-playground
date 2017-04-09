# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "fedora/25-cloud-base"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.provision "shell", inline: <<-SHELL
     dnf install -y make tmux 
     dnf install -y llvm llvm-libs llvm-doc clang clang-libs
     dnf install -y bcc bcc-tools bcc-doc --enablerepo=updates-testing
     dnf install -y kernel-devel
     dnf install -y python3-pyroute2 make npm
     reboot
  SHELL
end
