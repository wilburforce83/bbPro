//set var so available acrooss functions

var r10;
var r25;
var r50;
var r75;
var r100;
var rdbear;
var rdbull;
var listyList;
var r10dev;
var r25dev;
var r50dev;
var r75dev;
var r100dev;
var rdbeardev;
var rdbulldev;
var listyDevList;

var newSymbol;


// Collect mean avgs of each 

function decideVIX() {



    let R_10_5mean = (settings.get('R_10rx5candlePc.rx5candlePc') + settings.get('R_10rx4candlePc.rx4candlePc') + settings.get('R_10rx3candlePc.rx3candlePc') + settings.get('R_10rx2candlePc.rx2candlePc') + settings.get('R_10rx1candlePc.rx1candlePc')) / 5;
    let R_25_5mean = (settings.get('R_25rx5candlePc.rx5candlePc') + settings.get('R_25rx4candlePc.rx4candlePc') + settings.get('R_25rx3candlePc.rx3candlePc') + settings.get('R_25rx2candlePc.rx2candlePc') + settings.get('R_25rx1candlePc.rx1candlePc')) / 5;
    let R_50_5mean = (settings.get('R_50rx5candlePc.rx5candlePc') + settings.get('R_50rx4candlePc.rx4candlePc') + settings.get('R_50rx3candlePc.rx3candlePc') + settings.get('R_50rx2candlePc.rx2candlePc') + settings.get('R_50rx1candlePc.rx1candlePc')) / 5;
    let R_75_5mean = (settings.get('R_75rx5candlePc.rx5candlePc') + settings.get('R_75rx4candlePc.rx4candlePc') + settings.get('R_75rx3candlePc.rx3candlePc') + settings.get('R_75rx2candlePc.rx2candlePc') + settings.get('R_75rx1candlePc.rx1candlePc')) / 5;
    let R_100_5mean = (settings.get('R_100rx5candlePc.rx5candlePc') + settings.get('R_100rx4candlePc.rx4candlePc') + settings.get('R_100rx3candlePc.rx3candlePc') + settings.get('R_100rx2candlePc.rx2candlePc') + settings.get('R_100rx1candlePc.rx1candlePc')) / 5;
    let RDBULL_5mean = (settings.get('RDBULLrx5candlePc.rx5candlePc') + settings.get('RDBULLrx4candlePc.rx4candlePc') + settings.get('RDBULLrx3candlePc.rx3candlePc') + settings.get('RDBULLrx2candlePc.rx2candlePc') + settings.get('RDBULLrx1candlePc.rx1candlePc')) / 5;
    let RDBEAR_5mean = (settings.get('RDBEARrx5candlePc.rx5candlePc') + settings.get('RDBEARrx4candlePc.rx4candlePc') + settings.get('RDBEARrx3candlePc.rx3candlePc') + settings.get('RDBEARrx2candlePc.rx2candlePc') + settings.get('RDBEARrx1candlePc.rx1candlePc')) / 5;


    let listy = Math.max(R_10_5mean, R_25_5mean, R_50_5mean, R_75_5mean, R_100_5mean, RDBEAR_5mean, RDBULL_5mean);

    r10 = Math.floor(R_10_5mean * 1000) / 1000;
    r25 = Math.floor(R_25_5mean * 1000) / 1000;
    r50 = Math.floor(R_50_5mean * 1000) / 1000;
    r75 = Math.floor(R_75_5mean * 1000) / 1000;
    r100 = Math.floor(R_100_5mean * 1000) / 1000;
    rdbear = Math.floor(RDBEAR_5mean * 1000) / 1000;
    rdbull = Math.floor(RDBULL_5mean * 1000) / 1000;
    listyList = Math.floor(listy * 1000) / 1000;

    // Inspect and save market with highest candle percentage
    //console.log('largest symbol percent : ', listyList)
    // console.log(settings.get('changesymAuto.changesymAuto'));

    if (settings.get('MSstyle.MSstyle') == 'Candle body %') { //Price Action - Std Deviation
        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (r10 === listyList) {

                    newSymbol = 'R_10';
                }

                if (r25 === listyList) {

                    newSymbol = 'R_25';
                }

                if (r50 === listyList) {

                    newSymbol = 'R_50';
                }

                if (r75 === listyList) {

                    newSymbol = 'R_75';
                }

                if (r100 === listyList) {

                    newSymbol = 'R_100';
                }

                if (rdbull === listyList) {

                    newSymbol = 'RDBULL';
                }

                if (rdbear === listyList) {

                    newSymbol = 'RDBEAR';
                }
                if (newSymbol !== settings.get('symbol.symbol')) {

                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol)
                }
            }

            /*
        else {

            console.log('marketswitching loked,trade inprogress');
        }
*/


            // console.log('r10 :', r10, 'r25 : ', r25, 'r50 : ', r50, 'r75 : ', r75, 'r100 : ', r100, 'rdbear : ', rdbear, 'rdbull : ', rdbull);



        }


    }

    //Std DeviationCalculations



    let R_10_5dev = Math.abs((settings.get('R_10stdDevcandle1.stdDevOfClose') - settings.get('R_10stdDevcandle2.stdDevOfClose')) / settings.get('R_10stdDevcandle2.stdDevOfClose'));
    let R_25_5dev = Math.abs((settings.get('R_25stdDevcandle1.stdDevOfClose') - settings.get('R_25stdDevcandle2.stdDevOfClose')) / settings.get('R_25stdDevcandle2.stdDevOfClose'));
    let R_50_5dev = Math.abs((settings.get('R_50stdDevcandle1.stdDevOfClose') - settings.get('R_50stdDevcandle2.stdDevOfClose')) / settings.get('R_50stdDevcandle2.stdDevOfClose'));
    let R_75_5dev = Math.abs((settings.get('R_75stdDevcandle1.stdDevOfClose') - settings.get('R_75stdDevcandle2.stdDevOfClose')) / settings.get('R_75stdDevcandle2.stdDevOfClose'));
    let R_100_5dev = Math.abs((settings.get('R_100stdDevcandle1.stdDevOfClose') - settings.get('R_100stdDevcandle2.stdDevOfClose')) / settings.get('R_100stdDevcandle2.stdDevOfClose'));
    let RDBEAR_5dev = Math.abs((settings.get('RDBEARstdDevcandle1.stdDevOfClose') - settings.get('RDBEARstdDevcandle2.stdDevOfClose')) / settings.get('RDBEARstdDevcandle2.stdDevOfClose'));
    let RDBULL_5dev = Math.abs((settings.get('RDBULLstdDevcandle1.stdDevOfClose') - settings.get('RDBULLstdDevcandle2.stdDevOfClose')) / settings.get('RDBULLstdDevcandle2.stdDevOfClose'));


    let listyDeviation = Math.max(R_10_5dev, R_25_5dev, R_50_5dev, R_75_5dev, R_100_5dev, RDBEAR_5dev, RDBULL_5dev);
    // console.log('Std Deviation :', 'r10' + R_10_5dev, 'r25' + R_25_5dev, 'r50' + R_50_5dev, 'r75' + R_75_5dev, 'r100' + R_100_5dev, 'bear' + RDBEAR_5dev, 'bull' + RDBULL_5dev);

    let r10dev = Math.floor(R_10_5dev * 1000) / 1000;
    let r25dev = Math.floor(R_25_5dev * 1000) / 1000;
    let r50dev = Math.floor(R_50_5dev * 1000) / 1000;
    let r75dev = Math.floor(R_75_5dev * 1000) / 1000;
    let r100dev = Math.floor(R_100_5dev * 1000) / 1000;
    let rdbeardev = Math.floor(RDBEAR_5dev * 1000) / 1000;
    let rdbulldev = Math.floor(RDBULL_5dev * 1000) / 1000;
    let listyDevList = Math.floor(listyDeviation * 1000) / 1000;

    if (settings.get('MSstyle.MSstyle') == 'Std Deviation') { //Price Action - Std Deviation - StdD + PA

        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (r10dev === listyDevList) {

                    newSymbol = 'R_10';
                }

                if (r25dev === listyDevList) {

                    newSymbol = 'R_25';
                }

                if (r50dev === listyDevList) {

                    newSymbol = 'R_50';
                }

                if (r75dev === listyDevList) {

                    newSymbol = 'R_75';
                }

                if (r100dev === listyDevList) {

                    newSymbol = 'R_100';
                }

                if (rdbulldev === listyDevList) {

                    newSymbol = 'RDBULL';
                }

                if (rdbeardev === listyDevList) {

                    newSymbol = 'RDBEAR';
                }
                if (newSymbol !== settings.get('symbol.symbol')) {

                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol)
                }
            }


        }
    }


    if (settings.get('MSstyle.MSstyle') == 'StdD + PA') { //Price Action - Std Deviation - StdD + PA

        let R_10_5combined = r10 + r10dev;
        let R_25_5combined = r25 + r25dev;
        let R_50_5combined = r50 + r50dev;
        let R_75_5combined = r75 + r75dev;
        let R_100_5combined = r100 + r100dev;
        let RDBEAR_5combined = rdbear + rdbeardev;
        let RDBULL_5combined = rdbull + rdbulldev


        let listyCombined = Math.max(R_10_5combined, R_25_5combined, R_50_5combined, R_75_5combined, R_100_5combined, RDBEAR_5combined, RDBULL_5combined);
        // console.log('Std Deviation :', 'r10' + R_10_5dev, 'r25' + R_25_5dev, 'r50' + R_50_5dev, 'r75' + R_75_5dev, 'r100' + R_100_5dev, 'bear' + RDBEAR_5dev, 'bull' + RDBULL_5dev);

        // console.log(R_10_5combined, R_25_5combined, R_50_5combined, R_75_5combined, R_100_5combined, RDBEAR_5combined, RDBULL_5combined);

        let r10combined = Math.floor(R_10_5combined * 1000) / 1000;
        let r25combined = Math.floor(R_25_5combined * 1000) / 1000;
        let r50combined = Math.floor(R_50_5combined * 1000) / 1000;
        let r75combined = Math.floor(R_75_5combined * 1000) / 1000;
        let r100combined = Math.floor(R_100_5combined * 1000) / 1000;
        let rdbearcombined = Math.floor(RDBEAR_5combined * 1000) / 1000;
        let rdbullcombined = Math.floor(RDBULL_5combined * 1000) / 1000;
        let listyCombinedList = Math.floor(listyCombined * 1000) / 1000;



        if (settings.get('changesymAuto.changesymAuto')) {

            if (settings.get('lockauto.lockauto') == 0) {

                //if (settings.get('tradeInProgress.tradeInProgess') === false) {

                if (r10combined === listyCombinedList) {

                    newSymbol = 'R_10';
                }

                if (r25combined === listyCombinedList) {

                    newSymbol = 'R_25';
                }

                if (r50combined === listyCombinedList) {

                    newSymbol = 'R_50';
                }

                if (r75combined === listyCombinedList) {

                    newSymbol = 'R_75';
                }

                if (r100combined === listyCombinedList) {

                    newSymbol = 'R_100';
                }

                if (rdbullcombined === listyCombinedList) {

                    newSymbol = 'RDBULL';
                }

                if (rdbearcombined === listyCombinedList) {

                    newSymbol = 'RDBEAR';
                }
                if (newSymbol !== settings.get('symbol.symbol')) {

                    settings.set('timeUntilTrading.Open', 0);
                    settings.set('symbol.symbol', newSymbol)
                }
            }


        }
    }
};