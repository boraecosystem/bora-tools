#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`
cd ${WORKDIR}/../NODE/8507

echo "Init"
./9.init.sh
sleep 3

echo "Start Peer"
./0.start.sh
sleep 3

echo "tail -f log"
./1.tail.sh

