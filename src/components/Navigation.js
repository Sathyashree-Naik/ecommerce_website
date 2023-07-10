import React from 'react'
//external imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Badge from '@mui/material/Badge';
// import { Link as Routerlink, NavLink } from "react-router-dom";
// import './Navbar.css'

const Navigation = ({page,setPage,isAuthenticated, cartSize}) => {
  return (
    <>
   
    <Navbar bg="dark" data-bs-theme="white">
      <Container>
        <Navbar.Brand href="#products"  style={{color:'white'}}>Electronic Store</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="#products"  className="navLink" onClick={()=>setPage("product")} >Products</Nav.Link>
      {cartSize >0 ? <Badge badgeContent={cartSize}  color="primary"> <Nav.Link href="#cart"  className="navLink" onClick={()=>setPage("cart")}  >Cart</Nav.Link></Badge> : <Nav.Link href="#cart"  className="navLink" onClick={()=>setPage("cart")}  >Cart</Nav.Link>} 
          <Nav.Link href="#wishlist"  className="navLink" onClick={()=>setPage("wishlist")}    >Wishlist</Nav.Link>
          {/* <Nav.Link >Orders</Nav.Link>*/}
          {isAuthenticated?<p style={{margin:"7px" ,color:"white"}}>{sessionStorage.getItem("name")}</p>:<Nav.Link href="#signIn"  className="navLink" onClick={()=>setPage("register")}   >SignIn</Nav.Link> }
        </Nav>
      </Container>
    </Navbar>

  
    </>
  )
}

export default Navigation