const axios=require('axios');


// exports.postUserDetails=async(req,res,next);
// {
//     try{
//      const userData=req.body;
//    const data  ={
//     usernames:userData.username,
//     email:userData.email,
//     password:userData.password,
//     profile:{
//         firstName:userData.firstName,
//         lastName:userData.lastName,
//     }
//    }

//     const response=await axios.post('',{
//         headers:{

//         }

//     })
//     } 
//     catch
//     {

//     }
// }

exports.postUserPayInfo=async(req,res,next);
{
 try{
   const userPayData=req.body;
   const userInfo={
    category:userPayData.category,
    mode:userPayData.mode,
    amount:userPayData.amount,
    date:userPayData.date,
    time:userPayData.time,
    receiver:userPayData.receiver,
    payer:userPayData.payer
   }
   const apiUrl=``;
   axios.post(apiUrl, postData)
  .then(response => {
    // Handle the successful response here.
    console.log('Response data:', response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request.
    console.error('Error:', error);
  });
 }
 catch(error){
    console.error(error);
 }   
}
