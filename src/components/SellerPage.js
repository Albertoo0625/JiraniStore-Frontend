import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';


const PRODUCTS_URL = 'http://localhost:3500/pendingproducts';


const Seller =(props) => {
  const [formData, setFormData] = useState({
    title: '',
    img: null,
    price: 0,
    company: '',
    info: '',
    quantity: 0,
    email: '',
  });


 

  const { auth } = useAuth();
  const [formErrors, setFormErrors] = useState({});

  const handleChange = event => {
    if (event.target.type === 'file' && event.target.files.length > 0) {
      const img = JSON.stringify(event.target.files[0]);
      console.log(JSON.stringify(img));
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0]   
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }
    // clear any errors for the field that just changed
    setFormErrors({
      ...formErrors,
      [event.target.name]: undefined
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {getUser}=props;
    const userResponse=await getUser();
    console.log(userResponse.user_id);
   


    // check for errors
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        errors[key] = 'Required';
      }
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    
    const form = new FormData();
    const user_id=userResponse.user_id;

    form.append('title', formData.title);
    form.append('img', formData.img);
    form.append('price', formData.price);
    form.append('company', formData.company);
    form.append('info', formData.info);
    form.append('quantity', formData.quantity);
    form.append('email', formData.email);
    form.append('user_id',user_id);

    console.log(form);

    try {
      const token = auth.accessToken;     
      const res = await axios.post(PRODUCTS_URL, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      alert(`${res.data},product submitted for approval`);
      setFormData({
        title: '',
        img: null,
        price: 0,
        company: '',
        info: '',
        quantity: 0,
        email: ''
      });
      
     
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
    <p style={{color:"orange"}}> Please upload your products details</p>
    <form onSubmit={handleSubmit} style={{color:'white',backgroundColor:'transparent',alignItems:'flex-start'}}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}  
        />
        {formErrors.title && <div style={{color: 'red'}}>{formErrors.title}</div>}
      </div>
      <br/>
      <div>
        <label htmlFor="img">Choose File:</label>
        <input type="file" name="img" onChange={handleChange} accept="image/*" />
        {formErrors.img && <div style={{color: 'red'}}>{formErrors.img}</div>}
      </div>
      <br/>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}      
        />
      {formErrors.img && <div style={{color: 'red'}}>{formErrors.price}</div>}
      </div>
      <br/>
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}        
        />
      {formErrors.img && <div style={{color: 'red'}}>{formErrors.company}</div>}
      </div>
    <br/>
      <div>
        <label htmlFor="info">Information:</label>
        <textarea
          name="info"
          value={formData.info}
          onChange={handleChange}     
        />
     {formErrors.img && <div style={{color: 'red'}}>{formErrors.info}</div>}
      </div>
      <br/>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}       
        />
     {formErrors.img && <div style={{color: 'red'}}>{formErrors.quantity}</div>}
      </div>
      <br/>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}       
        />
       {formErrors.img && <div style={{color: 'red'}}>{formErrors.email}</div>}
      </div>
      <br/>
      <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
      </>
      )}

export default Seller;
