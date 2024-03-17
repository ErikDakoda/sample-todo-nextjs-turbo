#!/usr/bin/env bash

echo changing name of db package from '.prisma/client' to 'db'
echo "$PWD"
cd ./prisma/client || exit
sed -i 's/\.prisma\/client/db/' package.json || sed -i .bak 's/\.prisma\/client/db/' package.json
echo name of db package fixed

echo creating .prisma symlink in root node_modules
echo "$PWD"
cd ../../../../../node_modules/ || exit
ln -s -f -F -v ../packages/@erikdakoda/database/prisma/ .prisma
echo .prisma symlink created
