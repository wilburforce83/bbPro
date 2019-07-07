//setvariables
var closeList;
var openList;
var highList;
var lowList;
var close;
var open;
var high;
var low;
var tickList;
var lastTick;
var values;
var lastValue;
//strat specific
var period;
var avgPeriod;
var seconds;
var threshold;


function CCItrendrun() {


    /*
    // CCItrend defaults
    settings.set('CCItrendDuration.CCItrendDuration', 20);
    settings.set('CCItrendDuration.CCItrendDuration-unit', 's');
    settings.set('CCItrendPeriod.CCItrendPeriod', 9);
    settings.set('CCItrendThreshold.CCItrendThreshold', 100);
    settings.set('CCItrendAverage.CCItrendAverage', 4);
    settings.set('CCItrendCandleL.CCItrendCandleL', 60);
    settings.set('CCItrendCandleOrTick.CCItrendCandleOrTick', 'candle');
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {


        closeList = settings.get('candleData.closeList');
        openList = settings.get('candleData.openList');
        highList = settings.get('candleData.highList');
        lowList = settings.get('candleData.lowList');
        close = settings.get('candleData.close');
        open = settings.get('candleData.open');
        high = settings.get('candleData.high');
        low = settings.get('candleData.low');
        //strat specific
        period = settings.get('CCItrendPeriod.CCItrendPeriod') * 1;
        threshold = settings.get('CCItrendThreshold.CCItrendThreshold');
        seconds = settings.get('epoch.epoch');
        avgPeriod = -Math.abs(settings.get('CCItrendAverage.CCItrendAverage') + 1);


        var outputCCI = [];
        var inputCCI = {
            open: openList,
            high: highList,
            low: lowList,
            close: closeList,
            period: period
        };
        outputCCI = CCI.calculate(inputCCI);
        for (i = 0; i < outputCCI.length; i++) {
            //console.log(i + " " + outputCCI[i]);
        }

        let sliced = outputCCI.slice(avgPeriod, -1); // -1 corrects for slice starting at -1
        let lastCCI = (outputCCI.slice(-1)[0]) * 1;
        let CCIavg = stats.mean(sliced);
        let candleEnding = settings.get('multiCandleL.multiCandleL') / 1.2;
        let candleStarting = settings.get('multiCandleL.multiCandleL') / 10;

        // console.log(sliced)
        // console.log('CCI average :' + CCIavg);
        // console.log('last CCI : ' + lastCCI)


        //if function for CALL event



        if (lastCCI > CCIavg && lastCCI > settings.get('CCItrendThreshold.CCItrendThreshold') && close > open && Math.abs(lastCCI - threshold) <= (settings.get('CCItrendThreshold.CCItrendThreshold') / 2)) {
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                // console.log('New Candle')


            } else {
                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    console.log('CCI trend PUT trade')
                    settings.set('message.message', time + ': CCI trend PUT triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'PUT',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }
        }

        //if function for PUT event

        if (lastCCI < CCIavg && lastCCI < -Math.abs(settings.get('CCItrendThreshold.CCItrendThreshold')) && close < open && Math.abs(lastCCI - threshold) <= (settings.get('CCItrendThreshold.CCItrendThreshold') / 2)) {
            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   console.log('New Candle')

            } else {
                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    console.log('CCI trend CALL trade')
                    settings.set('message.message', time + ': CCI trend CALL triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'CALL',
                        //  tradeInProgress: true

                    })
                    trade();
                }

            }
        }

        // catch reversals


        if (lastCCI > CCIavg && lastCCI > -Math.abs(settings.get('CCItrendThreshold.CCItrendThreshold')) && close > open && CCIavg < (-Math.abs(settings.get('CCItrendThreshold.CCItrendThreshold') / 1.5)) && Math.abs(lastCCI - threshold) <= (settings.get('CCItrendThreshold.CCItrendThreshold') / 2)) {
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                // console.log('New Candle')


            } else {
                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerPut = settings.get('numberOfPuts.numberOfPuts')
                    triggerPut++;
                    settings.set('numberOfPuts.numberOfPuts', triggerPut)


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    console.log('CCI trend PUT trade')
                    settings.set('message.message', time + ': CCI trend PUT triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'PUT',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }
        }

        //if function for PUT event

        if (lastCCI < CCIavg && lastCCI < settings.get('CCItrendThreshold.CCItrendThreshold') && close < open && CCIavg < (settings.get('CCItrendThreshold.CCItrendThreshold') / 1.5) && Math.abs(lastCCI - threshold) <= (settings.get('CCItrendThreshold.CCItrendThreshold') / 2)) {
            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   console.log('New Candle')

            } else {
                if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                    let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                    triggerCall++;
                    settings.set('numberOfCalls.numberOfCalls', triggerCall)


                } else {
                    settings.set('tradeInProgress', {
                        tradeInProgress: true,
                    })
                    settings.set('lockauto', {
                        lockauto: 1,
                    })
                    console.log('CCI trend CALL trade')
                    settings.set('message.message', time + ': CCI trend CALL triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'CALL',
                        //  tradeInProgress: true

                    })
                    trade();
                }

            }
        }






    }



}