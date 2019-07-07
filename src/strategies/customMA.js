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
var longCalc;
var shortCalc;
var triggerCalc;


// var otherVariables; things like periods, ratios, percentages etc.


function customMArun() {



    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {


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

        let long = settings.get('customMALong.customMALong');
        let short = settings.get('customMAShort.customMAShort');
        let trigger = settings.get('customMATrigger.customMATrigger');

        //custom settings for moving averages (ballache but cool!)
        //LONG
        if (settings.get('customMALongType.customMALongType') == 'SMA') {
            longCalc = SMA;
        }
        if (settings.get('customMALongType.customMALongType') == 'EMA') {
            longCalc = EMA;
        }
        if (settings.get('customMALongType.customMALongType') == 'WMA') {
            longCalc = WMA;
        }
        if (settings.get('customMALongType.customMALongType') == 'WEMA') {
            longCalc = WEMA;
        }
        //END OF LONG

        //SHORT
        if (settings.get('customMAShortType.customMAShortType') == 'SMA') {
            shortCalc = SMA;
        }
        if (settings.get('customMAShortType.customMAShortType') == 'EMA') {
            shortCalc = EMA;
        }
        if (settings.get('customMAShortType.customMAShortType') == 'WMA') {
            shortCalc = WMA;
        }
        if (settings.get('customMAShortType.customMAShortType') == 'WEMA') {
            shortCalc = WEMA;
        }
        //END OF SHORT

        //TRIGGER
        if (settings.get('customMATriggerType.customMATriggerType') == 'SMA') {
            triggerCalc = SMA;
        }
        if (settings.get('customMATriggerType.customMATriggerType') == 'EMA') {
            triggerCalc = EMA;
        }
        if (settings.get('customMATriggerType.customMATriggerType') == 'WMA') {
            triggerCalc = WMA;
        }
        if (settings.get('customMATriggerType.customMATriggerType') == 'WEMA') {
            triggerCalc = WEMA;
        }
        //END OF TRIGGER
        // console.log('list ' + tickList);
        // console.log(long, short, trigger)

        //Moving averages


        let long_list = longCalc.calculate({
            period: long,
            values: values
        })

        let short_list = shortCalc.calculate({
            period: short,
            values: values
        })

        let trigger_list = triggerCalc.calculate({
            period: trigger,
            values: values
        })

        // useful figuresfrom lists

        let last_long = long_list[long_list.length - 1];
        let last_short = short_list[short_list.length - 1];
        let last_trigger = trigger_list[trigger_list.length - 1];
        let pen_trigger = trigger_list[trigger_list.length - 2];

        //****************************************************************************************************

        //******************************************** Trigger Set  ******************************************

        // console.log(settings.get('customMALongType.customMALongType'), last_long, settings.get('customMAShortType.customMAShortType'), last_short, settings.get('customMATriggerType.customMATriggerType'), last_trigger, pen_trigger)

        //if function for CALL event

        if (last_trigger > last_short && last_trigger > last_long && pen_trigger < last_short) {
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
                console.log('Custom MA CALL trade')
                settings.set('message.message', time + ': Custom MA CALL triggered')

                settings.set('callOrPut', {
                    callOrPut: 'CALL',
                    //  tradeInProgress: true

                })
                trade();
            }
        }

        //if function for PUT event

        if (last_trigger < last_short && last_trigger < last_long && pen_trigger > last_short) {
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
                console.log('Custom MA PUT trade')
                settings.set('message.message', time + ': Custom MA PUT triggered')

                settings.set('callOrPut', {
                    callOrPut: 'PUT',
                    //  tradeInProgress: true

                })
                trade();
            }
        }






    }



}