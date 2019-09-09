function setDefaults() {


    settings.set('wins.wins', 0);
    settings.set('duration.duration', 't');
    settings.set('candlesOnChart.candlesOnChart', 100)
    settings.set('ticksToShow.ticksToShow', 120)

    settings.set('losses.losses', 0)
    settings.set('lossesInRow.lossesInRow', 0)
    settings.set('winRate.winRate', 0)
    settings.set('stake.stake', 0.35)
    settings.set('profit.profit', 0)
    settings.set('MGstep.MGstep', 0)
    settings.set('ladderProfit.ladderProfit', 0)
    settings.set('consecutiveLosses.consecutiveLosses', 0)
    settings.set('cumLoss.cumLoss', 0)
    settings.set('peakProfit.peakProfit', 0)
    settings.set('peakLoss.peakLoss', 0)
    settings.set('maxConLosses.maxConLosses', 0)
    settings.set('maxConWins.maxConWins', 0)
    settings.set('laddersCompleted.laddersCompleted', 0)
    settings.set('ladderLevel.ladderLevel', 0)
    settings.set('peakStake.peakStake', 0)
    settings.set('MGstyle.MGstyle', 'Cum. Loss')
    settings.set('strat.strat', 'priceAction')
    settings.set('message.message', 'Default Settings Loaded')
    settings.set('initialStake.initialStake', '0.35')
    settings.set('takeProfit.takeProfit', '50')
    settings.set('stopLoss.stopLoss', '300')
    settings.set('autothresh.autothresh', '6')
    settings.set('mgreset.mgreset', '8')
    settings.set('tradeDuration.tradeDuration', 7)
    settings.set('consecutiveWins.consecutiveWins', 0)
    settings.set('placeCall.placeCall', false)
    settings.set('placePut.placePut', false)
    settings.set('changesymAuto.changesymAuto', true)
    settings.set('symbol.symbol', 'R_75')
    settings.set('MSstyle.MSstyle', 'StdD + PA')

    settings.set('forex.forex', false);
    settings.set('onlyTradeTicks.onlyTradeTicks', true);


    settings.set('ladderProfitMultiplier.ladderProfitMultiplier', 0.9)
    settings.set('ladderMaxMultiplier.ladderMaxMultiplier', 50)
    settings.set('ladderStakeMultiplier.ladderStakeMultiplier', 1.1)
    settings.set('martingaleMultiplier.martingaleMultiplier', 2.36)
    settings.set('cumLossMultiplier.cumLossMultiplier', 0.9)

    //multi defaults

    //multi defaults
    settings.set('multiDuration.multiDuration', 7); //integer time period
    settings.set('multiDuration_unit.multiDuration_unit', 't'); // 's', 'm'
    settings.set('multiCandleOrTick.multiCandleOrTick',
        'candle'); // candle only for this strategy
    settings.set('multiCandleL.multiCandleL', 60); // 120, 180,300 candle duration
    settings.set('multiVariable1.multiVariable1', 0.7); // first variable
    settings.set('multiNoOfTriggersRequired.multiNoOfTriggersRequired', false); // second variable
    settings.set('multiVariable3.multiVariable3', 0); // thirdvariable
    settings.set('multiVariable4.multiVariable4', 0); // fourth variable
    settings.set('stratArray.stratArray', ["priceAction", "CCItrend", "BBands", "macd"]);
    // end of multi defaults
    //BBands defaults

    settings.set('BBandsPeriod.BBandsPeriod', 8); // first variable
    settings.set('BBandsSdev.BBandsSdev', 1.5); // second variable
    //CCItrend defaults

    settings.set('CCItrendPeriod.CCItrendPeriod', 9); // first variable
    settings.set('CCItrendThreshold.CCItrendThreshold', 100); // second variable
    settings.set('CCItrendAverage.CCItrendAverage', 4); // thirdvariable
    //customMA defaults

    settings.set('customMALong.customMALong', 50); // first variable
    settings.set('customMAShort.customMAShort', 12); // second variable
    settings.set('customMATrigger.customMATrigger', 7); // thirdvariable
    settings.set('customMALongType.customMALongType', 'SMA');
    settings.set('customMAShortType.customMAShortType', 'SMA');
    settings.set('customMATriggerType.customMATriggerType', 'EMA');
    //macd defaults

    settings.set('macdfastPeriod.macdfastPeriod', 5); // first variable
    settings.set('macdslowPeriod.macdslowPeriod', 8); // second variable
    settings.set('macdsignalPeriod.macdsignalPeriod', 3); // thirdvariable
    // settings.set('macdVariable4.macdVariable4', 0); // fourth variable
    // end of macd defaults
    //priceAction defaults

    settings.set('priceActionCandleBody.priceActionCandleBody', 0.7); // candle ratio
    //priceAction defaults
    //tripleEMA defaults

    settings.set('tripleEMALong.tripleEMALong', 0.7); // first variable
    settings.set('tripleEMAShort.tripleEMAShort', 0); // second variable
    settings.set('tripleEMATrigger.tripleEMATrigger', 0); // thirdvariable
    // settings.set('tripleEMAVariable4.tripleEMAVariable4', 0); // fourth variable
    // end of tripleEMA defaults
    //TRIX defaults

    settings.set('TRIXPeriod.TRIXPeriod', 12); // first variable

    //williamsR defaults

    settings.set('williamsRPeriod.williamsRPeriod', 9); // first variable
    settings.set('williamsRThresholdOB.williamsRThresholdOB', 20); // second variable
    settings.set('williamsRThresholdOS.williamsRThresholdOS', 80); // second variable
    settings.set('williamsRAverage.williamsRAverage', 2); // thirdvariable
    //  settings.set('williamsRVariable4.williamsRVariable4', 0); // fourth variable
    // end of williamsR defaults

    settings.set('ladderProfitMultiplier.ladderProfitMultiplier', 2.5)
    settings.set('ladderMaxMultiplier.ladderMaxMultiplier', 50)
    settings.set('ladderStakeMultiplier.ladderStakeMultiplier', 1.1)
    settings.set('martingaleMultiplier.martingaleMultiplier', 2.36)
    settings.set('cumLossMultiplier.cumLossMultiplier', 0.9)
    settings.set('onlyTradeTicks.onlyTradeTicks', true)



    //multi defaults
    settings.set('multiDuration.multiDuration', 7); //integer time period
    settings.set('multiDuration_unit.multiDuration_unit', 't'); // 's', 'm'
    settings.set('multiCandleOrTick.multiCandleOrTick',
        'candle'); // candle only for this strategy
    settings.set('multiCandleL.multiCandleL', 60); // 120, 180,300 candle duration
    settings.set('multiVariable1.multiVariable1', 0.7); // first variable
    settings.set('multiNoOfTriggersRequired.multiNoOfTriggersRequired', false); // second variable
    settings.set('multiVariable3.multiVariable3', 0); // thirdvariable
    settings.set('multiVariable4.multiVariable4', 0); // fourth variable
    settings.set('stratArray.stratArray', ["priceAction", "CCItrend", "BBands", "macd"]);
    // end of multi defaults

}



function checkDefaults() {

    if (settings.has('stake.stake') === false) {

        setDefaults();
        technicalReset();

    }

    if (settings.has('useBBtrader.useBBtrader') === false) {

        settings.set('useBBtrader.useBBtrader', true)
    }

    if (settings.has('onlyOneTriggerCP.onlyOneTriggerCP') === false) {

        //supportResist defaults

        settings.set('supportResistSRperiodPP.supportResistSRperiodPP', 1800)

        settings.set('supportResistNoOfTriggersRequired.supportResistNoOfTriggersRequired',
            2); // second variable
        settings.set('onlyOneTriggerCP.onlyOneTriggerCP', false); // second variable

        settings.set('supportResistArray.supportResistArray', ["pivotPP", "SRonePP", "SRtwoPP"]);

    }

    if (settings.has('compoundMultiplier.compoundMultiplier') === false) {
        settings.set('compoundMultiplier.compoundMultiplier', 2)
    }
    if (settings.has('inverseBarrier.inverseBarrier') === false) {
        settings.set('inverseBarrier.inverseBarrier', 'Normal')
    }
    if (settings.has('tradeBarrier.tradeBarrier') === false) {
        settings.set('tradeBarrier.tradeBarrier', 0)
    }



    if (settings.has('ladderProfitMultiplier.ladderProfitMultiplier') === false) {

        settings.set('ladderProfitMultiplier.ladderProfitMultiplier', 2.5)
        settings.set('ladderMaxMultiplier.ladderMaxMultiplier', 50)
        settings.set('ladderStakeMultiplier.ladderStakeMultiplier', 1.1)
        settings.set('martingaleMultiplier.martingaleMultiplier', 2.36)
        settings.set('cumLossMultiplier.cumLossMultiplier', 0.9)


    }

    if (settings.has('williamsRThresholdOS.williamsRThresholdOS') === false) {
        //williamsR defaults

        settings.set('williamsRPeriod.williamsRPeriod', 9); // first variable
        settings.set('williamsRThresholdOB.williamsRThresholdOB', 20); // second variable
        settings.set('williamsRThresholdOS.williamsRThresholdOS', 80); // second variable
        settings.set('williamsRAverage.williamsRAverage', 2); // thirdvariable
        //  settings.set('williamsRVariable4.williamsRVariable4', 0); // fourth variable
        // end of williamsR defaults
    }


    if (settings.has('multiDuration.multiDuration') === false) {
        //multi defaults
        settings.set('multiDuration.multiDuration', 7); //integer time period
        settings.set('multiDuration_unit.multiDuration_unit', 't'); // 's', 'm'
        settings.set('multiCandleOrTick.multiCandleOrTick',
            'candle'); // candle only for this strategy
        settings.set('multiCandleL.multiCandleL', 60); // 120, 180,300 candle duration
        settings.set('multiVariable1.multiVariable1', 0.7); // first variable
        settings.set('multiNoOfTriggersRequired.multiNoOfTriggersRequired', false); // second variable
        settings.set('multiVariable3.multiVariable3', 0); // thirdvariable
        settings.set('multiVariable4.multiVariable4', 0); // fourth variable
        settings.set('stratArray.stratArray', ["priceAction", "CCItrend", "BBands", "macd"]);
        // end of multi defaults
    }

    if (settings.has('customMATrigger.customMATrigger') === false) {
        //customMA defaults

        settings.set('customMALong.customMALong', 50); // first variable
        settings.set('customMAShort.customMAShort', 12); // second variable
        settings.set('customMATrigger.customMATrigger', 7); // thirdvariable
        settings.set('customMALongType.customMALongType', 'SMA');
        settings.set('customMAShortType.customMAShortType', 'SMA');
        settings.set('customMATriggerType.customMATriggerType', 'EMA');
    }



    if (settings.has('TRIXPeriod.TRIXPeriod') === false) {
        //TRIX defaults

        settings.set('TRIXPeriod.TRIXPeriod', 12); // first variable

    }

    if (settings.has('candlePatternArray.candlePatternArray') === false) {
        //candlePattern defaults


        settings.set('candlePatternNoOfTriggersRequired.candlePatternNoOfTriggersRequired', false); // second variable

        settings.set('candlePatternArray.candlePatternArray', ["bullBear", "mornEveStar", "dojiStar", "invHammer"]);
        // end of candlePattern defaults

    }

    if (settings.has('trailingStop.trailingStop') === false) {

        settings.set('trailingStop.trailingStop', 0)
    }


    if (settings.has('manualDuration_unit.manualDuration_unit') === false) {


        settings.set('manualDuration_unit.manualDuration_unit', 't');
        settings.set('manualDuration.manualDuration', 7);
    }




    if (settings.has('virtualToken.virtualToken') === false) {


        settings.set('message.message', 'You must add a virtual account token')
    }



}


function technicalReset() {

    // depricated

}