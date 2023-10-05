var hana = require('@sap/hana-client');
var express = require('express');
var app = express();
var connOptions = {
    serverNode: 'f8d1c3bf-fec8-4741-8d5d-d47239888d18.hana.trial-us10.hanacloud.ondemand.com:443',
    UID: 'DBADMIN',
    PWD: 'Tyagi@0011',
    encrypt: true,
    sslValidateCertificate: 'false',
};

app.get('/', function (req, res) {
    console.log('Starting connection...');
    var connection = hana.createConnection();
    
    connection.connect(connOptions, function (err) {
        if (err) {
            return console.error(err);
        }
        
        console.log('Connected to the database');
        
        // SQL query to fetch data from the "Demo_HANA" table
        var sql = 'SELECT * FROM Demo_HANA';
        
        // Execute the SQL query
        connection.exec(sql, function (err, result) {
            if (err) {
                connection.disconnect();
                return console.error(err);
            }
            
            // Process the query result here
            console.log('Query result:', result);
            
            // Send the query result in the response
            res.json(result);
            
            // Disconnect from the database after fetching data
            connection.disconnect();
        });
    });
});

app.listen(8080, function () {
    console.log('App running on port 8080');
});
