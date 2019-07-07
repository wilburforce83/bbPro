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
var value;
var lastValue;


// var otherVariables; things like periods, ratios, percentages etc.





function stratNamerun() {


    /*
------------------    stratName settings    --------------------

        settings.set('stratNameDuration.stratNameDuration', 20); //integer time period
        settings.set('stratNameDuration_unit.stratNameDuration_unit', 't') // 's', 'm'
        settings.set('stratNameCandleOrTick.stratNameCandleOrTick', 'tick');  // or 'candle'
        settings.set('stratNameCandleL.stratNameCandleL', 60);  // 120, 180,300
        
        settings.set('stratNamevariable.stratNamevariable', 4); // for all things like periods, ratios etc


----------------     END OF SETTINGS      -----------------
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {
        // ------------------  ANALYZE DATA  ----------------------

        if (settings.get('stratNameCandleOrTick.stratNameCandleOrTick') == 'tick') {
            tickList = settings.get('tickData.tickList');
            lastTick = settings.get('tickData.lastTick');
            value = tickList;
            lastValue = lastTick;
        } else {
            openList = settings.get('candleData.openList');
            highList = settings.get('candleData.highList');
            lowList = settings.get('candleData.lowList');
            close = settings.get('candleData.close');
            open = settings.get('candleData.open');
            high = settings.get('candleData.high');
            low = settings.get('candleData.low');
            value = closeList;
            lastValue = close;
        };

        // ---------------------- TECHNICAL INDICATOR CALULATIONS HERE ----------------------------------








        //-------------------- PLACE  TRADES -----------------------

        //if functions for trade events

        if (someTrigger > fromAbove) {

            let time = moment().format("kk:mm:ss");
            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            console.log('stratName CALL trade')
            settings.set('message.message', time + ': stratName CALL triggered')
            settings.set('callOrPut', {
                callOrPut: 'CALL',
                //  tradeInProgress: true

            })


            trade();
        }

        //if function for PUT event

        if (someTrigger < fromAbove) {
            let time = moment().format("kk:mm:ss");
            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            console.log('stratName PUT trade')
            settings.set('message.message', time + ': stratName PUT triggered')

            settings.set('callOrPut', {
                callOrPut: 'PUT',
                //  tradeInProgress: true

            })


            trade();
        }

    }

    //------------------------------ END OF STRATEGY ------------------------------
}