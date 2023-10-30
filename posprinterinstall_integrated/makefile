VPATH = src:ppd:bin

ppds = GenericTP.ppd.gz

DEFS=
LIBS=-lcupsimage -lcups

ifdef RPMBUILD
DEFS=-DRPMBUILD
LIBS=-ldl
endif

define dependencies
@if [ ! -e /usr/include/cups ]; then echo "CUPS headers not available - exiting"; exit 1; fi
@if ! (ls /usr/lib | grep libcups.* > /dev/null); then echo "libcups not available - exiting"; exit 1; fi
@if ! (ls /usr/lib | grep libcupsimage.* > /dev/null); then echo "libcupsimage not available - exiting"; exit 1; fi
endef

# define init
# @if [ ! -e bin ]; then echo "mkdir bin"; mkdir bin; fi
# endef

.PHONY: install
install: 
	# installing
	cp ppd/*.gz install
	cd install; exec ./setup

.PHONY: remove
remove:
	#removing from default location (other locations require manual removal)
	@if [ -e /usr/lib/cups/filter/rastertogtp ]; then echo "Removing rastertogtp"; rm -f /usr/lib/cups/filter/rastertogtp; fi
	@if [ -d /usr/share/cups/model/GenericPOS ]; then echo "Removing dir .../cups/model/GenericPOS"; rm -rf /usr/share/cups/model/GenericPOS; fi

.PHONY: help
help:
	# Help for SEWOO EPL PRINTER CUPS Driver make utility usage
	#
	# command          purpose
	# ------------------------------------
	# make install      execute the setup shell script from the install directory [ root user permissions required ]
	# make remove       removes installed files from your system (assumes default install lication) [ root user permissions required ]

$(ppds): %.ppd.gz: %.ppd
	# gzip ppd file
	gzip -c $< >> ppd/$@

