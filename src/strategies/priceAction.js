// Binary Bot Trading Main Strategy

var closeList;
var openList;
var highList;
var lowList;
var close;
var open;
var high;
var low;



function priceActionrun() {


    /*
------------------    priceAction settings    --------------------
//priceAction defaults
        settings.set('priceActionDuration.priceActionDuration', 7); //integer time period
        settings.set('priceActionDuration_unit.priceActionDuration_unit', 't') // 's', 'm'
        settings.set('priceActionCandleOrTick.priceActionCandleOrTick', 'candle');  // or 'candle'
        settings.set('multiCandleL.multiCandleL', 60);  // 120, 180,300 candle duration
        settings.set('priceActionCandleBody.priceActionCandleBody', 0.7); // candle ratio


----------------     END OF SETTINGS      -----------------
    */


    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {

        // ------------------  ANALYZE DATA  ----------------------
      //  console.log('priceaction.js running')
        closeList = settings.get('candleData.closeList');
        openList = settings.get('candleData.openList');
        highList = settings.get('candleData.highList');
        lowList = settings.get('candleData.lowList');
        close = settings.get('candleData.close');
        open = settings.get('candleData.open');
        high = settings.get('candleData.high');
        low = settings.get('candleData.low');




        let CandlePercent = Math.abs(close - open) / Math.abs(high - low);
        let seconds = settings.get('epoch.epoch');
        let candleEnding = settings.get('multiCandleL.multiCandleL') / 1.2;
        let candleStarting = settings.get('multiCandleL.multiCandleL') / 10;
        console.log('open ' + open + '| close ' + close + '| high ' + high + '| low ' + low);
     //   console.log('seconds ' + seconds + 's');
     //   console.log('CandlePercent ' + CandlePercent + '%');

        //if function for CALL event

        if (close > open && CandlePercent > settings.get('priceActionCandleBody.priceActionCandleBody') * 1 && close == high) {
            let time = moment().format("kk:mm:ss");


            if (seconds > candleEnding || seconds < candleStarting) {

                //  console.log('New Candle')


            } else {
                if (settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

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
                    console.log('Price Action CALL trade')
                    settings.set('message.message', time + ': Price Action CALL triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'CALL',
                        //  tradeInProgress: true

                    })
                    trade();
                }
            }
        }

        //if function for PUT event
        else if (close < open && CandlePercent > settings.get('priceActionCandleBody.priceActionCandleBody') * 1 && close == high) {
            let time = moment().format("kk:mm:ss");



            if (seconds > candleEnding || seconds < candleStarting) {
                //   console.log('New Candle')

            } else {


                if (settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

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
                    console.log('priceAction PUT trade')
                    settings.set('message.message', time + ': priceAction PUT triggered')

                    settings.set('callOrPut', {
                        callOrPut: 'PUT',
                        //  tradeInProgress: true

                    })
                    trade();
                }


            }
        } else {


            settings.set('callOrPut', {
                callOrPut: 'NONE',
                //  tradeInProgress: true

            })
        }







    }
}