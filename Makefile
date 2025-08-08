.PHONY: build

WANIX_BIN ?= wanix

build:
	$(WANIX_BIN) export _public
	rm -rf _public/index.html
	cp web/* _public

