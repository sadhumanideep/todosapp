/*
Author: Manideep
File Version:0.1
Description: 1.Handles routes for users,
             2.creates  users according to CRUD operation,
             3.stores in mongoDb with collection Name "users"
             4.returns respose either success 201 or error 500 with message
             5.bcrypt module is installed to hash password 
             6.jwt tokens are returned for each login , 
                -further todo urls are authenticated with jwt tokens
*/


const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const User=require('../models/user');

router.post('/signup',(req,res)=>{

    User.find({username:req.body.username}).exec()
    .then(user=>{
        if(user.length>=1)
        {
            return res.status(201).json({
                message:"user exists",
                user:user
            })
        }
        else{
            bcrypt.hash(req.body.password,10, (err,hashpassword)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
            
                    });
                }
                else{
                    let user= new User({
                        _userId:mongoose.Types.ObjectId(),
                        username:req.body.username,
                        password:hashpassword
                
                    });
                
                    user.save()
                    .then(result=>{res.status(201).json(
                        {
                            message:"user created",
                            user:user
            
                        }
                    )})
                    .catch(err=>{
                        console.log(error);
                        res.status(500).json({
                            error:error
                        });
                    });
             
                }
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});

router.post('/signin',(req,res)=>{
    User.find({username:req.body.username}).exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(200).json({
                message:"no User found with the given usename"
            });
        }
        else
        {
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err)
                {
                    return res.status(500).json({
                        message:"auth failed"
                    });
                }
                if(result){
                    console.log(user[0].username+user[0]._userId);
                  let token=  jwt.sign({username:user[0].username,_userId:user[0]._userId},
                        "privatekey",
                        {expiresIn:"1hr"})
                    return res.status(200).json({
                        message:"auth success",
                        token:token
                    });
                }
                else{
                    return res.status(500).json({
                        message:"auth failed"
                    });
                }
            });
        }
    })
    .catch()
});

router.delete('/:userId',(req,res)=>{
    let userId=req.params.userId;
    User.remove({_userId:userId}).exec()
    .then(result=>{
        res.status(200).json({message:"user removed"});
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })

});

module.exports=router;