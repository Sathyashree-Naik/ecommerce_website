import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ConfirmDialog from "./ConfirmDialog";

const Register = ({ isAuthenticated, setIsAuthenticated, page, setPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    document.title = "Ecommerce Website | Register";
  }, []);
  const registerHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      setErrors({ name: "Name is required" });
    } else if (email === "") {
      setErrors({ email: "Email is required" });
    } else if (phone === "") {
      setErrors({ phone: "Phone is required" });
    } else {
      setIsAuthenticated(true);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("isAuthenticated", true);
      setOpen(true)
      setMessage("Registered Successfully")
      setName("");
      setEmail("");
      setPhone("");
      setErrors({
        name: "",
        email: "",
        phone: "",
      });
      setTimeout(()=>{
        setPage("product");
      },6000)
      
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f8f8ff", padding: "20px" }}
    >
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <div style={{ margin: "20px" }} s>
          <Paper
            sx={{
              p: "10px",
              margin: "10px auto",
              maxWidth: 500,
              flexGrow: 1,
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      Register
                    </p>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      <TextField
                      required
                        fullWidth
                        label="Name"
                        id="outlined-required"
                        defaultValue={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors({ name: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <TextField
                      required
                        fullWidth
                        label="Email"
                        id="outlined-required"
                        defaultValue={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors({ email: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.email}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <TextField
                      required
                        fullWidth
                        label="Mobile"
                        id="outlined-required"
                        defaultValue={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors({ phone: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.phone}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      <Button
                        variant="contained"
                        size="medium"
                        className="btn-signup"
                        onClick={registerHandler}
                      >
                        Register
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Box>
      <ConfirmDialog
       onClose={handleClose}
       open={open}
       message={message}

    />
    </div>
  );
};

export default Register;
