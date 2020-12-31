 //Set up terms window incase there is no token on authorise:

 function startup() {

    startupLogin();

     if (settings.get('virtualToken.virtualToken') == null) {

         repairSettings(() => {

             if (settings.get('virtualToken.virtualToken') == null) {

               
             } else {
                 authorise();
                 checkDefaults();

             }
         })



     } else {

         authorise();

         checkDefaults();

     }
     var strat = settings.get('strat.strat');
     if (settings.get('strat.strat') != 'manual') {
         settings.set('autoStrat.autoStrat', settings.get('strat.strat'));
     }
     settings.set('strat.strat', 'manual');
     strat = settings.get('strat.strat');
     let duration = settings.get(strat + 'Duration.' + strat + 'Duration') * 1;
     let duration_unit = settings.get(strat + 'Duration_unit.' + strat + 'Duration_unit');

     var convertedDuration = settings.get(strat + 'Duration.' + strat + 'Duration') * 1;
     if (duration_unit == 'm') {

         convertedDuration = duration * 60;
     }

     if (duration_unit == 't') {

         convertedDuration = duration * 2;
     }


     if (settings.get('recovered.recovered')) {
         document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:red">Recovered from severe crash. Data has been recovered, please check your balance and check your last trade information</p>');

         settings.set('recovered.recovered', false)

     } else {
         document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p>Ready to place manual trade. Trade duration set to ' + convertedDuration +
             ' seconds</p>');

     }

     document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">Welcome to Binary Bot Trader. Trade sensibly and always set limits!</p>');

     settings.set('trading.view', false)


     api.events.on('*', function (response) {
         // console.log('all', response);
     });

 }