import { useEffect, useState } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import { useNavigate } from 'react-router-dom';


const ConfirmOrderPage=(props)=>{

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cartIds, setCartIds] = useState([]);
  const [user_id, setUser_id] = useState('');

  const{cart}=props;  
  const navigate = useNavigate();


  const cartitems=cart.map(item=>item.id);
  useEffect(() => {
    setCartIds(cartitems);
  }, []);

  const handleFormSubmit = async(event) => {
    event.preventDefault();
     const test=async()=>{
     const shippingInfo = { name, email,city, address,amount,cartIds,user_id};
     console.log(shippingInfo);
     const response=await axiosPrivate.post('/order',{shippingInfo},{
      headers:{
        "Content-Type":"application/json",
        withCredentials:true
      }
     })
     console.log(response.data)
     navigate('/checkout')
    } 
    test(); 
  };

  return (
    <ProductConsumer>   
    {   
        (value)=>{
              const{cartTotal}=value;
              console.log(cartIds)
              setAmount(cartTotal);
              const {getUser}=value;
              let userDet;
              const test = async () => {
                userDet = await getUser();
              }             
              test().then(() => {
                console.log(userDet); // Log the value outside the function
                setName(userDet.user_username);
                setEmail(userDet.user_email);
                setUser_id(userDet.user_id);
              }).catch((error) => {
                console.error(error);
              });
     return(
        <form onSubmit={handleFormSubmit}>
        <h1>Confirm Order</h1>
        <label>
         Amount:
         <input type="number" value={amount} readOnly={true}/>
       </label>
  
        <label>
          City:
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">-- Select City --</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            {/* Add more options */}
          </select>
        </label>
        <label>
          Address:
          <select value={address} onChange={(e) => setAddress(e.target.value)} required>
            <option value="">-- Select Address --</option>
            {/* Depending on the city selected, you might load the list of addresses dynamically */}
            {city === 'nairobi' && (
              <>
                <option value="CBD">CBD</option>
                <option value="Westlands">Westlands</option>
                <option value="Kilimani">Kilimani</option>
                {/* Add more options */}
              </>
            )}
            {city === 'mombasa' && (
              <>
                <option value="Nyali">Nyali</option>
                <option value="Kizingo">Kizingo</option>
                <option value="Bamburi">Bamburi</option>
                {/* Add more options */}
              </>
            )}
            {city === 'kisumu' && (
              <>
                <option value="Mamboleo">Mamboleo</option>
                <option value="Nyamasaria">Nyamasaria</option>
                <option value="Kondele">Kondele</option>
                {/* Add more options */}
              </>
            )}
          </select>
        </label>      
        <button type="submit" onClick={handleFormSubmit}>Checkout</button>    
      </form>
       )}
     }
     
    </ProductConsumer>
  );
}


export default ConfirmOrderPage;