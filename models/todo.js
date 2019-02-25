/*
Author: Manideep
File Version:0.1
Description: 1.Defines todo schema,
             2.Exports model for creating data as per schema

*/

const mongoose=require('mongoose');
const todoschema=mongoose.Schema({
    _userId:mongoose.Schema.Types.ObjectId,
    _id:mongoose.Schema.Types.ObjectId,
    todoName:String,
    todoAuthor:String,
    todoDescription:String
});

module.exports=mongoose.model('Todo',todoschema);