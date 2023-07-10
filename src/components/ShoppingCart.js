import React, { useEffect, useState } from "react";
//external imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tooltip from "@mui/material/Tooltip";
//internal imports
import emptycart from "./emptycart.jpg";
import Checkout from "./Checkout";
import ConfirmDialog from "./ConfirmDialog";
import "./product.css";

const ShoppingCart = ({
  cartList,
  setCartList,
  addToWishlistHandler,
  isAuthenticated,
  page,
  setPage,
}) => {
  console.log(cartList);
//state variables
  const [checkout, setCheckout] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //function to change the metadata on page change
    document.title = "Ecommerce Website | Cart";
  }, []);


  //function to increment the product qty
  const incrementQty = (item) => {
    console.log(item);
    const updatedCart = cartList.map((cartItem) => {
      return cartItem.product_id === item.product_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
    setCartList(updatedCart);
  };

  //function to decrement the product qty
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

//Function to remove the product from cart
  const removeHandler = (item) => {
    const filteredList = cartList.filter(
      (cartitem) => cartitem.product_id !== item.product_id
    );
    console.log(filteredList);
    setCartList(filteredList);
  };

  //Function to add the product to wishlist
  const addToWishlist = (item) => {
    console.log(item);

    addToWishlistHandler(item);
    removeHandler(item);
  };

  //function to calculate the total cart amount
  const getTotalAmount = () => {
    const cartTotal = cartList.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return cartTotal;
  };


  //function to close the pop-up dialog box
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f8f8ff", padding: "20px" }}
    >
      {cartList.length ? (
        <>
          <div style={{ padding: "20px", display: "flex" }}>
            <div className="table-div">
              <Typography className="header" >Shopping Cart</Typography>

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
                        <TableCell>
                          <div>
                            {" "}
                            <img src={item.img} alt="product" height="65px" />
                          </div>
                        </TableCell>
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
              <Checkout
                cartList={cartList}
                setCartList={setCartList}
                setCheckout={setCheckout}
                setOpen={setOpen}
                setMessage={setMessage}
              />
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
      <ConfirmDialog onClose={handleClose} open={open} message={message} />
    </div>
  );
};

export default ShoppingCart;
