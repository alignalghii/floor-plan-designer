#!/bin/bash

runhaskell console/ClassMaker.hs > console/ClassMaker.sed;

find . -name '*Test.js'\
|
while read testFileName;
	do
		testClassName=`sed -f console/ClassMaker.sed <<< $testFileName`;
		echo "+----------------------------------------------------------------------------------+";
		echo -e "| $testFileName:\t$testClassName";
		echo "+----------------------------------------------------------------------------------+";
		sed --in-place "s!^function\\s\\+\\([a-zA-Z0-9_]\\+\\)!$testClassName.prototype.\\1 = function!" $testFileName;
		echo;
		echo;
		echo;
done;
