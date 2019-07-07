if (settings.has('stake.stake') === false) {


    function test_fs() {

        var location = settings.file() //.slice(0, -8)



        fs.readFile(location, 'utf-8', (err, data) => {
            if (err) {
                console.log("An error ocurred reading the file :" + err.message);
                return;
            }

            // Change how to handle the file content
            console.log("The file content is : " + data);
        });

    }
}