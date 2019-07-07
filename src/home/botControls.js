function startBot() {
    var strat = settings.get('strat.strat');
    //settings.set('message.message', 'Auto Trading Started'); 
    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Trading Started</p>');

    if (settings.get('autothresh.autothresh') > 0 && settings.get('autoTrade.autoTrade')) {

        if (settings.get('autolimit.autolimit') && settings.get('consecutiveLosses.consecutiveLosses') >= settings.get('autothresh.autothresh')) {

            if (settings.get('strat.strat') != 'manual') {
                settings.set('autoStrat.autoStrat', settings.get('strat.strat'));

            }

            settings.set('strat.strat', 'manual');
            strat = 'manual';
            let duration = settings.get('manualDuration.manualDuration') * 1;
            let duration_unit = settings.get('manualDuration_unit.manualDuration_unit');

            var convertedDuration = settings.get('manualDuration.manualDuration') * 1;

            if (duration_unit == 'm') {

                convertedDuration = duration * 60;
            }

            if (duration_unit == 't') {

                convertedDuration = duration * 2;
            }
            let autostrat = settings.get('autoStrat.autoStrat');
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Strat : ' + autostrat + ' will resume after your next winning trade..</p>');

            settings.set('message.message', 'Ready to place manual trade. Trade duration set to ' + convertedDuration + ' seconds')

        }


    } else {

        settings.set('autoTrade.autoTrade', true)

    }

    settings.set('run', {
        run: true,


    })
    settings.set('tradeInProgress', {
        tradeInProgress: false,

    })
    settings.set('lockauto', {
        lockauto: 0,
    })

    settings.set('barrier.barrier', 'no open trade');
    if (settings.get('strat.strat') == 'manual') {

        settings.set('strat.strat', settings.get('autoStrat.autoStrat'));

    }




    console.log('bot run status: ', settings.get('run.run'));
    console.log('auto-trade status: ', settings.get('autoTrade.autoTrade'));
}

function pauseBot() {

    if (settings.get('strat.strat') != 'manual') {
        settings.set('autoStrat.autoStrat', settings.get('strat.strat'));
    }
    let autostrat = settings.get('autoStrat.autoStrat');
    settings.set('strat.strat', 'manual');

    var strat = settings.get('strat.strat');
    settings.set('run', {
        run: false,

    })
    //settings.set('message.message', 'Auto Trading Paused');
    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Strat : ' + autostrat + ' is paused. Press play to resume auto-trading.</p>');


    settings.set('tradeInProgress', {
        tradeInProgress: false,

    })
    settings.set('lockauto', {
        lockauto: 0,
    })
    strat = settings.get('strat.strat');
    let duration = settings.get('manualDuration.manualDuration') * 1;
    let duration_unit = settings.get('manualDuration_unit.manualDuration_unit');

    var convertedDuration = settings.get('manualDuration.manualDuration') * 1;

    if (duration_unit == 'm') {

        convertedDuration = duration * 60;
    }

    if (duration_unit == 't') {

        convertedDuration = duration * 2;
    }
    settings.set('message.message', 'Ready to place manual trade. Trade duration set to ' + convertedDuration + ' seconds')

    console.log('bot run status: ', settings.get('run.run'));
}
/* Depricated 
function tickStream() {
    api.getTickHistory(settings.get('symbol.symbol'), {
        end: 'latest',
        style: 'ticks',
        count: 30
    }).then(function (response) {
        let stream = response.history.prices;
        let lastEpoch = response.history.times.slice(-1)[0] * 1;
        let lastSecond = lastEpoch % 60;
        settings.set('stream.stream', stream)
        settings.set('epoch.epoch', lastSecond);
        settings.set('lastValue.lastValue', response.history.prices.slice(-1)[0] * 1)

        // console.log(lastSecond);

    });
}
*/

function manualCall() {

    if (settings.get('strat.strat') != 'manual') {
        settings.set('autoStrat.autoStrat', settings.get('strat.strat'));
    }

    settings.set('strat.strat', 'manual');

    if ((settings.get('autoTrade.autoTrade') === false) || (settings.get(
        'tradeInProgress.tradeInProgress') === false)) {

        settings.set('callOrPut', {
            callOrPut: 'CALL',
            //  tradeInProgress: true

        })
        settings.set('tradeInProgress', {
            tradeInProgress: true,
            //  tradeInProgress: true

        })
        console.log('Attempting to place Call Trade: ', settings.get('callOrPut.callOrPut'));
        settings.set('message.message', 'Placing CALL trade');
        trade();
    } else {
        dialog.showMessageBox(tradeDialogBox);
        console.log(
            'You cannot trade manually while the bot is running in Auto-trade, or while a trade is already in progress'
        );

    }

}


function manualPut() {

    if (settings.get('strat.strat') != 'manual') {
        settings.set('autoStrat.autoStrat', settings.get('strat.strat'));
    }

    settings.set('strat.strat', 'manual');

    if ((settings.get('autoTrade.autoTrade') === false) || (settings.get(
        'tradeInProgress.tradeInProgress') === false)) {

        settings.set('callOrPut', {
            callOrPut: 'PUT',


        })
        settings.set('tradeInProgress', {
            tradeInProgress: true,


        })
        console.log('Attempting to place Put Trade: ', settings.get('callOrPut.callOrPut'));
        settings.set('message.message', 'Placing PUT trade');
        trade();
    } else {
        dialog.showMessageBox(tradeDialogBox);
        console.log(
            'You cannot trade manually while the bot is running in Auto-trade, or while a trade is already in progress'
        )

    }

}