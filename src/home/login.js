// OAuth log in functions for binary.com and deriv

//Refactor for electron!!!!!

// OAuth link
var authWindowURI = "https://binarybottrading.com/redirect/";
//Check and parse Oauth Parameters through to Object "OauthData"

function login() {
  // Check for OAuth parameter and collect into vars
  var params = {};

  authWindowURI = authWindow.webContents.getURL().toString();

  while (!authWindowURI.includes("?acct1=")) {
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

  if (authWindowURI.includes("?acct1=")) {
    var param_array = authWindowURI.split("?")[1].split("&");

    for (var i in param_array) {
      x = param_array[i].split("=");
      params[x[0]] = x[1];
    }
    console.log(params);
    OauthData = params;

    account_1 = {
      account: makeArrayBySuffix(OauthData, "1")[0],
      token: makeArrayBySuffix(OauthData, "1")[1],
    };
    account_2 = {
      account: makeArrayBySuffix(OauthData, "2")[0],
      token: makeArrayBySuffix(OauthData, "2")[1],
    };
    account_3 = {
      account: makeArrayBySuffix(OauthData, "3")[0],
      token: makeArrayBySuffix(OauthData, "3")[1],
    };

    account_array = [account_1, account_2, account_3];

    account_list = makeArrayByPrefix(OauthData, "acc");

    settings.set("account.array", account_array);
    settings.set("account.list", account_list);

    for (var i = 0; i < account_array.length; i++) {
      var opt = account_array[i];
      var el = document.createElement("option");
      el.textContent = opt.account;
      el.value = opt.token;
      document.getElementById("accountSelect").appendChild(el);
    }

    settings.set("tokenToBeUsed.tokenToBeUsed", account_1.token);

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
  }
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
