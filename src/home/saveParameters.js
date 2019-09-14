function saveParametersOnClick() {



    if (settings.get('initialStake.initialStake') == settings.get('stake.stake')) {

        settings.set('stake.stake', document.getElementById('setStake').value);
    }

    settings.set('initialStake.initialStake', document.getElementById('setStake').value *1);

    settings.set('takeProfit.takeProfit', document.getElementById('setTakeProfit').value);
    settings.set('stopLoss.stopLoss', document.getElementById('setStopLoss').value);
    settings.set('trailingStop.trailingStop', document.getElementById('setTrailingStop').value);
    settings.set('autothresh.autothresh', document.getElementById('setautolimit').value);
    settings.set('mgreset.mgreset', document.getElementById('mgreset').value);
    settings.set('manualDuration.manualDuration', document.getElementById('durationInt').value);



    if (settings.get('run.run') === false || settings.get('autoTrade.autoTrade') === false) {
        let duration = settings.get('manualDuration.manualDuration') * 1;
        let duration_unit = settings.get('manualDuration_unit.manualDuration_unit');

        var convertedDuration = duration;
        if (duration_unit == 'm') {

            convertedDuration = duration * 60;
        }

        if (duration_unit == 't') {

            convertedDuration = duration * 2;
        }



        settings.set('message.message', 'Ready to place manual trade. Trade duration set to ' + convertedDuration +
            ' seconds')

    }





}