// Check last result after error and handle results
//
//

function checkOnError() {

    let token = settings.get('tokenToBeUsed.tokenToBeUsed');
    api.authorize(token).then(function resolve(resp) {
        api.getStatement({
            "statement": 1,
            "description": 1,
            "limit": 1
        }).then(function (response) {
            //console.log(response);
            console.log(response);
            let closeTransactionDetail = response.statement.transactions;
            let balance = response.statement.transactions.map(transactions => transactions.balance_after * 1);
            let sellAmount = response.statement.transactions.map(transactions => transactions.amount * 1);

            console.log('Close Transaction Obj: ', closeTransactionDetail);


            settings.set('balanceOnClose', {
                balanceOnClose: balance.slice(-1)[0],

            })

            settings.set('resultOnClose', {
                resultOnClose: sellAmount.slice(-1)[0],

            })

            settings.set('balance', {
                balance: balance.slice(-1)[0],

            })
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log('Balance: ', settings.get('balanceOnClose.balanceOnClose'), 'Sell Amount: ', settings.get('resultOnClose.resultOnClose'));
            settings.set('message.message', time + ' : ' + settings.get('callOrPut.callOrPut') + ' contract sold for ' + settings.get('resultOnClose.resultOnClose'));
            postError();
        })
    })




};


function postError() {
    // Run post trade calculations for martingale and and stats
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // win and loss count calculations

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        let wins = settings.get('wins.wins');
        let winsInRow = settings.get('consecutiveWins.consecutiveWins');

        wins++;
        winsInRow++;

        settings.set('wins.wins', wins);
        settings.set('consecutiveLosses.consecutiveLosses', 0);
        settings.set('consecutiveWins.consecutiveWins', winsInRow);
        settings.set('autoTrade.autoTrade', true);
        settings.set('cumLoss.cumLoss', 0);
        console.log('win count : ', settings.get('wins.wins'));
        console.log('loss count : ', settings.get('losses.losses'));
        console.log('wins in a row : ', settings.get('consecutiveWins.consecutiveWins'));

        /*
                // Martingale options
                if (settings.get('MGstyle.MGstyle') === "Classic") {

                    errorbasicMartingale();
                }

                if (settings.get('MGstyle.MGstyle') === "Cum. Loss") {

                    errorcumLossMartingale();
                }

                if (settings.get('MGstyle.MGstyle') === "Ladder") {

                    errorladderMartingale();
                }
        */

    } else {

        let losses = settings.get('losses.losses');
        let lossesInRow = settings.get('consecutiveLosses.consecutiveLosses');
        losses++;
        lossesInRow++;
        settings.set('consecutiveLosses.consecutiveLosses', lossesInRow);

        let lastLoss = Math.abs(settings.get('buyOnOpen.buyOnOpen'));
        let cumLoss = settings.get('cumLoss.cumLoss') + lastLoss;




        settings.set('losses.losses', losses);
        settings.set('consecutiveWins.consecutiveWins', 0);
        settings.set('cumLoss.cumLoss', Math.ceil(cumLoss * 1000) / 1000);


        console.log('loss count : ', settings.get('losses.losses'));
        console.log('win count : ', settings.get('wins.wins'));
        console.log('losses in a row : ', settings.get('consecutiveLosses.consecutiveLosses'));







    }

    // calculate max consecutive wins and losses

    if (settings.get('consecutiveLosses.consecutiveLosses') > settings.get('maxConLosses.maxConLosses')) {

        settings.set('maxConLosses.maxConLosses', settings.get('consecutiveLosses.consecutiveLosses'));

    }

    if (settings.get('consecutiveWins.consecutiveWins') > settings.get('maxConWins.maxConWins')) {

        settings.set('maxConWins.maxConWins', settings.get('consecutiveWins.consecutiveWins'));

    }


    // win rate calculation
    // round 2 dp ( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    // Math.floor(wins / ((wins + losses) * 100)*1000)/1000

    let winrate = settings.get('wins.wins') / (settings.get('wins.wins') + settings.get('losses.losses')) * 100;

    settings.set('winRate.winRate', Math.floor(winrate * 100) / 100);

    console.log('win rate : ', settings.get('winRate.winRate'), '%');


    let contractProfit = (settings.get('buyOnOpen.buyOnOpen') + settings.get('resultOnClose.resultOnClose'));

    settings.set('contractProfit.contractProfit', contractProfit);




    // change profit for session

    let profitChange = settings.get('profit.profit') + (settings.get('buyOnOpen.buyOnOpen') + settings.get('resultOnClose.resultOnClose'));

    settings.set('profit', {
        profit: Math.floor(profitChange * 100) / 100,

    })



    if (settings.get('profit.profit') > settings.get('peakProfit.peakProfit')) {

        settings.set('peakProfit.peakProfit', settings.get('profit.profit'));

    } else if (settings.get('profit.profit') < settings.get('peakLoss.peakLoss')) {

        settings.set('peakLoss.peakLoss', settings.get('profit.profit'));
    }


    // MG reset settings
    if (settings.get('mgreset.mgreset') > 0) {

        if (settings.get('mgreset.mgreset') <= settings.get('consecutiveLosses.consecutiveLosses')) {




            settings.set('stake.stake', settings.get('initialStake.initialStake'));
            settings.set('consecutiveLosses.consecutiveLosses', 0);
            settings.set('message.message', 'Martingale Reset');



        }
    }
    // Martingale options

    if (settings.get('MGstyle.MGstyle') === "Classic") {

        errorbasicMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Cum. Loss") {

        errorcumLossMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Ladder") {

        errorladderMartingale();
    }


    //Manualtradeoveride

    if (settings.get('autothresh.autothresh') > 0) {

        if (settings.get('autolimit.autolimit') && settings.get('consecutiveLosses.consecutiveLosses') >= settings.get('autothresh.autothresh')) {

            if (settings.get('changesymAuto.changesymAuto')) {
                settings.set('wasOnAuto.wasOnAuto', true);
                settings.set('changesymAuto.changesymAuto', false);
            }


            settings.set('autoTrade', {
                autoTrade: false,

            })
            settings.set('message', {
                message: time + ': Manual trading. Automarket disabled',

            })

            settings.get('changesymAuto.changesymAuto', false)

        } else if (settings.get('run.run')) {

            if (settings.get('wasOnAuto.wasOnAuto')) {
                settings.set('changesymAuto.changesymAuto', true);

            }

            settings.set('autoTrade', {
                autoTrade: true,

            })




        }
    }



    //open up trading after last trade is completed

    settings.set('placeCall', {
        placeCall: false,

    })
    settings.set('placePut', {
        placePut: false,

    })
    settings.set('tradeInProgress', {
        tradeInProgress: false,

    })

    // Take Profit Stop

    if (settings.get('profit.profit') > settings.get('takeProfit.takeProfit')) {

        settings.set('run', {
            run: false,

        })

        settings.set('autoTrade', {
            autoTrade: false,

        })
        settings.set('message', {
            message: time + ' : Target profit Hit!',

        })
    }

    // StopLoss!!!

    if (settings.get('profit.profit') + (settings.get('stake.stake')) * -1 < (settings.get('stopLoss.stopLoss')) * -1) {

        settings.set('run', {
            run: false,

        })

        settings.set('autoTrade', {
            autoTrade: false,

        })
        settings.set('message', {
            message: time + ' : Stop Loss Hit!',

        })
    }

    if (settings.get('stake.stake') > settings.get('peakStake.peakStake')) {

        settings.set('peakStake.peakStake', settings.get('stake.stake'));
    }





} // End of Post Trade



// basic martingale for money management

function errorbasicMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        let stake = settings.get('initialStake.initialStake');

        settings.set('stake.stake', stake);


    } else {

        let stake = settings.get('stake.stake') * 2.36;

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
    }

}



// cumLoss martingale for money management || fixed return of initial stake per loss

function errorcumLossMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        let stake = settings.get('initialStake.initialStake');

        settings.set('stake.stake', stake);


    } else {

        let cumStake = (settings.get('cumLoss.cumLoss') + (Math.abs(settings.get('initialStake.initialStake')) * settings.get('consecutiveLosses.consecutiveLosses'))) / 0.915;

        settings.set('stake.stake', Math.floor(cumStake * 100) / 100);
    }

}









//ladder Martingale calculations


function errorladderMartingale() {



    let ladderProfit = settings.get('ladderProfit.ladderProfit') + settings.get('contractProfit.contractProfit');

    settings.set('ladderProfit.ladderProfit', Math.floor(ladderProfit * 100) / 100);




    if (settings.get('ladderProfit.ladderProfit') > settings.get('initialStake.initialStake') * 3.5) {

        let stake = settings.get('initialStake.initialStake');

        settings.set('stake.stake', stake);

        let laddersCompleted = settings.get('laddersCompleted.laddersCompleted');

        laddersCompleted++;

        settings.set('laddersCompleted.laddersCompleted', laddersCompleted);

        settings.set('ladderLevel.ladderLevel', 0);

        settings.set('ladderProfit.ladderProfit', 0);

    } else {

        let ladderLevel = settings.get('ladderLevel.ladderLevel');

        ladderLevel++;
        settings.set('ladderLevel.ladderLevel', ladderLevel);


        let stake = settings.get('stake.stake') * 1.05;

        settings.set('stake.stake', Math.ceil(stake * 100) / 100);

    }

}