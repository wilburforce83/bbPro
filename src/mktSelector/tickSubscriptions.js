// subscriptions

var R_10raw;
var R_25raw;
var R_50raw;
var R_75raw;
var R_100raw;
var RDBULLraw;
var RDBEARraw;

var R_10;
var R_25;
var R_50;
var R_75;
var R_100;
var RDBULL;
var RDBEAR;


function startSubs() {
    // Subscribe to R_10
    api.getTickHistory('R_10', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        R_10raw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to R_25
    api.getTickHistory('R_25', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        R_25raw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to R_50
    api.getTickHistory('R_50', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        R_50raw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to R_75
    api.getTickHistory('R_75', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        R_75raw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to R_100
    api.getTickHistory('R_100', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        R_100raw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to RDBEAR
    api.getTickHistory('RDBEAR', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        RDBEARraw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });

    // Subscribe to RDBULL
    api.getTickHistory('RDBULL', {
        end: 'latest',
        style: 'ticks',
        count: 5000,
        subscribe: 1
    }).then(function (response) {
        RDBULLraw = response.history.prices;
    }).catch(function (error) {
        let string = error.message;
        let position = string.indexOf(`{`);
        let errmessage = string.slice(0, position - 1);
        console.log(errmessage);
        return;
    });
}










function charting(market, dataset) {

    //console.log(market, ticks.slice(-1))
    // common sparkline function to be run on each tick subscription event

    ticks = dataset
    lastSecond = lastEpoch % 60;
    // Sparkline rendering
    var lastTick = ticks.slice(-1)

    document.getElementById('sparklineSym').textContent = market;

    // Sparkline rendering

    var normalRange = lastTick;
    var normalRange2 = lastTick;

    var color;
    var barrierColour;
    var drawontop = false;
    renderSparkline = false;

    if (settings.get('tradeInProgress.tradeInProgress') === false) {

        color = 'orange';
        barrierColour = '#ffff';
        drawontop = false;
    }


    const tradeBarrier = settings.get('tradeBarrier.tradeBarrier')
    var tradeBarrierNo = tradeBarrier * 1;



    if (settings.get('callOrPut.callOrPut') == 'PUT' && settings.get('barrier.barrier') !=
        'no open trade') {
        normalRange = lastTick;
        normalRange2 = lastTick;

        barrierColour = '#ffff';
        drawontop = false;
        // console.log('Main If Triggered PUT'+tradeBarrierNo)
        if (tradeBarrierNo == 0) {
            // console.log('No barrier PUT')
            if (lastTick < settings.get('barrier.barrier')) {

                color = 'green';
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));
                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier')) {
                color = 'red'
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));
                barrierColour = '#EEB5B540';
                document.getElementById('closeL').style.color = 'red';
            }
        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Normal' && tradeBarrierNo != 0) {
            // console.log('Normal barrier PUT')
            if (lastTick < settings.get('barrier.barrier') + tradeBarrierNo) {

                color = 'green';
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));
                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier') + tradeBarrierNo) {
                color = 'red'
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));
                barrierColour = '#EEB5B540';
                document.getElementById('closeL').style.color = 'red';
            }



        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse' && tradeBarrierNo != 0) {
            // console.log('Inverse barrier PUT')
            if (lastTick < settings.get('barrier.barrier') - tradeBarrierNo) {

                color = 'green';
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));
                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick > settings.get('barrier.barrier') - tradeBarrierNo) {
                color = 'red'
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));
                barrierColour = '#EEB5B540';
                document.getElementById('closeL').style.color = 'red';
            }
        }
    }


    if (settings.get('callOrPut.callOrPut') == 'CALL' && settings.get('barrier.barrier') !=
        'no open trade') {

        normalRange = lastTick;
        normalRange2 = lastTick;
        barrierColour = '#ffff';
        drawontop = false;
        // console.log('Main If Triggered CALL')
        if (tradeBarrierNo == 0) {
            // console.log('No barrier CALL')
            if (lastTick > settings.get('barrier.barrier')) {

                color = 'green';
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));

                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier')) {
                color = 'red'
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));

                barrierColour = '#EEB5B540';
                document.getElementById('closeL').style.color = 'red';
            }
        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Normal' && tradeBarrierNo != 0) {
            // console.log('Normanl barrier CALL')
            if (lastTick > settings.get('barrier.barrier') - tradeBarrierNo) {

                color = 'green';
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));

                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier') - tradeBarrierNo) {
                color = 'red'
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));

                barrierColour = '#EEB5B540';
                document.getElementById('closeL').style.color = 'red';
            }



        } else if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse' && tradeBarrierNo != 0) {
            // console.log('Inverse barrier CALL')
            if (lastTick > settings.get('barrier.barrier') + tradeBarrierNo) {

                color = 'green';
                normalRange2 = settings.get('barrier.barrier');
                normalRange = Math.max(...ticks.slice(-90));

                barrierColour = '#C6ECC940';
                document.getElementById('closeL').style.color = 'green';

            } else if (lastTick < settings.get('barrier.barrier') + tradeBarrierNo) {
                color = 'red'
                normalRange = settings.get('barrier.barrier');
                normalRange2 = Math.min(...ticks.slice(-90));

                barrierColour = '#EEB5B540';
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

    $("#sparkline").sparkline(ticks.slice(-90), {

        spotColor: color,
        type: 'line',
        width: '100%',
        height: '100%',
        lineColor: color,
        fillColor: '#BABABA40',
        minSpotColor: '#C90000',
        maxSpotColor: '#002AB3',
        spotRadius: 2,
        disableHighlight: true,
        disableTooltips: true,
        normalRangeMax: normalRange,
        normalRangeMin: normalRange2,
        normalRangeColor: barrierColour,
        drawNormalOnTop: drawontop

    });

};