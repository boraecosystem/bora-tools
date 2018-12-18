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
     --port                33005                                   \
     --syncmode            full                                    \
     --gcmode              archive                                 \
     --datadir             ${WORKDIR}                              \
     --ipcpath             ${WORKDIR}/geth.ipc                     \
     --ethash.cachedir     ${WORKDIR}/cache/                       \
     --ethash.dagdir       ${WORKDIR}/dag/                         \
     --rpc                                                         \
     --rpcaddr             "0.0.0.0"                               \
     --rpcport             8505                                    \
     --rpccorsdomain       "*"                                     \
     --rpcapi              "eth,txpool,personal,web3"              \
     --bootnodes           "enode://8a7f866f7f19bedb5da3c9f22cf1300072fef746e5ce2558902394499cee32a40c1f48e8cc903647f77916b39c90b50410450a287fa28a5fcd22b1764403fc7c@133.186.241.69:33005" \
>>  ${WORKDIR}/geth.log  &


echo `ps -ef | grep geth | grep 8505 | awk '{print $2}'` > ${WORKDIR}/geth.pid


