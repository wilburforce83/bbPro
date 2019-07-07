 function resetTradingOnClick() {


     settings.set('run', {
         run: false
     });
     settings.set('lockauto', {
         lockauto: 0,
     })
     settings.set('tradeInProgress', {
         tradeInProgress: false
     });
     settings.set('autoTrade', {
         autoTrade: true
     });
     if (settings.get('strat.strat') == 'manual') {

         settings.set('strat.strat', settings.get('autoStrat.autoStrat'));

     }
     settings.set('wins.wins', 0);
     settings.set('losses.losses', 0);
     settings.set('lossesInRow.lossesInRow', 0);
     settings.set('winRate.winRate', 0);
     settings.set('stake.stake', settings.get('initialStake.initialStake'));
     settings.set('profit.profit', 0);
     settings.set('MGstep.MGstep', 0);
     settings.set('ladderProfit.ladderProfit', 0);
     settings.set('consecutiveLosses.consecutiveLosses', 0);
     settings.set('cumLoss.cumLoss', 0);
     settings.set('peakProfit.peakProfit', 0);
     settings.set('peakLoss.peakLoss', 0);
     settings.set('maxConLosses.maxConLosses', 0);
     settings.set('maxConWins.maxConWins', 0);
     settings.set('peakProfit.peakProfit', 0);
     settings.set('peakLoss.peakLoss', 0);
     settings.set('laddersCompleted.laddersCompleted', 0);
     settings.set('ladderLevel.ladderLevel', 0);
     settings.set('peakStake.peakStake', 0);
     document.getElementById('sell').style.display = 'none';
     settings.set('sellprofit.sellprofit', 0);
     settings.set('barrier.barrier', 'no open trade');
     settings.set('labouchere.labouchere', []);




     settings.set('message.message', 'bot has been reset, all data cleared, it will now start from initial stake @ 0.00 profit');






 }