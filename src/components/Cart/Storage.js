import React from 'react';
import CartItem from './CartItem';

function Storage({value}) {
    const {cart}= value;
  return (
    <div className='Container-fluid'>
    {cart.map(item=>{
            // {console.log(item.id)}
            // {console.log(item.price}
             {let newids;
            if(localStorage.getItem('newids')){
              newids=JSON.parse(localStorage.getItem('newids'))
            }else{
              newids=[]
            }    
              newids.push(`${item.id}`);        
              localStorage.setItem('newids',JSON.stringify(newids));
            } 
        return <CartItem key={item.id} item={item} value={value}/>      
    })}
   </div>
      
  )
}

export default Storage