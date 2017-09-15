var mongoose 	= require('mongoose');
	Schema 		= mongoose.Schema
var country 	= mongoose.Schema({
	country_name        : {type:String,required: true},
	state_list 			: [
	{_id:{type 	: Schema.Types.ObjectId, ref 	: 'State'}}]
});
//methods ======================
//create the model for users and expose it to our app
module.exports = mongoose.model('Country', country);