import React, { Component } from 'react';
import Title from "../Title";
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer } from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';



export default class Cart extends Component {
  render() {
    return (
      <section className="col-12" style={{color:"white"}}>
        <ProductConsumer>
          {(value)=>{
            const {cart}= value;
            if(cart.length>0){
             return<React.Fragment>
              <Title name="Your" title="Cart"/>
              <CartColumns/>
              <CartList value={value} item={this.props.item} />
              <CartTotals value={value} history={this.props.history}/>
              </React.Fragment>
            }else{
              return<>
              <React.Fragment>
              <Title name="Your" title="Cart"/>
              <EmptyCart/>
              </React.Fragment>
              </>
            }
          }}

        </ProductConsumer>

      </section>
    )
  }
}
