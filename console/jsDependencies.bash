#!/bin/bash

runhaskell console/jsDependencies.hs > console/jsDependencies.sed;

{
	groupFlag=0;
	commaFlag=0;
	echo '[';
	find test -name '*?Test.js'\
	|
	while read testFileName;
		do
			currentGroupName=`sed 's!^test/\([a-zA-Z0-9_-]*\)/.*!\1!' <<< $testFileName`;
			testClassName=`sed -f console/jsDependencies.sed <<< $testFileName`;
			if test $groupFlag -eq 0 || test "$currentGroupName" != "$previousGroupName";
				then
					if test $groupFlag -gt 0; then echo ']},'; fi;
					echo -en "\t{id: \"$currentGroupName\", modules: [";
					commaFlag=0;
			fi;
			if test $commaFlag -gt 0; then echo -n ', '; fi;
			echo -n $testClassName;
			(( groupFlag++ ));
			(( commaFlag++ ));
			previousGroupName=`sed 's!^test/\([a-zA-Z0-9_-]*\)/.*!\1!' <<< $testFileName`;
	done;
	echo ']}';
	echo '];';

	echo;

	find . -name '*.js'\
	|
	grep -v ARCHIVE | sort\
	|
	while read testFileName;
		do
			testFileName_simpler=`sed 's/^[^a-zA-Z0-9_-]*//' <<< $testFileName`;
			echo -e "\t\t<script src=\"$testFileName_simpler\"></script>";
			(( flag++ ));
	done;
} > console/jsDependencies.out
