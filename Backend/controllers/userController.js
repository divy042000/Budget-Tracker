const axios = require("axios");
const _ = require('lodash');

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

exports.postUserPayInfo = async(req, res, next);
{
  try {
    const userPayData = req.body;
    const userInfo = {
      category: userPayData.category,
      mode: userPayData.mode,
      amount: userPayData.amount,
      date: 
      time: 
      receiver: userPayData.receiver,
      payer: userPayData.payer,
    };
    const apiUrl = ``;
    const postData = userInfo;
    axios
      .post(apiUrl, postData)
      .then((response) => {
        // Handle the successful response here.
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request.
        console.error("Error:", error);
      });
  } catch (error) {
    console.error(error);
  }
}

exports.getUserModePayInfo = async (req, res, next) => {
  try {
    const apiUrl = ``;
    const getData=req.query;
    const email=getData.email;
    const month=getData.month;
    const mode=getData.mode; 
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Response data:");
        const data = response.data;
        // Filter data based on person and month
        const filteredData = _.filter(data, { email: email, month: month });
        // Count the number of each mode of payment
        const countByMode = _.countBy(filteredData, 'mode');
 
        console.log('Count by mode of payment:', countByMode);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (err) {}
};
