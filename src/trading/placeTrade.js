//Add constants for all other JS files here to keep html file clean

var LiveApi = require('binary-live-api').LiveApi;
var ws = require('ws');

var api = new LiveApi({
    websocket: ws,
    appId: 18970
});



var billyDate;
var billyDay;
var billyTime;
var billyStrat;
var billyDuration;
var billyCallPut;
var billyMarket;
var billyStake;
var billyWinLoss;
var billyPL;
var billyAccount;
var billyDataSource;
var billybigData
var barrier;
var parameters;
var date_expiry;
var current_spot_time;

var trading = 0;

function authorise() {

    trading = 0;

    let token = settings.get('tokenToBeUsed.tokenToBeUsed');
    api.authorize(token).then(function (response) {
        // // console.log(response);

        let authorize = response.authorize;
        let balance = response.authorize.balance * 1;
        let currency = response.authorize.currency;
        let loginId = response.authorize.loginid;
        billyAccount = loginId;
        api.subscribeToBalance();

        //  // console.log('authorize Obj: ', authorize);


        settings.set('balance', {
            balance: balance,

        })

        settings.set('currency', {
            currency: currency,

        })

        settings.set('loginid', {
            loginid: loginId,

        })

        //  // console.log('Balance: ', settings.get('balance.balance'), 'currency: ', settings.get('currency.currency'), 'login Id: ', settings.get('loginid.loginid'));








    }).catch(function (error) {

        let string = error.message;
        let position = string.indexOf(`{`);
        let message = string.slice(0, position - 1);
        //var pos = string.indexOf('{')-1
        // var message = string.substring(0,pos);
        // console.log(error.message);
        // // console.log(position);
        document.getElementById('notifyme').insertAdjacentHTML("afterbegin",
            '<p style="color:#755505">' + message + '</p>');

    })

}





function trade() {
    var noOfTrades = (settings.get('wins.wins') * 1 + settings.get('losses.losses') * 1);
    var switchID = noOfTrades % 4;
    preTradeBackup();
    settings.set('lockauto.lockauto', 1);
    var result;
    var contractProfit = 0;
    var buy_price;
    var payout;

    var isSold = 0;

    if (trading == 0) {



        // Places a trade, used for all types of trades auto or manual.

        trading = 1;
        isSold = 0;
        const strat = settings.get('strat.strat')
        if (settings.get('callOrPut.callOrPut') == 'CALL' && settings.get('tradeBarrier.tradeBarrier') > 0) {

            if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse') {
                barrier = '+' + Math.abs(settings.get('tradeBarrier.tradeBarrier'));
            } else {
                barrier = JSON.stringify(-Math.abs(settings.get('tradeBarrier.tradeBarrier')));
            }
        } else {

            if (settings.get('inverseBarrier.inverseBarrier') == 'Inverse') {
                barrier = JSON.stringify(-Math.abs(settings.get('tradeBarrier.tradeBarrier')));
            } else {
                barrier = '+' + Math.abs(settings.get('tradeBarrier.tradeBarrier'));
            }


        }

        const signal = settings.get('symbol.symbol')
        let token = settings.get('tokenToBeUsed.tokenToBeUsed');
        let duration = settings.get(strat + 'Duration.' + strat + 'Duration') * 1;
        let duration_unit = settings.get(strat + 'Duration_unit.' + strat + 'Duration_unit');
        const signalDuration = settings.get(signal + 'frxDuration,frxDuration')
        const signalDurationUnit = settings.get(signal + 'frxDurationUnit,frxDurationUnit')
        var convertedDuration = settings.get(strat + 'Duration.' + strat + 'Duration') * 1;
        var convertedSymDuration;


        billyStrat = settings.get('multistratName.multistratName');
        billyMarket = signal;
        billyDataSource = settings.get('multiCandleOrTick.multiCandleOrTick');

        if (signalDurationUnit == 'm') {

            convertedSymDuration = signalDuration * 60;
        }

        if (signalDurationUnit == 't') {

            convertedSymDuration = signalDuration * 2;
        }
        if (duration_unit == 'm') {

            convertedDuration = duration * 60;
        }

        if (duration_unit == 't') {

            convertedDuration = duration * 2;
        }

        billyDuration = convertedDuration;
        billyStake = settings.get('stake.stake')
        billyCallPut = settings.get('callOrPut.callOrPut')

        // console.log('minimum Duration ' + convertedSymDuration + 's  |  trade duration set to ' + convertedDuration + 's')

        if (settings.get('tradeBarrier.tradeBarrier') > 0) {
            parameters = {
                amount: settings.get('stake.stake'),
                basis: 'stake', // or 'stake'
                contract_type: billyCallPut, // or 'CALL'
                currency: settings.get('currency.currency'),
                duration: duration,
                barrier: barrier,
                duration_unit: duration_unit,
                symbol: signal,
            };
        } else {

            parameters = {
                amount: settings.get('stake.stake'),
                basis: 'stake', // or 'stake'
                contract_type: billyCallPut, // or 'CALL'
                currency: settings.get('currency.currency'),
                duration: duration,
                duration_unit: duration_unit,
                symbol: signal,
            };



        }

        if (convertedDuration >= convertedSymDuration) {





            api.buyContractParams(parameters, 2500).then(

                (response, reject) => {
                    //  // console.log(response);
                    let time = moment().format("kk:mm:ss");
                    let contract_id = response.buy.contract_id;
                    let longCode = response.buy.longcode;
                    let newBalance = response.buy.balance_after;
                    //  // console.log(response.buy.buy_price);
                    settings.set('contractid.contractid', contract_id);

                    settings.set('message.message', time + ' : ' + longCode);
                    settings.set('balance', {
                        balance: newBalance,
                    });

                    var convertedDurationPLUS = convertedDuration + 10;
                    var tradeDurationPLUS = 0;
                    var timer = setInterval(contractSub, 2000);

                    function contractSub() {
                        if (isSold == 1 || tradeDurationPLUS > convertedDurationPLUS) {
                            //  // console.log(payout, buy_price, contractProfit, sellPrice);

                            // // console.log('sold')
                            //  // console.log('Result = ', profit)
                            let time = moment().format("kk:mm:ss");
                            billyDate = moment().format("l");
                            billyDay = moment().format("dddd");
                            if (contractProfit > 0) {
                                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#27b700">' + time + ': Contract ' + result + '!  ' + contractProfit + '</p>');

                            } else {
                                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">' + time + ': Contract ' + result + '!  ' + contractProfit + '</p>');

                            }
                            //settings.set('message.message', time + ': Contract ' + result + '!  ' + contractProfit);
                            //  settings.set('resultOnClose.resultOnclose', )
                            settings.set('resultOnClose.resultOnClose', contractProfit)
                            billyPL = contractProfit;
                            billyTime = time;
                            settings.set('barrier.barrier', 'no open trade');
                            settings.set('contractid.contractid', null);
                            settings.set('sellprofit.sellprofit', 0);
                            settings.set('canSell.canSell', 0);
                            document.getElementById('expiryTime').innerHTML = '';
                            clearInterval(timer);
                            postTrade();

                            return;

                        }
                        tradeDurationPLUS += 2;
                        api.getContractInfo(contract_id).then(function (response) {
                            //  // console.log(response.proposal_open_contract);
                            // // console.log(tradeDurationPLUS);

                            isSold = response.proposal_open_contract.is_sold;
                            result = response.proposal_open_contract.status;
                            contractProfit = response.proposal_open_contract.profit * 1;
                            sellPrice = response.proposal_open_contract.sell_price * 1;
                            payout = response.proposal_open_contract.payout * 1;
                            buy_price = response.proposal_open_contract.buy_price * 1;
                            date_expiry = (response.proposal_open_contract.date_expiry + 2) * 1000;
                            current_spot_time = response.proposal_open_contract.current_spot_time * 1000;
                            let timeToExpiry = moment(date_expiry).diff(current_spot_time, seconds) / 1000
                            settings.set('barrier.barrier', response.proposal_open_contract.entry_spot * 1);
                            settings.set('sellprofit.sellprofit', contractProfit);
                            settings.set('canSell.canSell', response.proposal_open_contract.is_valid_to_sell * 1)
                            //  // console.log('Expiry: ' + timeToExpiry + 's')
                            document.getElementById('expiryTime').innerHTML = '<h1 style="color:#0000001A">' + timeToExpiry + 's</h1>';




                        })


                        // startStatement();



                    }



                    //  reject(new Error('whoops'))
                }).catch(function (error) {
                var errortimer = setTimeout(clearErr, 5000);

                function clearErr() {

                    openTrading()
                    if (settings.has('errorCount.errorCount') === false) {

                        settings.set('errorCount.errorCount', 0);
                    }
                    let errorCount = settings.get('errorCount.errorCount');
                    errorCount++;
                    settings.set('errorCount.errorCount', errorCount);
                    let string = error.message;
                    let position = string.indexOf(`{`);
                    let message = string.slice(0, position - 1);
                    clearTimeout(errortimer);


                    // console.log(string);

                    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">' + message + ' | count : ' + errorCount + '</p>');

                    if (errorCount >= 20) {

                        if (settings.get('run.run')) {

                            pauseBot();
                            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Trading paused binary.com errors.</p>');
                            settings.set('errorCount.errorCount', 0);
                        } else {
                            settings.set('errorCount.errorCount', 0);

                            openTrading()
                        }
                        clearTimeout(errortimer);
                        return;

                    }
                    return;
                }


            }).catch(function (error) {
                var errortimer = setTimeout(clearErr, 5000);

                function clearErr() {

                    openTrading()
                    if (settings.has('errorCount.errorCount') === false) {

                        settings.set('errorCount.errorCount', 0);
                    }
                    let errorCount = settings.get('errorCount.errorCount');
                    errorCount++;
                    settings.set('errorCount.errorCount', errorCount);
                    let string = error.message;
                    let position = string.indexOf(`{`);
                    let message = string.slice(0, position - 1);
                    clearTimeout(errortimer);


                    // console.log(string);

                    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">' + message + ' | count : ' + errorCount + '</p>');

                    if (errorCount >= 20) {

                        if (settings.get('run.run')) {

                            pauseBot();
                            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Trading paused binary.com errors.</p>');
                            settings.set('errorCount.errorCount', 0);
                        } else {
                            settings.set('errorCount.errorCount', 0);

                            openTrading()
                        }
                        clearTimeout(errortimer);
                        return;

                    }
                    return;
                }

            });;
        } else {

            settings.set('message.message', 'Cannot place trade, minimum trade duration not met. Please change duration to meet minimum of ' + convertedSymDuration + 's')
            openTrading()
        }


    } else {

        // console.log('duplicate trade attempted and blocked!');
    }
}

function sellContractEarly() {
    let token = settings.get('tokenToBeUsed.tokenToBeUsed');
    let contract_id = settings.get('contractid.contractid') * 1;
    api.authorize(token).then(function resolve(resp) {
        api.sellContract(contract_id, 0).then(function (response) {
            // console.log(response);
        })
    })

}

function postTrade() {
    authorise()
    // Run post trade calculations for martingale and and stats
    let time = moment().format("kk:mm:ss");

    // win and loss count calculations

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        if (settings.has('compoundWins.compoundWins') === false) {

            settings.set('compoundWins.compoundWins', 1)
        } else {
            let compoundWins = settings.get('compoundWins.compoundWins');
            compoundWins++
            settings.set('compoundWins.compoundWins', compoundWins)
        }

        let wins = settings.get('wins.wins');
        let winsInRow = settings.get('consecutiveWins.consecutiveWins');

        billyWinLoss = 'win';
        wins++;
        winsInRow++;

        settings.set('wins.wins', wins);
        settings.set('consecutiveLosses.consecutiveLosses', 0);
        settings.set('consecutiveWins.consecutiveWins', winsInRow);
        settings.set('autoTrade.autoTrade', true);


        let lastWin = Math.abs(settings.get('resultOnClose.resultOnClose') * 1);
        let cumLoss = Math.abs(settings.get('cumLoss.cumLoss') * 1);

        settings.set('cumLoss.cumLoss', Math.ceil((cumLoss - lastWin) * 1000) / 1000);

        // console.log('post trade, last trade = ' + lastWin, ' New cumLoss = ', (cumLoss - lastWin));

        //   // console.log('win count : ', settings.get('wins.wins'));
        //  // console.log('loss count : ', settings.get('losses.losses'));
        //  // console.log('wins in a row : ', settings.get('consecutiveWins.consecutiveWins'));

        // refactored life time stats

        let strategy = settings.get('strat.strat');

        if (settings.has(strategy + 'Wins.count') === false) {

            settings.set(strategy + 'Wins.count', 0);
        }

        let lifeTimeWins = settings.get(strategy + 'Losses.count');

        lifeTimeWins++;

        settings.set(strategy + 'Wins.count', lifeTimeWins);

        //  // console.log('Lifetime Wins for' + strategy, lifeTimeWins);





    } else {

        let losses = settings.get('losses.losses');
        let lossesInRow = settings.get('consecutiveLosses.consecutiveLosses');

        losses++;
        lossesInRow++;
        settings.set('consecutiveLosses.consecutiveLosses', lossesInRow);
        billyWinLoss = 'loss';

        let lastLoss = Math.abs(settings.get('resultOnClose.resultOnClose'));
        let cumLoss = settings.get('cumLoss.cumLoss') + lastLoss;







        settings.set('losses.losses', losses);
        settings.set('consecutiveWins.consecutiveWins', 0);
        settings.set('cumLoss.cumLoss', Math.ceil(cumLoss * 1000) / 1000);

        // console.log('post trade, last trade = ' + lastLoss, ' cumLoss = ' + cumLoss)
        //  // console.log('loss count : ', settings.get('losses.losses'));
        //   // console.log('win count : ', settings.get('wins.wins'));
        //  // console.log('losses in a row : ', settings.get('consecutiveLosses.consecutiveLosses'));


        // refactored life time stats

        let strategy = settings.get('strat.strat');

        if (settings.has(strategy + 'Losses.count') === false) {

            settings.set(strategy + 'Losses.count', 0);
        }

        let lifeTimeLosses = settings.get(strategy + 'Losses.count');

        lifeTimeLosses++;

        settings.set(strategy + 'Losses.count', lifeTimeLosses);

        //  // console.log('Lifetime Losses for' + strategy, lifeTimeLosses);








    }

    billybigData = [billyDate, billyDay, billyTime, billyStrat, billyDuration, billyCallPut, billyMarket, , billyStake, billyWinLoss, billyPL, billyAccount, billyDataSource];


    settings.set('billyBig.data', billybigData);

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

    // // console.log('win rate : ', settings.get('winRate.winRate'), '%');



    // change profit for session

    let profitChange = settings.get('profit.profit') + settings.get('resultOnClose.resultOnClose');

    settings.set('profit', {
        profit: Math.floor(profitChange * 100) / 100,

    })



    if (settings.get('profit.profit') > settings.get('peakProfit.peakProfit')) {

        settings.set('peakProfit.peakProfit', settings.get('profit.profit'));

    } else if (settings.get('profit.profit') < settings.get('peakLoss.peakLoss')) {

        settings.set('peakLoss.peakLoss', settings.get('profit.profit'));
    }



    // Martingale options

    if (settings.get('MGstyle.MGstyle') === "Classic") {

        basicMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Compound") {

        compoundMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Cum. Loss") {

        cumLossMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Oscar") {

        oscarMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Ladder") {

        ladderMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "bbMixed") {

        bbMixedMartingale();
    }



    if (settings.get('MGstyle.MGstyle') === "DAlembert") {

        dalembertMartingale();
    }

    if (settings.get('MGstyle.MGstyle') === "Labouchere") {

        labouchereMartingale();
    }




    if (settings.get('MGstyle.MGstyle') === "None") {

        noMG();
    }





    //Manualtradeoveride
    var strat = settings.get('strat.strat');
    if (settings.get('autothresh.autothresh') > 0) {

        if (settings.get('autolimit.autolimit') && settings.get('consecutiveLosses.consecutiveLosses') >= settings.get('autothresh.autothresh')) {
            if (settings.get('strat.strat') != 'manual') {
                settings.set('autoStrat.autoStrat', settings.get('strat.strat'));
            }


            if (settings.get('changesymAuto.changesymAuto')) {
                settings.set('wasOnAuto.wasOnAuto', true);
                settings.set('changesymAuto.changesymAuto', false);
            }

            settings.set('strat.strat', 'manual');
            let autostrat = settings.get('autoStrat.autoStrat');

            settings.set('autoTrade', {
                autoTrade: false,

            })

            let duration = settings.get('manualDuration.manualDuration') * 1;
            let duration_unit = settings.get('manualDuration_unit.manualDuration_unit');

            var convertedDuration = duration;

            if (duration_unit == 'm') {

                convertedDuration = duration * 60;
            }

            if (duration_unit == 't') {

                convertedDuration = duration * 2;
            }
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Manual Over ride. Auto Strat  "' + autostrat + '" will resume after your next winning trade..</p>');

            settings.set('message.message', 'Ready to place manual trade. Trade duration set to ' + convertedDuration + ' seconds')


            settings.get('changesymAuto.changesymAuto', false)

        } else if (settings.get('run.run')) {



            settings.set('autoTrade', {
                autoTrade: true,

            })
            if (settings.get('strat.strat') == 'manual') {

                settings.set('strat.strat', settings.get('autoStrat.autoStrat'));

                if (settings.get('wasOnAuto.wasOnAuto')) {
                    settings.set('changesymAuto.changesymAuto', true);

                }

            }
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Auto Trading Resumed</p>');





        }
    }




} // End of Post Trade

function noMG() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {
        settings.set('cumLoss.cumLoss', 0);
    }
    openTrading()

}

// basic martingale for money management

function basicMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        let stake = settings.get('initialStake.initialStake');
        settings.set('cumLoss.cumLoss', 0);

        settings.set('stake.stake', stake);
        openTrading()

    } else {

        let stake = settings.get('stake.stake') * settings.get('martingaleMultiplier.martingaleMultiplier');

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()
    }

}

// compound trading for money management

function compoundMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        let stake = settings.get('stake.stake') * settings.get('compoundMultiplier.compoundMultiplier');
        settings.set('cumLoss.cumLoss', 0);

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()



    } else {

        let stake = settings.get('initialStake.initialStake');


        settings.set('stake.stake', stake);
        openTrading()
    }

}


// bbMixed martingale for money management || fixed return of initial stake per loss

function bbMixedMartingale() {

    // if wins and stake bigger than initial stake andconsecutive wins only 1 then reset stake, this is the recovered trade! 
    if (settings.get('resultOnClose.resultOnClose') > 0 && settings.get('consecutiveWins.consecutiveWins') == 1 && settings.get('stake.stake') > settings.get('initialStake.initialStake')) {
        console.log('Recovered trade')
        let stake = settings.get('initialStake.initialStake');
        settings.set('cumLoss.cumLoss', 0);
        settings.set('consecutiveLosses.consecutiveLosses', 0);
        settings.set('compoundWins.compoundWins', 0);
        settings.set('consecutiveWins.consecutiveWins', 0)

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()

    }

    // if result is win and consecutive wins = 1, but stake equals initial stake then compound
    if (settings.get('resultOnClose.resultOnClose') > 0 && settings.get('consecutiveWins.consecutiveWins') == 1 && settings.get('stake.stake') == settings.get('initialStake.initialStake')) {
console.log('first compound win')
        let stake = settings.get('stake.stake') * settings.get('compoundMultiplier.compoundMultiplier');
        settings.set('cumLoss.cumLoss', 0);

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()



    }

    // if first loss, set the stake to the intial stake plus recovery, this will allow compounding resets to recover without doubling the largest stake
    if (settings.get('resultOnClose.resultOnClose') <= 0 && settings.get('consecutiveLosses.consecutiveLosses') == 1) {
console.log('1st cumloss MG')
        let stake = (settings.get('initialStake.initialStake') * 1.15) + settings.get('initialStake.initialStake')*1;
       // settings.set('cumLoss.cumLoss', 0);


        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()

    }
    // cumulative loss multiplier if loss and loss > 1
    if (settings.get('resultOnClose.resultOnClose') <= 0 && settings.get('consecutiveLosses.consecutiveLosses') > 1 && settings.get('stake.stake') > settings.get('initialStake.initialStake')) {

console.log('cumlossmultiplier > 1')
        let cumStake = Math.abs(Math.abs(settings.get('cumLoss.cumLoss')) * 1.15) + Math.abs(settings.get('initialStake.initialStake')*1);

        settings.set('stake.stake', Math.floor(cumStake * 100) / 100);
        openTrading()


    }

    if (settings.get('resultOnClose.resultOnClose') > 0 && settings.get('consecutiveWins.consecutiveWins') > 1 && settings.get('stake.stake') != settings.get('initialStake.initialStake')) {
console.log('compounding > 1')
        let stake = settings.get('stake.stake') * settings.get('compoundMultiplier.compoundMultiplier');
        settings.set('cumLoss.cumLoss', 0);

        settings.set('stake.stake', Math.floor(stake * 100) / 100);
        openTrading()



    }

}; // end of bbMixed


// cumLoss martingale for money management || fixed return of initial stake per loss

function cumLossMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > Math.abs(settings.get('cumLoss.cumLoss'))) {

        let stake = settings.get('initialStake.initialStake');
        settings.set('cumLoss.cumLoss', 0);

        settings.set('stake.stake', stake);
        openTrading()

    } else {

        let cumStake = Math.abs(Math.abs(settings.get('cumLoss.cumLoss')) * 1.07) + Math.abs(settings.get('initialStake.initialStake')) + (settings.get('initialStake.initialStake') * settings.get('consecutiveLosses.consecutiveLosses'));

        settings.set('stake.stake', Math.floor(cumStake * 100) / 100);
        openTrading()
    }

}

// Oscar's Grind for money management

function oscarMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        //win




        let currStake = settings.get('stake.stake') * 1;
        let stake = settings.get('initialStake.initialStake') * 1;

        // console.log('cumLoss @ oscarMartingale() ', settings.get('cumLoss.cumLoss'));
        if (Math.abs(settings.get('cumLoss.cumLoss') < 0)) {

            settings.set('stake.stake', stake);
            settings.set('cumLoss.cumLoss', 0);
            openTrading()
        } else {

            let oscarsNext = (currStake + stake);

            settings.set('stake.stake', oscarsNext);
            openTrading()


        }


    } else {

        //loss

        openTrading()
    }

}


// Oscar's Grind for money management

function dalembertMartingale() {

    if (settings.get('resultOnClose.resultOnClose') > 0) {

        //win

        if (settings.get('stake.stake') * 1 == settings.get('initialStake.initialStake') * 1) {

            openTrading();

        }
        if (settings.get('stake.stake') * 1 > settings.get('initialStake.initialStake') * 1) {

            let currStake = settings.get('stake.stake') * 1;
            let stake = settings.get('initialStake.initialStake') * 1;

            let dalembertNext = (currStake - stake);

            settings.set('stake.stake', Math.floor(dalembertNext * 100) / 100);

            openTrading();

        }




    } else {

        //loss

        let currStake = settings.get('stake.stake') * 1;
        let stake = settings.get('initialStake.initialStake') * 1;

        let dalembertNext = (currStake + stake);

        settings.set('stake.stake', Math.floor(dalembertNext * 100) / 100);


        openTrading()
    }

}


function labouchereMartingale() {

    const lastStake = settings.get('initialStake.initialStake') * 1;
    var labouchereList;

    if (settings.get('labouchere.labouchere') === false) {

        labouchereList = settings.get('initialLabouchere.initialLabouchere')
        settings.set('cumLoss.cumLoss', 0);

    } else {

        labouchereList = settings.get('labouchere.labouchere')
    }




    if (settings.get('resultOnClose.resultOnClose') > 0) {

        //win



        labouchereList.shift();
        labouchereList.pop();

        if (labouchereList.length < 2) {

            labouchereList = settings.get('initialLabouchere.initialLabouchere')
            settings.set('cumLoss.cumLoss', 0);
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Completed</p>');

        }

        settings.set('labouchere.labouchere', labouchereList);
        console.log('labouchere list', labouchereList);

        settings.set('stake.stake', Math.floor((((labouchereList.slice(-1)[0] * 1) * lastStake) + (((labouchereList[0] * 1) * lastStake))) * 100) / 100);

        console.log(settings.get('stake.stake'));

        document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Status : ' + JSON.stringify(labouchereList) + '</p>');

        openTrading();






    } else {

        //loss

        labouchereList.push((settings.get('stake.stake') * 1) / lastStake);

        settings.set('labouchere.labouchere', labouchereList);
        console.log('labouchere list', labouchereList);

        settings.set('stake.stake', Math.floor(((labouchereList.slice(-1)[0] * lastStake) + ((labouchereList[0] * lastStake))) * 100) / 100);

        console.log(settings.get('stake.stake'));
        document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0"> Labouchere Status : ' + JSON.stringify(labouchereList) + '</p>');


        openTrading();

    }

}




//ladder Martingale calculations


function ladderMartingale() {



    let ladderProfit = settings.get('ladderProfit.ladderProfit') + settings.get('resultOnClose.resultOnClose');

    settings.set('ladderProfit.ladderProfit', Math.floor(ladderProfit * 100) / 100);




    if (settings.get('ladderProfit.ladderProfit') > settings.get('initialStake.initialStake') * settings.get('ladderProfitMultiplier.ladderProfitMultiplier')) {

        let stake = settings.get('initialStake.initialStake');

        settings.set('stake.stake', stake);

        let laddersCompleted = settings.get('laddersCompleted.laddersCompleted');

        laddersCompleted++;

        settings.set('laddersCompleted.laddersCompleted', laddersCompleted);

        settings.set('ladderLevel.ladderLevel', 0);

        settings.set('ladderProfit.ladderProfit', 0);
        openTrading()
    } else {

        let ladderLevel = settings.get('ladderLevel.ladderLevel');

        ladderLevel++;
        settings.set('ladderLevel.ladderLevel', ladderLevel);

        if (settings.get('stake.stake') > settings.get('initialStake.initialStake') * settings.get('ladderMaxMultiplier.ladderMaxMultiplier')) {

            let stake = settings.get('initialStake.initialStake');

            settings.set('stake.stake', stake);

            let laddersCompleted = settings.get('laddersCompleted.laddersCompleted');

            laddersCompleted++;

            settings.set('laddersCompleted.laddersCompleted', laddersCompleted);

            settings.set('ladderLevel.ladderLevel', 0);

            settings.set('ladderProfit.ladderProfit', 0);
            openTrading()

            // settings.set('message.message', 'Ladder failed, completed at loss.')
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Ladder failed, completed at loss.</p>');

        } else {


            let stake = settings.get('stake.stake') * settings.get('ladderStakeMultiplier.ladderStakeMultiplier');

            settings.set('stake.stake', Math.ceil(stake * 100) / 100);
            openTrading()
        }
    }

}

function openTrading() {
    postTradeBackup();
    logData();
    let time = moment().format("kk:mm:ss");
    //open up trading after last trade is completed
    settings.set('barrier.barrier', 'no open trade');
    settings.set('lockauto.lockauto', 0);
    // MG reset settings
    if (settings.get('mgreset.mgreset') > 0) {
        // console.log('cumLoss @ openTrading()', settings.get('cumLoss.cumLoss'))
        if (settings.get('MGstyle.MGstyle') !== 'Compound') {
            if (settings.get('mgreset.mgreset') <= settings.get('consecutiveLosses.consecutiveLosses')) {




                settings.set('stake.stake', settings.get('initialStake.initialStake'));
                settings.set('cumLoss.cumLoss', 0);
                // settings.set('consecutiveLosses.consecutiveLosses', 0); causing errors probably not required for anything!
                //settings.set('message.message', 'Martingale Reset');
                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Martingale Reset</p>');




            }
        } if (settings.get('MGstyle.MGstyle') == 'Compound') {
            if (settings.get('mgreset.mgreset') <= settings.get('compoundWins.compoundWins')) {


                settings.set('stake.stake', settings.get('initialStake.initialStake'));
                settings.set('compoundWins.compoundWins', 0)


                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Compound Reset</p>');




            }
        } if (settings.get('MGstyle.MGstyle') == 'bbMixed') {
            if (2 <= settings.get('consecutiveWins.consecutiveWins')) {


                settings.set('stake.stake', settings.get('initialStake.initialStake'));
                settings.set('consecutiveWins.consecutiveWins', 0)


                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Compound Reset</p>');




            }
             if (settings.get('mgreset.mgreset') <= settings.get('consecutiveLosses.consecutiveLosses')) {




                settings.set('stake.stake', settings.get('initialStake.initialStake'));
                settings.set('cumLoss.cumLoss', 0);
                // settings.set('consecutiveLosses.consecutiveLosses', 0); causing errors probably not required for anything!
                //settings.set('message.message', 'Martingale Reset');
                document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Martingale Reset</p>');




            }
        }

    }


    trading = 0;
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
        document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#27b700">Target Profit Hit!!</p>');

    }

    // StopLoss!!!

    if (settings.get('profit.profit') + (settings.get('stake.stake')) * -1 < (settings.get('stopLoss.stopLoss')) * -1 && settings.get('resultOnClose.resultOnClose') < 0.001) {

        settings.set('run', {
            run: false,

        })

        settings.set('autoTrade', {
            autoTrade: false,

        })

        document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Stop Loss Hit! Take a break.</p>');

    }

    if (settings.get('stake.stake') > settings.get('peakStake.peakStake')) {

        settings.set('peakStake.peakStake', settings.get('stake.stake'));
    }

    // Trailing Stop settings!!!

    if (settings.get('trailingStop.trailingStop') > 0) {


        if (settings.get('peakProfit.peakProfit') > 0 && (Math.abs(settings.get('peakProfit.peakProfit') - settings.get('profit.profit')) + settings.get('stake.stake')) > settings.get('trailingStop.trailingStop')) {

            pauseBot()
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#755505">Trailing Stop Hit! Take a break.</p>');

        }


    }

    if (settings.get('stake.stake') > settings.get('peakStake.peakStake')) {

        settings.set('peakStake.peakStake', settings.get('stake.stake'));
    }
}












process.on('unhandledRejection', (reason, p) => {

    trading = 0;
    settings.set('placeCall', {
        placeCall: false,

    })
    settings.set('placePut', {
        placePut: false,

    })
    settings.set('tradeInProgress', {
        tradeInProgress: false,

    })

    settings.set('lockauto', {
        lockauto: 0,
    })
    settings.set('barrier.barrier', null);
    openTrading()

    document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Error with Binary.com : ' + reason + '</p>');

    // settings.set('message.message', 'Error with Binary.com, BBtrader will try again!');

    // console.log('Unhandled Rejection at:', p, 'reason:', reason);
});