const mongo = require('mongoose');

const problemBookSchmea = new mongo.Schema({
    id : {type: Number, default:0, index: true},
    name : {type: String, required: true, unique: true},
    classification : {type: String, required:true},
    problems : [{type:mongo.SchemaTypes.ObjectId, ref:'Problems'}]
});

module.exports = new mongo.Model('ProblemBook',problemBookSchmea);