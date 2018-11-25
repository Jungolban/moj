const mongo = require('mongoose');

const postModel = new mongo.Schema({
    title: {type:String, require:true},
    content: {type:String, require:true},
    author: {type:mongo.SchemaTypes.ObjectId, ref:'User'},
    date: {type:Date, default:Date.now()},
    comment :[{
        author:{type:mongo.SchemaTypes.ObjectId, ref: 'User'},
        content:{type:String,require:true},
        date: {type:Date, default:Date.now()}
    }]
});

module.exports = mongo.model('Post', postModel);