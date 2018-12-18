#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`

sh ./../NODE/rstatus_all

