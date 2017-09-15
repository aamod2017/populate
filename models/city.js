var mongoose 	= require('mongoose');
	Schema 		= mongoose.Schema
var city 	    = mongoose.Schema({
	city_name        : {type:String,required: true}
});
//methods ======================
//create the model for users and expose it to our app
module.exports = mongoose.model('City', city);