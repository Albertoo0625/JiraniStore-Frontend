import React from 'react';
import AdminItem from './AdminItem';

export default function AdminList({value}) {
    const {pendingProduct}=value;
    console.log(pendingProduct);
  return (
   <div className='Container-fluid'>
    {pendingProduct.map(item=>{
        return <AdminItem key={item.id} item={item} value={value}/>      
    })}
   </div>
  )
}
