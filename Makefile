project ?=xdp-playground
port ?= 8080

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
