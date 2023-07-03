import React, { useEffect } from "react";
import "./product.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import emptywishlist from "./emptywishlist.jpg";

const WishList = ({ wishList, setWishList, addToCartHandler }) => {
  console.log(wishList);

  useEffect(() => {
    document.title = "Ecommerce Website | Wishlist";
  }, []);

  const removeHandler = (item) => {
    const filteredList = wishList.filter(
      (ele) => item.product_id !== ele.product_id
    );
    setWishList(filteredList);
  };

  const moveToCartHandler = (item) => {
    const filteredList = wishList.filter(
      (ele) => item.product_id !== ele.product_id
    );
    setWishList(filteredList);

    addToCartHandler(item);
  };

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f8f8ff", padding: "20px" }}
    >
      {wishList.length ? (
        <>
          <div className="header-products">
            {" "}
            <Typography className="header-product">
              Wishlist
              <FavoriteBorderIcon />
            </Typography>
          </div>
          <div className="divider-div">
            {" "}
            <Divider className="divider" />
          </div>
          <Grid container className="product-main-div">
            {wishList.map((item, index) => (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Paper
                        sx={{
                          height: "auto",
                          width: "auto",
                          // margin:'20px'
                        }}
                      >
                        <div>
                          <div>
                            <img src={item.img} width="260" alt="product" />
                          </div>
                        </div>
                        <Grid item xs className="product-detail">
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {item.product_name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {item.description}
                          </Typography>
                        </Grid>
                        <Grid item className="product-detail">
                          <Typography variant="subtitle1" component="div">
                            Rs.{item.price}
                          </Typography>
                        </Grid>
                        <Grid item className="product-detail checkout-div">
                          <Button
                            fullWidth
                            className="btn-signup"
                            onClick={() => moveToCartHandler(item)}
                          >
                            Move To Cart &nbsp;{" "}
                            <AddShoppingCartIcon fontSize="16px" />
                          </Button>
                        </Grid>
                        <Grid item className="product-detail checkout-div">
                          <Button
                            fullWidth
                            className="btn-signup"
                            onClick={() => removeHandler(item)}
                          >
                            Remove &nbsp; <ClearIcon fontSize="16px" />
                          </Button>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <div className="empty-cart">
            <img src={emptywishlist} alt="Empty Cart" />
            <p>Your Wishlist is Empty</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
