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
// var otherVariables; things like periods, ratios, percentages etc.




function macdrun() {


    /*
------------------    macd settings    --------------------

        settings.set('macdDuration.macdDuration', 20); //integer time period
        settings.set('macdDuration_unit.macdDuration_unit, 't') // 's', 'm'
        settings.set('multiCandleOrTick.multiCandleOrTick', 'tick');  // or 'candle'
        settings.set('macdCandleL.macdCandleL', 60);  // 120, 180,300
        
        settings.set('macdfastPeriod.macdfastPeriod', 5); // for all things like periods, ratios etc
        settings.set('macdslowPeriod.macdslowPeriod', 8); // for all things like periods, ratios etc
        settings.set('macdsignalPeriod.macdsignalPeriod', 3); // for all things like periods, ratios etc


----------------     END OF SETTINGS      -----------------
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {

        // ------------------  ANALYZE DATA  ----------------------

        if (settings.get('multiCandleOrTick.multiCandleOrTick') == 'tick') {


            tickList = settings.get('tickData.tickList');
            lastTick = settings.get('tickData.lastTick');
            //strat specific
            values = tickList;

        } else {

            closeList = settings.get('candleData.closeList');
            openList = settings.get('candleData.openList');
            highList = settings.get('candleData.highList');
            lowList = settings.get('candleData.lowList');
            close = settings.get('candleData.close');
            open = settings.get('candleData.open');
            high = settings.get('candleData.high');
            low = settings.get('candleData.low');
            //strat specific
            values = closeList;

        };

        let fastPeriod = settings.get('macdfastPeriod.macdfastPeriod');
        let slowPeriod = settings.get('macdslowPeriod.macdslowPeriod');
        let signalPeriod = settings.get('macdsignalPeriod.macdsignalPeriod');


        var macdInput = {
            values: values,
            fastPeriod: fastPeriod,
            slowPeriod: slowPeriod,
            signalPeriod: signalPeriod,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        //seperate out results
        var lastMACD = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 1].MACD;
        var lastHistogram = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 1].histogram;
        var lastSignal = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 1].signal;
        var penMACD = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 2].MACD;
        var penHistogram = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 2].histogram;
        var penSignal = MACD.calculate(macdInput)[MACD.calculate(macdInput).length - 2].signal;


        // console.log('Histo : ' + lastHistogram)
        // console.log('MACD : ' + lastMACD)
        // console.log('Signal : ' + lastSignal)





        //-------------------- PLACE  TRADES -----------------------

        //if functions for trade events

        if (lastHistogram > 0 && penHistogram < 0) {
            let time = moment().format("kk:mm:ss");
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
                console.log('MACD CALL trade')
                settings.set('message.message', time + ': MACD CALL triggered')

                settings.set('callOrPut', {
                    callOrPut: 'CALL',
                    //  tradeInProgress: true

                })
                trade();
            }
        }

        //if function for PUT event
        let time = moment().format("kk:mm:ss");
        if (lastHistogram < 0 && penHistogram > 0) {
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
                console.log('MACD PUT trade')
                settings.set('message.message', time + ': MACD PUT triggered')

                settings.set('callOrPut', {
                    callOrPut: 'PUT',
                    //  tradeInProgress: true

                })
                trade();
            }
        }

    }

    //------------------------------ END OF STRATEGY ------------------------------
}