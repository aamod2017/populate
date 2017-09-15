var mongoose 	= require('mongoose');
	Schema 		= mongoose.Schema
var state 		= mongoose.Schema({
	state_name        : {type:String,required: true},
	city_list: [{_id:{
        type 	: Schema.Types.ObjectId, 
        ref 	: 'City'
    }}]
});
//methods ======================
//create the model for users and expose it to our app
module.exports = mongoose.model('State', state);