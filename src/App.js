import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
  const [cartList, setCartList] = useState(
    JSON.parse(sessionStorage.getItem("cartItem")) || []
  );
  const [wishList, setWishList] = useState(
    JSON.parse(sessionStorage.getItem("wishlist")) || []
  );
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
      sessionStorage.setItem("cartItem", JSON.stringify(updatedCart));
    } else {
      console.log("new product");
      const newProduct = { ...item, quantity: 1 };
      const updatedCart = [...cartList, newProduct];
      setCartList([...cartList, newProduct]);
      sessionStorage.setItem("cartItem", JSON.stringify(updatedCart));
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
      const updatedWishlist = [...wishList, newItem];
      setWishList(updatedWishlist);
      sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      // alert("wishlisted")
    } else {
      alert(" already wishlisted");
      console.log("Wishlisted");
    }

    checkWishList();
  };

  console.log(cartList);

  useEffect(() => {
    console.log("hello")
    checkWishList();
    sessionStorage.setItem("products", JSON.stringify(productList));
    // sessionStorage.getItem(JSON.parse("products"));
  }, [page]);

  //function to update the wishlist status
  const checkWishList = () => {
    const updatedProducts = productList.map((item) => {
      const wishListed = wishList.some(
        (ele) => ele.product_id === item.product_id
      );

      return { ...item, wishList: wishListed };
    });
    sessionStorage.setItem("products", JSON.stringify(updatedProducts));
    setProductList(updatedProducts);

    const updatedCart = cartList.map((item) => {
      const wishListed = wishList.some(
        (ele) => ele.product_id === item.product_id
      );

      return { ...item, wishList: wishListed };
    });
    sessionStorage.setItem("cartItem", JSON.stringify(updatedCart));
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
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              addToCartHandler={addToCartHandler}
              productList={productList}
              setProductList={setProductList}
              wishList={wishList}
              setWishList={setWishList}
              addToWishlistHandler={addToWishlistHandler}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartList={cartList}
              setCartList={setCartList}
              page={page}
              setPage={setPage}
              addToWishlistHandler={addToWishlistHandler}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishList
              wishList={wishList}
              setWishList={setWishList}
              addToCartHandler={addToCartHandler}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              page={page}
              setPage={setPage}
            />
          }
        />
      </Routes>

      {/* 
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
      )} */}
    </>
  );
}

export default App;
