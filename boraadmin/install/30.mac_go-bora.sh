#!/bin/bash
cd ..

echo "1/2.Downloading go-bora...."
git clone https://github.com/BoraEcosystem/go-bora.git

echo "2/2.Compile go-bora...."
cd go-bora/
make geth

~/bora-tools/boraadmin/go-bora/build/bin/geth version

