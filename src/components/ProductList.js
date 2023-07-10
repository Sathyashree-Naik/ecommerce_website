import React, { useEffect } from "react";
//external imports
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductList = ({
  addToCartHandler,
  productList,
  setProductList,
  wishList,
  setWishList,
  addToWishlistHandler,
}) => {
  console.log(productList, wishList);

  useEffect(() => {
    //Set the meta data on page change
    document.title = "Ecommerce Website | Products";
  }, []);

  console.log(productList, wishList);

  return (
    <div
      style={{ height: "100%", backgroundColor: "#f8f8ff", padding: "20px" }}
    >
      <div className="header-products">
        {" "}
        <Typography className="header-product">Products</Typography>
      </div>
      <div className="divider-div">
        {" "}
        <Divider className="divider" />
      </div>
      <Grid container className="product-main-div">
        {productList.map((item, index) => (
          <Grid container spacing={2} >
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
                        onClick={() => addToCartHandler(item)}
                        className="btn-signup"
                      >
                        Add to Cart &nbsp;{" "}
                        <AddShoppingCartIcon fontSize="16px" />
                      </Button>
                    </Grid>
                    <Grid item className="product-detail checkout-div">
                      {item?.wishList ? (
                        <Button fullWidth className="btn-outlined" variant="outlined">
                          Wishlisted &nbsp;
                          <FavoriteIcon fontSize="16px" />
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          onClick={() => addToWishlistHandler(item)}
                          className="btn-outlined"
                          variant="outlined"
                        >
                          Add to Wishlist &nbsp;{" "}
                          <FavoriteIcon fontSize="16px"  />
                        </Button>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
