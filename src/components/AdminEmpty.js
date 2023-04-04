import React from "react";
import {Link} from "react-router-dom";
import Excel from './Excel';
import { ProductConsumer } from '../context';

export default function AdminEmpty() {
  return (
    <ProductConsumer>
      {(value)=>{
        const {getExcelData}=value;
        return(
          <div className="container mt-5">
          <div className="row">
            <div className="col-10 mx-auto text-center text-title text-capitalize">
              <h1>Pending Products is currently empty</h1>
            </div>
            <br/>
            <div style={{position:"absolute",bottom:"0",left:"0"}}>    
              <Link to="/">Home</Link>
             </div>
             <div style={{position:"absolute",bottom:"0",right:"0"}}>
              <Excel getExcelData={getExcelData}/>
             </div>
          </div>
        </div>
        )
      }}

    </ProductConsumer>
  );
}
