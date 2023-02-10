import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'
import FlipMove from 'react-flip-move';

function CheckoutProduct({id, title, price, url, rating, hideButton}) {

  const [state, dispatch] = useStateValue();

   // Remove the item from the basket
  const removeFromBasket = () => {
    dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
    })
  }  
  return (
    <FlipMove >
        <div className="checkoutProduct">
          {/* image section */}
          <img className='checkoutProduct__image' src={url}></img>

          {/* info section */}
          <div className="checkoutProduct__info">
              <p className='checkoutProduct__title'>{title}</p>
              <p className='checkoutProduct__price'>
                  <small>$</small>
                  <strong>{price}</strong>
              </p>
              <div className="checkoutProduct__rating">
                  {/* Create emtpty array with length of "rating" */}
                  {/* that we map through it */}
                  {Array(rating)
                  .fill()
                  .map((_, i) => (
                      <p>&#11088;</p>
                  ))}
              </div>
              {!hideButton && (
                <button onClick={removeFromBasket}>Remove from the Basket</button>
              )}
              
          </div>
        </div>
    </FlipMove>
    

    
  )
}

export default CheckoutProduct