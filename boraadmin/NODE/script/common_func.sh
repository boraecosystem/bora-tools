function chkParameter() {
    if [[ $# -eq 0 ]] ; then
        echo 'Usage : rstart|rstop|rstatus|ruse|rlog {InstanceName}'
        echo '    ex) ./rstart 8501'
        echo '        ./rstart_all'
        echo
        echo '        ./rstop 8501'
        echo '        ./rstop_all'
        echo
        echo '        ./ruse 8501'
        echo '        ./ruse 8501 eth.blockNumber'
        echo '        ./ruse_all  eth.blockNumber'
        exit 0
    fi
}

function chkPID() {
    PIDFILE=$1
    GETH_INSTANCE=$2

    if [ ! -f $PIDFILE ]
    then
        echo "No geth.pid file("${GETH_INSTANCE}") exists !!!!"
        exit 1
    fi
}

function chkPID2() {
    PIDFILE=$1
    GETH_INSTANCE=$2

    if [ -f $PIDFILE ]
    then
        echo "Already running !!!!"
        exit 1
    fi
}

function gethAttachLocal() {
    geth attach http://127.0.0.1:$1 --preload "./script/common_abi.js" --preload "./script/common_v3.js" --exec "$2"
}

function gethAttach() {
    geth attach http://$3:$1 --exec "$2"
}
