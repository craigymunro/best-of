#!/bin/bash

# get directory containing this script
pushd "`dirname $0`" > /dev/null
__DIR__=`pwd -P`
popd > /dev/null

# http://stackoverflow.com/questions/4774054/reliable-way-for-a-bash-script-to-get-the-full-path-to-itself
function realpath {
	pushd "`dirname $1/.`" > /dev/null
	echo `pwd -P`
	popd > /dev/null
}

APP_PATH=`realpath "$__DIR__/../hearthstone/www"`

pushd ${APP_PATH}/less/ > /dev/null
for file in *.less;
do
	echo "Compiling "$file;
	lessc $file ../css/${file/.less/.css --compress};
done
popd > /dev/null

pushd ${APP_PATH}/less/pages > /dev/null
for file in *.less;
do
	echo "Compiling pages/"$file;
	lessc $file ../../css/pages/${file/.less/.css --compress};
done
popd > /dev/null

echo