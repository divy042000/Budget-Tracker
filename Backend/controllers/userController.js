const axios=require('axios');


exports.postUserDetails=async(req,res,next);
{
    try{
     const userData=req.body;
   const data  ={
    usernames:userData.username,
    email:userData.email,
    password:userData.password,
    profile:{
        firstName:userData.firstName,
        lastName:userData.lastName,
    }
   }

    const response=await axios.post('',{
        headers:{

        }

    })
    } 
    catch
    {

    }
}