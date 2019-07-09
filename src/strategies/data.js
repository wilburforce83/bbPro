var stream;
var switched = true;
var lastTick;
var tick;
var ticks;
var lastEpoch;
var lastSecond;
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
        count: 100
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



    if (switched === true) {

        tick = [];
        ticks = [];
        console.log('switched')

        api.getTickHistory(settings.get('symbol.symbol'), {
            end: 'latest',
            style: 'ticks',
            count: 120

        }).then(function (response) {

            // // console.log(response);

            tick = response.history.prices;
            ticks = tick.map(tick => tick * 1);


            times = response.history.times.slice(-60, -1)

            lastTick = response.history.prices.slice(-1)[0] * 1;
            lastEpoch = response.history.times.slice(-1)[0] * 1;
            // console.log(response.history.times)
            lastSecond = lastEpoch % 60;

            settings.set('epoch.epoch', lastSecond);

            settings.set('tickData', {
                tickList: ticks,
                lastTick: lastTick

            });
            renderSparkline = true;

        }).catch(function (error) {

            let string = error.message;
            let position = string.indexOf(`{`);
            let message = string.slice(0, position - 1);
            //var pos = string.indexOf('{')-1
            // var message = string.substring(0,pos);
            console.log(error.message);
            // // console.log(position);
            // document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
            //    '<p style="color:#755505">' + message + '</p>');
            return;

        })

        switched = false;
    } else {

        api.getTickHistory(settings.get('symbol.symbol'), {
            end: 'latest',
            style: 'ticks',
            count: 1
        }).then(function (response) {

            // console.log(response);

            tick = response.history.prices * 1;
            // ticks.push(response.history.prices * 1);
            times.push(response.history.times);

            ticks.push(response.history.prices * 1)


            // console.log(tick);
            lastTick = tick * 1;
            lastEpoch = response.history.times * 1;
            // console.log(response.history.times)
            lastSecond = lastEpoch % 60;
            if (ticks != undefined) {
                stream = ticks.slice(-90);
            }
            renderSparkline = true;
            settings.set('epoch.epoch', lastSecond);



        }).catch(function (error) {

            let string = error.message;
            let position = string.indexOf(`{`);
            let errmessage = string.slice(0, position - 1);

            console.log(error.message);

            return;

        })


    }





    //  // console.log(settings.get('tickData.tickList'));

    if (strat == 'manual') {

        //   // console.log('waitingfortrade')

    } else {
        console.log('this.run')
        this[strat + 'run']() // use the strategy prefix to run the function for the relevent strategy

    }

}