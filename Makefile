.PHONY: build

WANIX_BIN ?= wanix

build:
	mkdir -p _public
	$(WANIX_BIN) export | tar -xf - -C _public
	rm -rf _public/index.html _public/debug.html
	cp web/index.html _public/index.html
	cp web/debug.html _public/debug.html
	cp web/_headers _public/_headers

