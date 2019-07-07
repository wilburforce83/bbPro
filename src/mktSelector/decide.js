// function for selecting which market selector to use!
var timeUntilTrading;

function decide() {

    if (settings.get('changesymAuto.changesymAuto') && settings.get('lockauto.lockauto') == 0) {

        timeUntilTrading = settings.get('timeUntilTrading.Open')

        timeUntilTrading++

        settings.set('timeUntilTrading.Open', timeUntilTrading);

        if (settings.get('forex.forex')) {

            decideFX()

        } else {

            decideVIX()

        }


    } else {

        settings.set('timeUntilTrading.Open', 0);
    }


}