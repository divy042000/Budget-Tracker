// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "../assets/inputPayInfo.module.css";
import "../App.css";
export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <h1 className="text-gray-200">Hello World</h1>

      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Category"
          defaultValue="Category"
          // className={styles.textField}
          className='border-2'
        />
        <TextField required id="outlined" label="" defaultValue="Hello World" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />{" "}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />{" "}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
      </div>
    </Box>
  );
}
