#!/bin/bash

waiting(){
   echo ;
   read -p "Press enter to continue .... " nothing
}


if [ $# != 2 ]
then
    echo "Usage: 99.changeStr.sh  {OLD}  {NEW}"
    exit
fi

find .
waiting

echo "[Old] " $1 " --> [New] " $2
waiting

find . -exec sed -i "s/$1/$2/g" {} \;

