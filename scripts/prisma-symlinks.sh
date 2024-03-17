#!/usr/bin/env bash

echo creating .prisma symlink
echo "$PWD"
cd ./node_modules/ || exit
ln -s -f -F -v ../prisma/ .prisma
echo .prisma symlink created

echo changing .prisma/client to db
echo "$PWD"
cd ../prisma/client || exit
sed -i 's/\.prisma\/client/db/' package.json || sed -i .bak 's/\.prisma\/client/db/' package.json
echo .prisma/client changed to db
