// function for selecting which market selector to use!
var timeUntilTrading;

function decide() {

    if (settings.get('changesymAuto.changesymAuto') && settings.get('lockauto.lockauto') == 0) {

        timeUntilTrading = settings.get('timeUntilTrading.Open')

        timeUntilTrading++

        settings.set('timeUntilTrading.Open', timeUntilTrading);

        //temp pause trading during transition between markets

        settings.set('autoTrade', {
            autoTrade: false,

        })

        setTimeout(function () {

            if (settings.get('forex.forex')) {

                decideFX()

            } else {

                decideVIX()

            }

        }, 2000);

        setTimeout(function () {

            settings.set('autoTrade', {
                autoTrade: true,

            })


        }, 2000);


    } else {

        settings.set('timeUntilTrading.Open', 0);
    }


}