function bPlus(a, b) {return a + b;}
function bAnd (a, b) {return a && b;}
function bOr (a, b) {return a || b;}

function cca(x, r) {return Math.abs(x - r) < 0.001;} // @TODO Used in tests, maybe it should belong to `testframework.js` @TODO rather here, but parametrize it by an `epsilon` put into the `config` upmost folder
