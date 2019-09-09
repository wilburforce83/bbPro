module.exports = {


    technicalReset: function () {

        const settings = require('electron-settings');

        settings.set('ticksToShow.ticksToShow', 120)
        //3 MA Periods

        // copy from techSettings.js after any new strategies are added!

        //tripleEMA defaults
        settings.set('tripleEMALong.tripleEMALong', 75); // Moving average period
        settings.set('tripleEMAShort.tripleEMAShort', 20); // Moving average period
        settings.set('tripleEMATrigger.tripleEMATrigger', 7); // Moving average period
        settings.set('tripleEMADuration.tripleEMADuration', 5); //integer time period
        settings.set('tripleEMADuration_unit.tripleEMADuration_unit', 't'); // 's', 'm'
        settings.set('tripleEMACandleOrTick.tripleEMACandleOrTick', 'tick'); // or 'candle'
        settings.set('tripleEMACandleL.tripleEMACandleL', 60); // 120, 180,300 candle duration




        //BBands defaults
        settings.set('BBandsPeriod.BBandsPeriod', 14);
        settings.set('BBandsSdev.BBandsSdev', 2);
        settings.set('BBandsDuration.BBandsDuration', 10);
        settings.set('BBandsDuration_unit.BBandsDuration_unit', 't'); // 's', 'm'
        settings.set('BBandsCandleOrTick.BBandsCandleOrTick', 'candle'); // or 'tick'
        settings.set('BBandsCandleL.BBandsCandleL', 60); // 120, 180,300 candle duration


        //priceAction defaults
        settings.set('priceActionDuration.priceActionDuration', 7); //integer time period
        settings.set('priceActionDuration_unit.priceActionDuration_unit', 't'); // 's', 'm'
        settings.set('priceActionCandleOrTick.priceActionCandleOrTick', 'candle'); // candle only for this strategy
        settings.set('priceActionCandleL.priceActionCandleL', 60); // 120, 180,300 candle duration
        settings.set('priceActionCandleBody.priceActionCandleBody', 0.7); // candle ratio



        // CCItrend defaults
        settings.set('CCItrendDuration.CCItrendDuration', 20);
        settings.set('CCItrendDuration.CCItrendDuration-unit', 's');
        settings.set('CCItrendPeriod.CCItrendPeriod', 14);
        settings.set('CCItrendThreshold.CCItrendThreshold', 100);
        settings.set('CCItrendAverage.CCItrendAverage', 4);
        settings.set('CCItrendCandleL.CCItrendCandleL', 60);
        settings.set('CCItrendCandleOrTick.CCItrendCandleOrTick', 'candle');


        // manual defaults
        settings.set('manualDuration.manualDuration', 30);
        settings.set('manualDuration.manualDuration-unit', 's');
        settings.set('manualCandleL.manualCandleL', 60);
        settings.set('manualCandleOrTick.manualCandleOrTick', 'candle');




        // Add new defaults for technicla analysis here
    }
}