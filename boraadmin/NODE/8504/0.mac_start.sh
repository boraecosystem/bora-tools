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
     --port                33004                        \
     --syncmode            full                         \
     --gcmode              archive                      \
     --datadir             ${WORKDIR}                   \
     --ipcpath             ${WORKDIR}/geth.ipc          \
     --ethash.cachedir     ${WORKDIR}/cache/            \
     --ethash.dagdir       ${WORKDIR}/dag/              \
     --rpc                                              \
     --rpcaddr             "0.0.0.0"                    \
     --rpcport             8504                         \
     --rpccorsdomain       "*"                          \
     --rpcapi              "eth,txpool,personal,web3"   \
     --bootnodes           "enode://576bc1ccf017096c229ba49da125432fc6cffeb6929aadc6ae0a5720b9cc348cdd11e992cba418ee47a50dcf19c29fd71f29527c60c3bbead84919d9e90a6443@133.186.241.69:33004" \
>>  ${WORKDIR}/geth.log  &

echo `ps -ef | grep geth | grep 8504 | awk '{print $2}'` > ${WORKDIR}/geth.pid

