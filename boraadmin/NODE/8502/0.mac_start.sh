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
     --port                33002                        \
     --syncmode            full                         \
     --gcmode              archive                      \
     --datadir             ${WORKDIR}                   \
     --ipcpath             ${WORKDIR}/geth.ipc          \
     --ethash.cachedir     ${WORKDIR}/cache/            \
     --ethash.dagdir       ${WORKDIR}/dag/              \
     --rpc                                              \
     --rpcaddr             "0.0.0.0"                    \
     --rpcport             8502                         \
     --rpccorsdomain       "*"                          \
     --rpcapi              "eth,txpool,personal,web3"   \
     --bootnodes           "enode://c7cfeef9ae8ce5d944db8ac74217b4836da51f94ffee64e55452fbdf412ed99edd624a80d5d1257c3e1bf7e00caadc68e9226e6a1db08831539df22170f871f2@133.186.241.69:33002" \
>>  ${WORKDIR}/geth.log  &

echo `ps -ef | grep geth | grep 8502 | awk '{print $2}'` > ${WORKDIR}/geth.pid

