var stratContent;
var Allcontent;
var output;

function loadYourStrategy() {

    var strat;

    var fileName;
    var saveOptions;



    var content;
    const electronLocalshortcut = require('electron-localshortcut');

    var location = settings.file() //.slice(0, -8)

    loadName = location.slice(0, -8) + '/Strategy_files/'; // Create location using folder only.



    loadOptions = {
        //Placeholder 1
        title: "Load Strategy",

        //Placeholder 2
        defaultPath: loadName,

        //Placeholder 4
        buttonLabel: "Load Strategy",

        //Placeholder 3
        filters: [{
                name: 'BBtrader stratfile',
                extensions: ['strat']
            },
            {
                name: 'All Files',
                extensions: ['*']
            }
        ]
    }





    dialog.showOpenDialog(loadOptions, function (filePaths) {

        if (filePaths === undefined) {
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p>Cancelled Strategy Load</p>');
            return;

        } else {
            var filePath = filePaths[0];

        }


        try {

            loadedContent = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // convert loaded string into JSON



            for (var key in loadedContent) {
                // skip loop if the property is from prototype
                if (!loadedContent.hasOwnProperty(key)) continue;

                var obj = loadedContent[key];
                for (var prop in obj) {
                    // skip loop if the property is from prototype
                    if (!obj.hasOwnProperty(prop)) continue;

                    // var someStr = 'He said "Hello, my name is Foo"';
                    //console.log(someStr.replace(/['"]+/g, ''));

                    let concatProp = prop.replace(/^"(.+(?="$))"$/, '$1');
                    let concatObjProp = obj[prop];

                    let settyMcSet = concatProp + '.' + concatProp;
                    let settyMcValue = concatObjProp;
                    // your code
                    console.log(settyMcSet, settyMcValue); // print to console each setting
                    settings.set(settyMcSet, settyMcValue);

                    settings.set('strat.strat', 'multi');
                    // document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p>' + ' Loaded : ' + settyMcSet + ' with Value :' + settyMcValue + '</p>');

                }
            }
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p>' + settings.get('multistratName.multistratName') + ' has been successfully loaded</p>');






            // run settings.set function here once I have worked it out, I am sure its a format issue.




        } catch (err) {
            console.error('Error reading the file: ' + err);
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">There was an error reading your strategy file. It may be corrupted.</p>');
        }


    })
}



function saveYourStrategy() {

    stratContent = JSON.parse(JSON.stringify(settings.getAll()));

    var location = settings.file() //.slice(0, -8)

    fs.readFile(location, 'utf-8', (err, data) => {
        if (err) {
            console.log("An error ocurred reading the file :" + err.message);
            document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">There was an error reading your strategy file. Restart your app and try again.</p>');

            return;
        }

        // Change how to handle the file content
        //console.log("The file content is : " + data);
        fileName = location.slice(0, -8) + '/Strategy_files/' + settings.get('multistratName.multistratName') + '.strat'; // Create location using folder only, then assign name using the naming variable
        //content = data;



        sanatise(function () {

            //add in more here!!



            content = JSON.stringify(output) //.replace("\"", ""));

            // Data manipulation here, take out all settings not required.

            saveOptions = {
                //Placeholder 1
                title: "Save Strategy",

                //Placeholder 2
                defaultPath: fileName,

                //Placeholder 4
                buttonLabel: "Save Strategy",

                //Placeholder 3
                filters: [{
                        name: 'BBtrader stratfile',
                        extensions: ['strat']
                    },
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ]
            }


            dialog.showSaveDialog(saveOptions, function (fileName) {



                    try {
                        fs.writeFile(fileName, content, (err) => {
                            if (err) {
                                console.log("An error ocurred creating the file " + err.message)
                                return;
                            }

                            settings.set('message.message', 'Your strategy has been successfully saved!');
                        });
                    } catch (err) {
                        console.log('File not saved: ' + JSON.stringify(err.message));
                        document.getElementById('notifyme').insertAdjacentHTML("afterbegin", '<p style="color:#8c01a0">File Not Saved. Please try again.</p>');

                    }




                }

            )

            // console.log(content)
        })


    })
}

function sanatise(callback) {

    Allcontent = stratContent;
    // console.log(Allcontent)

    delete Allcontent.virtualToken;
    delete Allcontent.liveToken;
    delete Allcontent.tokenToBeUsed;
    delete Allcontent.stdDevOfClose
    delete Allcontent.canSell
    delete Allcontent.count
    delete Allcontent.strat


    delete Allcontent.timeStamp;
    delete Allcontent.data;
    delete Allcontent.closeList;
    delete Allcontent.openList;
    delete Allcontent.highList;
    delete Allcontent.lowList;
    delete Allcontent.tickList;
    delete Allcontent.stream;
    delete Allcontent.message;
    delete Allcontent.billyBig;
    delete Allcontent.candleData;
    delete Allcontent.tickData;

    delete Allcontent.wasOnAuto


    delete Allcontent.losses
    delete Allcontent.wins
    delete Allcontent.winsInRow

    delete Allcontent.losses
    delete Allcontent.lossesInRow
    delete Allcontent.winRate
    delete Allcontent.profit
    delete Allcontent.MGstep
    delete Allcontent.ladderProfit
    delete Allcontent.cumLoss
    delete Allcontent.peakProfit
    delete Allcontent.peakLoss
    delete Allcontent.maxConLosses
    delete Allcontent.maxConWins
    delete Allcontent.laddersCompleted
    delete Allcontent.ladderLevel
    delete Allcontent.peakStake
    delete Allcontent.consecutiveWins
    delete Allcontent.consecutiveLosses
    delete Allcontent.MSstyle
    delete Allcontent.tradeInProgress
    delete Allcontent.run
    delete Allcontent.changesymAuto

    delete Allcontent.autolimit
    delete Allcontent.autothresh
    delete Allcontent.autoStrat
    delete Allcontent.R_50frxDuration
    delete Allcontent.R_50frxDurationUnit
    delete Allcontent.lastTick
    delete Allcontent.balance
    delete Allcontent.currency
    delete Allcontent.loginid
    delete Allcontent.barrier
    delete Allcontent.contractid
    delete Allcontent.sellprofit
    delete Allcontent.resultOnClose
    delete Allcontent.priceActionLosses
    delete Allcontent.priceActionWins
    delete Allcontent.manualLosses
    delete Allcontent.message
    delete Allcontent.compoundWins
    delete Allcontent.epoch
    delete Allcontent.onlyOneTrigger
    delete Allcontent.numberOfCalls
    delete Allcontent.numberOfPuts
    delete Allcontent.multiLosses
    delete Allcontent.multiWins
    delete Allcontent.BBandsWins
    delete Allcontent.BBandsLosses
    delete Allcontent.errorCount
    delete Allcontent.candlePatternWins
    delete Allcontent.candlePatternLosses
    delete Allcontent.manualWins
    delete Allcontent.rx1candlePc
    delete Allcontent.rx2candlePc
    delete Allcontent.rx3candlePc
    delete Allcontent.rx4candlePc
    delete Allcontent.rx5candlePc
    delete Allcontent.stake
    delete Allcontent.open

    delete Allcontent.pen
    delete Allcontent.placeCall
    delete Allcontent.placePut
    delete Allcontent.previous
    delete Allcontent.high
    delete Allcontent.RDBEARfrxDuration
    delete Allcontent.RDBEARfrxDurationUnit
    delete Allcontent.RDBEARlastTick
    delete Allcontent.RDBEARrx1candlePc
    delete Allcontent.RDBEARrx2candlePc
    delete Allcontent.RDBEARrx3candlePc
    delete Allcontent.RDBEARrx5candlePc
    delete Allcontent.RDBEARstdDevcandle1
    delete Allcontent.RDBEARstdDevcandle2
    delete Allcontent.RDBULLfrxDuration
    delete Allcontent.RDBULLfrxDurationUnit
    delete Allcontent.RDBULLlastTick
    delete Allcontent.RDBULLrx1candlePc
    delete Allcontent.RDBULLrx2candlePc
    delete Allcontent.RDBULLrx3candlePc
    delete Allcontent.RDBULLrx4candlePc
    delete Allcontent.RDBULLrx5candlePc
    delete Allcontent.RDBULLstdDevcandle1
    delete Allcontent.RDBULLstdDevcandle2
    delete Allcontent.R_10frxDuration
    delete Allcontent.R_10frxDurationUnit
    delete Allcontent.R_10lastTick
    delete Allcontent.R_10rx1candlePc
    delete Allcontent.R_10rx2candlePc9
    delete Allcontent.R_10rx3candlePc
    delete Allcontent.R_10rx4candlePc
    delete Allcontent.R_10rx5candlePc
    delete Allcontent.R_10stdDevcandle14
    delete Allcontent.R_10stdDevcandle2
    delete Allcontent.R_25frxDuration
    delete Allcontent.R_25frxDurationUnit
    delete Allcontent.R_25lastTick
    delete Allcontent.R_25rx1candlePc
    delete Allcontent.R_25rx2candlePc
    delete Allcontent.R_25rx3candlePc
    delete Allcontent.R_25rx4candlePc
    delete Allcontent.R_25rx5candlePc
    delete Allcontent.R_25stdDevcandle1
    delete Allcontent.R_25stdDevcandle2
    delete Allcontent.R_50frxDuration
    delete Allcontent.R_50frxDurationUnit
    delete Allcontent.R_50lastTick
    delete Allcontent.R_50rx1candlePc
    delete Allcontent.R_50rx3candlePc
    delete Allcontent.R_50rx4candlePc
    delete Allcontent.R_50rx5candlePc
    delete Allcontent.R_50stdDevcandle1
    delete Allcontent.R_50stdDevcandle2
    delete Allcontent.R_75frxDuration
    delete Allcontent.R_75frxDurationUnit
    delete Allcontent.R_75lastTick
    delete Allcontent.R_75rx1candlePc
    delete Allcontent.R_75rx2candlePc
    delete Allcontent.R_75rx3candlePc
    delete Allcontent.R_75rx4candlePc
    delete Allcontent.R_75rx5candlePc
    delete Allcontent.R_75stdDevcandle1
    delete Allcontent.R_75stdDevcandle2
    delete Allcontent.R_100frxDuration
    delete Allcontent.R_100frxDurationUnit
    delete Allcontent.R_100lastTick
    delete Allcontent.R_100rx1candlePc
    delete Allcontent.R_100rx2candlePc
    delete Allcontent.R_100rx3candlePc
    delete Allcontent.R_100rx4candlePc
    delete Allcontent.R_100rx5candlePc
    delete Allcontent.R_100stdDevcandle1
    delete Allcontent.R_100stdDevcandle2
    delete Allcontent.frxAUDUSDfrxDuration
    delete Allcontent.frxAUDUSDfrxDurationUnit
    delete Allcontent.frxAUDUSDlastTick
    delete Allcontent.frxAUDUSDrx1candlePc
    delete Allcontent.frxAUDUSDrx2candlePc
    delete Allcontent.frxAUDUSDrx3candlePc
    delete Allcontent.frxAUDUSDrx4candlePc
    delete Allcontent.frxAUDUSDrx5candlePc
    delete Allcontent.frxAUDUSDstdDevcandle1
    delete Allcontent.frxAUDUSDstdDevcandle2
    delete Allcontent.frxEURUSDfrxDuration
    delete Allcontent.frxEURUSDfrxDurationUnit
    delete Allcontent.frxEURUSDlastTick
    delete Allcontent.frxEURUSDrx1candlePc
    delete Allcontent.frxEURUSDrx2candlePc
    delete Allcontent.frxEURUSDrx3candlePc
    delete Allcontent.frxEURUSDrx4candlePc
    delete Allcontent.frxEURUSDrx5candlePc
    delete Allcontent.frxEURUSDstdDevcandle1
    delete Allcontent.frxEURUSDstdDevcandle2
    delete Allcontent.frxGBPUSDfrxDuration
    delete Allcontent.frxGBPUSDfrxDurationUnit
    delete Allcontent.frxGBPUSDlastTick
    delete Allcontent.frxGBPUSDrx1candlePc
    delete Allcontent.frxGBPUSDrx2candlePc
    delete Allcontent.frxGBPUSDrx3candlePc
    delete Allcontent.frxGBPUSDrx4candlePc
    delete Allcontent.frxGBPUSDrx5candlePc
    delete Allcontent.frxGBPUSDstdDevcandle1
    delete Allcontent.frxGBPUSDstdDevcandle2
    delete Allcontent.frxNZDUSDfrxDuration
    delete Allcontent.frxNZDUSDfrxDurationUnit
    delete Allcontent.frxNZDUSDlastTick
    delete Allcontent.frxNZDUSDrx1candlePc
    delete Allcontent.frxNZDUSDrx2candlePc
    delete Allcontent.frxNZDUSDrx3candlePc
    delete Allcontent.frxNZDUSDrx4candlePc
    delete Allcontent.frxNZDUSDrx5candlePc
    delete Allcontent.frxNZDUSDstdDevcandle1
    delete Allcontent.frxNZDUSDstdDevcandle2
    delete Allcontent.frxUSDCADfrxDuration
    delete Allcontent.frxUSDCADfrxDurationUnit
    delete Allcontent.frxUSDCADlastTick
    delete Allcontent.frxUSDCADrx1candlePc
    delete Allcontent.frxUSDCADrx2candlePc
    delete Allcontent.frxUSDCADrx3candlePc
    delete Allcontent.frxUSDCADrx4candlePc
    delete Allcontent.frxUSDCADrx5candlePc
    delete Allcontent.frxUSDCADstdDevcandle1
    delete Allcontent.frxUSDCADstdDevcandle2
    delete Allcontent.frxUSDCHFfrxDuration
    delete Allcontent.frxUSDCHFfrxDurationUnit
    delete Allcontent.frxUSDCHFlastTick
    delete Allcontent.frxUSDCHFrx1candlePc
    delete Allcontent.frxUSDCHFrx2candlePc
    delete Allcontent.frxUSDCHFrx3candlePc
    delete Allcontent.frxUSDCHFrx4candlePc
    delete Allcontent.frxUSDCHFrx5candlePc
    delete Allcontent.frxUSDCHFstdDevcandle1
    delete Allcontent.frxUSDCHFstdDevcandle2
    delete Allcontent.frxUSDJPYfrxDuration
    delete Allcontent.frxUSDJPYfrxDurationUnit
    delete Allcontent.frxUSDJPYlastTick
    delete Allcontent.frxUSDJPYrx1candlePc
    delete Allcontent.frxUSDJPYrx2candlePc
    delete Allcontent.frxUSDJPYrx3candlePc
    delete Allcontent.frxUSDJPYrx4candlePc
    delete Allcontent.frxUSDJPYrx5candlePc
    delete Allcontent.frxUSDJPYstdDevcandle1
    delete Allcontent.frxUSDJPYstdDevcandle





    output = Allcontent;
    console.log('Filtered Strat File:' + JSON.stringify(output))


    callback();
}