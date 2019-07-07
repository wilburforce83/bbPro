const r10select = require('./mktSelector/r10select.js');
const r25select = require('./mktSelector/r25select.js');
const r50select = require('./mktSelector/r50select.js');
const r75select = require('./mktSelector/r75select.js');
const r100select = require('./mktSelector/r100select.js');
const rdBEARselect = require('./mktSelector/rdbearselect.js');
const rdBULLselect = require('./mktSelector/rdbullselect.js');

//forex

const USDJPYselect = require('./mktSelector/frxUSDJPY.js');
const USDCHFselect = require('./mktSelector/frxUSDCHF.js');
const USDCADselect = require('./mktSelector/frxUSDCAD.js');
const NZDUSDselect = require('./mktSelector/frxNZDUSD.js');
const GBPUSDselect = require('./mktSelector/frxGBPUSD.js');
const EURUSDselect = require('./mktSelector/frxEURUSD.js');
const AUDUSDselect = require('./mktSelector/frxAUDUSD.js');




function autoSelect() {

    if (settings.get('forex.forex')) {

        USDJPYselect();
        USDCHFselect();
        USDCADselect();
        NZDUSDselect();
        GBPUSDselect();
        EURUSDselect();
        AUDUSDselect();

    } else {

        r10select();
        r25select();
        r50select();
        r75select();
        r100select();
        rdBEARselect();
        rdBULLselect();

    }

}

/*
function changeDurations() {

    if (settings.get('forex.forex')) {


    }
}

*/