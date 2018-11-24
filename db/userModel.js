const mongo = require('mongoose');

const problemModel = require('./problemModel');
const problemBookModel = require('./problemBookModel');
const contest = require('./contest');

const userSchema = new mongo.Schema({
    ID:{type:String, required:true, unique:true, index: true},
    PW:{type:String, required:true},
    solvedProblems: [{type:mongo.SchemaTypes.ObjectId, ref:'Problem'}],
    solvedProblemsAmount:{type:Number, default:0},
    solvedProblemBooks: [{type:mongo.SchemaTypes.ObjectId, ref:'ProblemBook'}],
    wrongProblems: [{type:mongo.SchemaTypes.ObjectId, ref:'Problem'}],
    winningContest : [{type:mongo.SchemaTypes.ObjectId, ref: 'contest'}],
    runnerUpContest : [{type:mongo.SchemaTypes.ObjectId, ref: 'contest'}],
    awards : [{type: String}],
    markedProblems: [{ type: mongo.SchemaTypes.ObjectId, ref: 'Problem' }],
    markedProblemBooks: [{ type: mongo.SchemaTypes.ObjectId, ref: 'ProblemBook' }]
});

module.exports = new mongo.Model('User',userSchema);