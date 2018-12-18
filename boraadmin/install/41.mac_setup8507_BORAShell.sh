#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`
cd ${WORKDIR}/../NODE/8507

echo "Init"
./9.mac_init.sh
sleep 3

echo "Start Peer"
./0.mac_start.sh
sleep 3

echo "tail -f log"
./1.mac_tail.sh

