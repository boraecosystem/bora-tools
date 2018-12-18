#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`
echo $WORKDIR

tail -f ${WORKDIR}/geth.log


