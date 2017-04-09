# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "fedora/25-cloud-base"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.provision "shell", inline: <<-SHELL
     dnf install -y make tmux 
     dnf install llvm llvm-libs llvm-doc clang clang-libs
     dnf install bcc bcc-tools bcc-doc --enablerepo=updates-testing
     dnf install kernel-devel
     dnf install python3-pyroute2
     reboot
  SHELL
end
