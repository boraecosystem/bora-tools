#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`

tail -f ${WORKDIR}/geth.log
