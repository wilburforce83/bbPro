//set var so available acrooss functions

var frxEURUSD;
var frxUSDJPY;
var frxGBPUSD;
var frxAUDUSD;
var frxUSDCHF;
var frxUSDCAD;
var frxNZDUSD;
var listyList;
var frxEURUSDdev;
var frxUSDJPYdev;
var frxGBPUSDdev;
var frxAUDUSDdev;
var frxUSDCHFdev;
var frxUSDCADdev;
var frxNZDUSDdev;
var listyDevList;

var newSymbol;


// Collect mean avgs of each 

function decideFX() {

    const frxEURUSDduration = settings.get('frxEURUSDfrxDurationUnit,frxDurationUnit');
    const frxUSDJPYduration = settings.get('frxUSDJPYfrxDurationUnit,frxDurationUnit');
    const frxGBPUSDduration = settings.get('frxGBPUSDfrxDurationUnit,frxDurationUnit');
    const frxAUDUSDduration = settings.get('frxAUDUSDfrxDurationUnit,frxDurationUnit');
    const frxUSDCHFduration = settings.get('frxUSDCHFfrxDurationUnit,frxDurationUnit');
    const frxUSDCADduration = settings.get('frxUSDCADfrxDurationUnit,frxDurationUnit');
    const frxNZDUSDduration = settings.get('frxNZDUSDfrxDurationUnit,frxDurationUnit');



    let frxEURUSD_5mean = (settings.get('frxEURUSDrx5candlePc.rx5candlePc') + settings.get('frxEURUSDrx4candlePc.rx4candlePc') + settings.get('frxEURUSDrx3candlePc.rx3candlePc') + settings.get('frxEURUSDrx2candlePc.rx2candlePc') + settings.get('frxEURUSDrx1candlePc.rx1candlePc')) / 5;
    let frxUSDJPY_5mean = (settings.get('frxUSDJPYrx5candlePc.rx5candlePc') + settings.get('frxUSDJPYrx4candlePc.rx4candlePc') + settings.get('frxUSDJPYrx3candlePc.rx3candlePc') + settings.get('frxUSDJPYrx2candlePc.rx2candlePc') + settings.get('frxUSDJPYrx1candlePc.rx1candlePc')) / 5;
    let frxGBPUSD_5mean = (settings.get('frxGBPUSDrx5candlePc.rx5candlePc') + settings.get('frxGBPUSDrx4candlePc.rx4candlePc') + settings.get('frxGBPUSDrx3candlePc.rx3candlePc') + settings.get('frxGBPUSDrx2candlePc.rx2candlePc') + settings.get('frxGBPUSDrx1candlePc.rx1candlePc')) / 5;
    let frxAUDUSD_5mean = (settings.get('frxAUDUSDrx5candlePc.rx5candlePc') + settings.get('frxAUDUSDrx4candlePc.rx4candlePc') + settings.get('frxAUDUSDrx3candlePc.rx3candlePc') + settings.get('frxAUDUSDrx2candlePc.rx2candlePc') + settings.get('frxAUDUSDrx1candlePc.rx1candlePc')) / 5;
    let frxUSDCHF_5mean = (settings.get('frxUSDCHFrx5candlePc.rx5candlePc') + settings.get('frxUSDCHFrx4candlePc.rx4candlePc') + settings.get('frxUSDCHFrx3candlePc.rx3candlePc') + settings.get('frxUSDCHFrx2candlePc.rx2candlePc') + settings.get('frxUSDCHFrx1candlePc.rx1candlePc')) / 5;
    let frxNZDUSD_5mean = (settings.get('frxNZDUSDrx5candlePc.rx5candlePc') + settings.get('frxNZDUSDrx4candlePc.rx4candlePc') + settings.get('frxNZDUSDrx3candlePc.rx3candlePc') + settings.get('frxNZDUSDrx2candlePc.rx2candlePc') + settings.get('frxNZDUSDrx1candlePc.rx1candlePc')) / 5;
    let frxUSDCAD_5mean = (settings.get('frxUSDCADrx5candlePc.rx5candlePc') + settings.get('frxUSDCADrx4candlePc.rx4candlePc') + settings.get('frxUSDCADrx3candlePc.rx3candlePc') + settings.get('frxUSDCADrx2candlePc.rx2candlePc') + settings.get('frxUSDCADrx1candlePc.rx1candlePc')) / 5;

    if (settings.get('onlyTradeTicks.onlyTradeTicks')) {

        if (frxEURUSDduration == 'm') {

            frxEURUSD_5mean = 0;
        }
        if (frxUSDJPYduration == 'm') {

            frxUSDJPY_5mean = 0;
        }
        if (frxGBPUSDduration == 'm') {

            frxGBPUSD_5mean = 0;
        }
        if (frxAUDUSDduration == 'm') {

            frxAUDUSD_5mean = 0;
        }
        if (frxUSDCHFduration == 'm') {

            frxUSDCHF_5mean = 0;
        }
        if (frxNZDUSDduration == 'm') {

            frxNZDUSD_5mean = 0;
        }
        if (frxUSDCADduration == 'm') {

            frxUSDCAD_5mean = 0;
        }




    }


    let listy = Math.max(frxEURUSD_5mean, frxUSDJPY_5mean, frxGBPUSD_5mean, frxAUDUSD_5mean, frxUSDCHF_5mean, frxUSDCAD_5mean, frxNZDUSD_5mean);

    frxEURUSD = Math.floor(frxEURUSD_5mean * 1000) / 1000;
    frxUSDJPY = Math.floor(frxUSDJPY_5mean * 1000) / 1000;
    frxGBPUSD = Math.floor(frxGBPUSD_5mean * 1000) / 1000;
    frxAUDUSD = Math.floor(frxAUDUSD_5mean * 1000) / 1000;
    frxUSDCHF = Math.floor(frxUSDCHF_5mean * 1000) / 1000;
    frxUSDCAD = Math.floor(frxUSDCAD_5mean * 1000) / 1000;
    frxNZDUSD = Math.floor(frxNZDUSD_5mean * 1000) / 1000;
    listyList = Math.floor(listy * 1000) / 1000;

    // Inspect and save market with highest candle percentage
    //console.log('largest symbol percent : ', listyList)
    // console.log(settings.get('changesymAuto.changesymAuto'));

    if (settings.get('MSstyle.MSstyle') == 'Candle body %') { //Price Action - Std Deviation
        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (frxEURUSD === listyList) {

                    newSymbol = 'frxEURUSD';
                }

                if (frxUSDJPY === listyList) {

                    newSymbol = 'frxUSDJPY';
                }

                if (frxGBPUSD === listyList) {

                    newSymbol = 'frxGBPUSD';
                }

                if (frxAUDUSD === listyList) {

                    newSymbol = 'frxAUDUSD';
                }

                if (frxUSDCHF === listyList) {

                    newSymbol = 'frxUSDCHF';
                }

                if (frxNZDUSD === listyList) {

                    newSymbol = 'frxNZDUSD';
                }

                if (frxUSDCAD === listyList) {

                    newSymbol = 'frxUSDCAD';
                }

                if (newSymbol !== settings.get('symbol.symbol')) {

                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol)
                    switched = true;
                }
            }

            /*
        else {

            console.log('marketswitching loked,trade inprogress');
        }
*/


            // console.log('frxEURUSD :', frxEURUSD, 'frxUSDJPY : ', frxUSDJPY, 'frxGBPUSD : ', frxGBPUSD, 'frxAUDUSD : ', frxAUDUSD, 'frxUSDCHF : ', frxUSDCHF, 'frxUSDCAD : ', frxUSDCAD, 'frxNZDUSD : ', frxNZDUSD);



        }


    }

    //Std DeviationCalculations



    let frxEURUSD_5dev = Math.abs((settings.get('frxEURUSDstdDevcandle1.stdDevOfClose') - settings.get('frxEURUSDstdDevcandle2.stdDevOfClose')) / settings.get('frxEURUSDstdDevcandle2.stdDevOfClose'));
    let frxUSDJPY_5dev = Math.abs((settings.get('frxUSDJPYstdDevcandle1.stdDevOfClose') - settings.get('frxUSDJPYstdDevcandle2.stdDevOfClose')) / settings.get('frxUSDJPYstdDevcandle2.stdDevOfClose'));
    let frxGBPUSD_5dev = Math.abs((settings.get('frxGBPUSDstdDevcandle1.stdDevOfClose') - settings.get('frxGBPUSDstdDevcandle2.stdDevOfClose')) / settings.get('frxGBPUSDstdDevcandle2.stdDevOfClose'));
    let frxAUDUSD_5dev = Math.abs((settings.get('frxAUDUSDstdDevcandle1.stdDevOfClose') - settings.get('frxAUDUSDstdDevcandle2.stdDevOfClose')) / settings.get('frxAUDUSDstdDevcandle2.stdDevOfClose'));
    let frxUSDCHF_5dev = Math.abs((settings.get('frxUSDCHFstdDevcandle1.stdDevOfClose') - settings.get('frxUSDCHFstdDevcandle2.stdDevOfClose')) / settings.get('frxUSDCHFstdDevcandle2.stdDevOfClose'));
    let frxUSDCAD_5dev = Math.abs((settings.get('frxUSDCADstdDevcandle1.stdDevOfClose') - settings.get('frxUSDCADstdDevcandle2.stdDevOfClose')) / settings.get('frxUSDCADstdDevcandle2.stdDevOfClose'));
    let frxNZDUSD_5dev = Math.abs((settings.get('frxNZDUSDstdDevcandle1.stdDevOfClose') - settings.get('frxNZDUSDstdDevcandle2.stdDevOfClose')) / settings.get('frxNZDUSDstdDevcandle2.stdDevOfClose'));

    if (settings.get('onlyTradeTicks.onlyTradeTicks')) {



        if (frxEURUSDduration == 'm') {

            frxEURUSD_5dev = 0;
        }
        if (frxUSDJPYduration == 'm') {

            frxUSDJPY_5dev = 0;
        }
        if (frxGBPUSDduration == 'm') {

            frxGBPUSD_5dev = 0;
        }
        if (frxAUDUSDduration == 'm') {

            frxAUDUSD_5dev = 0;
        }
        if (frxUSDCHFduration == 'm') {

            frxUSDCHF_5dev = 0;
        }
        if (frxNZDUSDduration == 'm') {

            frxNZDUSD_5dev = 0;
        }
        if (frxUSDCADduration == 'm') {

            frxUSDCAD_5dev = 0;
        }




    }

    let listyDeviation = Math.max(frxEURUSD_5dev, frxUSDJPY_5dev, frxGBPUSD_5dev, frxAUDUSD_5dev, frxUSDCHF_5dev, frxUSDCAD_5dev, frxNZDUSD_5dev);
    // console.log('Std Deviation :', 'frxEURUSD' + frxEURUSD_5dev, 'frxUSDJPY' + frxUSDJPY_5dev, 'frxGBPUSD' + frxGBPUSD_5dev, 'frxAUDUSD' + frxAUDUSD_5dev, 'frxUSDCHF' + frxUSDCHF_5dev, 'bear' + frxUSDCAD_5dev, 'bull' + frxNZDUSD_5dev);

    let frxEURUSDdev = Math.floor(frxEURUSD_5dev * 1000) / 1000;
    let frxUSDJPYdev = Math.floor(frxUSDJPY_5dev * 1000) / 1000;
    let frxGBPUSDdev = Math.floor(frxGBPUSD_5dev * 1000) / 1000;
    let frxAUDUSDdev = Math.floor(frxAUDUSD_5dev * 1000) / 1000;
    let frxUSDCHFdev = Math.floor(frxUSDCHF_5dev * 1000) / 1000;
    let frxUSDCADdev = Math.floor(frxUSDCAD_5dev * 1000) / 1000;
    let frxNZDUSDdev = Math.floor(frxNZDUSD_5dev * 1000) / 1000;
    let listyDevList = Math.floor(listyDeviation * 1000) / 1000;

    if (settings.get('MSstyle.MSstyle') == 'Std Deviation') { //Price Action - Std Deviation - StdD + PA

        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (frxEURUSDdev === listyDevList) {

                    newSymbol = 'frxEURUSD';
                }

                if (frxUSDJPYdev === listyDevList) {

                    newSymbol = 'frxUSDJPY';
                }

                if (frxGBPUSDdev === listyDevList) {

                    newSymbol = 'frxGBPUSD';
                }

                if (frxAUDUSDdev === listyDevList) {

                    newSymbol = 'frxAUDUSD';
                }

                if (frxUSDCHFdev === listyDevList) {

                    newSymbol = 'frxUSDCHF';
                }

                if (frxNZDUSDdev === listyDevList) {

                    newSymbol = 'frxNZDUSD';
                }

                if (frxUSDCADdev === listyDevList) {

                    newSymbol = 'frxUSDCAD';
                }

                if (newSymbol !== settings.get('symbol.symbol')) {
                    switched = true;
                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol);
                }
            }


        }
    }


    if (settings.get('MSstyle.MSstyle') == 'StdD + PA') { //Price Action - Std Deviation - StdD + PA

        let frxEURUSD_5combined = frxEURUSD + frxEURUSDdev;
        let frxUSDJPY_5combined = frxUSDJPY + frxUSDJPYdev;
        let frxGBPUSD_5combined = frxGBPUSD + frxGBPUSDdev;
        let frxAUDUSD_5combined = frxAUDUSD + frxAUDUSDdev;
        let frxUSDCHF_5combined = frxUSDCHF + frxUSDCHFdev;
        let frxUSDCAD_5combined = frxUSDCAD + frxUSDCADdev;
        let frxNZDUSD_5combined = frxNZDUSD + frxNZDUSDdev


        let listyCombined = Math.max(frxEURUSD_5combined, frxUSDJPY_5combined, frxGBPUSD_5combined, frxAUDUSD_5combined, frxUSDCHF_5combined, frxUSDCAD_5combined, frxNZDUSD_5combined);
        // console.log('Std Deviation :', 'frxEURUSD' + frxEURUSD_5dev, 'frxUSDJPY' + frxUSDJPY_5dev, 'frxGBPUSD' + frxGBPUSD_5dev, 'frxAUDUSD' + frxAUDUSD_5dev, 'frxUSDCHF' + frxUSDCHF_5dev, 'bear' + frxUSDCAD_5dev, 'bull' + frxNZDUSD_5dev);

        // console.log(frxEURUSD_5combined, frxUSDJPY_5combined, frxGBPUSD_5combined, frxAUDUSD_5combined, frxUSDCHF_5combined, frxUSDCAD_5combined, frxNZDUSD_5combined);

        let frxEURUSDcombined = Math.floor(frxEURUSD_5combined * 1000) / 1000;
        let frxUSDJPYcombined = Math.floor(frxUSDJPY_5combined * 1000) / 1000;
        let frxGBPUSDcombined = Math.floor(frxGBPUSD_5combined * 1000) / 1000;
        let frxAUDUSDcombined = Math.floor(frxAUDUSD_5combined * 1000) / 1000;
        let frxUSDCHFcombined = Math.floor(frxUSDCHF_5combined * 1000) / 1000;
        let frxUSDCADcombined = Math.floor(frxUSDCAD_5combined * 1000) / 1000;
        let frxNZDUSDcombined = Math.floor(frxNZDUSD_5combined * 1000) / 1000;
        let listyCombinedList = Math.floor(listyCombined * 1000) / 1000;



        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (frxEURUSDcombined === listyCombinedList) {

                    newSymbol = 'frxEURUSD';
                }

                if (frxUSDJPYcombined === listyCombinedList) {

                    newSymbol = 'frxUSDJPY';
                }

                if (frxGBPUSDcombined === listyCombinedList) {

                    newSymbol = 'frxGBPUSD';
                }

                if (frxAUDUSDcombined === listyCombinedList) {

                    newSymbol = 'frxAUDUSD';
                }

                if (frxUSDCHFcombined === listyCombinedList) {

                    newSymbol = 'frxUSDCHF';
                }

                if (frxNZDUSDcombined === listyCombinedList) {

                    newSymbol = 'frxNZDUSD';
                }

                if (frxUSDCADcombined === listyCombinedList) {

                    newSymbol = 'frxUSDCAD';
                }
                if (newSymbol !== settings.get('symbol.symbol')) {

                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol);
                    switched = true;
                }
            }


        }
    }





};