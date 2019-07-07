
const settings = require('electron').remote.require('electron-settings');

// bring in function from ./signals.js

const Signals = require( './signals' );


// bring in function from ./marketselect.js -- marketselect will return 'R_10' to 'R_100' + 'RDBEAR' or 'RDBULL'
// based on the current market conditions, this allows us to use the exiting signals.js script to manage a seperate output. 

const Symbol = settings.get('market.market');

// export function from ./signals.js and set variables to the symbol:

module.exports = Signals( Symbol , '#current' );
