




// ***********************************************************************************
// **                       Pull in requirements and set API token & AppId                            **
// ***********************************************************************************

const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const settings = require('electron-settings');
const path = require('path')
const stat = require('stats-lite');
const ws = require('ws');


// technical indicators settings
const technicalIndicators = require('technicalindicators');
const SMA = require('technicalindicators').SMA;
var MACD = require('technicalindicators').MACD;
var BB = require('technicalindicators').BollingerBands;
const WilliamsR = require('technicalindicators').WilliamsR;
var RSI = require('technicalindicators').RSI;
var CCI = require('technicalindicators').CCI;

var LiveApi = require('binary-live-api').LiveApi;
var api = new LiveApi({ websocket: ws, appId: 18970 });

//candle settings from /settings/tickSettings.js

const tickSettings = require('../settings/tickSettings.js');

var candle_t = tickSettings.candle_duration;




// ***********************************************************************************
// **                       R_50 | Volatility Index 50                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function R_50_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('R_50', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let R_50long_close_list = response.candles.map(candles => candles.close * 1);
        let R_50long_open_list = response.candles.map(candles => candles.open * 1);
        let R_50long_high_list = response.candles.map(candles => candles.high * 1);
        let R_50long_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let R_50lastClose = R_50long_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var r50macdInput = {
            values: R_50long_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var r50macdHisto = MACD.calculate(r50macdInput)[MACD.calculate(r50macdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var r50BBperiod = 14

        var r50BBinput = {
            period: r50BBperiod,
            values: R_50long_close_list,
            stdDev: 2

        }

        // set result to variable

        var r50BBlower = BB.calculate(r50BBinput)[BB.calculate(r50BBinput).length - 1].lower;
        var r50BBupper = BB.calculate(r50BBinput)[BB.calculate(r50BBinput).length - 1].upper;

        // RSI calculation


        var r50inputRSI = {
            values: R_50long_close_list,
            period: 14
        };

        // Get current RSI
        var r50RSI = RSI.calculate(r50inputRSI)[RSI.calculate(r50inputRSI).length - 1];




        // Calculate CCI 

        var r50CCIinput = {

            open: R_50long_open_list,
            high: R_50long_high_list,
            low: R_50long_low_list,
            close: R_50long_close_list,
            period: 20

        };

        var r50CCI = CCI.calculate(r50CCIinput)[CCI.calculate(r50CCIinput).length - 1];

        // Triple SMA calculation

        var r50sma4 = SMA.calculate({ period: 4, values: R_50long_close_list })[SMA.calculate({ period: 4, values: R_50long_close_list }).length - 1];

        var r50sma12 = SMA.calculate({ period: 12, values: R_50long_close_list })[SMA.calculate({ period: 12, values: R_50long_close_list }).length - 1];

        var r50sma50 = SMA.calculate({ period: 50, values: R_50long_close_list })[SMA.calculate({ period: 50, values: R_50long_close_list }).length - 1];













        // ***********************************************************************************
        // **                       DOM | Volatility Index 50                              **
        // ***********************************************************************************

        //                      Signal Generation for export


        /// 3SMA signal generation

        var r50smasignal;

        var sendr50sma = document.querySelector('#r50-sma');

        if (r50sma4 > r50sma12 && r50sma12 > r50sma50) {

            r50smasignal = "CALL";
            sendr50sma.style.color = 'green';

            sendr50sma.textContent = r50smasignal;
        }

        else if (r50sma4 < r50sma12 && r50sma12 < r50sma50) {
            r50smasignal = "PUT";
            sendr50sma.style.color = 'red';

            sendr50sma.textContent = r50smasignal;
        }

        else {

            r50smasignal = "Neutral";
            sendr50sma.style.color = 'grey';

            sendr50sma.textContent = r50smasignal;



        }

        /// MACD signal

        var r50macdsignal;

        var sendr50macd = document.querySelector('#r50-macd');

        if (r50macdHisto > 0) {

            r50macdsignal = "CALL";
            sendr50macd.style.color = 'green';
            sendr50macd.textContent = r50macdsignal;
        }

        else {
            r50macdsignal = "PUT";
            sendr50macd.style.color = 'red';
            sendr50macd.textContent = r50macdsignal;
        }





        /// RSI signal

        var r50rsisignal;

        var sendr50rsi = document.querySelector('#r50-rsi');

        if (r50RSI < 38) {

            r50rsisignal = "CALL";
            sendr50rsi.style.color = 'green';

            sendr50rsi.textContent = r50rsisignal;
        }

        else if (r50RSI > 68) {
            r50rsisignal = "PUT";
            sendr50rsi.style.color = 'red';

            sendr50rsi.textContent = r50rsisignal;
        }

        else {

            r50rsisignal = "Neutral";
            sendr50rsi.style.color = 'grey';

            sendr50rsi.textContent = r50rsisignal;



        }




        // CCI Signal

        var r50ccisignal;

        var sendr50cci = document.querySelector('#r50-cci');

        if (r50CCI > 100) {

            r50ccisignal = "CALL";
            sendr50cci.style.color = 'green';

            sendr50cci.textContent = r50ccisignal;
        }

        else if (r50CCI < -100) {
            r50ccisignal = "PUT";
            sendr50cci.style.color = 'red';

            sendr50cci.textContent = r50ccisignal;
        }

        else {

            r50ccisignal = "Neutral";
            sendr50cci.style.color = 'grey';

            sendr50cci.textContent = r50ccisignal;



        }


        // BB Signals

        var r50BBsignal;

        var sendr50BB = document.querySelector('#r50-bb');

        if (r50BBlower > R_50lastClose) {

            r50BBsignal = "CALL";
            sendr50BB.style.color = 'green';

            sendr50BB.textContent = r50BBsignal;
        }

        else if (r50BBupper < R_50lastClose) {
            r50BBsignal = "PUT";
            sendr50BB.style.color = 'red';

            sendr50BB.textContent = r50BBsignal;
        }

        else {

            r50BBsignal = "Neutral";
            sendr50BB.style.color = 'grey';

            sendr50BB.textContent = r50BBsignal;


        }








       

    });
}

R_50_Technical_Analysis()
setInterval(R_50_Technical_Analysis, 15000);




// ***********************************************************************************
// **                       R_10 | Volatility Index 10                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function R_10_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('R_10', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let R_10long_close_list = response.candles.map(candles => candles.close * 1);
        let R_10long_open_list = response.candles.map(candles => candles.open * 1);
        let R_10long_high_list = response.candles.map(candles => candles.high * 1);
        let R_10long_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let R_10lastClose = R_10long_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var r10macdInput = {
            values: R_10long_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var r10macdHisto = MACD.calculate(r10macdInput)[MACD.calculate(r10macdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var r10BBperiod = 14

        var r10BBinput = {
            period: r10BBperiod,
            values: R_10long_close_list,
            stdDev: 2

        }

        // set result to variable

        var r10BBlower = BB.calculate(r10BBinput)[BB.calculate(r10BBinput).length - 1].lower;
        var r10BBupper = BB.calculate(r10BBinput)[BB.calculate(r10BBinput).length - 1].upper;

        // RSI calculation


        var r10inputRSI = {
            values: R_10long_close_list,
            period: 14
        };

        // Get current RSI
        var r10RSI = RSI.calculate(r10inputRSI)[RSI.calculate(r10inputRSI).length - 1];




        // Calculate CCI 

        var r10CCIinput = {

            open: R_10long_open_list,
            high: R_10long_high_list,
            low: R_10long_low_list,
            close: R_10long_close_list,
            period: 20

        };

        var r10CCI = CCI.calculate(r10CCIinput)[CCI.calculate(r10CCIinput).length - 1];


        // Triple SMA calculation

        var r10sma4 = SMA.calculate({ period: 4, values: R_10long_close_list })[SMA.calculate({ period: 4, values: R_10long_close_list }).length - 1];

        var r10sma12 = SMA.calculate({ period: 12, values: R_10long_close_list })[SMA.calculate({ period: 12, values: R_10long_close_list }).length - 1];

        var r10sma50 = SMA.calculate({ period: 50, values: R_10long_close_list })[SMA.calculate({ period: 50, values: R_10long_close_list }).length - 1];





        // ***********************************************************************************
        // **                       DOM | Volatility Index 10                              **
        // ***********************************************************************************

        //                      Signal Generation for export


        /// 3SMA signal generation

        var r10smasignal;

        var sendr10sma = document.querySelector('#r10-sma');

        if (r10sma4 > r10sma12 && r10sma12 > r10sma50) {

            r10smasignal = "CALL";
            sendr10sma.style.color = 'green';

            sendr10sma.textContent = r10smasignal;
        }

        else if (r10sma4 < r10sma12 && r10sma12 < r10sma50) {
            r10smasignal = "PUT";
            sendr10sma.style.color = 'red';

            sendr10sma.textContent = r10smasignal;
        }

        else {

            r10smasignal = "Neutral";
            sendr10sma.style.color = 'grey';

            sendr10sma.textContent = r10smasignal;



        }

        /// MACD signal

        var r10macdsignal;

        var sendr10macd = document.querySelector('#r10-macd');

        if (r10macdHisto > 0) {

            r10macdsignal = "CALL";
            sendr10macd.style.color = 'green';
            sendr10macd.textContent = r10macdsignal;
        }

        else {
            r10macdsignal = "PUT";
            sendr10macd.style.color = 'red';
            sendr10macd.textContent = r10macdsignal;
        }





        /// RSI signal

        var r10rsisignal;

        var sendr10rsi = document.querySelector('#r10-rsi');

        if (r10RSI < 38) {

            r10rsisignal = "CALL";
            sendr10rsi.style.color = 'green';

            sendr10rsi.textContent = r10rsisignal;
        }

        else if (r10RSI > 68) {
            r10rsisignal = "PUT";
            sendr10rsi.style.color = 'red';

            sendr10rsi.textContent = r10rsisignal;
        }

        else {

            r10rsisignal = "Neutral";
            sendr10rsi.style.color = 'grey';

            sendr10rsi.textContent = r10rsisignal;



        }




        // CCI Signal

        var r10ccisignal;

        var sendr10cci = document.querySelector('#r10-cci');

        if (r10CCI > 100) {

            r10ccisignal = "CALL";
            sendr10cci.style.color = 'green';

            sendr10cci.textContent = r10ccisignal;
        }

        else if (r10CCI < -100) {
            r10ccisignal = "PUT";
            sendr10cci.style.color = 'red';

            sendr10cci.textContent = r10ccisignal;
        }

        else {

            r10ccisignal = "Neutral";
            sendr10cci.style.color = 'grey';

            sendr10cci.textContent = r10ccisignal;



        }


        // BB Signals

        var r10BBsignal;

        var sendr10BB = document.querySelector('#r10-bb');

        if (r10BBlower > R_10lastClose) {

            r10BBsignal = "CALL";
            sendr10BB.style.color = 'green';

            sendr10BB.textContent = r10BBsignal;
        }

        else if (r10BBupper < R_10lastClose) {
            r10BBsignal = "PUT";
            sendr10BB.style.color = 'red';

            sendr10BB.textContent = r10BBsignal;
        }

        else {

            r10BBsignal = "Neutral";
            sendr10BB.style.color = 'grey';

            sendr10BB.textContent = r10BBsignal;


        }








       

    });
}

R_10_Technical_Analysis()
setInterval(R_10_Technical_Analysis, 15000);







// ***********************************************************************************
// **                       R_25 | Volatility Index 25                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function R_25_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('R_25', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let R_25long_close_list = response.candles.map(candles => candles.close * 1);
        let R_25long_open_list = response.candles.map(candles => candles.open * 1);
        let R_25long_high_list = response.candles.map(candles => candles.high * 1);
        let R_25long_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let R_25lastClose = R_25long_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var r25macdInput = {
            values: R_25long_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var r25macdHisto = MACD.calculate(r25macdInput)[MACD.calculate(r25macdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var r25BBperiod = 14

        var r25BBinput = {
            period: r25BBperiod,
            values: R_25long_close_list,
            stdDev: 2

        }

        // set result to variable

        var r25BBlower = BB.calculate(r25BBinput)[BB.calculate(r25BBinput).length - 1].lower;
        var r25BBupper = BB.calculate(r25BBinput)[BB.calculate(r25BBinput).length - 1].upper;

        // RSI calculation


        var r25inputRSI = {
            values: R_25long_close_list,
            period: 14
        };

        // Get current RSI
        var r25RSI = RSI.calculate(r25inputRSI)[RSI.calculate(r25inputRSI).length - 1];




        // Calculate CCI 

        var r25CCIinput = {

            open: R_25long_open_list,
            high: R_25long_high_list,
            low: R_25long_low_list,
            close: R_25long_close_list,
            period: 20

        };

        var r25CCI = CCI.calculate(r25CCIinput)[CCI.calculate(r25CCIinput).length - 1];



        // Triple SMA calculation

        var r25sma4 = SMA.calculate({ period: 4, values: R_25long_close_list })[SMA.calculate({ period: 4, values: R_25long_close_list }).length - 1];

        var r25sma12 = SMA.calculate({ period: 12, values: R_25long_close_list })[SMA.calculate({ period: 12, values: R_25long_close_list }).length - 1];

        var r25sma50 = SMA.calculate({ period: 50, values: R_25long_close_list })[SMA.calculate({ period: 50, values: R_25long_close_list }).length - 1];




        // ***********************************************************************************
        // **                       DOM | Volatility Index 25                              **
        // ***********************************************************************************

        //                      Signal Generation for export



        /// 3SMA signal generation

        var r25smasignal;

        var sendr25sma = document.querySelector('#r25-sma');

        if (r25sma4 > r25sma12 && r25sma12 > r25sma50) {

            r25smasignal = "CALL";
            sendr25sma.style.color = 'green';

            sendr25sma.textContent = r25smasignal;
        }

        else if (r25sma4 < r25sma12 && r25sma12 < r25sma50) {
            r25smasignal = "PUT";
            sendr25sma.style.color = 'red';

            sendr25sma.textContent = r25smasignal;
        }

        else {

            r25smasignal = "Neutral";
            sendr25sma.style.color = 'grey';

            sendr25sma.textContent = r25smasignal;



        }
        /// MACD signal

        var r25macdsignal;

        var sendr25macd = document.querySelector('#r25-macd');

        if (r25macdHisto > 0) {

            r25macdsignal = "CALL";
            sendr25macd.style.color = 'green';
            sendr25macd.textContent = r25macdsignal;
        }

        else {
            r25macdsignal = "PUT";
            sendr25macd.style.color = 'red';
            sendr25macd.textContent = r25macdsignal;
        }





        /// RSI signal

        var r25rsisignal;

        var sendr25rsi = document.querySelector('#r25-rsi');

        if (r25RSI < 38) {

            r25rsisignal = "CALL";
            sendr25rsi.style.color = 'green';

            sendr25rsi.textContent = r25rsisignal;
        }

        else if (r25RSI > 68) {
            r25rsisignal = "PUT";
            sendr25rsi.style.color = 'red';

            sendr25rsi.textContent = r25rsisignal;
        }

        else {

            r25rsisignal = "Neutral";
            sendr25rsi.style.color = 'grey';

            sendr25rsi.textContent = r25rsisignal;



        }




        // CCI Signal

        var r25ccisignal;

        var sendr25cci = document.querySelector('#r25-cci');

        if (r25CCI > 100) {

            r25ccisignal = "CALL";
            sendr25cci.style.color = 'green';

            sendr25cci.textContent = r25ccisignal;
        }

        else if (r25CCI < -100) {
            r25ccisignal = "PUT";
            sendr25cci.style.color = 'red';

            sendr25cci.textContent = r25ccisignal;
        }

        else {

            r25ccisignal = "Neutral";
            sendr25cci.style.color = 'grey';

            sendr25cci.textContent = r25ccisignal;



        }


        // BB Signals

        var r25BBsignal;

        var sendr25BB = document.querySelector('#r25-bb');

        if (r25BBlower > R_25lastClose) {

            r25BBsignal = "CALL";
            sendr25BB.style.color = 'green';

            sendr25BB.textContent = r25BBsignal;
        }

        else if (r25BBupper < R_25lastClose) {
            r25BBsignal = "PUT";
            sendr25BB.style.color = 'red';

            sendr25BB.textContent = r25BBsignal;
        }

        else {

            r25BBsignal = "Neutral";
            sendr25BB.style.color = 'grey';

            sendr25BB.textContent = r25BBsignal;


        }








       

    });
}

R_25_Technical_Analysis()
setInterval(R_25_Technical_Analysis, 15000);






// ***********************************************************************************
// **                       R_75 | Volatility Index 75                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function R_75_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('R_75', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let R_75long_close_list = response.candles.map(candles => candles.close * 1);
        let R_75long_open_list = response.candles.map(candles => candles.open * 1);
        let R_75long_high_list = response.candles.map(candles => candles.high * 1);
        let R_75long_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let R_75lastClose = R_75long_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var r75macdInput = {
            values: R_75long_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var r75macdHisto = MACD.calculate(r75macdInput)[MACD.calculate(r75macdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var r75BBperiod = 14

        var r75BBinput = {
            period: r75BBperiod,
            values: R_75long_close_list,
            stdDev: 2

        }

        // set result to variable

        var r75BBlower = BB.calculate(r75BBinput)[BB.calculate(r75BBinput).length - 1].lower;
        var r75BBupper = BB.calculate(r75BBinput)[BB.calculate(r75BBinput).length - 1].upper;

        // RSI calculation


        var r75inputRSI = {
            values: R_75long_close_list,
            period: 14
        };

        // Get current RSI
        var r75RSI = RSI.calculate(r75inputRSI)[RSI.calculate(r75inputRSI).length - 1];




        // Calculate CCI 

        var r75CCIinput = {

            open: R_75long_open_list,
            high: R_75long_high_list,
            low: R_75long_low_list,
            close: R_75long_close_list,
            period: 20

        };

        var r75CCI = CCI.calculate(r75CCIinput)[CCI.calculate(r75CCIinput).length - 1];


        // Triple SMA calculation

        var r75sma4 = SMA.calculate({ period: 4, values: R_75long_close_list })[SMA.calculate({ period: 4, values: R_75long_close_list }).length - 1];

        var r75sma12 = SMA.calculate({ period: 12, values: R_75long_close_list })[SMA.calculate({ period: 12, values: R_75long_close_list }).length - 1];

        var r75sma50 = SMA.calculate({ period: 50, values: R_75long_close_list })[SMA.calculate({ period: 50, values: R_75long_close_list }).length - 1];





        // ***********************************************************************************
        // **                       DOM | Volatility Index 75                              **
        // ***********************************************************************************

        //                      Signal Generation for export

        /// 3SMA signal generation

        var r75smasignal;

        var sendr75sma = document.querySelector('#r75-sma');

        if (r75sma4 > r75sma12 && r75sma12 > r75sma50) {

            r75smasignal = "CALL";
            sendr75sma.style.color = 'green';

            sendr75sma.textContent = r75smasignal;
        }

        else if (r75sma4 < r75sma12 && r75sma12 < r75sma50) {
            r75smasignal = "PUT";
            sendr75sma.style.color = 'red';

            sendr75sma.textContent = r75smasignal;
        }

        else {

            r75smasignal = "Neutral";
            sendr75sma.style.color = 'grey';

            sendr75sma.textContent = r75smasignal;



        }


        /// MACD signal

        var r75macdsignal;

        var sendr75macd = document.querySelector('#r75-macd');

        if (r75macdHisto > 0) {

            r75macdsignal = "CALL";
            sendr75macd.style.color = 'green';
            sendr75macd.textContent = r75macdsignal;
        }

        else {
            r75macdsignal = "PUT";
            sendr75macd.style.color = 'red';
            sendr75macd.textContent = r75macdsignal;
        }





        /// RSI signal

        var r75rsisignal;

        var sendr75rsi = document.querySelector('#r75-rsi');

        if (r75RSI < 38) {

            r75rsisignal = "CALL";
            sendr75rsi.style.color = 'green';

            sendr75rsi.textContent = r75rsisignal;
        }

        else if (r75RSI > 68) {
            r75rsisignal = "PUT";
            sendr75rsi.style.color = 'red';

            sendr75rsi.textContent = r75rsisignal;
        }

        else {

            r75rsisignal = "Neutral";
            sendr75rsi.style.color = 'grey';

            sendr75rsi.textContent = r75rsisignal;



        }




        // CCI Signal

        var r75ccisignal;

        var sendr75cci = document.querySelector('#r75-cci');

        if (r75CCI > 100) {

            r75ccisignal = "CALL";
            sendr75cci.style.color = 'green';

            sendr75cci.textContent = r75ccisignal;
        }

        else if (r75CCI < -100) {
            r75ccisignal = "PUT";
            sendr75cci.style.color = 'red';

            sendr75cci.textContent = r75ccisignal;
        }

        else {

            r75ccisignal = "Neutral";
            sendr75cci.style.color = 'grey';

            sendr75cci.textContent = r75ccisignal;



        }


        // BB Signals

        var r75BBsignal;

        var sendr75BB = document.querySelector('#r75-bb');

        if (r75BBlower > R_75lastClose) {

            r75BBsignal = "CALL";
            sendr75BB.style.color = 'green';

            sendr75BB.textContent = r75BBsignal;
        }

        else if (r75BBupper < R_75lastClose) {
            r75BBsignal = "PUT";
            sendr75BB.style.color = 'red';

            sendr75BB.textContent = r75BBsignal;
        }

        else {

            r75BBsignal = "Neutral";
            sendr75BB.style.color = 'grey';

            sendr75BB.textContent = r75BBsignal;


        }








        //                       *** Print results to console  ***


    });
}

R_75_Technical_Analysis()
setInterval(R_75_Technical_Analysis, 15000);







// ***********************************************************************************
// **                       R_100 | Volatility Index 100                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function R_100_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('R_100', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let R_100long_close_list = response.candles.map(candles => candles.close * 1);
        let R_100long_open_list = response.candles.map(candles => candles.open * 1);
        let R_100long_high_list = response.candles.map(candles => candles.high * 1);
        let R_100long_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let R_100lastClose = R_100long_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var r100macdInput = {
            values: R_100long_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var r100macdHisto = MACD.calculate(r100macdInput)[MACD.calculate(r100macdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var r100BBperiod = 14

        var r100BBinput = {
            period: r100BBperiod,
            values: R_100long_close_list,
            stdDev: 2

        }

        // set result to variable

        var r100BBlower = BB.calculate(r100BBinput)[BB.calculate(r100BBinput).length - 1].lower;
        var r100BBupper = BB.calculate(r100BBinput)[BB.calculate(r100BBinput).length - 1].upper;

        // RSI calculation


        var r100inputRSI = {
            values: R_100long_close_list,
            period: 14
        };

        // Get current RSI
        var r100RSI = RSI.calculate(r100inputRSI)[RSI.calculate(r100inputRSI).length - 1];




        // Calculate CCI 

        var r100CCIinput = {

            open: R_100long_open_list,
            high: R_100long_high_list,
            low: R_100long_low_list,
            close: R_100long_close_list,
            period: 20

        };

        var r100CCI = CCI.calculate(r100CCIinput)[CCI.calculate(r100CCIinput).length - 1];


        // Triple SMA calculation

        var r100sma4 = SMA.calculate({ period: 4, values: R_100long_close_list })[SMA.calculate({ period: 4, values: R_100long_close_list }).length - 1];

        var r100sma12 = SMA.calculate({ period: 12, values: R_100long_close_list })[SMA.calculate({ period: 12, values: R_100long_close_list }).length - 1];

        var r100sma50 = SMA.calculate({ period: 50, values: R_100long_close_list })[SMA.calculate({ period: 50, values: R_100long_close_list }).length - 1];





        // ***********************************************************************************
        // **                       DOM | Volatility Index 100                              **
        // ***********************************************************************************

        //                      Signal Generation for export

        /// 3SMA signal generation

        var r100smasignal;

        var sendr100sma = document.querySelector('#r100-sma');

        if (r100sma4 > r100sma12 && r100sma12 > r100sma50) {

            r100smasignal = "CALL";
            sendr100sma.style.color = 'green';

            sendr100sma.textContent = r100smasignal;
        }

        else if (r100sma4 < r100sma12 && r100sma12 < r100sma50) {
            r100smasignal = "PUT";
            sendr100sma.style.color = 'red';

            sendr100sma.textContent = r100smasignal;
        }

        else {

            r100smasignal = "Neutral";
            sendr100sma.style.color = 'grey';

            sendr100sma.textContent = r100smasignal;



        }

        /// MACD signal

        var r100macdsignal;

        var sendr100macd = document.querySelector('#r100-macd');

        if (r100macdHisto > 0) {

            r100macdsignal = "CALL";
            sendr100macd.style.color = 'green';
            sendr100macd.textContent = r100macdsignal;
        }

        else {
            r100macdsignal = "PUT";
            sendr100macd.style.color = 'red';
            sendr100macd.textContent = r100macdsignal;
        }





        /// RSI signal

        var r100rsisignal;

        var sendr100rsi = document.querySelector('#r100-rsi');

        if (r100RSI < 38) {

            r100rsisignal = "CALL";
            sendr100rsi.style.color = 'green';

            sendr100rsi.textContent = r100rsisignal;
        }

        else if (r100RSI > 68) {
            r100rsisignal = "PUT";
            sendr100rsi.style.color = 'red';

            sendr100rsi.textContent = r100rsisignal;
        }

        else {

            r100rsisignal = "Neutral";
            sendr100rsi.style.color = 'grey';

            sendr100rsi.textContent = r100rsisignal;



        }




        // CCI Signal

        var r100ccisignal;

        var sendr100cci = document.querySelector('#r100-cci');

        if (r100CCI > 100) {

            r100ccisignal = "CALL";
            sendr100cci.style.color = 'green';

            sendr100cci.textContent = r100ccisignal;
        }

        else if (r100CCI < -100) {
            r100ccisignal = "PUT";
            sendr100cci.style.color = 'red';

            sendr100cci.textContent = r100ccisignal;
        }

        else {

            r100ccisignal = "Neutral";
            sendr100cci.style.color = 'grey';

            sendr100cci.textContent = r100ccisignal;



        }


        // BB Signals

        var r100BBsignal;

        var sendr100BB = document.querySelector('#r100-bb');

        if (r100BBlower > R_100lastClose) {

            r100BBsignal = "CALL";
            sendr100BB.style.color = 'green';

            sendr100BB.textContent = r100BBsignal;
        }

        else if (r100BBupper < R_100lastClose) {
            r100BBsignal = "PUT";
            sendr100BB.style.color = 'red';

            sendr100BB.textContent = r100BBsignal;
        }

        else {

            r100BBsignal = "Neutral";
            sendr100BB.style.color = 'grey';

            sendr100BB.textContent = r100BBsignal;


        }








       

    });
}

R_100_Technical_Analysis()
setInterval(R_100_Technical_Analysis, 15000);








// ***********************************************************************************
// **                       RDBEAR | Volatility Index bear                              **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function RDBEAR_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('RDBEAR', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let RDBEARlong_close_list = response.candles.map(candles => candles.close * 1);
        let RDBEARlong_open_list = response.candles.map(candles => candles.open * 1);
        let RDBEARlong_high_list = response.candles.map(candles => candles.high * 1);
        let RDBEARlong_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let RDBEARlastClose = RDBEARlong_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var rdBEARmacdInput = {
            values: RDBEARlong_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var rdBEARmacdHisto = MACD.calculate(rdBEARmacdInput)[MACD.calculate(rdBEARmacdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var rdBEARBBperiod = 14

        var rdBEARBBinput = {
            period: rdBEARBBperiod,
            values: RDBEARlong_close_list,
            stdDev: 2

        }

        // set result to variable

        var rdBEARBBlower = BB.calculate(rdBEARBBinput)[BB.calculate(rdBEARBBinput).length - 1].lower;
        var rdBEARBBupper = BB.calculate(rdBEARBBinput)[BB.calculate(rdBEARBBinput).length - 1].upper;

        // RSI calculation


        var rdBEARinputRSI = {
            values: RDBEARlong_close_list,
            period: 14
        };

        // Get current RSI
        var rdBEARRSI = RSI.calculate(rdBEARinputRSI)[RSI.calculate(rdBEARinputRSI).length - 1];




        // Calculate CCI 

        var rdBEARCCIinput = {

            open: RDBEARlong_open_list,
            high: RDBEARlong_high_list,
            low: RDBEARlong_low_list,
            close: RDBEARlong_close_list,
            period: 20

        };

        var rdBEARCCI = CCI.calculate(rdBEARCCIinput)[CCI.calculate(rdBEARCCIinput).length - 1];


        // Triple SMA calculation

        var rdBEARsma4 = SMA.calculate({ period: 4, values: RDBEARlong_close_list })[SMA.calculate({ period: 4, values: RDBEARlong_close_list }).length - 1];

        var rdBEARsma12 = SMA.calculate({ period: 12, values: RDBEARlong_close_list })[SMA.calculate({ period: 12, values: RDBEARlong_close_list }).length - 1];

        var rdBEARsma50 = SMA.calculate({ period: 50, values: RDBEARlong_close_list })[SMA.calculate({ period: 50, values: RDBEARlong_close_list }).length - 1];





        // ***********************************************************************************
        // **                       DOM | Volatility Index bear                              **
        // ***********************************************************************************

        //                      Signal Generation for export


        /// 3SMA signal generation

        var rdBEARsmasignal;

        var sendrdBEARsma = document.querySelector('#rdBEAR-sma');

        if (rdBEARsma4 > rdBEARsma12 && rdBEARsma12 > rdBEARsma50) {

            rdBEARsmasignal = "CALL";
            sendrdBEARsma.style.color = 'green';

            sendrdBEARsma.textContent = rdBEARsmasignal;
        }

        else if (rdBEARsma4 < rdBEARsma12 && rdBEARsma12 < rdBEARsma50) {
            rdBEARsmasignal = "PUT";
            sendrdBEARsma.style.color = 'red';

            sendrdBEARsma.textContent = rdBEARsmasignal;
        }

        else {

            rdBEARsmasignal = "Neutral";
            sendrdBEARsma.style.color = 'grey';

            sendrdBEARsma.textContent = rdBEARsmasignal;



        }

        /// MACD signal

        var rdBEARmacdsignal;

        var sendrdBEARmacd = document.querySelector('#rdBEAR-macd');

        if (rdBEARmacdHisto > 0) {

            rdBEARmacdsignal = "CALL";
            sendrdBEARmacd.style.color = 'green';
            sendrdBEARmacd.textContent = rdBEARmacdsignal;
        }

        else {
            rdBEARmacdsignal = "PUT";
            sendrdBEARmacd.style.color = 'red';
            sendrdBEARmacd.textContent = rdBEARmacdsignal;
        }





        /// RSI signal

        var rdBEARrsisignal;

        var sendrdBEARrsi = document.querySelector('#rdBEAR-rsi');

        if (rdBEARRSI < 38) {

            rdBEARrsisignal = "CALL";
            sendrdBEARrsi.style.color = 'green';

            sendrdBEARrsi.textContent = rdBEARrsisignal;
        }

        else if (rdBEARRSI > 68) {
            rdBEARrsisignal = "PUT";
            sendrdBEARrsi.style.color = 'red';

            sendrdBEARrsi.textContent = rdBEARrsisignal;
        }

        else {

            rdBEARrsisignal = "Neutral";
            sendrdBEARrsi.style.color = 'grey';

            sendrdBEARrsi.textContent = rdBEARrsisignal;



        }




        // CCI Signal

        var rdBEARccisignal;

        var sendrdBEARcci = document.querySelector('#rdBEAR-cci');

        if (rdBEARCCI > 100) {

            rdBEARccisignal = "CALL";
            sendrdBEARcci.style.color = 'green';

            sendrdBEARcci.textContent = rdBEARccisignal;
        }

        else if (rdBEARCCI < -100) {
            rdBEARccisignal = "PUT";
            sendrdBEARcci.style.color = 'red';

            sendrdBEARcci.textContent = rdBEARccisignal;
        }

        else {

            rdBEARccisignal = "Neutral";
            sendrdBEARcci.style.color = 'grey';

            sendrdBEARcci.textContent = rdBEARccisignal;



        }


        // BB Signals

        var rdBEARBBsignal;

        var sendrdBEARBB = document.querySelector('#rdBEAR-bb');

        if (rdBEARBBlower > RDBEARlastClose) {

            rdBEARBBsignal = "CALL";
            sendrdBEARBB.style.color = 'green';

            sendrdBEARBB.textContent = rdBEARBBsignal;
        }

        else if (rdBEARBBupper < RDBEARlastClose) {
            rdBEARBBsignal = "PUT";
            sendrdBEARBB.style.color = 'red';

            sendrdBEARBB.textContent = rdBEARBBsignal;
        }

        else {

            rdBEARBBsignal = "Neutral";
            sendrdBEARBB.style.color = 'grey';

            sendrdBEARBB.textContent = rdBEARBBsignal;


        }








       

    });
}

RDBEAR_Technical_Analysis()
setInterval(RDBEAR_Technical_Analysis, 15000);






// ***********************************************************************************
// **                       RDBULL | Volatility Index bull                             **
// ***********************************************************************************



// Collect datasets using slice to reduce legth and add multiple averages


function RDBULL_Technical_Analysis() {
    // request candle history with options
    api.getTickHistory('RDBULL', { end: 'latest', style: 'candles', granularity: candle_t, count: 100 }).then(function (response) {
        // create a variable, take the response and find the element we want and create a new array with it, here it is candle "close"
        let RDBULLlong_close_list = response.candles.map(candles => candles.close * 1);
        let RDBULLlong_open_list = response.candles.map(candles => candles.open * 1);
        let RDBULLlong_high_list = response.candles.map(candles => candles.high * 1);
        let RDBULLlong_low_list = response.candles.map(candles => candles.low * 1);

        // last close details:
        let RDBULLlastClose = RDBULLlong_close_list.slice(-1)[0]




        //                      Technical Indicator Calculations



        // MACD calculation

        var rdBULLmacdInput = {
            values: RDBULLlong_close_list,
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        }

        // Get current MACD histogram figure

        var rdBULLmacdHisto = MACD.calculate(rdBULLmacdInput)[MACD.calculate(rdBULLmacdInput).length - 1].histogram;


        // Bollinger Band Calculation

        var rdBULLBBperiod = 14

        var rdBULLBBinput = {
            period: rdBULLBBperiod,
            values: RDBULLlong_close_list,
            stdDev: 2

        }

        // set result to variable

        var rdBULLBBlower = BB.calculate(rdBULLBBinput)[BB.calculate(rdBULLBBinput).length - 1].lower;
        var rdBULLBBupper = BB.calculate(rdBULLBBinput)[BB.calculate(rdBULLBBinput).length - 1].upper;

        // RSI calculation


        var rdBULLinputRSI = {
            values: RDBULLlong_close_list,
            period: 14
        };

        // Get current RSI
        var rdBULLRSI = RSI.calculate(rdBULLinputRSI)[RSI.calculate(rdBULLinputRSI).length - 1];




        // Calculate CCI 

        var rdBULLCCIinput = {

            open: RDBULLlong_open_list,
            high: RDBULLlong_high_list,
            low: RDBULLlong_low_list,
            close: RDBULLlong_close_list,
            period: 20

        };

        var rdBULLCCI = CCI.calculate(rdBULLCCIinput)[CCI.calculate(rdBULLCCIinput).length - 1];


        // Triple SMA calculation

        var rdBULLsma4 = SMA.calculate({ period: 4, values: RDBULLlong_close_list })[SMA.calculate({ period: 4, values: RDBULLlong_close_list }).length - 1];

        var rdBULLsma12 = SMA.calculate({ period: 12, values: RDBULLlong_close_list })[SMA.calculate({ period: 12, values: RDBULLlong_close_list }).length - 1];

        var rdBULLsma50 = SMA.calculate({ period: 50, values: RDBULLlong_close_list })[SMA.calculate({ period: 50, values: RDBULLlong_close_list }).length - 1];





        // ***********************************************************************************
        // **                       DOM | Volatility Index 10                              **
        // ***********************************************************************************

        //                      Signal Generation for export

        /// 3SMA signal generation

        var rdBULLsmasignal;

        var sendrdBULLsma = document.querySelector('#rdBULL-sma');

        if (rdBULLsma4 > rdBULLsma12 && rdBULLsma12 > rdBULLsma50) {

            rdBULLsmasignal = "CALL";
            sendrdBULLsma.style.color = 'green';

            sendrdBULLsma.textContent = rdBULLsmasignal;
        }

        else if (rdBULLsma4 < rdBULLsma12 && rdBULLsma12 < rdBULLsma50) {
            rdBULLsmasignal = "PUT";
            sendrdBULLsma.style.color = 'red';

            sendrdBULLsma.textContent = rdBULLsmasignal;
        }

        else {

            rdBULLsmasignal = "Neutral";
            sendrdBULLsma.style.color = 'grey';

            sendrdBULLsma.textContent = rdBULLsmasignal;



        }


        /// MACD signal

        var rdBULLmacdsignal;

        var sendrdBULLmacd = document.querySelector('#rdBULL-macd');

        if (rdBULLmacdHisto > 0) {

            rdBULLmacdsignal = "CALL";
            sendrdBULLmacd.style.color = 'green';
            sendrdBULLmacd.textContent = rdBULLmacdsignal;
        }

        else {
            rdBULLmacdsignal = "PUT";
            sendrdBULLmacd.style.color = 'red';
            sendrdBULLmacd.textContent = rdBULLmacdsignal;
        }





        /// RSI signal

        var rdBULLrsisignal;

        var sendrdBULLrsi = document.querySelector('#rdBULL-rsi');

        if (rdBULLRSI < 38) {

            rdBULLrsisignal = "CALL";
            sendrdBULLrsi.style.color = 'green';

            sendrdBULLrsi.textContent = rdBULLrsisignal;
        }

        else if (rdBULLRSI > 68) {
            rdBULLrsisignal = "PUT";
            sendrdBULLrsi.style.color = 'red';

            sendrdBULLrsi.textContent = rdBULLrsisignal;
        }

        else {

            rdBULLrsisignal = "Neutral";
            sendrdBULLrsi.style.color = 'grey';

            sendrdBULLrsi.textContent = rdBULLrsisignal;



        }




        // CCI Signal

        var rdBULLccisignal;

        var sendrdBULLcci = document.querySelector('#rdBULL-cci');

        if (rdBULLCCI > 100) {

            rdBULLccisignal = "CALL";
            sendrdBULLcci.style.color = 'green';

            sendrdBULLcci.textContent = rdBULLccisignal;
        }

        else if (rdBULLCCI < -100) {
            rdBULLccisignal = "PUT";
            sendrdBULLcci.style.color = 'red';

            sendrdBULLcci.textContent = rdBULLccisignal;
        }

        else {

            rdBULLccisignal = "Neutral";
            sendrdBULLcci.style.color = 'grey';

            sendrdBULLcci.textContent = rdBULLccisignal;



        }


        // BB Signals

        var rdBULLBBsignal;

        var sendrdBULLBB = document.querySelector('#rdBULL-bb');

        if (rdBULLBBlower > RDBULLlastClose) {

            rdBULLBBsignal = "CALL";
            sendrdBULLBB.style.color = 'green';

            sendrdBULLBB.textContent = rdBULLBBsignal;
        }

        else if (rdBULLBBupper < RDBULLlastClose) {
            rdBULLBBsignal = "PUT";
            sendrdBULLBB.style.color = 'red';

            sendrdBULLBB.textContent = rdBULLBBsignal;
        }

        else {

            rdBULLBBsignal = "Neutral";
            sendrdBULLBB.style.color = 'grey';

            sendrdBULLBB.textContent = rdBULLBBsignal;


        }








 


    });
}

RDBULL_Technical_Analysis()
setInterval(RDBULL_Technical_Analysis, 15000);