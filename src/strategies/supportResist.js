// Binary Bot Candle Pattern Recognition.


var closeList;
var openList;
var highList;
var lowList;
var close;
var open;
var high;
var low;
var ohlcInput;
var singleInput;
var closeInput;
var highLowList;
var pivotPPResult;
var pivotPPResult;
var penClose;
var lastClose;

var pivotPP;
var SRonePP;
var SRtwoPP;
var fib100;
var fib062;
var fib050;
var fib038;
var fib024;
var fib000;
var fib100bullResult;
var fib062bullResult;
var fib050bullResult;
var fib038bullResult;
var fib024bullResult;
var fib000bullResult;
var fib100bearResult;
var fib062bearResult;
var fib050bearResult;
var fib038bearResult;
var fib024bearResult;
var fib000bearResult;

var pivotPPResult;
var SRonePPbearResult;
var SRtwoPPbearResult;

var SRsignal;
var pivotPPResult;
var SRonePPbullResult;
var SRtwoPPbullResult;
var fibSupports;
var fibResists;
var haveIrun = false;




function supportResistrun() {


    fib100 = false;
    fib062 = false;
    fib050 = false;
    fib038 = false;
    fib024 = false;
    fib000 = false;
    pivotPP = false;
    SRonePP = false;
    SRtwoPP = false;

    pivotPPResult = false;
    SRonePPbearResult = false;
    SRtwoPPbearResult = false;


    SRonePPbullResult = false;
    SRtwoPPbullResult = false;

    //check status of check boxes:

    var supportResistArray = settings.get('supportResistArray.supportResistArray');


    if (supportResistArray.indexOf("pivotPP") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        pivotPP = true;
    } else {
        pivotPP = false;
    }



    if (supportResistArray.indexOf("SRonePP") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        SRonePP = true;
    } else {
        SRonePP = false;
    }


    if (supportResistArray.indexOf('SRtwoPP') > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        SRtwoPP = true;
    } else {
        SRtwoPP = false;
    }

    if (supportResistArray.indexOf("fib100") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        fib100 = true;
    } else {
        fib100 = false;
    }
    if (supportResistArray.indexOf("fib062") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        fib062 = true;
    } else {
        fib062 = false;
    }
    if (supportResistArray.indexOf("fib050") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        fib050 = true;
    } else {
        fib050 = false;
    }
    if (supportResistArray.indexOf("fib038") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        fib038 = true;
    } else {
        fib038 = false;
    }
    if (supportResistArray.indexOf("fib024") > -1 && settings.get('supportResistCandleOrTick.supportResistCandleOrTick') == 'candle') {
        fib024 = true;
    } else {
        fib024 = false;
    }


    /*
        //console.log(

            'pivotPP  : ' + pivotPP + ' | ',
            'SRonePP  : ' + SRonePP + ' | ',
            'SRtwoPP  : ' + SRtwoPP + ' | ',
          

        )
    */


    /*
------------------    supportResist settings    --------------------
//supportResist defaults
        settings.set('supportResistDuration.supportResistDuration', 7); //integer time period
        settings.set('supportResistDuration_unit.supportResistDuration_unit', 't') // 's', 'm'
        settings.set('supportResistCandleOrTick.supportResistCandleOrTick', 'candle');  // or 'candle'
        settings.set('multiCandleL.multiCandleL', 60);  // 120, 180,300 candle duration
        settings.set('supportResistCandleBody.supportResistCandleBody', 0.7); // candle ratio

        technical indicators used:

  
----------------     END OF SETTINGS      -----------------
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {



        let seconds = settings.get('epoch.epoch');
        let candleEnding = settings.get('multiCandleL.multiCandleL') / 1.2;
        let candleStarting = settings.get('multiCandleL.multiCandleL') / 10;

        const signal = settings.get('symbol.symbol')
        let SRperiodPP = settings.get('supportResisttrendSRperiodPP.supportResisttrendSRperiodPP');

        if (haveIrun === false || signal != SRsignal) {
            SRsignal = settings.get('symbol.symbol')
            haveIrun = true;
            //  //console.log('New Candle')



            api.getTickHistory(signal, {
                end: 'latest',
                style: 'candles',
                granularity: SRperiodPP,
                count: 2
            }).then(function (response) {
                //   //console.log(response)
                closeList = response.candles.map(candles => candles.close * 1);
                openList = response.candles.map(candles => candles.open * 1);
                highList = response.candles.map(candles => candles.high * 1);
                lowList = response.candles.map(candles => candles.low * 1);



                close = closeList.slice(-2)[0]
                open = openList.slice(-2)[0]
                high = highList.slice(-2)[0]
                low = lowList.slice(-2)[0]

                //console.log('Updating S&R data')

            }).catch(function (error) {

                let string = error.message;
                let position = string.indexOf(`{`);
                let message = string.slice(0, position - 1);
                //var pos = string.indexOf('{')-1
                // var message = string.substring(0,pos);
                //console.log(message);
                // //console.log(position);


            })
        }

        // trading candles

        penClose = settings.get('candleData.pen');
        lastClose = settings.get('candleData.close');


        // ------------------  ANALYZE DATA  ----------------------



        //Calculate the shizzle here!

        ohlcInput = {
            open: openList,
            high: highList,
            close: closeList,
            low: lowList,
        }
        singleInput = [{
            c: close,
            h: high,
            l: low,
        }]

        highLowList = [{
            h: high,
            l: low,
        }]

        closeInput = {
            values: closeList,
        }


        let fibresists = tw.fibonacciRetrs(highLowList, 'UPTREND');
        let fibsupports = tw.fibonacciRetrs(highLowList, "DOWNTREND");

        let floorPivots = tw.floorPivots(singleInput);



        pivotPPResult = floorPivots[0].floor.pl
        SRonePPbullResult = floorPivots[0].floor.s1
        SRonePPbearResult = floorPivots[0].floor.s2
        SRtwoPPbullPPResult = floorPivots[0].floor.r1
        SRtwoPPbearResult = floorPivots[0].floor.r1
        console.log('running and resist strat. js')
        console.log(fibresists)
        console.log(fibsupports)

        fib100bullResult = fibsupports[0][0]
        fib062bullResult = fibsupports[0][1]
        fib050bullResult = fibsupports[0][2]
        fib038bullResult = fibsupports[0][3]
        fib024bullResult = fibsupports[0][4]
        fib000bullResult = fibsupports[0][5]
        fib100bearResult = fibresists[0][0]
        fib062bearResult = fibresists[0][1]
        fib050bearResult = fibresists[0][2]
        fib038bearResult = fibresists[0][3]
        fib024bearResult = fibresists[0][4]
        fib000bearResult = fibresists[0][5]

        console.log(
            fib100bullResult,
            fib062bullResult,
            fib050bullResult,
            fib038bullResult,
            fib024bullResult,
            fib000bullResult,
            fib100bearResult,
            fib062bearResult,
            fib050bearResult,
            fib038bearResult,
            fib024bearResult,
            fib000bearResult,
        )

        // //console.log(floorPivots[0].floor.pl)





        // //console.log('open ' + open + '| close ' + close + '| high ' + high + '| low ' + low);
        // //console.log('seconds ' + seconds + 's');
        // //console.log('CandlePercent ' + CandlePercent + '%');

        //if function for CALL event
        /*
        //console.log('SRonePP : ' + SRonePPbullResult, SRonePPbearResult)
        //console.log('pivotPP : ' + pivotPPResult, pivotPPResult);
        //console.log('SRtwoPP : ' + SRtwoPPbullResult, SRtwoPPbearResult)
        //console.log('threeCrowsSoldiers : ' + threeCrowsSoldiersbullResult, threeCrowsSoldiersbearResult)
        //console.log('hasHeadAndShoulder : ' + hasHeadAndShoulderbullResult, hasHeadAndShoulderbearResult)
        //console.log('doubleTopBottom : ' + doubleTopBottombearResult, doubleTopBottombullResult)
        //console.log('dojiStar : ' + dojiStarbullResult, dojiStarbearResult)
        //console.log('machineLearnedTrend : ' + machineLearnedTrendbullResult, machineLearnedTrendbearResult)
*/




        if (pivotPPResult < lastClose && pivotPPResult > penClose && pivotPP) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('Pivot, CALL Trigger')


                } else {

                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('Pivot Point CALL trade')
                    settings.set('message.message', time + ': Pivot Point CALL triggered')

                    settings.set('callOrPut.callOrPut', 'CALL');
                    //  tradeInProgress: true


                    trade();
                    return;

                }
            }
        }


        //if function for PUT event
        else if (pivotPPResult > lastClose && pivotPPResult < penClose && pivotPP) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('Pivot, PUT Trigger')


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('Pivot Point PUT trade')
                    settings.set('message.message', time + ': Pivot Point PUT triggered')

                    settings.set('callOrPut.callOrPut', 'PUT');
                    trade();
                    return;

                }

            }

        }

        if (SRonePPbullResult > lastClose && SRonePPbullResult < penClose && SRonePP) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('S1  Hit, CALL Trigger')


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('S1 CALL trade')
                    settings.set('message.message', time + ': S1 Support Hit, CALL trade triggered')

                    settings.set('callOrPut.callOrPut', 'CALL');
                    trade();
                    return;

                }
            }
        }

        //if function for PUT event
        else if (SRonePPbearResult < lastClose && SRonePPbearResult > penClose && SRonePP) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('R1 Resistance Hit, PUT Trigger')


                } else {

                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('R1 PUT trade')
                    settings.set('message.message', time + ': R1 Resistance Hit, PUT trade triggered')

                    settings.set('callOrPut.callOrPut', 'PUT');
                    trade();
                    return;

                }
            }

        }

        if (SRtwoPPbullResult > lastClose && SRtwoPPbullResult < penClose && SRtwoPP) { // ************************************************************************************************************************************************
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  //console.log('New Candle')


            } else {




                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)
                    //console.log('S2 Hit, CALL Trigger')


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('S2 Support Hit, CALL trade triggered')
                    settings.set('message.message', time + ': S2 Support Hit, CALL trade triggered')

                    settings.set('callOrPut.callOrPut', 'CALL');
                    trade();
                    return;

                }
            }
        }

        //if function for PUT event
        else if (SRtwoPPbearResult < lastClose && SRtwoPPbearResult > penClose && SRtwoPP) {

            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   //console.log('New Candle')

            } else {


                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)
                    //console.log('R2 Resistance Hit, PUT Trigger')


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    //console.log('R2 Resistance Hit, PUT trade')
                    settings.set('message.message', time + ': R2 Resistance Hit, PUT trade triggered')

                    settings.set('callOrPut.callOrPut', 'PUT');
                    trade();
                    return;

                }
            }

        }


    }

}