import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink} from 'react-csv';

function Exportexcel(props) {
 const [productsData, setProductsdata]= useState([]); 
 const {getExcelData}=props
 useEffect( ()=>{
    const getProductsData= async ()=>{
      const response= await getExcelData('/products')
      console.log(response);
      setProductsdata(response);
    }
    getProductsData();

    console.log(productsData);
 },[]);



  return (
    <React.Fragment>
      <Container>
        <div className="row">
          <div className="col-sm-8">
            <CSVLink data={ productsData} filename="productsData" className="btn btn-success mb-3" style={{lineHeight: 1}}>Export Products Data</CSVLink>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Exportexcel;
