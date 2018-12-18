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
     --port                33008                        \
     --syncmode            full                         \
     --gcmode              archive                      \
     --datadir             ${WORKDIR}                   \
     --ipcpath             ${WORKDIR}/geth.ipc          \
     --ethash.cachedir     ${WORKDIR}/cache/            \
     --ethash.dagdir       ${WORKDIR}/dag/              \
     --rpc                                              \
     --rpcaddr             "0.0.0.0"                    \
     --rpcport             8508                         \
     --rpccorsdomain       "*"                          \
     --rpcapi              "eth,txpool,personal,web3"   \
     --bootnodes           "enode://6d046da4c45c2a91e6398aaf270a0b7014a10c57ce8dcee46003151e35c4c9297f6535d78ca80fc9f30472a39d91d930bf9d84ce3c27a205873acb70e19ad04c@133.186.241.69:33008" \
>>  ${WORKDIR}/geth.log  &

echo `ps -ef | grep geth | grep 8508 | awk '{print $2}'` > ${WORKDIR}/geth.pid

