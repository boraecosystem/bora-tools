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
     --port                33006                                   \
     --syncmode            full                                    \
     --gcmode              archive                                 \
     --datadir             ${WORKDIR}                              \
     --ipcpath             ${WORKDIR}/geth.ipc                     \
     --ethash.cachedir     ${WORKDIR}/cache/                       \
     --ethash.dagdir       ${WORKDIR}/dag/                         \
     --rpc                                                         \
     --rpcaddr             "0.0.0.0"                               \
     --rpcport             8506                                    \
     --rpccorsdomain       "*"                                     \
     --rpcapi              "eth,txpool,personal,web3"              \
     --bootnodes           "enode://ae79c491904214c42be72c4deeb1cb1e81403e832196ddc23a1f0d2c7788579e63bab22d70693b46be784e145e714c2c14119817f0bebcccf43f19eb90373f47@133.186.241.69:33006" \
>>  ${WORKDIR}/geth.log  &


echo `ps -ef | grep geth | grep 8506 | awk '{print $2}'` > ${WORKDIR}/geth.pid

