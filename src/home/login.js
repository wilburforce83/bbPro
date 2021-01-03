// OAuth log in functions for binary.com and deriv

//Refactor for electron!!!!!

// OAuth link
var account_array = [];
var param_array =[];
var authWindowURI = "";
var params = {};
//Check and parse Oauth Parameters through to Object "OauthData"

function login() {
  // Check for OAuth parameter and collect into vars
  

  authWindowURI = authWindow.webContents.getURL().toString();
  console.log(authWindowURI);

  while (!authWindowURI.includes("binarybottrading.com")) {
    // Add in a break for if client moves to the registration page, and load the open account link in external window
    authWindowURI = authWindow.webContents.getURL().toString();

    if (authWindowURI.includes("signup")) {
      console.log(authWindowURI);

      shell.openExternal(
        "https://record.binary.com/_HwuMZEzKxUO6tyDIijdDK2Nd7ZgqdRLk/1/"
      );
      authWindow.close();
      authWindow = null;
      break;
    }
   
  }
  authWindowURI = authWindow.webContents.getURL().toString();
  param_array = authWindowURI.split("?")[1].split("&");
  console.log(param_array);

  collectLogin();
  
}

function postLogin() {
  // tokenToBeUsed = account_1.token;

  let selectedaccount = document.getElementById("accountSelect").options[
    document.getElementById("accountSelect").selectedIndex
  ].text;
  let temptoken = document.getElementById("accountSelect").value;
  settings.set("tokenToBeUsed.tokenToBeUsed", temptoken);
  document
    .getElementById("notifyme")
    .insertAdjacentHTML(
      "afterbegin",
      '<p style="color:#8c01a0">Account switched to ' +
        selectedaccount +
        ", reauthorizing!</p>"
    );

  authorise();
  console.log("post login on account change");
}

function startupLogin() {
  let accArr = settings.get("account.array");
  let accList = settings.get("account.list");

  for (var i = 0; i < accArr.length; i++) {
    var opt = accArr[i];
    var el = document.createElement("option");
    el.textContent = opt.account;
    el.value = opt.token;
    document.getElementById("accountSelect").appendChild(el);
  }

  settings.set("tokenToBeUsed.tokenToBeUsed", accArr[0].token);

  authorise();
}


function collectLogin () {

  try {
    for (var i in param_array) {
      x = param_array[i].split("=");
      params[x[0]] = x[1];
    }
    console.log(params);
    OauthData = params;

    let noOfAccounts = (ObjectLength(OauthData) - 1) / 3;
    console.log("Returned Object length = " + ObjectLength(OauthData));
    console.log("Number of accounts found = " + noOfAccounts);
    account_array = [];
    for (var i = 0; i < noOfAccounts; ++i) {
      account_array[i] = {
        account: makeArrayBySuffix(OauthData, i + 1)[0],
        token: makeArrayBySuffix(OauthData, i + 1)[1],
      };
    }

    console.log(account_array);

    account_list = makeArrayByPrefix(OauthData, "acc");

    console.log(account_list);

    settings.set("account.array", account_array);
    settings.set("account.list", account_list);

    for (var i = 0; i < account_array.length; i++) {
      var opt = account_array[i];
      var el = document.createElement("option");
      el.textContent = opt.account;
      el.value = opt.token;
      document.getElementById("accountSelect").appendChild(el);
    }
    console.log("Default token: " + account_array[0].token);
    settings.set("tokenToBeUsed.tokenToBeUsed", account_array[0].token);

    authWindow.close();
    authWindow = null;

    authorise();
    checkDefaults();
    app.relaunch();

    settings.set("run", {
      run: false,
    });
    settings.set("lockauto", {
      lockauto: 0,
    });
    settings.set("tradeInProgress", {
      tradeInProgress: false,
    });
    settings.set("autoTrade", {
      autoTrade: true,
    });

    terms = null;
  app.quit(); //or any message
  } catch (error) {
    console.log(error);

    authWindow.close();
    authWindow = null;

    settings.set("run", {
      run: false,
    });
    settings.set("lockauto", {
      lockauto: 0,
    });
    settings.set("tradeInProgress", {
      tradeInProgress: false,
    });
    settings.set("autoTrade", {
      autoTrade: true,
    });

    terms = null;
    document
      .getElementById("notifyme")
      .insertAdjacentHTML(
        "afterbegin",
        '<p style="color:#8c01a0">OAuth Error: ' +
          error +
          ", please type 'Ctrl + ]' then click on 'console', screenshot the app and console output send details to wilburforce83@gmail.com</p>"
      );
  }



}


const sleep = (milliseconds) => {  //await sleep(1000)
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
