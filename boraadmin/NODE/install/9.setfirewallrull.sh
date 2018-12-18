#!/bin/bash

function addFirewall() {
   firewall-cmd --zone=public --add-port=$1/tcp     --permanent
   firewall-cmd --zone=public --add-port=$2/tcp     --permanent
   firewall-cmd --zone=public --add-port=$3/udp     --permanent
}

function removeFirewall() {
   firewall-cmd --zone=public --remove-port=$1/tcp     --permanent
   firewall-cmd --zone=public --remove-port=$2/tcp     --permanent
   firewall-cmd --zone=public --remove-port=$3/udp     --permanent
}


echo '### FW Config : Before ###'

firewall-cmd --permanent --list-all --zone=public

addFirewall 8545  33000   33000
addFirewall 8501  33001   33001
addFirewall 8502  33002   33002
addFirewall 8503  33003   33003

sudo firewall-cmd --reload


echo '### FW Config : After ###'

firewall-cmd --permanent --list-all --zone=public
