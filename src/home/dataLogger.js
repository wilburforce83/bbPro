function logData() {

    var fs = require('fs');
   
    var location = settings.file().slice(0, -8)
    var newLine = "\r\n";

    var fields = ['Date', 'Day', 'Time', 'Strategy', 'Trade Duration (s)', 'CALL / PUT', 'Market', 'Stake','Win / Loss', 'P / L', 'Account', 'Data Source'];

    

    /*
        [{
            'Date': '',
            'Day': '',
            'Time': '',
            'Strategy': '',
            'Trade Duration (s)': '',
            'CALL / PUT': '',
            'Market': '',
            'Stake': '',
            'Win / Loss': '',
            'P / L': '',
            'Account': '',
            'Data Source': ''
        }];

        */

    var toCsv = settings.get('billyBig.data');
  

    if (!settings.get('billyBig.data').includes("undefined")) {
        console.log("Logged data okay!")
        fs.stat(location + 'bbtrader_history.csv', function (err, stat) {
            if (err == null) {
                console.log('File exists');
    
                //write the actual data and end with newline
                var csv = toCsv + newLine;
    
                fs.appendFile(location + 'bbtrader_history.csv', csv, function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
            } else {
                //write the headers and newline
                console.log('New file, just writing headers');
                fields = (fields + newLine);
    
                fs.writeFile(location + 'bbtrader_history.csv', fields, function (err, stat) {
                    if (err) throw err;
                    console.log('file saved');
                });
            }
        })
    
    }
   
}