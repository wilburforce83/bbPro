// This will contain a for loop for all selected strategies to run their functionwith the collecteddata



var strats;
var triggerNumber;
var triggerCalls;
var triggerPuts;





function dmultirun() {

    strats = ["priceAction", "CCItrend", "BBands", "macd"]; // dmulti strat settings.get someArray from dmulti.html

    triggerNumber = settings.get(
        'dmultiNoOfTriggersRequired.dmultiNoOfTriggersRequired') * 1;
    triggerCalls = settings.set('numberOfCalls.numberOfCalls') * 1;
    triggerPuts = settings.set('numberOfPuts.numberOfPutss') * 1;

    if (settings.get('run.run') && settings.get('autoTrade.autoTrade') && settings.get('tradeInProgress.tradeInProgress') === false) {
        let time = moment().format("kk:mm:ss");
        if (triggerPuts >= triggerNumber) {

            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            console.log('dmulti PUT trade')
            settings.set('message.message', time + ': dmulti Strategy PUT triggered, ' + triggerPuts + ' triggers active')

            settings.set('callOrPut', {
                callOrPut: 'PUT',
                //  tradeInProgress: true

            })

        }

        if (triggerCalls >= triggerNumber) {

            settings.set('tradeInProgress', {
                tradeInProgress: true,
            })
            settings.set('lockauto', {
                lockauto: 1,
            })
            console.log('dmulti CALL trade')
            settings.set('message.message', time + ': dmulti Strategy CALL triggered, ' + triggerCalls + ' triggers active')

            settings.set('callOrPut', {
                callOrPut: 'CALL',
                //  tradeInProgress: true

            })

        }


    }





    //clear trigger counts on each loop
    settings.set('numberOfCalls.numberOfCalls', 0);
    settings.set('numberOfPuts.numberOfPuts', 0);


    strats.forEach(passStrats);

}


// run each strategy function
function passStrats(value) {
    this[value + 'run']() // use the strategy prefixto run the function for the relevent strategy
}