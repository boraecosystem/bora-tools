#!/bin/bash

yum -y update

yum -y upgrade

yum install -y gcc-c++ gcc automake autoconf libtool make cpan libstdc* nc

yum install -y yum-utils kernel-devel make tree pv git jq nmon telnet wget
