
// ***********************************************************************************
// **                       Pull in requirements and set API token & AppId          **
// ***********************************************************************************

const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const settings = require('electron').remote.require('electron-settings');
const path = require('path')
const stat = require('stats-lite');
const ws = require('ws');


// technical indicators settings
const technicalIndicators = require('technicalindicators');
const SMA = require('technicalindicators').SMA;
let MACD = require('technicalindicators').MACD;
let BB = require('technicalindicators').BollingerBands;
const WilliamsR = require('technicalindicators').WilliamsR;
let RSI = require('technicalindicators').RSI;
let CCI = require('technicalindicators').CCI;

let LiveApi = require('binary-live-api').LiveApi;
let api = new LiveApi({ websocket: ws, appId: 16261 });



module.exports = ( signal , id_prefix_1 ) => {

    // Collect datasets using slice to reduce legth and add multiple averages
    
    return () => {

        // set candle length
        let candle_t = 60;

        if ( settings.has('candles.candle_granularity') ) {
            candle_t = settings.get('candles.candle_granularity');
        }


        // request candle history with options
        api.getTickHistory( signal , { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
            // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
            let Rxlong_close_list = response.candles.map(candles => candles.close * 1);
            let Rxlong_open_list = response.candles.map(candles => candles.open * 1);
            let Rxlong_high_list = response.candles.map(candles => candles.high * 1);
            let Rxlong_low_list = response.candles.map(candles => candles.low * 1);

            // last close details:
            let RxlastClose = Rxlong_close_list.slice(-1)[0]

            //console.log('candle-setting', candle_t)



            //                      Technical Indicator Calculations



            // MACD calculation

            var rxmacdInput = {
                values: Rxlong_close_list,
                fastPeriod: 12,
                slowPeriod: 26,
                signalPeriod: 9,
                SimpleMAOscillator: false,
                SimpleMASignal: false
            }

            // Get current MACD histogram figure

            var rxmacdHisto = MACD.calculate(rxmacdInput)[MACD.calculate(rxmacdInput).length - 1].histogram;


            // Bollinger Band Calculation

            var rxBBperiod = 14

            var rxBBinput = {
                period: rxBBperiod,
                values: Rxlong_close_list,
                stdDev: 2

            }

            // set result to variable

            var rxBBlower = BB.calculate(rxBBinput)[BB.calculate(rxBBinput).length - 1].lower;
            var rxBBupper = BB.calculate(rxBBinput)[BB.calculate(rxBBinput).length - 1].upper;

            // RSI calculation


            var rxinputRSI = {
                values: Rxlong_close_list,
                period: 14
            };

            // Get current RSI
            var rxRSI = RSI.calculate(rxinputRSI)[RSI.calculate(rxinputRSI).length - 1];




            // Calculate CCI 

            var rxCCIinput = {

                open: Rxlong_open_list,
                high: Rxlong_high_list,
                low: Rxlong_low_list,
                close: Rxlong_close_list,
                period: 20

            };

            var rxCCI = CCI.calculate(rxCCIinput)[CCI.calculate(rxCCIinput).length - 1];


            // Triple SMA calculation

            var rxsma4 = SMA.calculate({ period: 4, values: Rxlong_close_list })[SMA.calculate({ period: 4, values: Rxlong_close_list }).length - 1];

            var rxsma12 = SMA.calculate({ period: 12, values: Rxlong_close_list })[SMA.calculate({ period: 12, values: Rxlong_close_list }).length - 1];

            var rxsma50 = SMA.calculate({ period: 50, values: Rxlong_close_list })[SMA.calculate({ period: 50, values: Rxlong_close_list }).length - 1];





            // ***********************************************************************************
            // **                       DOM | Volatility Index 10                              **
            // ***********************************************************************************

            //                      Signal Generation for export


            /// 3SMA signal generation

            var rxsmasignal;

            var sendrxsma = document.querySelector(id_prefix_1+'-sma');

            if (rxsma4 > rxsma12 && rxsma12 > rxsma50) {

                rxsmasignal = "CALL";
                sendrxsma.style.color = 'green';

                sendrxsma.textContent = rxsmasignal;
            }

            else if (rxsma4 < rxsma12 && rxsma12 < rxsma50) {
                rxsmasignal = "PUT";
                sendrxsma.style.color = 'red';

                sendrxsma.textContent = rxsmasignal;
            }

            else {

                rxsmasignal = "Neutral";
                sendrxsma.style.color = 'grey';

                sendrxsma.textContent = rxsmasignal;



            }

            /// MACD signal

            var rxmacdsignal;

            var sendrxmacd = document.querySelector(id_prefix_1+'-macd');

            if (rxmacdHisto > 0) {

                rxmacdsignal = "CALL";
                sendrxmacd.style.color = 'green';
                sendrxmacd.textContent = rxmacdsignal;
            }

            else {
                rxmacdsignal = "PUT";
                sendrxmacd.style.color = 'red';
                sendrxmacd.textContent = rxmacdsignal;
            }





            /// RSI signal

            var rxrsisignal;

            var sendrxrsi = document.querySelector(id_prefix_1+'-rsi');

            if (rxRSI < 38) {

                rxrsisignal = "CALL";
                sendrxrsi.style.color = 'green';

                sendrxrsi.textContent = rxrsisignal;
            }

            else if (rxRSI > 68) {
                rxrsisignal = "PUT";
                sendrxrsi.style.color = 'red';

                sendrxrsi.textContent = rxrsisignal;
            }

            else {

                rxrsisignal = "Neutral";
                sendrxrsi.style.color = 'grey';

                sendrxrsi.textContent = rxrsisignal;



            }




            // CCI Signal

            var rxccisignal;

            var sendrxcci = document.querySelector(id_prefix_1+'-cci');

            if (rxCCI > 100) {

                rxccisignal = "CALL";
                sendrxcci.style.color = 'green';

                sendrxcci.textContent = rxccisignal;
            }

            else if (rxCCI < -100) {
                rxccisignal = "PUT";
                sendrxcci.style.color = 'red';

                sendrxcci.textContent = rxccisignal;
            }

            else {

                rxccisignal = "Neutral";
                sendrxcci.style.color = 'grey';

                sendrxcci.textContent = rxccisignal;



            }


            // BB Signals

            var rxBBsignal;

            var sendrxBB = document.querySelector(id_prefix_1+'-bb');

            if (rxBBlower > RxlastClose) {

                rxBBsignal = "CALL";
                sendrxBB.style.color = 'green';

                sendrxBB.textContent = rxBBsignal;
            }

            else if (rxBBupper < RxlastClose) {
                rxBBsignal = "PUT";
                sendrxBB.style.color = 'red';

                sendrxBB.textContent = rxBBsignal;
            }

            else {

                rxBBsignal = "Neutral";
                sendrxBB.style.color = 'grey';

                sendrxBB.textContent = rxBBsignal;


            }










            return "Rx_Technical_Analysis";
        });
        
    }

};