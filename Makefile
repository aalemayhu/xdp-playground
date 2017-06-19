project ?=xdp-playground
port ?= 8080
service_file=$(project).service

serve:
	nodemon index.js
setup:
	npm cache clean -f
	sudo npm install -g n
	sudo n stable
	npm install
vps:
	VBoxManage list runningvms
vbox:
	-vagrant destroy
	vagrant up --provider=virtualbox
vtt:
	vagrant reload
	vagrant ssh
vpackage: vbox
	vagrant package

systemd:
	cp $(service_file) /etc/systemd/system/$(service_file)
	systemctl enable $(service_file)
	systemctl start $(project)
	systemctl status $(service_file)

tester:
	useradd -M tester
	usermod -L tester
	mkdir /home/tester
	chown -R tester:tester /home/tester
