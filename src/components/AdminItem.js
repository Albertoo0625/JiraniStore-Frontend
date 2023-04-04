import React, { Component } from "react";
export default class AdminItem extends Component {

  
  render() {
    const { id, title, img, price, quantity } = this.props.item;
    const { postingPendingProducts,rejectPendingProduct } = this.props.value;

    return (
      <div className="row my-1 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
          <img
            src={img}
            style={{ width: "5rem", heigth: "5rem" }}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <span className="d-lg-none">product :</span> {title}
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <strong>
            <span className="d-lg-none">price :</span> ksh {price}
          </strong>
        </div>
        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
          <div className="d-flex justify-content-center">
            <div>
           
              <span className="btn btn-black mx-1">{quantity}</span>
              
            </div>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2 ">
          <div className=" cart-icon" onClick={() => postingPendingProducts(id)}>
            <i className="fas fa-thumbs-up" />
          </div>
          <div className=" cart-icon" onClick={() => rejectPendingProduct(id)}>
            <i className="fas fa-thumbs-down" />
          </div>
        </div>

        <div className="col-10 mx-auto col-lg-2 ">
          <strong>total items: {quantity} </strong>
        </div>
      </div>
    );
  }
}
