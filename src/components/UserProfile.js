import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const User = (props) => {
const{userDetails}=props;
console.log(userDetails)
const id=userDetails

  return ( 
          <div>
            <Link to={`/users/${id}orders`}>View Orders</Link>
          </div>
  );
};

export default User;

