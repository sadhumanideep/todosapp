/*
Author: Manideep
File Version:0.1
Description: 1.Handles routes for todos,
             2.creates todos according to CRUD operation,
             3.stores in mongoDb with collection Name "todos"
             4.returns respose either success 201 or error 500 with message
*/

const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Todo=require('../models/todo');
const auth=require('../auth/auth');


router.get('/',auth,(req,res)=>{

    Todo.find({_userId:req.body._userId}).exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    })
    
});

router.get('/:todoID',auth,(req,res)=>{

    let todoId=req.params.todoID;

    Todo.find({_userId:req.body._userId,_id:todoId}).exec()
    .then(doc=> 
        {
            if(doc)
            {
                console.log(doc);
                res.status(200).json(doc);
            }
            else
            {
              res.status(404).json({
                  message:'No data found'
              })  
            }
            
        })
    .catch(err=> 
        {
            console.log(err);
            res.status(500).json(err);
        });
  
    
    
});

router.post('/',auth,(req,res)=>{

    console.log("user"+req.body._userId);
    let todo=new Todo({
         _userId:req.body._userId,
        _id:new mongoose.Types.ObjectId(),
        todoName:req.body.todoName,
        todoAuthor:req.body.todoAuthor,
        todoDescription:req.body.todoDescription

    });
  
    todo.save()
    .then(result=>
        {
            console.log(result);
            res.status(200).json({
                'message':'from post method',
                todo:todo
            });
        })
    .catch(error=> 
        {
            console.log(error);
            res.status(500).json({
                error:error
            });
    })

    console.log(req.body.todId);

  
});

router.patch('/:todoId',auth,(req,res)=>{
 let todoId=req.params.todoId;
let updateobj={};

for(let ops of req.body)
{
  
    updateobj[ops.propName]=ops.value
}
Todo.update({_id:todoId},{$set:updateobj}).exec()
.then(result=>res.status(200).json(result))
.catch(err=>res.status(500).json({error:err}))
 
});

router.delete('/:todoId',auth,(req,res)=>{

    let todoId=req.params.todoId;
    Todo.remove({_id:todoId}).exec()
    .then(result=>res.status(200).json(result))
    .catch(err=>res.status(500).json({error:err}));
    

});

module.exports=router;


