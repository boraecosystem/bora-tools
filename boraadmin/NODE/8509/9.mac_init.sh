#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`
GETHPORT=`cat $WORKDIR/_env.local`
echo $WORKDIR

rm -rf geth*
rm -rf dag*
rm -rf cache*

mkdir dag
mkdir cache

~/bora-tools/boraadmin/go-bora/build/bin/geth --datadir ${WORKDIR} init ${WORKDIR}/../conf/genesis_${GETHPORT}.json

tree

echo;
echo "#############################"
echo "Instance ID : "$WORKDIR
echo "genesis file : "genesis_${GETHPORT}.json
echo "#############################"
echo

echo "./0.mac_start.sh"

