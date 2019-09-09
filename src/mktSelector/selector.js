const settings = require('electron').remote.require('electron-settings');
const stats = require('stats-lite');
const ws = require('ws');
let LiveApi = require('binary-live-api').LiveApi;
let api = new LiveApi({
    websocket: ws,
    appId: 18970
});


module.exports = (signal) => {

    // Collect datasets using slice to reduce legth and add multiple averages

    return () => {

        if (settings.get('changesymAuto.changesymAuto')) {
            // set candle length
            let candle_t = 60;

            api.getAssetIndex().then(function (response) {

                const data = response.asset_index;
                const symbol = signal;
                let minimumTradeDuration = data.filter(item => item[0] == symbol)[0][2][0][2];


                // console.log(minimumTradeDuration);

                let duration_unit = minimumTradeDuration[minimumTradeDuration.length - 1]
                let duration = minimumTradeDuration[minimumTradeDuration.length = 0]

                settings.set(signal + 'frxDuration,frxDuration', duration);
                settings.set(signal + 'frxDurationUnit,frxDurationUnit', duration_unit);


            }).catch(function (error) {

                let string = error.message;
                let position = string.indexOf(`{`);
                let message = string.slice(0, position - 1);
                //var pos = string.indexOf('{')-1
                // var message = string.substring(0,pos);
                console.log(message);
                // console.log(position);
                document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
                    '<p style="color:#755505">' + message + '</p>');
                return;

            });



            // request candle history with options
            api.getTickHistory(signal, {
                end: 'latest',
                style: 'candles',
                granularity: candle_t,
                count: 10 // was 5, perhaps change back if doesn't work
            }).then(function (response) {
                // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
                let Rxlong_close_list = response.candles.map(candles => candles.close * 1);
                let Rxlong_open_list = response.candles.map(candles => candles.open * 1);
                let Rxlong_high_list = response.candles.map(candles => candles.high * 1);
                let Rxlong_low_list = response.candles.map(candles => candles.low * 1);



                // ********************************************************************************************
                //**********************      Collecting Data for Candle Body %       *************************/


                // Slice data for analysis

                let lastTick = Rxlong_close_list.slice(-1)[0]

                // last details:
                let Rx5Close = Rxlong_close_list.slice(0)[0]
                let Rx5Open = Rxlong_open_list.slice(0)[0]
                let Rx5High = Rxlong_high_list.slice(0)[0]
                let Rx5Low = Rxlong_low_list.slice(0)[0]

                // 4 details:
                let Rx4Close = Rxlong_close_list.slice(-1)[0]
                let Rx4Open = Rxlong_open_list.slice(-1)[0]
                let Rx4High = Rxlong_high_list.slice(-1)[0]
                let Rx4Low = Rxlong_low_list.slice(-1)[0]

                // 3 details:
                let Rx3Close = Rxlong_close_list.slice(-2)[0]
                let Rx3Open = Rxlong_open_list.slice(-2)[0]
                let Rx3High = Rxlong_high_list.slice(-2)[0]
                let Rx3Low = Rxlong_low_list.slice(-2)[0]

                // 2 details:
                let Rx2Close = Rxlong_close_list.slice(-3)[0]
                let Rx2Open = Rxlong_open_list.slice(-3)[0]
                let Rx2High = Rxlong_high_list.slice(-3)[0]
                let Rx2Low = Rxlong_low_list.slice(-3)[0]

                // 1 details:
                let Rx1Close = Rxlong_close_list.slice(-4)[0]
                let Rx1Open = Rxlong_open_list.slice(-4)[0]
                let Rx1High = Rxlong_high_list.slice(-4)[0]
                let Rx1Low = Rxlong_low_list.slice(-4)[0]




                // look at last candle and link info to signal symbol via signal+


                let rx5candlePc = Math.abs(Rx5Close - Rx5Open) / Math.abs(Rx5High - Rx5Low);

                settings.set(signal + 'rx5candlePc', {
                    rx5candlePc: rx5candlePc * 1,


                })

                let rx4candlePc = Math.abs(Rx4Close - Rx4Open) / Math.abs(Rx4High - Rx4Low);

                settings.set(signal + 'rx4candlePc', {
                    rx4candlePc: rx4candlePc * 1,


                })

                let rx3candlePc = Math.abs(Rx3Close - Rx3Open) / Math.abs(Rx3High - Rx3Low);

                settings.set(signal + 'rx3candlePc', {
                    rx3candlePc: rx3candlePc * 1,


                })

                let rx2candlePc = Math.abs(Rx2Close - Rx2Open) / Math.abs(Rx2High - Rx2Low);

                settings.set(signal + 'rx2candlePc', {
                    rx2candlePc: rx2candlePc * 1,


                })

                let rx1candlePc = Math.abs(Rx1Close - Rx1Open) / Math.abs(Rx1High - Rx1Low);

                settings.set(signal + 'rx1candlePc', {
                    rx1candlePc: rx1candlePc * 1,


                })


                // ********************************************************************************************
                //**********************      Collecting Data for Std Deviation of Close  Selector        ****/

                let shortCloseList = Rxlong_close_list.slice(-4, -1)
                let beforeCloseList = Rxlong_close_list.slice(-10, -4)

                let stdDevOfClose1 = stats.stdev(shortCloseList);
                let stdDevOfClose2 = stats.stdev(beforeCloseList);

                // console.log('rxLow List', shortCloseList);

                settings.set(signal + 'stdDevcandle1', {
                    stdDevOfClose: Math.abs(stdDevOfClose1) * 1,


                })
                settings.set(signal + 'stdDevcandle2', {
                    stdDevOfClose: Math.abs(stdDevOfClose2) * 1,


                })
                settings.set(signal + 'lastTick', {
                    lastTick: lastTick * 1,


                })







            }).catch(function (error) {

                let string = error.message;
                let position = string.indexOf(`{`);
                let message = string.slice(0, position - 1);
                //var pos = string.indexOf('{')-1
                // var message = string.substring(0,pos);
                console.log(message);
                // console.log(position);
                document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
                    '<p style="color:#755505">' + message + '</p>');
                return;

            });

        }
    }

};