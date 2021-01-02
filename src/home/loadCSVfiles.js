function loadCSV() {

    var location = settings.file().slice(0, -8);
    var csv = location + 'bbtrader_history.csv';

    

	var csvtotable = new CsvToTable({
		csvFile: csv
	});
	csvtotable.run();

}