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


    // Sparkline rendering move to event.on


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


}