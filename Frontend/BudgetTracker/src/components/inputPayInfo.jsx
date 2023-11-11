import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import axios from 'axios';

export default function PaymentForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const handleModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      category: selectedCategory,
      paymentMode: paymentMode,
      amount: amount,
      receiverEmail: receiverEmail,
      senderEmail: senderEmail,
    };

    try {
      await axios.post("YOUR_API_ENDPOINT", formData).then((response) => {
        console.log(response.data);
      });
      setSelectedCategory("");
      setPaymentMode("");
      setAmount("");
      setReceiverEmail("");
      setSenderEmail("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Categories = [
    "Food",
    "Entertainment",
    "Rentals",
    "Clothes",
    "Utilities",
    "Transportation",
    "Healthcare",
    "Education",
    "Travel",
    "Groceries",
    "Personal Care",
    "Home Maintenance",
    "Electronics",
    "Gifts/Donations",
    "Insurance",
    "Dining Out",
    "Hobbies",
    "Subscriptions",
    "Miscellaneous",
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 1,
        width: "40ch",
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="on"
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Categories}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => {
          setSelectedCategory(newValue);
        }}
        sx={{
          cursor: "pointer",
          fontWeight: 900,
          m: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00BFFF",
            },
          },
          "& .MuiSelect-select": {
            padding: "10px",
            fontSize: "16px",
            height: "50px", // Set the height of the select input
            display: "flex", // Use flexbox to center the text vertically
            alignItems: "center", // Center the text vertically
          },
        }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <TextField
        required
        id="paymentMode"
        label="Payment Mode"
        select
        value={paymentMode}
        onChange={handleModeChange}
        sx={{
          cursor: "pointer",
          fontWeight: 900,
          m: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00BFFF",
            },
            "& .MuiSelect-select": {
              fontSize: "16px",

              display: "flex", // Use flexbox to center the text vertically
              alignItems: "center", // Center the text vertically
            },
          },
        }}
      >
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="online">Online</MenuItem>
      </TextField>

      <TextField
        required
        id="amount"
        label="Amount"
        defaultValue="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{
          cursor: "pointer",
          fontWeight: 900,
          m: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00BFFF",
            },
          },
        }}
      />
      <TextField
        required
        id="receiver"
        label="Receiver's Phone Number"
        // defaultValue=""
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        sx={{
          cursor: "pointer",
          fontWeight: 900,
          m: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00BFFF",
            },
          },
        }}
      />
      <TextField
        required
        id="sender"
        label="Sender's Phone Number"
        // defaultValue=""
        value={senderEmail}
        onChange={(e) => setSenderEmail(e.target.value)}
        sx={{
          cursor: "pointer",
          fontWeight: 900,
          m: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "blue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00BFFF",
            },
          },
        }}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
