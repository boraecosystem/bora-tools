#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`

sh ./../NODE/mac_rstatus_all

