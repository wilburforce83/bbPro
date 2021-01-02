const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  ipcMain
} = require('electron')
const shell = require('electron').shell
const settings = require('electron-settings');

var fs = require('fs')

var strat;

var fileName;
var saveOptions;


var content;
const electronLocalshortcut = require('electron-localshortcut');





// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


function createWindow() {
  // Create the browser window.
  var electron = require('electron');
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  let width = mainScreen['size']['width'];
  let height = mainScreen['size']['height'];
  console.log(width, height);
  var zoomFactor;
  if (height <= 768) {
    zoomFactor = 0.73;
  } else {
    zoomFactor = 1;
  }

  console.log(zoomFactor)

  win = new BrowserWindow({
    parent: true,
    show: false,
    frame: true,
    minWidth: 1300,
    minHeight: 730,
    maximizable: true,
    webviewTag: true,
    webPreferences: {
      zoomFactor: zoomFactor,
    },
    icon: __dirname + '/Icon/icon.ico'
  })
  //Create welcome window to add API keys, if none are saved to be called AFTER app.on READY with .then

  win.maximize()

  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  win.loadFile('src/home.html')

  win.once('ready-to-show', () => {

    win.show()
  })
  // Open the DevTools.
  //win.webContents.openDevTools()



  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  electronLocalshortcut.register(win, 'Ctrl+]', () => {
    win.webContents.openDevTools()
  });





  var menu = Menu.buildFromTemplate([

    // { role: 'appMenu' }
    ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [{
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    }] : []),

    {
      label: 'File',
      submenu: [
       
        {
          label: 'Create Account',
          click() {
            shell.openExternal('https://record.binary.com/_HwuMZEzKxUO6tyDIijdDK2Nd7ZgqdRLk/1/')
          }
        },
        {
          label: 'Binary.com',
          click() {
            shell.openExternal('https://www.binary.me/')
          }
        },
        {
          label: 'BinaryBotTrading.com',
          click() {
            shell.openExternal('https://www.binarybottrading.com/')
          }
        },







        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click() {
            settings.set('run', {
              run: false,

            })
            settings.set('tradeInProgress', {
              tradeInProgress: false,

            })
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Strategy',
      submenu: [{
          label: 'Advanced Settings',
          click() {
            strat = 'options';
            createOptionsWindow();

          }
        },



        {
          type: 'separator'
        },
        {
          label: 'Technical Triggers',

          submenu: [


            {
              label: 'CCI Trends/Reversals',
              click() {
                strat = 'CCItrend';
                createOptionsWindow();
                // place open new window to technical indicator settings
              }
            },

            {
              label: 'Bollinger Bands',
              click() {
                strat = 'BBands';
                createOptionsWindow();
                // place open new window to technical indicator settings
              }
            },
            {
              label: 'Triple EMA',
              click() {
                strat = 'tripleEMA';
                createOptionsWindow();
                // place open new window to technical indicator settings
              }
            },
            {
              label: 'M.A.C.D',
              click() {
                strat = 'macd';
                createOptionsWindow();

              }
            },
            {
              label: 'Custom Moving Averages',
              click() {
                strat = 'customMA';
                createOptionsWindow();

              }
            },
            {
              label: 'williamsR',
              click() {
                strat = 'williamsR';
                createOptionsWindow();

              }
            },
            {
              label: 'TRIX',
              click() {
                strat = 'TRIX';
                createOptionsWindow();

              }
            },
          ]
        },

        {
          label: 'Price Action Triggers',

          submenu: [

            {
              label: 'Pattern Detection',
              click() {
                strat = 'candlePattern';
                createOptionsWindow();

              }
            },

            {
              label: 'Support and Resistance',
              click() {
                strat = 'supportResist';
                createOptionsWindow();

              }
            },
            {
              label: 'Price Action',
              click() {
                strat = 'priceAction';
                createOptionsWindow();
                // place open new window to technical indicator settings
              }
            },
          ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Strategy Builder',
          sublabel: 'Powerful and Easy',
          click() {
            strat = 'multi';
            createBuilderWindow();

          }
        },
      ]
    },

    {
      label: 'Windows',
      submenu: [
       
        {
          label: 'Trading Data',
          click() {
            createDataWindow()
          }
        },
        /*
                {
          label: 'Signal Map',
          click() {
            createSignalsWindow()
          }
        },
        */
        {
          label: 'Lite Webtrader',
          click() {
            shell.openExternal('https://www.binarybottrading.com/trade')
          }
        },

       
      ]
    },

    {
      label: 'View',
      submenu: [
        // { role: 'reload' },
        {
          role: 'forcereload'
        },
        // { role: 'toggledevtools' },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    }

    /*
    ,





    {

      label: 'Developer Tools',
      submenu: [{
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      ]
    }
    //*/
  ])

  Menu.setApplicationMenu(menu);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)









// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    settings.set('run', {
      run: false,

    })
    settings.set('tradeInProgress', {
      tradeInProgress: false,

    })
    settings.set('lockauto.lockauto', 0)
    app.quit()
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }





})







//wait for close app event from home./html

ipcMain.on('close-me', (evt, arg) => {

  settings.set('run', {
    run: false,

  })
  settings.set('tradeInProgress', {
    tradeInProgress: false,

  })
  app.quit()
})




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// Advance Settings window called form mainmenu

let options


function createOptionsWindow() {
  // Create the browser window.


  options = new BrowserWindow({
    show: false,
    frame: false,
    width: 775,
    height: 700,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  options.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  options.loadFile('src/strat_settings/' + strat + '.html')

  options.once('ready-to-show', () => {
    options.show()
  })
  // Open the DevTools.
  //options.webContents.openDevTools()



  // Emitted when the window is closed.
  options.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    options = null
  })
}


let DataLog


function createDataWindow() {
  // Create the browser window.


  DataLog = new BrowserWindow({
    show: true,
    frame: true,
    width: 1200,
    height: 500,
    maximizable: true,
    resizable: true,
    icon: __dirname + '/Icon/icon.ico',
    webPreferences: {
      webSecurity: false
    }
  })
  DataLog.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  DataLog.loadFile('src/yourdata.html')

  DataLog.once('ready-to-show', () => {
    DataLog.show()
  })
  // Open the DevTools.
  //DataLog.webContents.openDevTools()



  // Emitted when the window is closed.
  DataLog.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    DataLog = null
  })
}

let builder


function createBuilderWindow() {
  // Create the browser window.


  builder = new BrowserWindow({
    show: false,
    frame: false,
    width: 800,
    height: 750,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  builder.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  builder.loadFile('src/strat_settings/multi.html')

  builder.once('ready-to-show', () => {
    builder.show()
  })
  // Open the DevTools.
  //builder.webContents.openDevTools()



  // Emitted when the window is closed.
  builder.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    builder = null
  })
}



// Create Mini Trader window always on top!



let miniTrader


function createMiniTraderWindow() {
  // Create the browser window.


  miniTrader = new BrowserWindow({
    show: false,
    frame: false,
    alwaysOnTop: true,
    width: 700,
    height: 265,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  miniTrader.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  miniTrader.loadFile('src/miniTrader.html')

  miniTrader.once('ready-to-show', () => {
    miniTrader.show()
  })
  // Open the DevTools.
  // miniTrader.webContents.openDevTools()



  // Emitted when the window is closed.
  miniTrader.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    miniTrader = null
  })
}

let statsWin


function createStatsTraderWindow() {
  // Create the browser window.


  statsWin = new BrowserWindow({
    show: false,
    frame: true,
    alwaysOnTop: false,
    width: 500,
    height: 650,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  statsWin.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  statsWin.loadFile('src/Statistics.html')

  statsWin.once('ready-to-show', () => {
    statsWin.show()
  })
  // Open the DevTools.
  // statsWin.webContents.openDevTools()



  // Emitted when the window is closed.
  statsWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    statsWin = null
  })
}


let picoTrader


function createPicoTraderWindow() {
  // Create the browser window.


  picoTrader = new BrowserWindow({
    show: false,
    frame: false,
    alwaysOnTop: true,
    width: 300,
    height: 65,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  picoTrader.setMenu(null)

  picoTrader.loadFile('src/pico.html')

  picoTrader.once('ready-to-show', () => {
    picoTrader.show()
  })
  // Open the DevTools.

  // Emitted when the window is closed.
  picoTrader.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    picoTrader = null
  })
}



// Create Signals window always on top!

let signalWin


function createSignalsWindow() {
  // Create the browser window.


  signalWin = new BrowserWindow({
    show: false,
    frame: true,
    alwaysOnTop: true,
    width: 725,
    height: 625,
    maximizable: false,
    resizable: false,
    icon: __dirname + '/Icon/icon.ico'
  })
  signalWin.setMenu(null)
  // and load the index.html of the app.
  //
  //win.loadFile('src/home.html')
  signalWin.loadFile('src/signals.html')

  signalWin.once('ready-to-show', () => {
    signalWin.show()
  })
  // Open the DevTools.
  // signalWin.webContents.openDevTools()



  // Emitted when the window is closed.
  signalWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    signalWin = null
  })
}
