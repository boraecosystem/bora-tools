#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`
GETHPORT=`cat $WORKDIR/_env.local`
#echo $GETHPORT

rm -rf geth*
rm -rf dag*
rm -rf cache*

mkdir dag
mkdir cache

geth --datadir ${WORKDIR} init  ${WORKDIR}/../conf/genesis_${GETHPORT}.json

tree

echo;
echo "####################################################"
echo "Instance     : "$WORKDIR
echo "genesis file : "genesis_${GETHPORT}.json
echo "####################################################"
echo;

echo "./0.start.sh"

