var stream;
var lastTick;
var Rxlong_close_list;
var Rxlong_open_list;
var Rxlong_high_list;
var Rxlong_low_list;
var epochs;
var timeStamp;
var timeStamp2;
var noCandlesOnChart;
var closelistChart;
var highlistChart;
var openlistChart;
var lowlistChart;
var timestampChart;
var closelistReverse;
var highlistReverse;
var openlistReverse;
var lowlistReverse;
var timestampReverse;
var connected = false;


//A dynamic datafeed for use by all strategies



function data() {

    noCandlesOnChart = Math.abs(settings.get('candlesOnChart.candlesOnChart'));

    const strat = settings.get('strat.strat');
    const signal = settings.get('symbol.symbol')

    //  const duration_unit = settings.get(strat + 'Duration_unit.' + strat + 'Duration_unit');

    var candle_t = 60;

    // // console.log(CandleOrTick);


    if (settings.has(strat + 'CandleL.' + strat + 'CandleL')) {
        candle_t = settings.get(strat + 'CandleL.' + strat + 'CandleL');
    }

    api.getTickHistory(signal, {
        end: 'latest',
        style: 'candles',
        granularity: candle_t,
        count: 301
    }).then(function (response) {
        // // console.log(response)
        Rxlong_close_list = response.candles.map(candles => candles.close * 1);
        Rxlong_open_list = response.candles.map(candles => candles.open * 1);
        Rxlong_high_list = response.candles.map(candles => candles.high * 1);
        Rxlong_low_list = response.candles.map(candles => candles.low * 1);
        epochs = response.candles.map(candles => candles.epoch * 1 * 1000);
        timeStamp = epochs.map(epoch => moment(epoch).format("kk:mm"));



        // timeStamp2 = epochs.map(epoch => moment(epoch).format("kk:mm"));

        var Close = Rxlong_close_list[Rxlong_close_list.length - 1];
        var Pen = Rxlong_close_list[Rxlong_close_list.length - 2];
        var Open = Rxlong_open_list[Rxlong_open_list.length - 1];
        var High = Rxlong_high_list[Rxlong_high_list.length - 1];
        var Low = Rxlong_low_list[Rxlong_low_list.length - 1];

        //// console.log(epochs)
        settings.set('candleData', {
            closeList: Rxlong_close_list,
            openList: Rxlong_open_list,
            highList: Rxlong_high_list,
            lowList: Rxlong_low_list,
            close: Close,
            pen: Pen,
            open: Open,
            high: High,
            low: Low,
            timeStamp: timeStamp


        });
        Rxlong_close_list.push("End");
        Rxlong_open_list.push("End");
        Rxlong_high_list.push("End");
        Rxlong_low_list.push("End");

        connected = true;
    }).catch(function (error) {

        let string = error.message;
        let position = string.indexOf(`{`);
        let message = string.slice(0, position - 1);
        //var pos = string.indexOf('{')-1
        // var message = string.substring(0,pos);
        console.log(error.message);
        // // console.log(position);
        // document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
        //   '<p style="color:#755505">' + message + '</p>');
        return;

    })




    api.getTickHistory(settings.get('symbol.symbol'), {
        end: 'latest',
        style: 'ticks',
        count: 200
    }).then(function (response) {

        // // console.log(response);

        let tick = response.history.prices;
        let ticks = tick.map(tick => tick * 1);
        response.history.times.push("End");
        response.history.prices.push("End")
        times = response.history.times.slice(-30, -1)
        stream = response.history.prices.slice(-30, -1);
        lastTick = stream.slice(-1)[0] * 1;
        let lastEpoch = response.history.times.slice(-2)[0] * 1;
        // console.log(response.history.times)
        let lastSecond = lastEpoch % 60;
        settings.set('stream.stream', stream)
        settings.set('epoch.epoch', lastSecond);
        settings.set('lastTick.lastTick', response.history.prices.slice(-1)[0] * 1)


        settings.set('tickData', {
            tickList: ticks,
            lastTick: lastTick

        });

    }).catch(function (error) {

        let string = error.message;
        let position = string.indexOf(`{`);
        let message = string.slice(0, position - 1);
        //var pos = string.indexOf('{')-1
        // var message = string.substring(0,pos);
        console.log(message);
        // // console.log(position);
        // document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
        //    '<p style="color:#755505">' + message + '</p>');
        return;

    })
    //  // console.log(settings.get('tickData.tickList'));

    if (strat == 'manual') {

        //   // console.log('waitingfortrade')

    } else {

        if (settings.get('timeUntilTrading.Open') > 3 && settings.get('changesymAuto.changesymAuto')) {
            // console.log('strats are running from data.js')
            this[strat + 'run']() // use the strategy prefix to run the function for the relevent strategy

        }

        if (settings.get('changesymAuto.changesymAuto') === false) {

            this[strat + 'run']() // use the strategy prefix to run the function for the relevent strategy

        }



    }


    // Sparkline rendering


    var color;

    const tradeBarrier = settings.get('tradeBarrier.tradeBarrier')
    var tradeBarrierNo = tradeBarrier * 1;


    // // console.log('This should be a number: '+tradeBarrierNo)




    if (settings.get('callOrPut.callOrPut') == 'PUT' && settings.get('barrier.barrier') != 'no open trade') {
        // console.log('Main If Triggered PUT'+tradeBarrierNo)
        if (tradeBarrierNo == 0) {
            // console.log('No barrier PUT')
            if (lastTick < settings.get('barrier.barrier')) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier')) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }
        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Normal' && tradeBarrierNo != 0) {
            // console.log('Normal barrier PUT')
            if (lastTick < settings.get('barrier.barrier') + tradeBarrierNo) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier') + tradeBarrierNo) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }



        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse' && tradeBarrierNo != 0) {
            // console.log('Inverse barrier PUT')
            if (lastTick < settings.get('barrier.barrier') - tradeBarrierNo) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier') - tradeBarrierNo) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }
        }
    }


    if (settings.get('callOrPut.callOrPut') == 'CALL' && settings.get('barrier.barrier') != 'no open trade') {
        // console.log('Main If Triggered CALL')
        if (tradeBarrierNo == 0) {
            // console.log('No barrier CALL')
            if (lastTick > settings.get('barrier.barrier')) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier')) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }
        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Normal' && tradeBarrierNo != 0) {
            // console.log('Normanl barrier CALL')
            if (lastTick > settings.get('barrier.barrier') - tradeBarrierNo) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier') - tradeBarrierNo) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }



        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse' && tradeBarrierNo != 0) {
            // console.log('Inverse barrier CALL')
            if (lastTick > settings.get('barrier.barrier') + tradeBarrierNo) {

                color = 'green';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier') + tradeBarrierNo) {
                color = 'red'
                document.getElementById('closeL').style.color = 'red';
            }

        }
    }



    //sellingearly functionality

    if (settings.get('sellprofit.sellprofit') != 0 && settings.get('canSell.canSell') == 1) {

        document.getElementById('sell').style.display = '';

        document.getElementById('contractProfit').textContent = settings.get('sellprofit.sellprofit');

        if (settings.get('sellprofit.sellprofit') >= 0) {
            document.getElementById('contractProfit').style.color = '#21ba45';
        } else {
            document.getElementById('contractProfit').style.color = 'red';

        }
    } else {
        document.getElementById('sell').style.display = 'none';


    }
    document.getElementById('closeC').textContent = lastTick;
    document.getElementById('entryC').textContent = settings.get('barrier.barrier');




    if (settings.get('tradeInProgress.tradeInProgress') === false) {

        color = 'orange';
        document.getElementById('closeL').style.color = '';
    }

    //  // console.log('lastvalue:', lastTick);
    //// console.log('entry spot:', settings.get('barrier.barrier'));
    //// console.log(settings.get('callOrPut.callOrPut'));
    //// console.log(settings.get('tradeInProgress.tradeInProgress'));

    $("#sparkline").sparkline(stream, {

        spotColor: color,
        type: 'line',
        width: '100%',
        height: '100%',
        lineColor: color,
        fillColor: '#a0743b40',
        minSpotColor: false,
        maxSpotColor: false,
        spotRadius: 4,
        disableHighlight: true,
        disableTooltips: true,
        drawNormalOnTop: false

    });


    // Moved charting to here to improve efficiency
    /* if (stream != undefined) {

         var streamData = {
             x: times,
             y: stream,
             mode: 'lines+markers',
             connectgaps: true
         };

         var barrierLevel = {
             x: times,
             y: [settings.get('barrier.barrier')],
             mode: 'area',
             connectgaps: true
         };
         if (settings.get('barrier.barrier') != 'no open trade') {
             var data = [streamData, barrierLevel];
         } else {

             var data = [streamData];
         }


         var layout = {
             title: 'Connect the Gaps Between Data',
             showlegend: false
         };

         Plotly.newPlot('tickChart', data, layout, {
             showSendToCloud: false
         });


     }
     */



    if (settings.get('useBBtrader.useBBtrader') || settings.has('useBBtrader.useBBtrader') === false) {

        settings.set('trading.view', false)
        document.getElementById("plotly-div").innerHTML = '';


        chart(function () {
            // // console.log(closelistReverse)
            if (timestampReverse != undefined) {
                var candleycandles = noCandlesOnChart;
                var trace1 = {
                    x: timestampReverse,
                    close: closelistReverse,
                    decreasing: {
                        line: {
                            color: '#c10000',
                            width: 1
                        },
                        fillcolor: '#c10000',
                    },
                    high: highlistReverse,
                    increasing: {
                        line: {
                            color: '#06c100',
                            width: 1
                        },
                        fillcolor: '#06c100',

                    },
                    line: {
                        // color: 'rgba(31,119,180)',
                        width: 1
                    },

                    low: lowlistReverse,
                    open: openlistReverse,
                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                };

                var data = [trace1];

                var options = {
                    scrollZoom: false, // lets us scroll to zoom in and out - works
                    showLink: false, // removes the link to edit on plotly - works
                    modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
                    //modeBarButtonsToAdd: ['lasso2d'],
                    displayLogo: false, // this one also seems to not work
                    displayModeBar: false, //this one does work
                    responsive: true,
                };

                var layout = {

                    autosize: true,



                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',


                    margin: {
                        r: 10,
                        t: 25,
                        b: 40,
                        l: 60
                    },
                    showlegend: false,
                    xaxis: {
                        gridcolor: '#2A314B',
                        gridwidth: 0.5,
                        autorange: true,
                        domain: [0, 1],
                        //range: [settings.get('chartepoch.chartepoch').slice(-99)[0], settings.get(
                        //    'chartepoch.chartepoch').slice(-1)[0]],
                        // rangeslider: {
                        //    range: [settings.get('chartepoch.chartepoch').slice(-99)[0], settings.get(
                        //        'chartepoch.chartepoch').slice(-1)[0]]
                        //  },
                        title: 'Time (Resolution is ' + candleycandles + ' Candles)',
                        type: 'time',
                        tickangle: 45,
                        tickfont: {
                            size: 8,
                            color: 'orange'
                        },
                        dtick: 5,
                        linewidth: 0.5,
                        linecolor: '#2A314B',
                        rangeslider: {
                            visible: false
                        }
                    },
                    yaxis: {
                        gridcolor: '#2A314B',
                        gridwidth: 0.5,
                        autorange: true,
                        domain: [0, 1],
                        linewidth: 0.5,
                        linecolor: '#2A314B',
                        range: [Math.min(lowlistReverse), Math.max(highlistReverse)],
                        type: 'linear',
                        tickfont: {
                            size: 8,
                            color: 'orange'
                        }
                    }
                };


                Plotly.newPlot('plotly-div', data, layout, options);
            }
        });
    } else {

        if (settings.get('trading.view') === false && settings.has('trading.view')) {
            document.getElementById("plotly-div").innerHTML = `<iframe name="tradingview" src="https://tradingview.binary.me/v1.3.12/main.html" align="right" width="95%" frameborder="0" scrolling="auto"class="iframe-area">
        </iframe>`

            settings.set('trading.view', true)
        }

    }

}

function chart(chartCallback) {


    // // console.log('Recingifuring for plot :' + closelistReverse)
    // // console.log('Timestamp why you no work!!? :' + timeStamp)
    if (timeStamp != undefined) {

        closelistReverse = Rxlong_close_list.slice(301 - noCandlesOnChart, -1);
        highlistReverse = Rxlong_high_list.slice(301 - noCandlesOnChart, -1);
        openlistReverse = Rxlong_open_list.slice(301 - noCandlesOnChart, -1);
        lowlistReverse = Rxlong_low_list.slice(301 - noCandlesOnChart, -1);
        timestampReverse = timeStamp.slice(301 - noCandlesOnChart);


        chartCallback()


    }

}