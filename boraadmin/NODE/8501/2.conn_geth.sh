#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`

geth attach ${WORKDIR}/geth.ipc
