#!/usr/bin/gawk -f

BEGIN {n=0; m=0;}
	/function\s+[a-zA-Z0-9_]+/ {
		functions[++n] = gensub(/.*function\s+([a-zA-Z0-9_]+).*/, "\\1", 1) "()"
	}
	{lines[++m] = $0}

END {
	printf "// "
	for(i=1;i<=n;i++) {
		printf functions[i] (i < n ? " && " : "");
	}
	print "";
	for (i=1; i<=m; i++) {
		print lines[i];
	}
}
