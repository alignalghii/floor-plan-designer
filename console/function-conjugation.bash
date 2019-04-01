#!/bin/bash

find . -name '*Test.js'\
|
while read a;
	do
		echo "--------";
		echo $a;
		echo '---------';
		awk -f console/function-conjugation.awk $a # > tmp;
		#cat tmp > $a;
		#rm tmp;
done;
