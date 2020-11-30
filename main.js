var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");

// connection to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "orders",
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");  
    var sql = "INSERT INTO orders (odertitle, description, price,quantity,category) VALUES ('test', 'test', 'test','test','test')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");


    http.createServer( (req, res) => {
        res.write("hello world"); //write a response to the client
        res.end(); //end the response
      }).listen(3030, "192.168.0.5");
  });
  
});


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Restful running on port 3000");
});

app.post("/register/", (req, res, next) => {
  var sqldata = req.body;
  var fullname = sqldata.fullname;
  var email = sqldata.email;
  var phone = sqldata.phone;
  var password = sqldata.password;

  con.query("SELECT * FROM user where email=?", [email], function (
    err,
    result,
    fields
  ) {
    con.on("error", (err) => {
      console.log("Error in Mysql", err);
    });

    if (result && result.length) {
      res.json("User already exist");
    } else {
      var sql = "INSERT INTO user (fullname,email,phone,password) VALUES (?,?)";
      var values = [fullname, email, phone, password];

      console.log(sql, values);

      con.query(sql, values, function (err, result, fields) {
        con.on("error", (err) => {
          console.log("[MySQL ERROR]", err);
        });
        res.json("Register Success");
        console.log("Registered" + sqldata);
      });
    }
  });
});



