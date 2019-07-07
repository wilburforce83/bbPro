var ws = require('ws');
var LiveApi = require('binary-live-api').LiveApi;
var api = new LiveApi({ websocket: ws, appId: 16261 });
const { app } = require('electron');
const settings = require('electron-settings');




    // create DOM function for Candle Durations. using this function will add candle duration to any div with the class id = #candle_t

    module.exports = {

        get_candle_t: function () {


            var candle_durationSetting;

            if (settings.has('candles.candle_granularity')) {

                candle_durationSetting = settings.get('candles.candle_granularity');
            }

            else {

                candle_durationSetting = "60";
            }

            var candle_in_minutes = candle_durationSetting / 60;

            var sendCandle_t = document.querySelector('#candle_t');

            sendCandle_t.textContent = candle_in_minutes;

            return "get_candle_t";
        }
    }





    // Create event listener for any div with class id = #set_candle_t

    