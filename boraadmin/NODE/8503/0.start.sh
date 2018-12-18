#!/bin/bash

WORKDIR=`dirname -- "$(readlink -f -- "$0")"`

if [ -f ${WORKDIR}/geth.pid ]
then
    echo "Already Running !!!!   or   Check a x.pid file & rm -rf "${WORKDIR}"/geth.pid"
    exit 0
fi

echo "tail -f "${WORKDIR}"/geth.log"
echo

nohup geth                                                         \
     --networkid           2018                                    \
     --cache               512                                     \
     --port                33003                                   \
     --syncmode            full                                    \
     --gcmode              archive                                 \
     --datadir             ${WORKDIR}                              \
     --ipcpath             ${WORKDIR}/geth.ipc                     \
     --ethash.cachedir     ${WORKDIR}/cache/                       \
     --ethash.dagdir       ${WORKDIR}/dag/                         \
     --rpc                                                         \
     --rpcaddr             "0.0.0.0"                               \
     --rpcport             8503                                    \
     --rpccorsdomain       "*"                                     \
     --rpcapi              "eth,txpool,personal,web3"              \
     --bootnodes           "enode://ce123da89b313dead603be564f1391815cb38a958ca6a5c9ad3e08f776100a0381d96c7d6877bdb8527a40375034f2390159e3c37c4c3a33ce39052d0842ba72@133.186.241.69:33003" \
>>  ${WORKDIR}/geth.log  &


echo `ps -ef | grep geth | grep 8503 | awk '{print $2}'` > ${WORKDIR}/geth.pid

