#!/bin/bash
cd ..

echo "1/2.Downloading go-bora...."
git clone https://github.com/BoraEcosystem/go-bora.git

echo "2/2.Compile go-bora...."
cd go-bora/
make geth

#ls -al  ./build/bin/geth
#./build/bin/geth version

rm -rf /usr/bin/geth
cp ./build/bin/geth /usr/bin/
geth version

