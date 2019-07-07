/*jshint esversion: 6 */
var po2;
var pc2;
var hao;
var hac;
var hah;
var hal;
var closeList;
var openList;
var highList;
var lowList;
var close;
var open;
var high;
var low;

function HeikenAshirun() {
    closeList = settings.get('candleData.closeList');
    openList = settings.get('candleData.openList');
    highList = settings.get('candleData.highList');
    lowList = settings.get('candleData.lowList');
    close = settings.get('candleData.close');
    open = settings.get('candleData.open');
    high = settings.get('candleData.high');
    low = settings.get('candleData.low');

    var pc2 = closeList[closeList.length - 2];
    var po2 = openList[openList.length - 2];
    var hao = (po2 + pc2) / 2;
    var hac = (close + open + high + low) / 4;

    /*  console.log(
        'HA Close' + hac,
        'HA Open' + hao,
        'Close' + close,
    );
*/
    const today = settings.get('epoch.epoch');


    let time = moment().format("kk:mm:ss");

    let candleEnding = settings.get('multiCandleL.multiCandleL') * 1 - 3;
    let candleLengthAdjust = settings.get('multiCandleL.multiCandleL') * 1 - 60;


    //  console.log('Time until trade window opens : ' + (candleEnding - (candleLengthAdjust + today)) + ' s')


    if (today + candleLengthAdjust >= candleEnding) { // open in new candle more or less
        // console.log('time window open for trade')
        if (hac > hao && close > hac) {

            //  console.log('call event');
            if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                let triggerCall = settings.get('numberOfCalls.numberOfCalls') * 1;
                triggerCall++;
                settings.set('numberOfCalls.numberOfCalls', triggerCall);


            } else {
                settings.set('tradeInProgress', {
                    tradeInProgress: true,
                });
                settings.set('lockauto', {
                    lockauto: 1,
                });
                console.log('Heiken Ashi CALL trade');
                settings.set('message.message', time + ': Heiken Ashi CALL triggered');

                settings.set('callOrPut', {
                    callOrPut: 'CALL',
                    //  tradeInProgress: true

                });
                trade();
            }
        }

        //if function for PUT event

        if (hac < hao && close < hac) {
            //   console.log('put event');
            if (settings.get('strat.strat') == 'multi' && settings.get('onlyOneTrigger.onlyOneTrigger') === false) {

                let triggerPut = settings.get('numberOfPuts.numberOfPuts');
                triggerPut++;
                settings.set('numberOfPuts.numberOfPuts', triggerPut);


            } else {
                settings.set('tradeInProgress', {
                    tradeInProgress: true,
                });
                settings.set('lockauto', {
                    lockauto: 1,
                });
                console.log('Heiken Ashi PUT trade');
                settings.set('message.message', time + ': Heiken Ashi PUT triggered');

                settings.set('callOrPut', {
                    callOrPut: 'PUT',
                    //  tradeInProgress: true

                });
                trade();
            }
        }
    }

}