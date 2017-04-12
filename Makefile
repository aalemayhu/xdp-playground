project ?=xdp-playground
port ?= 8080
service_file=$(project).service

serve:
	npm start
setup:
	npm install

update-package-info:
	scripts/gen-package-meta > package.json
vps:
	VBoxManage list runningvms
vbox:
	-vagrant destroy
	vagrant up --provider=virtualbox
vtt:
	vagrant reload
	vagrant ssh

systemd:
	cp $(service_file) /etc/systemd/system/$(service_file)
	systemctl enable $(service_file)
	systemctl start $(project)
	systemctl status $(service_file)
