import React, { useEffect, useState } from "react";
//external imports
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
//internal imports
import "./product.css";

//function to change the color of textfield / create a custom textfield
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#343A40 ",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#343A40 ",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#343A40 ",
    },
    "&:hover fieldset": {
      borderColor: "#343A40 ",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#343A40 ",
    },
  },
});

const Checkout = ({
  cartList,
  setCartList,
  setCheckout,
  setOpen,
  setMessage,
}) => {
  //state variable
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    landmark: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });

  //Function to handle checkout
  const orderHandler = (e) => {
    e.preventDefault();
    if (address === "") {
      setErrors({ address: "Address is required" });
    } else if (landmark === "") {
      setErrors({ landmark: "Landmark is required" });
    } else if (country === "") {
      setErrors({ country: "Country is required" });
    } else if (state === "") {
      setErrors({ state: "State is required" });
    } else if (city === "") {
      setErrors({ city: "City is required" });
    } else if (zipcode === "") {
      setErrors({ zipcode: "Zipcode is required" });
    } else {
      setMessage("Order Placed Successfully");
      setOpen(true);
      setCartList([]);
      setCheckout(false);
    }
  };

  return (
    <div>
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
                    <p
                      style={{
                        color: "#343A40",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Checkout
                    </p>
                    <div style={{ margin: "0px 19px" }}>
                      <div className="checkout-details">
                        <p className="checkout-data-header">Fullname: &nbsp;</p>
                        <p className="checkout-data"> {sessionStorage.getItem("name").charAt(0).toUpperCase() + sessionStorage.getItem("name").slice(1) }</p>
                      </div>
                      <div className="checkout-details">
                        <p className="checkout-data-header">Email: &nbsp;</p>
                        <p className="checkout-data"> {sessionStorage.getItem("email")}</p>
                      </div>
                      <div className="checkout-details">
                        <p className="checkout-data-header">Mobile:&nbsp; </p>
                        <p className="checkout-data">{ sessionStorage.getItem("phone")}</p>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        required
                        fullWidth
                        label="Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setErrors({ address: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.address}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        required
                        fullWidth
                        label="Landmark"
                        defaultValue={landmark}
                        onChange={(e) => {
                          setLandmark(e.target.value);
                          setErrors({ landmark: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.landmark}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        eld
                        required
                        fullWidth
                        label="Country"
                        defaultValue={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setErrors({ country: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.country}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        required
                        fullWidth
                        label="State"
                        defaultValue={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setErrors({ state: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.state}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        required
                        fullWidth
                        label="City"
                        defaultValue={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setErrors({ city: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.city}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      {" "}
                      <CssTextField
                        id="custom-css-outlined-input"
                        required
                        fullWidth
                        label="Zipcode"
                        type="number"
                        defaultValue={zipcode}
                        onChange={(e) => {
                          setZipcode(e.target.value);
                          setErrors({ zipcode: "" });
                        }}
                      />
                      <div>
                        {" "}
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errors.zipcode}
                        </span>
                      </div>
                    </div>
                    <div style={{ margin: "10px", padding: "10px" }}>
                      <Button
                        variant="contained"
                        className="btn-placeOrder"
                        onClick={orderHandler}
                      >
                        Place Order
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Box>
    </div>
  );
};

export default Checkout;
