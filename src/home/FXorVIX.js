// Keeping dashboard up to date with FX or VIX details

// Moved form home.HTML to tidy up


function setMarketBtn() {

    if (settings.get('forex.forex')) {

        $('#setFX').addClass('disabled');
        $('#setFX').addClass('green');
        $('#setVIX').removeClass('disabled');
        $('#setVIX').removeClass('green');
        document.getElementById('symbolclass').style.display = 'none';
        document.getElementById('symbolclassFX').style.display = '';

        if (settings.get('initialStake.initialStake') < "0.50") {

            settings.set('initialStake.initialStake', "0.50");
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#01a7ba">Initial Stake changed to 0.50. Stake was not enough to meet Forex minimum. please press RESET to update the bot</p>');

            //  settings.set('message.message', 'Initial Stake changed to 0.50. Stake was not enough to meet Forex minimum. please press RESET to update the bot')
        }

        //    document.getElementById('symbolclassFX2').style.display = '';



    } else {

        $('#setVIX').addClass('disabled');
        $('#setVIX').addClass('green');
        $('#setFX').removeClass('disabled');
        $('#setFX').removeClass('green');
        document.getElementById('symbolclass').style.display = '';
        document.getElementById('symbolclassFX').style.display = 'none';
        //  document.getElementById('symbolclassFX2').style.display = 'none';

    }


}