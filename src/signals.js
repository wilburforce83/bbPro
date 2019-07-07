// Pull in all functions from /signalsrc for use





const r10 = require('./signalsrc/r10signals.js');
const r25 = require('./signalsrc/r25signals.js');
const r50 = require('./signalsrc/r50signals.js');
const r75 = require('./signalsrc/r75signals.js');
const r100 = require('./signalsrc/r100signals.js');
const rdBEAR = require('./signalsrc/rdbearsignals.js');
const rdBULL = require('./signalsrc/rdbullsignals.js');


//functions for use by signals.html

r10();
r25();
r50();
r75();
r100();
rdBEAR();
rdBULL();