#!/bin/bash

WORKDIR=`dirname -- "$(greadlink -f -- "$0")"`
echo $WORKDIR


if [ -f ${WORKDIR}/geth.pid ]
then
    echo "Already Running !!!! or Check a x.pid file & rm -rf "{WORKDIR}"/geth.pid"
    exit 0
fi

echo "tail -f "${WORKDIR}"/geth.log"
echo

nohup ~/bora-tools/boraadmin/go-bora/build/bin/geth     \
     --networkid           2018                         \
     --cache               512                          \
     --port                33007                        \
     --syncmode            full                         \
     --gcmode              archive                      \
     --datadir             ${WORKDIR}                   \
     --ipcpath             ${WORKDIR}/geth.ipc          \
     --ethash.cachedir     ${WORKDIR}/cache/            \
     --ethash.dagdir       ${WORKDIR}/dag/              \
     --rpc                                              \
     --rpcaddr             "0.0.0.0"                    \
     --rpcport             8507                         \
     --rpccorsdomain       "*"                          \
     --rpcapi              "eth,txpool,personal,web3"   \
     --bootnodes           "enode://fe1923633025c84c123932811990bb0dd5e649e08764b7c31fe8ad0d0f2e27968e5b0ee1952083bf3e5ef241b011394021dde96b2bf5dc49a74e4ff0edd40328@133.186.241.69:33007" \
>>  ${WORKDIR}/geth.log  &

echo `ps -ef | grep geth | grep 8507 | awk '{print $2}'` > ${WORKDIR}/geth.pid

