#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`

geth attach ${WORKDIR}/geth.ipc

