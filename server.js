var express 		= require('express');
var mongoose 		= require('mongoose');
var bodyParser  	= require('body-parser');
var Schema 			= mongoose.Schema;
var app 			= express();
mongoose.Promise 	= Promise;
var promise = mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
});
var Country     = require('./models/country.js')
var State       = require('./models/state.js')
var city        = require('./models/city.js')
 // When successfully connected
	mongoose.connection.on('connected', function () {  
	  console.log('Mongoose default connection open to ');
	});
// create application/json parser 
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.post('/upload',function(req,res){
	var newcity 		= new city();
	newcity.city_name  = req.body.city_name ;
	newcity.save(function(err,city){
		if(err){
			return console.log(err);
		}
		newstate 			 = new State();
		newstate.state_name  = req.body.state_name ;

		var citys = [{_id : newcity._id}];

		newstate.city_list   = citys;

		newstate.save(function(err,state){
			if(err){
				return console.log(err);
			}
			newcountry  = new Country();
			newcountry.country_name = req.body.country_name ;
			var state = [{_id : newstate._id}]
			newcountry.state_list = state
			newcountry.save(function(err,country){
				if(err){
					return console.log(err);
				}else{
					console.log("success");
					res.send({data:country});
				}

			})
		})
	})
})
app.get('/getCountry',function(req,res){
	console.log("req.body.country_name",req.query.country_name);
	Country.find({country_name : req.query.country_name}).populate('state_list._id').exec(function(err,result){
		if(err){
			return console.log(err);
		}else{
			res.send({data:result});
		}
	})
})
app.get('/getdata',function(req,res){
	 console.log(req.query.name);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})