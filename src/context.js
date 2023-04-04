import React, { Component} from 'react';
import {axiosPrivate} from './api/axios';



const ProductContext=React.createContext();
class ProductProvider extends Component {

  state={
    storeProducts:[],
    products:[],
    detailProduct:[],
    cart:[],
    modalOpen: false,
    modalProduct: [],
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    pendingProduct:[],
    userDetails:[]
  };


 async componentDidMount(){

  const response = await axiosPrivate.get("/products", {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  });

  console.log(response.data);

  const productsWithoutPrefix = response.data.map(product => {
    const productWithoutPrefix = {};
    for (const [key, value] of Object.entries(product)) {
      if (key.startsWith("product_")) {
        productWithoutPrefix[key.substring(8)] = value;
      } else {
        productWithoutPrefix[key] = value;
      }
    }
    return productWithoutPrefix;
  });

  console.log(productsWithoutPrefix);
  console.log(productsWithoutPrefix.img);

  this.setProducts(productsWithoutPrefix); 


  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    this.setState({ cart });

    const cartSubTotal = JSON.parse(localStorage.getItem('cartSubTotal'));
    if (cartSubTotal) {
      this.setState({ cartSubTotal });
    }
  
    const cartTax = JSON.parse(localStorage.getItem('cartTax'));
    if (cartTax) {
      this.setState({ cartTax });
    }
  

    const cartTotal = JSON.parse(localStorage.getItem('cartTotal'));
    if (cartTotal) {
      this.setState({ cartTotal });
    }
    const pendingProduct = JSON.parse(localStorage.getItem('pendingproducts'));
    if (pendingProduct) {
      this.setState({ pendingProduct });
    }
  };

  const detailProduct = JSON.parse(localStorage.getItem("detailProduct"));
  if (detailProduct) {
    this.setState(detailProduct);
  }


  this.getPendingProducts();

  this.postingPendingProducts();

  this.getUserDetails();

  this.handleDetail();

  console.log(this.state.userDetails);

  console.log(this.state.detailProduct);

  this.getExcelData('/products');

 
}

// componentWillUnmount() {
//   localStorage.removeItem("detailProduct");
// }


componentDidUpdate() {
  localStorage.setItem('detailProduct', JSON.stringify(this.state.detailProduct));
}

setProducts= async(storeProducts)=>{
    let products=[];
    storeProducts.forEach(item=>{
      const singleItem ={...item};
      products = [...products,singleItem];
    })
    this.setState(()=>{
      return{products}
    });
  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    console.log(product);
    return product;
  };



  handleDetail = (id) => {
    let product = JSON.parse(localStorage.getItem('detailProduct'));
    
    // If product with the given ID is not in local storage, fetch it from the data source
    if (!product || product.id !== id) {
      product = this.getItem(id);
      console.log(product);
      localStorage.setItem('detailProduct', JSON.stringify(product));
    }
    
    console.log(product);
    
    this.setState(() => {
      return { detailProduct: product };
    }, () => {
      console.log(this.state.detailProduct);
    });
  };

  // handleDetail = id => {
  //   const product = this.getItem(id);
  //   this.setState(() => {
  //     return { detailProduct: product };
  //   });
  // };
  
  addToCart = async (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    product.quantity=product.quantity-product.count;
    const price = product.price;
    product.total = price;


    const response = await axiosPrivate.put(`/products/${id}`, {
      inCart: true,
      count: product.count,
      total: price,
      quantity:product.quantity
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });


    const cartResponse = await axiosPrivate.get(`/products/${id}`, 
     {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    console.log(cartResponse.data);

    const cartProductData=cartResponse.data;

 


  const productsWithoutPrefix = [cartProductData].map(product => {
    const productWithoutPrefix = {};
    for (const [key, value] of Object.entries(product)) {
      if (key.startsWith("product_")) {
        productWithoutPrefix[key.substring(8)] = value;
      } else {
        productWithoutPrefix[key] = value;
      }
    }
    return productWithoutPrefix;
  });

console.log(productsWithoutPrefix);
console.log(product);




const arr = productsWithoutPrefix

const obj = { ...arr[0] };
console.log(product);
console.log(obj);



    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, obj],
        detailProduct: { ...product }
      }
    },
    ()=>{this.addTotals()} 
    );

    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true }
    })
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false }
    })
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, this.addTotals)
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      const result = window.confirm("Are you sure you want to remove this product?");
       if (result) {
    // Code to remove the product
    this.removeItem(id);
      }
    } else if((product.count <0)){
      const result = window.confirm("Are you sure you want to remove this product?");
       if (result) {
    // Code to remove the product
    this.removeItem(id);
      }
    }else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      }
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(()=>{
      console.log(this.state.cart);
      const cartItems = this.state.cart;
      const cartItemIds = cartItems.map(item => item.id);
      console.log(cartItemIds);

        cartItemIds.forEach(async(id)=>{

          const cartDetails = await axiosPrivate.get(`/products/${id}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          });
        
          console.log(cartDetails.data);

          const cartProductDetails = JSON.parse(JSON.stringify(cartDetails.data));

          console.log(cartProductDetails);
        
          const productsWithoutPrefix = [cartProductDetails].map(product => {
            const productWithoutPrefix = {};
            for (const [key, value] of Object.entries(product)) {
              if (key.startsWith("product_")) {
                productWithoutPrefix[key.substring(8)] = value;
              } else {
                productWithoutPrefix[key] = value;
              }
            }
            return productWithoutPrefix;
          });

         console.log(productsWithoutPrefix);

         const productQuantity=productsWithoutPrefix.map(item=>item.quantity)

         console.log(productQuantity);

         const arr = productQuantity;
         const quantity= Number(arr[0]);

         console.log(quantity);

         const response=await axiosPrivate.put(`/products/${id}`,
          {
            inCart: false,
            count: 0,
            total: 0,
            quantity:quantity,
          },
          {
            headers:{"Content-Type": "application/json"},
                     withCredentials:true,
          
          })
        })


      return {cart:[]};
    },()=>{
      this.setProducts();
      this.addTotals();
      localStorage.removeItem('cart');
      localStorage.removeItem('cartSubTotal');
      localStorage.removeItem('cartTax');
      localStorage.removeItem('cartTotal');
    })
  }
  addTotals =()=>{
    let subTotal=0;
    this.state.cart.map(item=>(subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const Tax=parseFloat(tempTax.toFixed(2));
    const total=subTotal + Tax;

    this.setState(() => {     
      return {
          cartSubTotal: subTotal,
          cartTax: Tax,
          cartTotal: total   
      }
  }, () => {
      localStorage.setItem('cartSubTotal', JSON.stringify(this.state.cartSubTotal));
      localStorage.setItem('cartTax', JSON.stringify(this.state.cartTax));
      localStorage.setItem('cartTotal', JSON.stringify(this.state.cartTotal));
  });
  }

  getPendingProducts=async()=>{
    const response = await axiosPrivate.get("/pendingproducts", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  
    console.log(response.data);

    const pending=response.data;
  
    const productsWithoutPrefix = pending.map(product => {
      const productWithoutPrefix = {};
      for (const [key, value] of Object.entries(product)) {
        if (key.startsWith("pending_product_")) {
          productWithoutPrefix[key.substring(16)] = value;
        } else {
          productWithoutPrefix[key] = value;
        }
      }
      return productWithoutPrefix;
    });

    console.log(productsWithoutPrefix);

    this.setState(() => {     
      return {
          pendingProduct:[...productsWithoutPrefix],
            
      }
  }, () => {
      localStorage.setItem('pendingProduct', JSON.stringify(this.state.pendingProduct));
     }); 
  }

postingPendingProducts=async(id)=>{

    const pendingProductvar=this.state.pendingProduct;
    console.log(pendingProductvar);
    const product = pendingProductvar.find(item => item.id === id);
    const cleanProductInfo = product.info.replace(/[\r\n\t]/g, ' ');
    const title=product.title;
    const img=product.img;
    const price=product.price;
    const company=product.company;
    const info=cleanProductInfo;
    const quantity=product.quantity;
    const email=product.email;
    const pending_product_id=product.id;
  

    const response=await axiosPrivate.post('/products',
    {
      title: title,
      img: img,
      price: price,
      company: company,
      info: info,
      quantity:quantity,
      pending_product_id:pending_product_id
    },
    {
      headers:{"Content-Type": "application/json"},
               withCredentials:true,
    
    })

    console.log(response.data);
    console.log(this.state.userDetails);

    

 


 const message=`Your product has been uploaded`;
 const useremail=email;
 const subject=`Product posting`;

 this.sendMail(message,useremail,subject)

 this.updatePendingProductApprovalStatus(id)
    // this.deletePendingProduct(id);

    alert('product has been posted');

  }
  getUserDetails=async()=>{
   const response=await axiosPrivate.get('/auth',{
      headers:{"Content-Type": "application/json"},
      withCredentials:true,
    });

    console.log(response.data);

    const userProfile=response.data

    const productsWithoutPrefix = [userProfile].map(product => {
      const productWithoutPrefix = {};
      for (const [key, value] of Object.entries(product)) {
        if (key.startsWith("user_")) {
          productWithoutPrefix[key.substring(5)] = value;
        } else {
          productWithoutPrefix[key] = value;
        }
      }
      return productWithoutPrefix;
    });

    console.log(productsWithoutPrefix);
    this.setState(() => {     
      return {
          userDetails:productsWithoutPrefix,
            
      }});

      console.log(this.state.userDetails);
  }

  getUser=async()=>{
    const response=await axiosPrivate.get('/auth',{
      headers:{"Content-Type": "application/json"},
      withCredentials:true,
    });

    console.log(response.data);

    return response.data
  }


  deletePendingProduct=async(id)=>{
    const response=await axiosPrivate.delete(`/pendingproducts/${id}`,{
      headers:{"Content-Type": "application/json"},
      withCredentials:true,
    });

    console.log(response.data); 
  }

  sendMail=async(message,useremail,subject)=>{
    const response=await axiosPrivate.post('/sendmail',{message,useremail,subject},{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    });

    console.log(response)
  }

  rejectPendingProduct=async(id)=>{
    const pendingProductvar=this.state.pendingProduct;
    console.log(pendingProductvar);
    const product = pendingProductvar.find(item => item.id === id);
    const title=product.title;
    const email=product.email;

    const message=`Your product did not have enough information to be posted please review your ${title} and then try again`;
    const useremail=email;
    const subject=`Product posting`;

    this.sendMail(message,useremail,subject)
    this.updatePendingProductApprovalStatus(id)
    // this.deletePendingProduct(id);
  }

  search=async(query)=>{
    const response=await axiosPrivate.get(`/products/search/${query}`,{
      headers:{"Content-Type": "application/json"},
      withCredentials:true,
    });

    console.log(response.data)
  
    const productsWithoutPrefix = response.data.map(product => {
      const productWithoutPrefix = {};
      for (const [key, value] of Object.entries(product)) {
        if (key.startsWith("product_")) {
          productWithoutPrefix[key.substring(8)] = value;
        } else {
          productWithoutPrefix[key] = value;
        }
      }
      return productWithoutPrefix;
    });

    this.setState(() => {
      return { products: productsWithoutPrefix };
    }, () => {
      console.log(this.state.products);
    });
  }
getExcelData=async(url)=>{
 const response=await axiosPrivate.get(url,{
  headers:{
    "Content-Type":"application/json"},
    withCredentials:true,
 })

 console.log(response.data)
 return response.data
  }


  MakeSeller=async(id)=>{
    const roles='{"User":2001,"Editor":1984}'
    const user=await axiosPrivate.put(`http://localhost:3500/auth/${id}`,{roles},{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    })
  }

updatePendingProductApprovalStatus=async(id)=>{
const approvalstatus=true;
const response= await axiosPrivate.put(`/pendingproducts/${id}`,{
 approvalstatus
},{
  headers:{
    "Content-Type":"application/json",
    withCredentials:true
  }
})

console.log(response.data)
  }



  render() {
    return (
    <ProductContext.Provider 
    value={{
 ...this.state,
handleDetail:this.handleDetail,
MakeSeller:this.MakeSeller,
getUser:this.getUser,
getExcelData:this.getExcelData,
search:this.search,
rejectPendingProduct:this.rejectPendingProduct,
deletePendingProduct:this.deletePendingProduct,
getUserDetail:this.getUserDetails,
postingPendingProducts:this.postingPendingProducts,
getPendingProducts:this.getPendingProducts,
addToCart:this.addToCart,
openModal: this.openModal,
closeModal: this.closeModal,
increment:this.increment,
decrement:this.decrement,
removeItem:this.removeItem,
clearCart:this.clearCart
}}>{this.props.children}</ProductContext.Provider>
    )
  }
}
const ProductConsumer= ProductContext.Consumer;

export {ProductProvider,ProductConsumer};