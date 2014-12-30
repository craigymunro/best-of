#!/bin/bash

pushd less > /dev/null
for file in *.less;
do
	echo "Compiling "$file;
	lessc $file css/${file/.less/.css --compress};
done
popd > /dev/null

echo
