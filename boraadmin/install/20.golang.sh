#!/bin/bash

wget https://storage.googleapis.com/golang/go1.10.4.linux-amd64.tar.gz
tar -zxvf go1.10.4.linux-amd64.tar.gz
rm -rf go1.10.4.linux-amd64.tar.gz

mv go /usr/local

echo                                                >> ~/.bash_profile
echo 'export GOROOT=/usr/local/go'                  >> ~/.bash_profile
echo 'export GOPATH=/usr/local/go'                  >> ~/.bash_profile
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin'    >> ~/.bash_profile

# cat ~/.bash_profile

source  ~/.bash_profile

rm -rf /usr/bin/go
ln -s /usr/local/go/bin/go  /usr/bin/go

go version

