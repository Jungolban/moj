const mongo = require('mongoose');

const noticeSchema = new mongo.Schema({
    title: {type:String, require:true, index:true},
    content: {type:String, require:true},
    date: {type:Date, default: Date.now()}
});

module.exports = mongo.model('Notice', noticeSchema);
