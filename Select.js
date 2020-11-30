var mysql = require('mysql');
var http = require ('http');

var con = mysql.createConnection({
  host: "localhost",
  user     : 'root',
  password : '',
  database : 'products'
});

var json;
con.connect(function(err) {
  if (err) throw err;
 console.log("Connected!");
//create a server object:

            con.query("SELECT * FROM orders", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                var obj = [];
                for (var i = 0; i < result.length; i++){

                    var kk = {};           // Object
                    kk['odertitle'] = result[i].odertitle ;
					kk['description']=result[i].description ;
					kk['price']=result[i].price ;
				    kk['quantity']=result[i].quantity ;
					kk['category']=result[i].category ;
                    obj.push(kk);
                
                }
                
                json= JSON.stringify(obj, undefined, 2); 
                
              })

              let app = http.createServer((req, res) => {
                // Set a response type of plain text for the response
                res.writeHead(200, {'Content-Type': 'text/plain'});
            
                // Send back a response and end the connection
                res.end(json);
            });
            
            // Start the server on port 3000
            app.listen(3000, '192.168.0.5');



});



