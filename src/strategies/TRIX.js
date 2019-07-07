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




function TRIXrun() {


    /*
------------------    TRIX settings    --------------------

        settings.set('TRIXDuration.TRIXDuration', 20); //integer time period
        settings.set('TRIXDuration_unit.TRIXDuration_unit, 't') // 's', 'm'
        settings.set('multiCandleOrTick.multiCandleOrTick', 'tick');  // or 'candle'
        settings.set('TRIXCandleL.TRIXCandleL', 60);  // 120, 180,300
        
        settings.set('TRIXPeriod.TRIXPeriod', 5); // for all things like periods, ratios etc
       


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

        let period = settings.get('TRIXPeriod.TRIXPeriod');

        var TRIXInput = {
            values: values,
            period: period

        }

        //seperate out results
        var lastTRIX = TRIX.calculate(TRIXInput)[TRIX.calculate(TRIXInput).length - 1];

        var penTRIX = TRIX.calculate(TRIXInput)[TRIX.calculate(TRIXInput).length - 4];




        //  console.log('TRIX : ' + lastTRIX, penTRIX)






        //-------------------- PLACE  TRADES -----------------------

        //if functions for trade events

        if (lastTRIX > 0 && penTRIX < 0) {
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
                console.log('TRIX CALL trade')
                settings.set('message.message', time + ': TRIX CALL triggered')

                settings.set('callOrPut', {
                    callOrPut: 'CALL',
                    //  tradeInProgress: true

                })
                trade();
            }
        }

        //if function for PUT event

        if (lastTRIX < 0 && penTRIX > 0) {

            let time = moment().format("kk:mm:ss");

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
                console.log('TRIX PUT trade')
                settings.set('message.message', time + ': TRIX PUT triggered')

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