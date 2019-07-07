// Keeping dashboard up to date with live or virtual token details

// Moved form home.HTML to tidy up


function setAccountBtn() {

    if (settings.get('liveToken.liveToken') === settings.get('tokenToBeUsed.tokenToBeUsed')) {

        $('#setLive').addClass('disabled');
        $('#setLive').addClass('green');
        $('#setVirt').removeClass('disabled');
        $('#setVirt').removeClass('green');

    } else {

        $('#setVirt').addClass('disabled');
        $('#setVirt').addClass('green');
        $('#setLive').removeClass('disabled');
        $('#setLive').removeClass('green');

    }


}


document.getElementById('setVirt').addEventListener('click', function (event) {

    settings.set('tokenToBeUsed.tokenToBeUsed', settings.get('virtualToken.virtualToken'));


    authorise();
})



document.getElementById('setLive').addEventListener('click', function (event) {

    settings.set('tokenToBeUsed.tokenToBeUsed', settings.get('liveToken.liveToken'));

    authorise();
})