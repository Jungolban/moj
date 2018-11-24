const mongo = require('mongoose');

const problem = require('./problemModel');

const contestSchema = new mongo.Schema({
    id : {type:Number, default:0, index:true},
    name : {type: String, required:true},
    organiser : {type: mongo.SchemaTypes.ObjectId, ref:'User'},
    winner : {type: mongo.SchemaTypes.ObjectId, ref:'User'},
    runnerUp : {type: mongo.SchemaTypes.ObjectId, ref: 'User'},
    problems : [problemModel]
});

module.exports = new mongo.Model('Contest',contestSchema);