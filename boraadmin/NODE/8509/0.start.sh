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
     --port                33009                                   \
     --syncmode            full                                    \
     --gcmode              archive                                 \
     --datadir             ${WORKDIR}                              \
     --ipcpath             ${WORKDIR}/geth.ipc                     \
     --ethash.cachedir     ${WORKDIR}/cache/                       \
     --ethash.dagdir       ${WORKDIR}/dag/                         \
     --rpc                                                         \
     --rpcaddr             "0.0.0.0"                               \
     --rpcport             8509                                    \
     --rpccorsdomain       "*"                                     \
     --rpcapi              "eth,txpool,personal,web3"              \
     --bootnodes           "enode://93f614523942597981ef1ffd8c54d4f9f638349e17fc796d262d6944d659ef29ec0c711fe626ff98f00a9348c0833c4d063e1bed3b3c9cebb9bd9c1526a65906@133.186.241.69:33009" \
>>  ${WORKDIR}/geth.log  &


echo `ps -ef | grep geth | grep 8509 | awk '{print $2}'` > ${WORKDIR}/geth.pid

