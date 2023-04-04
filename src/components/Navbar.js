import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import homer from "../homer.svg";
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import SearchForm from './Search';
import { ProductConsumer } from '../context';
import User from './UserProfile';


import MakeSellerButton from './makeSeller';
export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value)=>{
          const { search } = value;
          const { MakeSeller } = value;
          const { userDetails} = value;
          return(

<div style={{alignSelf:"flex-start",width:"100%"}}>
<NavbarWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
 <Link to="/">

    <img src={homer} alt='store'
    className='navbar-brand' />
 </Link>

 <div className='nav-item ml-5'>
 <SearchForm search={search}/>
 </div>

 <div className='nav-item ml-5'>
 <MakeSellerButton userDetails={userDetails} MakeSeller={MakeSeller}/>
 </div>

 <ul className='navbar-nav align-items-center'>
    <li className='nav-item ml-5' style={{margin:"20px"}}>
        <Link to='/seller' className="nav-link" style={{background:'green'}}>Go to Seller Page</Link>
    </li>
 </ul>
    <Link to='/cart' className='ml-auto'>
    <ButtonContainer>
        <span className='mr-2'>
        <i className='fas fa-cart-plus'/>
        </span>
        Cart
    </ButtonContainer>
    </Link>

    <div className='nav-item ml-0'>
   <User userDetails={userDetails}/>
    </div>
</NavbarWrapper>
</div>

       ) }}
   
      </ProductConsumer>
    )
  }
}



const NavbarWrapper= styled.nav`
background: var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1rem;
    text-transform:capitalize;
}
width: 100%;
`;
