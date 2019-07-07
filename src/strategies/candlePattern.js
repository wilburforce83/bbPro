// Binary Bot Candle Pattern Recognition.
const bullish = require('technicalindicators').bullish;
const bearish = require('technicalindicators').bearish;
const morningstar = require('technicalindicators').morningstar;
const eveningstar = require('technicalindicators').eveningstar;
const piercingline = require('technicalindicators').piercingline;
const bearishengulfingpattern = require('technicalindicators').bearishengulfingpattern;
const bullishengulfingpattern = require('technicalindicators').bullishengulfingpattern;
const threeblackcrows = require('technicalindicators').threeblackcrows;
const threewhitesoldiers = require('technicalindicators').threewhitesoldiers;

const doji = require('technicalindicators').doji;
const morningdojistar = require('technicalindicators').morningdojistar;
const eveningdojistar = require('technicalindicators').eveningdojistar;

const hasDoubleBottom = require('technicalindicators').hasDoubleBottom;
const hasDoubleTop = require('technicalindicators').hasDoubleTop;

const hasInverseHeadAndShoulder = require('technicalindicators').hasInverseHeadAndShoulder;
const isTrendingUp = require('technicalindicators').isTrendingUp;
const isTrendingDown = require('technicalindicators').isTrendingDown;
const bullishharamicross = require('technicalindicators').bullishharamicross;
const bearishharamicross = require('technicalindicators').bearishharamicross;
const bullishmarubozu = require('technicalindicators').bullishmarubozu;
const bearishmarubozu = require('technicalindicators').bearishmarubozu;

var closeList;
var openList;
var highList;
var lowList;
var close;
var open;
var high;
var low;
var ohlcInput;
var ohlcInput2;
var singleInput;
var closeInput;
var bullishResult;
var bearishResult;

var trendLong;
var trendShort;
var trendCross;

var bullBear;
var mornEveStar;
var engulfingPattern;
var threeCrowsSoldiers;
var isMarubozu;
var isHaramiCross;
var dojiStar;
var machineLearnedTrend;
var bullBearbearResult;
var mornEveStarbearResult;
var engulfingPatternbearResult;
var threeCrowsSoldiersbearResult;
var isMarubozubearResult;
var isHaramiCrossbearResult;
var dojiStarbearResult;
var machineLearnedTrendbearResult;

var bullBearbullResult;
var mornEveStarbullResult;
var engulfingPatternbullResult;
var threeCrowsSoldiersbullResult;
var isMarubozubullResult;
var isHaramiCrossbullResult;
var dojiStarbullResult;
var machineLearnedTrendbullResult;




function candlePatternrun() {

    //  //console.log('candle pattern running')

    bullBear = false;
    mornEveStar = false;
    engulfingPattern = false;
    threeCrowsSoldiers = false;
    isMarubozu = false;
    isHaramiCross = false;
    dojiStar = false;
    machineLearnedTrend = false;
    bullBearbearResult = false;
    mornEveStarbearResult = false;
    engulfingPatternbearResult = false;
    threeCrowsSoldiersbearResult = false;
    isMarubozubearResult = false;
    isHaramiCrossbearResult = false;
    dojiStarbearResult = false;
    machineLearnedTrendbearResult = false;

    bullBearbullResult = false;
    mornEveStarbullResult = false;
    engulfingPatternbullResult = false;
    threeCrowsSoldiersbullResult = false;
    isMarubozubullResult = false;
    isHaramiCrossbullResult = false;
    dojiStarbullResult = false;
    machineLearnedTrendbullResult = false;

    //check status of check boxes:

    var candlePatternArray = settings.get('candlePatternArray.candlePatternArray');


    if (candlePatternArray.indexOf("bullBear") > -1 && settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'candle') {
        bullBear = true;
    } else {
        bullBear = false;
    }



    if (candlePatternArray.indexOf("mornEveStar") > -1 && settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'candle') {
        mornEveStar = true;
    } else {
        mornEveStar = false;
    }


    if (candlePatternArray.indexOf('engulfingPattern') > -1 && settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'candle') {
        engulfingPattern = true;
    } else {
        engulfingPattern = false;
    }


    if (candlePatternArray.indexOf('threeCrowsSoldiers') > -1 && settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'candle') {
        threeCrowsSoldiers = true;
    } else {
        threeCrowsSoldiers = false;
    }


    if (candlePatternArray.indexOf('isMarubozu') > -1) {
        isMarubozu = true;
    } else {
        isMarubozu = false;
    }



    if (candlePatternArray.indexOf('isHaramiCross') > -1) {
        isHaramiCross = true;
    } else {
        isHaramiCross = false;
    }


    if (candlePatternArray.indexOf('dojiStar') > -1 && settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'candle') {
        dojiStar = true;
    } else {
        dojiStar = false;
    }


    if (candlePatternArray.indexOf('machineLearnedTrend') > -1) {
        machineLearnedTrend = true;
    } else {
        machineLearnedTrend = false;
    }
    /*
    console.log(

        'bullbear  : ' + bullBear + ' | ',
        'mornEveStar  : ' + mornEveStar + ' | ',
        'engulfingPattern  : ' + engulfingPattern + ' | ',
        'threeCrowsSoldiers  : ' + threeCrowsSoldiers + ' | ',
        'isMarubozu  : ' + isMarubozu + ' | ',
        'isHaramiCross  : ' + isHaramiCross + ' | ',
        'dojiStar  : ' + dojiStar + ' | ',
        'machineLearnedTrend  : ' + machineLearnedTrend + ' | '

    )
    // */


    /*
------------------    candlePattern settings    --------------------
//candlePattern defaults
        settings.set('candlePatternDuration.candlePatternDuration', 7); //integer time period
        settings.set('candlePatternDuration_unit.candlePatternDuration_unit', 't') // 's', 'm'
        settings.set('candlePatternCandleOrTick.candlePatternCandleOrTick', 'candle');  // or 'candle'
        settings.set('multiCandleL.multiCandleL', 60);  // 120, 180,300 candle duration
        settings.set('candlePatternCandleBody.candlePatternCandleBody', 0.7); // candle ratio

        technical indicators used:

  
----------------     END OF SETTINGS      -----------------
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {

        settings.set('numberOfCallsCP.numberOfCallsCP', 0);
        settings.set('numberOfPutsCP.numberOfPutsCP', 0);

        // ------------------  ANALYZE DATA  ----------------------

        closeList = settings.get('candleData.closeList');
        openList = settings.get('candleData.openList');
        highList = settings.get('candleData.highList');
        lowList = settings.get('candleData.lowList');
        close = settings.get('candleData.close');
        open = settings.get('candleData.open');
        high = settings.get('candleData.high');
        low = settings.get('candleData.low');
        tickList = settings.get('tickData.tickList');




        //Calculate the shizzle here!

        ohlcInput = {
            open: openList,
            high: highList,
            close: closeList,
            low: lowList,
        }

        ohlcInput2 = {
            open: openList.slice(0, -2),
            high: highList.slice(0, -2),
            close: closeList.slice(0, -2),
            low: lowList.slice(0, -2),
        }
        singleInput = {
            open: [open],
            high: [high],
            close: [close],
            low: [low],
        }

        if (settings.get('candlePatternCandleOrTick.candlePatternCandleOrTick') == 'tick') {
            closeInput = tickList
        } else {
            closeInput = closeList
        }



        if (bullBear) {
            bullishResult = bullish(ohlcInput);

            bearishResult = bearish(ohlcInput);


        }



        if (mornEveStar) {
            mornEveStarbullResult = morningstar(ohlcInput)
            mornEveStarbearResult = eveningstar(ohlcInput)

        }
        if (engulfingPattern) {
            engulfingPatternbearResult = bearishengulfingpattern(ohlcInput)
            engulfingPatternbullResult = bullishengulfingpattern(ohlcInput)
        }
        if (threeCrowsSoldiers) {
            threeCrowsSoldiersbearResult = threeblackcrows(ohlcInput2)
            threeCrowsSoldiersbullResult = threewhitesoldiers(ohlcInput2)
        }


        if (dojiStar) {
            dojiStarbullResult = morningdojistar(ohlcInput)
            dojiStarbearResult = eveningdojistar(ohlcInput)
        }

        //promise basedfunctions for tensorflow pattern detection

        // console.log(closeInput)

        if (isMarubozu) {
            isMarubozubullResult = bullishmarubozu(ohlcInput)
            isMarubozubearResult = bearishmarubozu(ohlcInput)
        }

        if (isHaramiCross) {

            isHaramiCrossbullResult = bullishharamicross(ohlcInput)
            isHaramiCrossbearResult = bearishharamicross(ohlcInput)

        }




        if (machineLearnedTrend) {

            trendLong = SMA.calculate({
                period: 47,
                values: closeList
            });
            trendShort = EMA.calculate({
                period: 7,
                values: closeList
            });
            trendCross = SMA.calculate({
                period: 4,
                values: closeList
            });

            if (trendCross.slice(-1)[0] > trendShort.slice(-1)[0] && trendShort.slice(-1)[0] > trendLong.slice(-1)[0]) {

                machineLearnedTrendbullResult = true;
            }

            if (trendCross.slice(-1)[0] < trendShort.slice(-1)[0] && trendShort.slice(-1)[0] < trendLong.slice(-1)[0]) {

                machineLearnedTrendbearResult = true;
            }


            console.log(trendCross.slice(-1)[0], trendShort.slice(-1)[0], trendLong.slice(-1)[0])





        }

        //trendcallbackfunction
        /*
                function istrending(trendingCallback) {

                    isTrendingUp({
                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 14, 15, 16, 17, 18, 17, 18, 19, 20, 22, 24, 23, 24, 25, 26, 27, 30, 29, 31]
                    }).then(function (response) {
                        machineLearnedTrendbullResult = response
                    })

                    isTrendingDown({
                        values: closeInput
                    }).then(function (response) {
                        machineLearnedTrendbearResult = response
                    })

                    console.log(machineLearnedTrendbearResult)
                    console.log(machineLearnedTrendbullResult)

                    trendingCallback()


                }

                */





        let seconds = settings.get('epoch.epoch');
        let candleEnding = settings.get('multiCandleL.multiCandleL') / 1.2;
        let candleStarting = settings.get('multiCandleL.multiCandleL') / 10;
        // //console.log('open ' + open + '| close ' + close + '| high ' + high + '| low ' + low);
        // //console.log('seconds ' + seconds + 's');
        // //console.log('CandlePercent ' + CandlePercent + '%');

        //if function for CALL event
        /*
        //console.log('mornEveStar : ' + mornEveStarbullResult, mornEveStarbearResult)
        //console.log('bullbear : ' + bullishResult, bearishResult);
        //console.log('engulfingPattern : ' + engulfingPatternbullResult, engulfingPatternbearResult)
        //console.log('threeCrowsSoldiers : ' + threeCrowsSoldiersbullResult, threeCrowsSoldiersbearResult)
        //console.log('isMarubozu : ' + isMarubozubullResult, isMarubozubearResult)
        //console.log('isHaramiCross : ' + isHaramiCrossbearResult, isHaramiCrossbullResult)
        //console.log('dojiStar : ' + dojiStarbullResult, dojiStarbearResult)
        //console.log('machineLearnedTrend : ' + machineLearnedTrendbullResult, machineLearnedTrendbearResult)
*/



        // tensorflow stuff *************************************************************************************


        if (machineLearnedTrend) {



            if (machineLearnedTrendbullResult) { // ************************************************************************************************************************************************
                let time = moment().format("kk:mm:ss");


                if (seconds > candleEnding || seconds < candleStarting) {

                    //  //console.log('New Candle')


                } else {




                    if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                        let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                        triggerCall++;
                        settings.set('numberOfCalls.numberOfCalls', triggerCall)
                        //console.log('Pattern, CALL Trigger')


                    } else {

                        if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                            let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                            triggerCallCP++;
                            settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                        } else {


                            settings.set('tradeInProgress', {
                                tradeInProgress: true,
                            })
                            settings.set('lockauto', {
                                lockauto: 1,
                            })
                            //console.log('Upward Trend Detected CALL trade')
                            settings.set('message.message', time + ': Upward Trend Detected CALL triggered')

                            settings.set('callOrPut.callOrPut', 'CALL');
                            trade();
                            return;
                        }
                    }
                }
            }

            //if function for PUT event
            if (machineLearnedTrendbearResult) {

                let time = moment().format("kk:mm:ss");



                if (seconds > candleEnding || seconds < candleStarting) {
                    //   //console.log('New Candle')

                } else {


                    if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                        let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                        triggerPut++;
                        settings.set('numberOfPuts.numberOfPuts', triggerPut)
                        //console.log('Pattern, PUT Trigger')


                    } else {
                        if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                            let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                            triggerPutCP++;
                            settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                        } else {


                            settings.set('tradeInProgress', {
                                tradeInProgress: true,
                            })
                            settings.set('lockauto', {
                                lockauto: 1,
                            })
                            //console.log('Downward Trend Detected PUT trade')
                            settings.set('message.message', time + ': Downward Trend Detected PUT triggered')

                            settings.set('callOrPut.callOrPut', 'PUT');
                            trade();
                            return;
                        }
                    }
                }






            }


        }

















        if (bullishResult && bullBear) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bullish CALL trade')
                        settings.set('message.message', time + ': Bullish CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;

                    }
                }
            }
        }

        //if function for PUT event
        if (bearishResult && bullBear) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bearish PUT trade')
                        settings.set('message.message', time + ': Bearish PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;

                    }
                }
            }

        }

        if (mornEveStarbullResult && mornEveStar) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Morning Star CALL trade')
                        settings.set('message.message', time + ': Morning Star CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (mornEveStarbearResult && mornEveStar) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Evening Star PUT trade')
                        settings.set('message.message', time + ': Evening Star PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }

        if (engulfingPatternbullResult && engulfingPattern) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bullish engulfing pattern CALL trade')
                        settings.set('message.message', time + ': Bullish engulfing pattern CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (engulfingPatternbearResult && engulfingPattern) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bearish engulfing pattern PUT trade')
                        settings.set('message.message', time + ': Bearish engulfing pattern PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }
        if (threeCrowsSoldiersbullResult && threeCrowsSoldiers) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Three White Soldiers CALL trade')
                        settings.set('message.message', time + ': Three White Soldiers CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (threeCrowsSoldiersbearResult && threeCrowsSoldiers) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Three Black Crows PUT trade')
                        settings.set('message.message', time + ': Three Black Crows PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }
        if (dojiStarbullResult && dojiStar) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bullish dojiStar CALL trade')
                        settings.set('message.message', time + ': Bullish dojiStar CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (dojiStarbearResult && dojiStar) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bearish dojiStar PUT trade')
                        settings.set('message.message', time + ': Bearish dojiStar PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }

        if (isMarubozubullResult && isMarubozu) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");
            //console.log('working')

            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)
                        //console.log('Pattern, CALL Trigger CP multi')



                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Marubozu Detected CALL trade')
                        settings.set('message.message', time + ': Marubozu Detected CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (isMarubozubearResult && isMarubozu) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Marubozu Detected PUT trade')
                        settings.set('message.message', time + ': Marubozu Detected PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }
        if (isHaramiCrossbullResult && isHaramiCross) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pattern, CALL Trigger')


                } else {

                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerCallCP = settings.get('numberOfCallsCP.numberOfCallsCP') * 1;
                        triggerCallCP++;
                        settings.set('numberOfCallsCP.numberOfCallsCP', triggerCallCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Harami Cross Detected CALL trade')
                        settings.set('message.message', time + ': Harami Cross Detected CALL triggered')

                        settings.set('callOrPut.callOrPut', 'CALL');
                        trade();
                        return;
                    }
                }
            }
        }

        //if function for PUT event
        if (isHaramiCrossbearResult && isHaramiCross) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pattern, PUT Trigger')


                } else {
                    if (settings.get('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

                        let triggerPutCP = settings.get('numberOfPutsCP.numberOfPutsCP') * 1;
                        triggerPutCP++;
                        settings.set('numberOfPutsCP.numberOfPutsCP', triggerPutCP)


                    } else {


                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Harami Cross Detected PUT trade')
                        settings.set('message.message', time + ': Harami Cross Detected PUT triggered')

                        settings.set('callOrPut.callOrPut', 'PUT');
                        trade();
                        return;
                    }
                }
            }

        }




















































        if (settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

            if (settings.get('numberOfCallsCP.numberOfCallsCP') * 1 >= settings.get('candlePatternNoOfTriggersRequired.candlePatternNoOfTriggersRequired') * 1) { // ************************************************************************************************************************************************
                let time = moment().format("kk:mm:ss");

                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)


                } else {

                    if (seconds > candleEnding || seconds < candleStarting) {

                        //  //console.log('New Candle')


                    } else {

                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bullish multi-patterns detected, CALL trade')
                        settings.set('message.message', time + ': Bullish multi-patterns detected, CALL triggered')

                        settings.set('CallOrPut.CallOrPut', 'CALL');
                        //  tradeInProgress: true

                        trade();
                        return;


                    }
                }
            }

            //if function for PUT event
            if (settings.get('numberOfPutsCP.numberOfPutsCP') * 1 >= settings.get('candlePatternNoOfTriggersRequired.candlePatternNoOfTriggersRequired') * 1) {

                let time = moment().format("kk:mm:ss");

                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)


                } else {

                    if (seconds > candleEnding || seconds < candleStarting) {
                        //   //console.log('New Candle')

                    } else {

                        settings.set('tradeInProgress', {
                            tradeInProgress: true,
                        })
                        settings.set('lockauto', {
                            lockauto: 1,
                        })
                        //console.log('Bearish multi-patterns detected, PUT trade')
                        settings.set('message.message', time + ': Bearish multi-patterns detected, PUT triggered')

                        settings.set('CallOrPut.CallOrPut', 'PUT');
                        //  tradeInProgress: true


                        trade();
                        return;


                    }
                }

            }









        }
    }

}