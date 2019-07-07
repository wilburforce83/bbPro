// New strategy helper!

/*

------------------------------- STRATEGY   CONVENTIONS -------------------------------------

All variables are to be prefixed with the strategy name in settings.get('strat.strat'),the following variable MUST be
declared and added to settings:

        settings.set('williamsRDuration.williamsRDuration', 20); //integer time period
        settings.set('williamsRDuration_unit.williamsRDuration_unit, 't') // 's', 'm'
        settings.set('williamsRCandleOrTick.williamsRCandleOrTick', 'tick');  // or 'candle'
        settings.set('williamsRCandleL.williamsRCandleL', 60);  // 120, 180,300
        
        settings.set('williamsRvariable1.williamsRvariable1', 0); // for all things like periods, ratios etc
        settings.set('williamsRvariable2.williamsRvariable2', 0); // for all things like periods, ratios etc
        settings.set('williamsRvariable3.williamsRvariable3', 0); // for all things like periods, ratios etc
        settings.set('williamsRvariable4.williamsRvariable4', 0); // for all things like periods, ratios etc


------------------------------- END OF CONVENTIONS  -----------------------------------------







Building A new strategy requires the following to be completed elsewhere in the applicaiton:

- Add strategy to main.js menu with the following:

---------------------  MAIN.JS MENU -----------------------

{
              label: 'williamsR',
              submenu: [{
                  label: 'Edit',
                  click() {
                    strat = 'williamsR';
                    createOptionsWindow();
                   
                  }
                },
                {


                  label: 'Use',

                  //function() here
                  click() {
                    settings.set('strat.strat', 'williamsR');
                    settings.set('message.message', 'williamsR Strategy');
                    settings.set('tradeDuration.tradeDuration', settings.get('williamsRDuration.williamsRDuration'));
                    settings.set('duration.duration', settings.get('williamsRDuration_unit.williamsRDuration_unit'));

                  }
                },

              ]
            },

--------------------- END OF MAIN.JS ------------------------



------------------------      DEFAULTS           ----------------------

add details to src/settings/techSettings.js 
add details to src/settings/settings.js 


******************

Add src to home.HTML


<script src="../src/strategies/williamsR.js"></script>

******************/