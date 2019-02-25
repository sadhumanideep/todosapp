/*
Author: Manideep
File Version:0.1
Description: 1.Defines user schema,
             2.Exports model for creating data as per schema

*/

const mongoose=require('mongoose');

let userSchema=mongoose.Schema({
    _userId:mongoose.Schema.Types.ObjectId,
    username:{type:String,require:true},
    password:{type:String,require:true}
});

module.exports=mongoose.model('user',userSchema);