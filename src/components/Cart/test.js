import CartItem from "./CartItem";
import React from 'react'
import { Button } from "bootstrap";


export default function Storage({value,item}) {  
    const {cart,cartSubTotal,cartTax,cartTotal,clearCart,getItem}=value;
    console.log({item})
    
 

localStorage.clear();
    localStorage.setItem('cartSubTotal',`${JSON.stringify(cart)}`);
    localStorage.setItem('cartTax',`${cartTax}`);
    localStorage.setItem('cartTotal',`${cartTotal}`);
   
{   const cartStorage=cart.map(item=>{ 
    
    return <CartItem key={item.id} item={item} value={value}/>            
})

}
    return (
        <div className='Container-fluid'>
                          
    </div>
    )
  }

