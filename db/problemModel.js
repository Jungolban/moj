const mongo = require('mongoose');

const problemSchema = new mongo.Schema({
    id : {type: Number, default:0, index:true},
    title :{type: String, required: true},
    contents : {type: String, required: true},
    answer : {type: String, required: true},
    classification : {type: String, required: true},
    submissions : {type: Number, default: 0},
    correct : {type: Number, default : 0},
    author : {type: mongo.SchemaTypes.ObjectId, ref:'User'}
});

