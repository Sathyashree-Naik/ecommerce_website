import React from "react";
//external imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "@mui/material/Badge";
import { Link, NavLink, useHistory } from "react-router-dom";

const Navigation = ({ page, setPage, isAuthenticated, cartSize }) => {
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Container>
          <Navbar.Brand href="" style={{ color: "white" }}>
            Electronic Store
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to={`/`} smooth={true} duration={1000} exact className="nav-item">
              <Nav.Link
                href={`/`}
                className="navLink"
                onClick={() => setPage("product")}
              >
                Products
              </Nav.Link>
            </NavLink>
            {cartSize > 0 ? (
              <Badge badgeContent={cartSize} color="primary">
                {" "}
                <NavLink to={`/cart`} smooth={true} duration={1000} className="nav-item">
                  <Nav.Link
                    href={`/cart`}
                    className="navLink"
                    onClick={() => setPage("cart")}
                  >
                    Cart
                  </Nav.Link>
                </NavLink>
              </Badge>
            ) : (
              <NavLink to={`/cart`} smooth={true} duration={1000} className="nav-item">
                <Nav.Link
                  href={`/cart`}
                  className="navLink"
                  onClick={() => setPage("cart")}
                >
                  Cart
                </Nav.Link>
              </NavLink>
            )}
            <NavLink to={`/wishlist`} style={{textDecoration:"none !important"}} smooth={true} className="nav-item" duration={1000}>
              <Nav.Link
                href={`/wishlist`}
                className="navLink"
                onClick={() => setPage("wishlist")}
              >
                Wishlist
              </Nav.Link>
            </NavLink>

            {isAuthenticated ? (
              <p style={{ margin: "7px", color: "white" }}>
                {sessionStorage.getItem("name").charAt(0).toUpperCase() +
                  sessionStorage.getItem("name").slice(1)}
              </p>
            ) : (
              <NavLink to={`/register`} className="nav-item" smooth={true} duration={1000}>
                <Nav.Link
                  href={`/register`}
                  className="navLink"
                  onClick={() => setPage("register")}
                >
                  SignIn
                </Nav.Link>
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
