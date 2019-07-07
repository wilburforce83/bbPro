// A backtesting function for running all strategies. Fuck knows how I am going to do it!!

// First get a feed of all of all ticks, and all candles:


// get tick history - for use in getting trade entry and exit results

var tickTimes;
var tickPrices;
var candles;


function backtest() {
    api.getTickHistory(settings.get('symbol.symbol'), {
        end: 'latest',
        style: 'ticks',
        count: 3600
    }).then(function (response) {
        tickPrices = response.history.prices;
        tickTimes = response.history.times;
        
      

        // console.log(lastSecond);

    });
    api.getTickHistory(settings.get('symbol.symbol'), {
        end: 'latest',
        style: 'candles',
        count: 150
    }).then(function (response) {
        
        candles = response.candles;

        // console.log(lastSecond);

    });




    
}


    