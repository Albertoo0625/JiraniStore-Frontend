import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import {Routes,Route} from "react-router-dom";
import CheckoutPage from "./components/Cart/CheckOut";
import { ProductProvider } from "./context";



class App extends Component{
  render(){
    return (
      <ProductProvider>
      <React.Fragment>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<ProductList/>} />
          <Route path="details" element={<Details/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="Checkout" element={<CheckoutPage/>} />
          <Route element={<Default/>} />
        </Routes>
        <Modal />
        </React.Fragment>
        </ProductProvider>
        
    );
  }
}

export default App;



