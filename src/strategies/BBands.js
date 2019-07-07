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
var PreviousClose;



function BBandsrun() {



    /*
------------------    BBands settings    --------------------
//BBands defaults
        settings.set('BBandsDuration.BBandsDuration', 7); //integer time period
        settings.set('BBandsDuration_unit.BBandsDuration_unit', 't') // 's', 'm'
        settings.set('multiCandleOrTick.multiCandleOrTick', 'candle');  // or 'candle'
        settings.set('BBandsCandleL.BBandsCandleL', 60);  // 120, 180,300 candle duration
        settings.set('BBandsCandleBody.BBandsCandleBody', 0.7); // candle ratio


----------------     END OF SETTINGS      -----------------
    */

    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {

        // ------------------  ANALYZE DATA  ----------------------

        if (settings.get('multiCandleOrTick.multiCandleOrTick') == 'tick') {


            const tickList = settings.get('tickData.tickList');
            const lastTick = settings.get('tickData.lastTick');
            // strat specific 
            PreviousClose = tickList.slice(-2)[0];
            value = tickList;
            // console.log('using ticks ', value)

        } else {

            const closeList = settings.get('candleData.closeList');
            const openList = settings.get('candleData.openList');
            const highList = settings.get('candleData.highList');
            const lowList = settings.get('candleData.lowList');
            const close = settings.get('candleData.close');
            const open = settings.get('candleData.open');
            const high = settings.get('candleData.high');
            const low = settings.get('candleData.low');
            // strat specific 
            PreviousClose = closeList.slice(-2)[0];
            value = closeList;
            // console.log('using candles ', value)

        };


        // Bollinger Band Calculation

        var BBandsperiod = settings.get('BBandsPeriod.BBandsPeriod') * 1

        var BBandsinput = {
            period: BBandsperiod,
            values: value,
            stdDev: settings.get('BBandsSdev.BBandsSdev') * 1

        }

        // set result to variable

        var BBandslower = BB.calculate(BBandsinput)[BB.calculate(BBandsinput).length - 1].lower;
        var BBandsupper = BB.calculate(BBandsinput)[BB.calculate(BBandsinput).length - 1].upper;

        //****************************************************************************************************

        //******************************************** Trigger Set  ******************************************



        //if function for CALL event

        if (PreviousClose < BBandslower) {
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
                console.log('BBands CALL trade')
                settings.set('message.message', time + ': BBands CALL triggered')

                settings.set('callOrPut', {
                    callOrPut: 'CALL',
                    //  tradeInProgress: true

                })
                trade();
            }
        }

        //if function for PUT event

        if (PreviousClose > BBandsupper) {
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
                console.log('BBands PUT trade')
                settings.set('message.message', time + ': BBands PUT triggered')

                settings.set('callOrPut', {
                    callOrPut: 'PUT',
                    //  tradeInProgress: true

                })
                trade();
            }
        }



    }
}