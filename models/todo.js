//here is where we define what our database should expect from us
const mongoose = require('mongoose');
//schema is how we define what goes into our database
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    "todo": String,
    //these are going to expect strings, but you could put arrays etc
    "status": String
});

const db = mongoose.model('todos', todoSchema);
module.exports = db;