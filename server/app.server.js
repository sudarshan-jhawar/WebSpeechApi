var express = require('express');
var path = require('path');
var jsonFile = require('jsonfile');
var bodyParser = require('body-parser');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('./app'));

app.get('/images', function (req, res) {
    res.sendFile(path.join(__dirname, "/data/images.json"));
});

app.get('/settings', function (req, res) {
    res.sendFile(path.join(__dirname, "/data/settings.json"));
});

app.post('/images', function (req, res) {
    jsonFile.writeFileSync(path.join(__dirname, "/data/images.json"), req.body);
    res.sendStatus(200);
});
app.post('/settings', function (req, res) {
    jsonFile.writeFileSync(path.join(__dirname, "/data/settings.json"), req.body);

    res.sendStatus(200);
});

app.listen('3000', function () {
    console.log("Listening to Request on port : 3000");
});