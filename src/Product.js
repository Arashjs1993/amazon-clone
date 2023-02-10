import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({id, title, price, url, rating}) {

    //basket is an array of objects
    //each object contains id,title,rating,price,url
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
        type: "ADD_TO_BASKET",
        item: {
            id: id,
            title: title,
            price: price,
            url: url,
            rating: rating
        }
    })
}

  return (
    <div className='product'>
        <div className="product__info">

            <p>{title}</p>
            <p className='product__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>

            <div className="product__rating">
                {Array(rating).fill().map((_, i) => (
                    <p>&#11088;</p>
                ))}
            </div>
        </div>

        <img src={url} alt="" />

        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product