import React, { useEffect, useState } from "react";
import "./product.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ConfirmDialog from "./ConfirmDialog";
// import Paper from "@mui/material/Paper";

import emptycart from "./emptycart.jpg";
const ShoppingCart = ({
  cartList,
  setCartList,
  addToWishlistHandler,
  isAuthenticated,
  page,
  setPage,
}) => {
  console.log(cartList);
  const [checkout, setCheckout] = useState(false);

const [address,setAddress] = useState("");
const [landmark,setLandmark] = useState("");
const [country,setCountry] = useState("");
const [state,setState] = useState("");
const [city,setCity] = useState("");
const [zipcode,setZipcode] = useState("");
  const [errors, setErrors] = useState({
    address: "",
    landmark: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });

  
    const [open, setOpen] = useState(false);
    const [message,setMessage] = useState("");
  
   
    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() => {
    document.title = "Ecommerce Website | Cart";
  }, []);

  const incrementQty = (item) => {
    console.log(item);
    const updatedCart = cartList.map((cartItem) => {
      return cartItem.product_id === item.product_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
    setCartList(updatedCart);
  };
  const decrementQty = (item) => {
    console.log(item);
    if (item.quantity > 1) {
      const updatedCart = cartList.map((cartItem) => {
        return cartItem.product_id === item.product_id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem;
      });
      setCartList(updatedCart);
    }
  };

  const removeHandler = (item) => {
    const filteredList = cartList.filter(
      (cartitem) => cartitem.product_id !== item.product_id
    );
    console.log(filteredList);
    setCartList(filteredList);
  };

  const addToWishlist = (item) => {
    console.log(item);

    addToWishlistHandler(item);
    removeHandler(item);
  };

  const getTotalAmount = () => {
    const cartTotal = cartList.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return cartTotal;
  };

  const orderHandler = (e) =>{

     e.preventDefault();
     if (address === "") {
      setErrors({ address: "Address is required" });
    } 
   else if (landmark === "") {
      setErrors({ landmark: "Landmark is required" });
    } 
   else if (country === "") {
      setErrors({ country: "Country is required" });
    } 
    else if (state === "") {
      setErrors({ state: "State is required" });
    } 
    else if (city === "") {
      setErrors({ city: "City is required" });
    } else if (zipcode === "") {
      setErrors({ zipcode: "Zipcode is required" });
    } else{
      setMessage("Order Placed Successfully")
      setOpen(true);
      setCartList([]);
      setCheckout(false)
    }
  }

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f8f8ff", padding: "20px" }}
    >
      {cartList.length ? (
        <>
          <div style={{ padding: "20px", display: "flex" }}>
            <div className="table-div">
              <Typography className="header">Shopping Cart</Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption className="total-caption">Cart Total </caption>
                  <caption className="amt-caption">
                    Rs.{getTotalAmount()}
                  </caption>

                  <TableHead></TableHead>
                  <TableBody>
                    {cartList.map((item) => (
                      <TableRow key={item.product_id}>
                        <TableCell><div>  <img src={item.img} alt="product" height="65px"/></div></TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell"
                        >
                        
                          <p className="table-content"> {item.product_name}</p>
                          <p className="table-content"> {item.description}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <ButtonGroup>
                              <Button
                                className="btn-qty"
                                onClick={() => decrementQty(item)}
                              >
                                -
                              </Button>
                              <Button
                                // className="quantity"
                                disabled
                              >
                                {item.quantity}
                              </Button>
                              <Button
                                className="btn-qty"
                                onClick={() => incrementQty(item)}
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </div>
                        </TableCell>
                        <TableCell>{item.price * item.quantity}</TableCell>
                        <TableCell>
                          {item.wishList ? (
                            <Tooltip title="Wishlisted" placement="bottom">
                              <Button className="iconbtn">
                                <FavoriteIcon />
                              </Button>
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="Move to Wishlist"
                              placement="bottom"
                            >
                              <Button
                                className="iconbtn"
                                onClick={() => addToWishlist(item)}
                              >
                                <FavoriteBorderIcon />
                              </Button>
                            </Tooltip>
                          )}
                          <Tooltip title="Remove From Cart" placement="bottom">
                            {" "}
                            <Button
                              className="iconbtn"
                              onClick={() => removeHandler(item)}
                            >
                              <ClearIcon />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    <div className="btn-container">
                      {" "}
                      <Button
                        variant="contained"
                        className="btn-checkout"
                        onClick={() => setCheckout(true)}
                      >
                        Checkout
                      </Button>
                    </div>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {checkout && isAuthenticated ? (
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
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <p
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                              >
                                Delivery Address
                              </p>
                              <div style={{ margin: "16px" }}>
                                <div>
                                  Name :{sessionStorage.getItem("name")}
                                </div>
                                <div>
                                  Email :{sessionStorage.getItem("email")}
                                </div>
                                <div>
                                  Mobile Number :
                                  {sessionStorage.getItem("phone")}
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                 
                                 required
                                  fullWidth
                                  label="Address"
                                  id="outlined-required"
                                  defaultValue={address}
                                  onChange={(e) => {
                                   setAddress(e.target.value)
                                    setErrors({ address: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {errors.address}
                                  </span>
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                     required
                                  fullWidth
                                  label="Landmark"
                                  id="outlined-required"
                                  defaultValue={landmark}
                                  onChange={(e) => {
                                  setLandmark(e.target.value)
                                    setErrors({ landmark: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {errors.landmark}
                                  </span>
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                      required
                                  fullWidth
                                  label="Country"
                                  id="outlined-required"
                                  defaultValue={country}
                                  onChange={(e) => {
                                 setCountry(e.target.value)
                                    setErrors({ country: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {errors.country}
                                  </span>
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                     required
                                  fullWidth
                                  label="State"
                                  id="outlined-required"
                                  defaultValue={state}
                                  onChange={(e) => {
                                    setState(e.target.value)
                                    setErrors({ state: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {errors.state}
                                  </span>
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                     required
                                  fullWidth
                                  label="City"
                                  id="outlined-required"
                                  defaultValue={city}
                                  onChange={(e) => {
                                    setCity(e.target.value)
                                    setErrors({ city: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
                                    {errors.city}
                                  </span>
                                </div>
                              </div>
                              <div style={{ margin: "10px", padding: "10px" }}>
                                {" "}
                                <TextField
                                
                                required
                                  className="text-feild"
                                  fullWidth
                                 
                                  id="outlined-required"
                                   label="Zipcode"
                                  defaultValue={zipcode}
                                  onChange={(e) => {
                                    setZipcode(e.target.value)
                                    setErrors({ zipcode: "" });
                                  }}
                                />
                                <div>
                                  {" "}
                                  <span
                                    style={{ color: "red", fontSize: "14px" }}
                                  >
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
            ) : checkout && !isAuthenticated ? (
              <div className="checkout-div">
                <Typography>
                  You are a guest user Please Register to continue.
                </Typography>
                <div className="sign-up-btn-div">
                  <Button
                    variant="contained"
                    className="btn-signup"
                    onClick={() => setPage("register")}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="empty-cart">
            <img src={emptycart} alt="Empty Cart" />
            <p>Your Cart is Empty</p>
          </div>
        </>
      )}
       <ConfirmDialog
       onClose={handleClose}
       open={open}
       message={message}

    />
    </div>
   
  );
};

export default ShoppingCart;
