/*
Author: Manideep
File Version:0.1
Description: 1.to verify the passed token in body of req so that it verfies the users,

*/

const jwttoken=require('jsonwebtoken');
module.exports=(req,res,next)=>{

    try
    {
    let decoded=jwttoken.verify(req.body.token,"privatekey");
    req.body.username=decoded.username;
    req.body._userId=decoded._userId;
    next();
    }
catch(error)
{
    return res.status(500).json({message:"auth failed"});
}

}