import axios from 'axios'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import "./PlaceOrder.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));
    if (!token) {
      alert("Please log in before checking out.");
      return;
    }
    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    try {
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success){
      const{session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert(response.data.message || "Unable to start payment.");
    }
    } catch (error) {
      alert(error.response?.data?.message || "Unable to connect to checkout. Please try again.");
    }
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart')

    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token, getTotalCartAmount, navigate])


 const [data,setData] =  useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

 })

 const onChangeHandler = (event) => {
  const name = event.target.name;
  const value=event.target.value;
  setData(data=>({...data,[name]:value}))
 }


  return (
    
      <form onSubmit={placeOrder} className="place-order">
        <div className='place-order-left'>
          <p className='Title'>Delivery information</p>
          <div className='multi-fields'>
            <input  name='firstName'  onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
            <input   name='lastName'  onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
          </div>
          
            <input name='email'  onChange={onChangeHandler} value={data.email} type="text" placeholder="Email"  required />
            <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required />

          
          <div className='multi-fields'>
            <input  name='city'  onChange={onChangeHandler} value={data.city} type="text" placeholder="city" required  />
            <input  name='state'  onChange={onChangeHandler} value={data.state} type="text" placeholder="state" required />

          </div>
          <div className='multi-fields'>
            <input  name='zipcode'  onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="zip code" required  />
            <input   name='country'  onChange={onChangeHandler} value={data.country} type="text" placeholder="country" required />

          </div>
          <input  name='phone'  onChange={onChangeHandler} value={data.phone} type="text" placeholder="phone number"  required />
          </div>
        <div className='place-order-right'>
          <div className='cart-bottom'>
          <div className='cart-total'>
            <h2>cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO CHECKOUT</button>
          </div>

        </div>
        </div>
      </form>
      
    
  )
}

export default PlaceOrder
