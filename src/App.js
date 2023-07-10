import React, { useEffect, useState } from "react";
//internal exports
import Navigation from "./components/Navigation";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import WishList from "./components/WishList";
import products from "./components/data.js";
import Register from "./components/Register";

function App() {
  //State variables
  const [page, setPage] = useState("product");
  const [productList, setProductList] = useState(products);
  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);
  // const [orderList, setOrderList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") || false
  );

  //function to add items to cart
  const addToCartHandler = (item) => {
    console.log(item);
    const itemExists = cartList.find(
      (cartItem) => cartItem.product_id === item.product_id
    );
    console.log(itemExists);
    //if item already exists in the cart increse the qty
    if (itemExists) {
      console.log("already exist");
      const updatedCart = cartList.map((cartItem) => {
        return cartItem.product_id === item.product_id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem;
      });
      console.log(updatedCart);
      setCartList(updatedCart);
    } else {
      console.log("new product");
      const newProduct = { ...item, quantity: 1 };
      setCartList([...cartList, newProduct]);
    }
  };

  //function to add items to wishlist
  const addToWishlistHandler = (item) => {
    const alreadyWishlisted = wishList.some(
      (ele) => ele.product_id === item.product_id
    );
    console.log(alreadyWishlisted);
    if (!alreadyWishlisted) {
      const newItem = { ...item, quantity: 1 };
      setWishList([...wishList, newItem]);
      // alert("wishlisted")
    } else {
      alert(" already wishlisted");
      console.log("Wishlisted");
    }

    checkWishList();
  };

  console.log(cartList);

  useEffect(() => {
    checkWishList();
  }, [page]);

  //function to update the wishlist status
  const checkWishList = () => {
    const updatedProducts = productList.map((item) => {
      const wishListed = wishList.some(
        (ele) => ele.product_id === item.product_id
      );

      return { ...item, wishList: wishListed };
    });
    setProductList(updatedProducts);

    const updatedCart = cartList.map((item) => {
      const wishListed = wishList.some(
        (ele) => ele.product_id === item.product_id
      );

      return { ...item, wishList: wishListed };
    });
    setCartList(updatedCart);
  };

  return (
    <>
      <Navigation
        setPage={setPage}
        page={page}
        isAuthenticated={isAuthenticated}
        cartSize={cartList.length}
      />

      {page === "product" && (
        <ProductList
          addToCartHandler={addToCartHandler}
          productList={productList}
          setProductList={setProductList}
          wishList={wishList}
          setWishList={setWishList}
          addToWishlistHandler={addToWishlistHandler}
        />
      )}
      {page === "cart" && (
        <ShoppingCart
          cartList={cartList}
          setCartList={setCartList}
          page={page}
          setPage={setPage}
          addToWishlistHandler={addToWishlistHandler}
          isAuthenticated={isAuthenticated}
        />
      )}
      {page === "wishlist" && (
        <WishList
          wishList={wishList}
          setWishList={setWishList}
          addToCartHandler={addToCartHandler}
        />
      )}

      {page === "register" && (
        <Register
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          page={page}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default App;
