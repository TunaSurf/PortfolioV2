var express = require("express"),
    bodyParser = require("body-parser"),
    projectList = require("./models/projectList");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res) {
    res.render("home", { projectList: projectList, home: true, about: false });
});

app.get("/about", function(req, res) {
    res.render("about", { home: false, about: true });
});


app.listen(3000, function() {
    console.log("Portfolio server has started");
});