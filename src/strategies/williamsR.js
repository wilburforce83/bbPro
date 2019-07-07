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
var thresholdOB;


function williamsRrun() {


    /*
    // williamsR defaults
    settings.set('williamsRDuration.williamsRDuration', 20);
    settings.set('williamsRDuration.williamsRDuration-unit', 's');
    settings.set('williamsRPeriod.williamsRPeriod', 14);
    settings.set('williamsRThresholdOBOB.williamsRThresholdOB', 100);
    settings.set('williamsRThresholdOBOS.williamsRThresholdOS', 100);
    settings.set('williamsRAverage.williamsRAverage', 2);
    settings.set('multiCandleL.multiCandleL', 60);
    settings.set('williamsRCandleOrTick.williamsRCandleOrTick', 'candle');
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
        period = settings.get('williamsRPeriod.williamsRPeriod') * 1;
        thresholdOB = -Math.abs(settings.get('williamsRThresholdOB.williamsRThresholdOB'));
        thresholdOS = -Math.abs(settings.get('williamsRThresholdOS.williamsRThresholdOS'));
        seconds = settings.get('epoch.epoch');
        avgPeriod = -Math.abs(settings.get('williamsRAverage.williamsRAverage') + 1);


        var outputwilliamsR = [];
        var inputwilliamsR = {
            open: openList,
            high: highList,
            low: lowList,
            close: closeList,
            period: period
        };
        outputwilliamsR = WilliamsR.calculate(inputwilliamsR);
        for (i = 0; i < outputwilliamsR.length; i++) {
            //console.log(i + " " + outputwilliamsR[i]);
        }

        let sliced = outputwilliamsR.slice(avgPeriod, -1); // -1 corrects for slice starting at -1
        let lastwilliamsR = (outputwilliamsR.slice(-1)[0]) * 1;
        let williamsRavg = stats.mean(sliced);
        let candleEnding = settings.get('multiCandleL.multiCandleL') / 1.2;
        let candleStarting = settings.get('multiCandleL.multiCandleL') / 12;

        // console.log(sliced)
        // console.log('williamsR average :' + williamsRavg);
        // console.log('last williamsR : ' + lastwilliamsR)


        //if function for CALL event



        if (lastwilliamsR < williamsRavg && lastwilliamsR > thresholdOB) { //&& close > open && Math.abs(lastwilliamsR - thresholdOB) <= (settings.get('williamsRThresholdOB.williamsRThresholdOB') / 2)) {
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
                    console.log('williamsR PUT trade')
                    settings.set('message.message', time + ': williamsR PUT triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'PUT',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }
        }

        //if function for PUT event

        if (lastwilliamsR > williamsRavg && lastwilliamsR < thresholdOS) {
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
                    console.log('williamsR CALL trade')
                    settings.set('message.message', time + ': williamsR CALL triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'CALL',
                        //  tradeInProgress: true

                    })
                    trade();
                }

            }
        }

        // catch reversals




    }



}