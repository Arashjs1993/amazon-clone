import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import {useStateValue} from "./StateProvider"

function Checkout() {

  const [{basket, user}] = useStateValue();
  return (
    <div className="checkout">
        <div className='checkout__left'>
            <img src="https://images-na.ssl-images-amazon.com/images/G/29/GIL/2021/BF/it-gil_maple_vc_dt_05-2022_v2_770x80._CB635821688_.jpg" alt="" className="checkout__ad" />
            
            <h3>Hello, {user ? user.email : ""}</h3>
            <h2 className='checkout__title'>
                Your shopping basket
            </h2>

            {/* Render a CheckoutProduct for each of the items
            in the basket array  */}
            {basket.map(item => (
                <CheckoutProduct 
                    id = {item.id}
                    title= {item.title}
                    url= {item.url}
                    price= {item.price}
                    rating= {item.rating}
                />
            ))}
            
        </div>

        <div className="checkout__right">
           <Subtotal />
        </div>
    </div>
  )
}

export default Checkout