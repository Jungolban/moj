const mongo = require('mongoose');

const contestSchema = new mongo.Schema({
    id : {type:Number, default:0, index:true},
    name : {type: String, required:true},
    organiser : {type: mongo.SchemaTypes.ObjectId, ref:'User'},
    winner : {type: mongo.SchemaTypes.ObjectId, ref:'User'},
    runnerUp : {type: mongo.SchemaTypes.ObjectId, ref: 'User'},
    problems : [{type: mongo.SchemaTypes.ObjectId, ref: 'Problem'}]
});

module.exports = mongo.model('Contest',contestSchema);