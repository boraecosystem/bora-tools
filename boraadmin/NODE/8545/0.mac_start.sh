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
     --port                33000                        \
     --syncmode            full                         \
     --gcmode              archive                      \
     --datadir             ${WORKDIR}                   \
     --ipcpath             ${WORKDIR}/geth.ipc          \
     --ethash.cachedir     ${WORKDIR}/cache/            \
     --ethash.dagdir       ${WORKDIR}/dag/              \
     --rpc                                              \
     --rpcaddr             "0.0.0.0"                    \
     --rpcport             8545                         \
     --rpccorsdomain       "*"                          \
     --rpcapi              "eth,txpool,personal,web3"   \
     --bootnodes           "enode://d8b768fc0cb3e9e0c094f8cddf6e2e78c0e49de5635f9a60e8e2ac740f8fe78afe91f99afe206ed4ee5aeb3e8da379a2a2541043b32c83fcd9633042caab7266@133.186.241.69:33000" \
>>  ${WORKDIR}/geth.log  &

echo `ps -ef | grep geth | grep 8545 | awk '{print $2}'` > ${WORKDIR}/geth.pid

