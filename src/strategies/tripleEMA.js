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


function tripleEMArun() {



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

        let long = settings.get('tripleEMALong.tripleEMALong');
        let short = settings.get('tripleEMAShort.tripleEMAShort');
        let trigger = settings.get('tripleEMATrigger.tripleEMATrigger');

        // console.log('list ' + tickList);
        // console.log(long, short, trigger)

        //Moving averages


        let long_list = EMA.calculate({
            period: long,
            values: values
        })

        let short_list = EMA.calculate({
            period: short,
            values: values
        })

        let trigger_list = EMA.calculate({
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



        //if function for CALL event

        if (last_trigger > last_short && last_short > last_long && pen_trigger < last_short) {

            let time = moment().format("kk:mm:ss");

            if (settings.get('strat.strat') == 'multi') {
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
                    console.log('Triple MA CALL trade')
                    settings.set('message.message', time + ': Triple MA CALL triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'CALL',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }

            //if function for PUT event

            if (last_trigger < last_short && last_short < last_long && pen_trigger > last_short) {
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
                    console.log('Triple MA PUT trade')
                    settings.set('message.message', time + ': Triple MA PUT triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'PUT',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }






        }



    }
}