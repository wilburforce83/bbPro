 //Add constants for all other JS files here to keep html file clean
 const fs = require('fs')
 const {
     ipcRenderer,
     electron
 } = require('electron');
 const dialog = require('electron').remote.dialog;
 const {
     BrowserWindow,
     app
 } = require('electron').remote;
 var LiveApi = require('binary-live-api').LiveApi;
 const path = require('path');
 const closeApp = document.getElementById('exitApp');
 const stats = require('stats-lite');
 const settings = require('electron').remote.require('electron-settings');
 var ws = require('ws');

 var api = new LiveApi({
     websocket: ws,
     appId: 18970
 });
 const shell = require('electron').shell

 const {
     getCurrentWindow,
     globalShortcut
 } = require('electron').remote;



 const tradeDialogBox = {
     type: 'none',
     buttons: [],
     title: 'Trade Warning',
     message: 'You Cannot do this',
     detail: 'You cannot place a trade when the bot is running in "Auto" OR you have an open trade',

 };

 var renderSparkline = false;

 //Technical indicators const
 const technicalIndicators = require('technicalindicators');
 const BB = require('technicalindicators').BollingerBands;
 const EMA = require('technicalindicators').EMA;
 const CCI = require('technicalindicators').CCI;
 const MACD = require('technicalindicators').MACD;
 var RSI = require('technicalindicators').RSI;
 const SMA = require('technicalindicators').SMA;
 const WMA = require('technicalindicators').WMA;
 const WEMA = require('technicalindicators').WEMA;
 const TRIX = require('technicalindicators').TRIX;
 const WilliamsR = require('technicalindicators').WilliamsR;
 const IchimokuCloud = require('technicalindicators').IchimokuCloud

 //trendyways

 const tw = require('trendyways');


 function preTradeBackup() {

     var fileName;

     var location = settings.file() //.slice(0, -8)
     var content;



     fs.readFile(location, 'utf-8', (err, data) => {
         if (err) {
             console.log("An error ocurred reading the file :" + err.message);
             return;
         }

         // Change how to handle the file content
         //console.log("The file content is : " + data);
         fileName = location + '2';
         content = data;
         console.log(fileName);
         // fileName is a string that contains the path and filename created in the save file dialog.  
         fs.writeFile(fileName, content, (err) => {
             if (err) {
                 console.log("An error ocurred creating the file " + err.message)
                 return;
             }

             //    console.log("Settings has been succesfully backed up");
         });
     });
 }


 function postTradeBackup() {

     var fileName;

     var location = settings.file() //.slice(0, -8)
     var content;



     fs.readFile(location, 'utf-8', (err, data) => {
         if (err) {
             console.log("An error ocurred reading the file :" + err.message);
             return;
         }

         // Change how to handle the file content
         // console.log("The file content is : " + data);
         fileName = location + '1';
         content = data;
         //  console.log(fileName);
         // fileName is a string that contains the path and filename created in the save file dialog.  
         fs.writeFile(fileName, content, (err) => {
             if (err) {
                 console.log("An error ocurred creating the file " + err.message)
                 return;
             }

             //     console.log("Settings has been succesfully backed up");
         });
     });
 }




 function repairSettings() {
     var recovered;
     var fileName;
     if (settings.get('recovered.recovered')) {
         var location = settings.file().slice(0, -8) + 'Settings2';
         recovered = true;
     } else {
         var location = settings.file().slice(0, -8) + 'Settings1'

     }

     var destination = settings.file()
     var content;



     fs.readFile(location, 'utf-8', (err, data) => {
         if (err) {
             console.log("An error ocurred reading the file :" + err.message);
              OauthLogin();
             return;
         }

         // Change how to handle the file content
         //  console.log("The file content is : " + data);
         fileName = destination;
         content = data;
         // console.log(fileName);
         // fileName is a string that contains the path and filename created in the save file dialog.  
         fs.writeFile(fileName, content, (err) => {
             if (err) {
                 console.log("An error ocurred restoring your settings")
                  OauthLogin();
             }

             console.log("Succesfully repaired Settings after crash! You may have lost your last trade data. Your platform will restart now.");
             app.relaunch();
             if (recovered === true) {
                 alert("First recovery attempt failed, falling back to second recovery. You may have lost your last trade data. Your platform will restart now.");

             } else {
                 alert("Attempting to recover data after fatal error. You may have lost your last trade data. Your platform will restart now.");

             }
             settings.set('recovered.recovered', true)
             settings.set('run', {
                 run: false,

             })

             settings.set('lockauto.lockauto', 0)
             app.quit(); //or any message

         });
     });



 }