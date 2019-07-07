// move market symbol buttons to here to tidy up home.html


function symbolBtns() {

if (settings.get('changesymAuto.changesymAuto') === false) {

    $('#autosym').removeClass('orange');
    $('#autosymFX').removeClass('orange');
} else {

    $('#autosym').addClass('orange');
    $('#autosymFX').addClass('orange');

}

if (settings.get('symbol.symbol') === 'R_10') {
    $('#10sym').addClass('disabled');
    $('#10sym').addClass('green');
    $('#autosym, #25sym, #50sym, #75sym, #100sym, #bullsym, #bearsym').removeClass('disabled');
    $('#autosym, #25sym, #50sym, #75sym, #100sym, #bullsym, #bearsym').removeClass('green');

}
if (settings.get('symbol.symbol') === 'R_25') {
    $('#25sym').addClass('disabled');
    $('#25sym').addClass('green');
    $('#10sym, #autosym, #50sym, #75sym, #100sym, #bullsym, #bearsym').removeClass('disabled');
    $('#10sym, #autosym, #50sym, #75sym, #100sym, #bullsym, #bearsym').removeClass('green');
}

if (settings.get('symbol.symbol') === 'R_50') {
    $('#50sym').addClass('disabled');
    $('#50sym').addClass('green');
    $('#10sym, #25sym, #autosym, #75sym, #100sym, #bullsym, #bearsym').removeClass('disabled');
    $('#10sym, #25sym, #autosym, #75sym, #100sym, #bullsym, #bearsym').removeClass('green');
}
if (settings.get('symbol.symbol') === 'R_75') {
    $('#75sym').addClass('disabled');
    $('#75sym').addClass('green');
    $('#10sym, #25sym, #50sym, #autosym, #100sym, #bullsym, #bearsym').removeClass('disabled');
    $('#10sym, #25sym, #50sym, #autosym, #100sym, #bullsym, #bearsym').removeClass('green');
}
if (settings.get('symbol.symbol') === 'R_100') {
    $('#100sym').addClass('disabled');
    $('#100sym').addClass('green');
    $('#10sym, #25sym, #50sym, #75sym, #autosym, #bullsym, #bearsym').removeClass('disabled');
    $('#10sym, #25sym, #50sym, #75sym, #autosym, #bullsym, #bearsym').removeClass('green');
}
if (settings.get('symbol.symbol') === 'RDBULL') {
    $('#bullsym').addClass('disabled');
    $('#bullsym').addClass('green');
    $('#10sym, #25sym, #50sym, #75sym, #100sym, #autosym, #bearsym').removeClass('disabled');
    $('#10sym, #25sym, #50sym, #75sym, #100sym, #autosym, #bearsym').removeClass('green');
}
if (settings.get('symbol.symbol') === 'RDBEAR') {
    $('#bearsym').addClass('disabled');
    $('#bearsym').addClass('green');
    $('#10sym, #25sym, #50sym, #75sym, #100sym, #bullsym, #autosym').removeClass('disabled');
    $('#10sym, #25sym, #50sym, #75sym, #100sym, #bullsym, #autosym').removeClass('green');
}




// FOREX 


if (settings.get('symbol.symbol') === 'frxUSDCHF') {
    $('#usdchf').addClass('disabled');
    $('#usdchf').addClass('green');
    $('#autosymFX, #eurusd, #usdjpy, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('disabled');
    $('#autosymFX, #eurusd, #usdjpy, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('green');

}
if (settings.get('symbol.symbol') === 'frxEURUSD') {
    $('#eurusd').addClass('disabled');
    $('#eurusd').addClass('green');
    $('#usdchf, #autosymFX, #usdjpy, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('disabled');
    $('#usdchf, #autosymFX, #usdjpy, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('green');
}

if (settings.get('symbol.symbol') === 'frxUSDJPY') {
    $('#usdjpy').addClass('disabled');
    $('#usdjpy').addClass('green');
    $('#usdchf, #eurusd, #autosymFX, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('disabled');
    $('#usdchf, #eurusd, #autosymFX, #gbpusd, #audusd, #nzdusd, #usdcad').removeClass('green');
}
if (settings.get('symbol.symbol') === 'frxGBPUSD') {
    $('#gbpusd').addClass('disabled');
    $('#gbpusd').addClass('green');
    $('#usdchf, #eurusd, #usdjpy, #autosymFX, #audusd, #nzdusd, #usdcad').removeClass('disabled');
    $('#usdchf, #eurusd, #usdjpy, #autosymFX, #audusd, #nzdusd, #usdcad').removeClass('green');
}
if (settings.get('symbol.symbol') === 'frxAUDUSD') {
    $('#audusd').addClass('disabled');
    $('#audusd').addClass('green');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #autosymFX, #nzdusd, #usdcad').removeClass('disabled');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #autosymFX, #nzdusd, #usdcad').removeClass('green');
}
if (settings.get('symbol.symbol') === 'frxNZDUSD') {
    $('#nzdusd').addClass('disabled');
    $('#nzdusd').addClass('green');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #audusd, #autosymFX, #usdcad').removeClass('disabled');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #audusd, #autosymFX, #usdcad').removeClass('green');
}
if (settings.get('symbol.symbol') === 'frxUSDCAD') {
    $('#usdcad').addClass('disabled');
    $('#usdcad').addClass('green');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #audusd, #nzdusd, #autosymFX').removeClass('disabled');
    $('#usdchf, #eurusd, #usdjpy, #gbpusd, #audusd, #nzdusd, #autosymFX').removeClass('green');
}

}