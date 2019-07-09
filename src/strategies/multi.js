// This will contain a for loop for all selected strategies to run their functionwith the collecteddata



var strats;
var triggerNumber;
var triggerCalls;
var triggerPuts;
var anyTrade;





function multirun() {

    strats = settings.get('stratArray.stratArray'); //["priceAction", "CCItrend", "BBands", "macd"]; // multi strat settings.get someArray from multi.html
    anyTrade = settings.get('onlyOneTrigger.onlyOneTrigger')
    triggerNumber = settings.get(
        'multiNoOfTriggersRequired.multiNoOfTriggersRequired');
    triggerCalls = settings.get('numberOfCalls.numberOfCalls');
    triggerPuts = settings.get('numberOfPuts.numberOfPuts');

    console.log(triggerCalls, triggerPuts, 'Requires ' + triggerNumber + ' active Triggers');

    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false && anyTrade === false && triggerNumber >= 1) {
        let time = moment().format("kk:mm:ss");
        if (triggerPuts >= triggerNumber) {

            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            //console.log('Multi PUT trade')
            settings.set('message.message', time + ': Multi Strategy PUT triggered, ' + triggerPuts + ' triggers active')

            settings.set('callOrPut', {
                callOrPut: 'PUT',
                //  tradeInProgress: true

            })
            trade();

        } else if (triggerCalls >= triggerNumber) {

            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            //console.log('Multi CALL trade')
            settings.set('message.message', time + ': Multi Strategy CALL triggered, ' + triggerCalls + ' triggers active')

            settings.set('callOrPut', {
                callOrPut: 'CALL',
                //  tradeInProgress: true

            })
            trade();
        }


    }





    //clear trigger counts on each loop
    settings.set('numberOfCalls.numberOfCalls', 0);
    settings.set('numberOfPuts.numberOfPuts', 0);


    strats.forEach(passStrats);

}


// run each strategy function
function passStrats(value) {
    console.log('running passStrats');
    this[value + 'run']() // use the strategy prefixto run the function for the relevent strategy
}