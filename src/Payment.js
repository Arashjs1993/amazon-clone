import {React, useEffect, useState} from 'react'
import { useStateValue } from './StateProvider'
import CheckoutProduct from "./CheckoutProduct";
import {Link, useNavigate } from "react-router-dom"
import "./Payment.css"
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format"
import {getBasketTotal} from "./reducer";
import axios from "./axios"
import {db} from "./firebase"


function Payment() {
  //This hook is used to access the basket and user state
  const [{basket, user}, dispatch] = useStateValue();

  //Hooks 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  //Hooks to handle the state of payment
  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setSecret] = useState(true);


  //useEffect runs anytime the payment component
  //load and also anytime the basket changes and
  //create a new client secrert
  useEffect(() => {
    //Generate the special stripe which allows to change a customer
    //axios creates new client secret for us
    const getClientSecret = async () => {
        const response = await axios({
            method: "post",
            //Stripe expects the total in a currencies subunits
            url: `/payments/create?total=${Math.round(getBasketTotal(basket)) * 100}`
        })


        //Update the client secret status with
        //the response coming from the API server
        setSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, basket)

  console.log('the secret is >>>', clientSecret)
  console.log("user is ", user)

  //does the stripe stuff in this function 
  const handleSubmit= async(event) => {
    event.preventDefault(); 
    //once user clicked on the button we put set the status to
    //processing to avoid the user click more than once on the button
    setProcessing(true);

    //We need to send the stripe API the client secret
    //for them to know how much to charge the user
    if(user){
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //Once payment request is confirmed this code is executed
                db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
    
                //payment intenet = payment confirmation
                //Once confirmation arrives we update the 
                //payment status
                setSucceded(true);
                setError(null);
                setProcessing(false)
    
                dispatch({
                    type: "EMPTY_BASKET"
                })
    
                navigate("/orders")
            
        });
    }else{
        const response = async () => {
            const response = await axios({
                method: "post",
                //Stripe expects the total in a currencies subunits
                url: `/payments/cansel?total=${Math.round(getBasketTotal(basket)) * 100}`
            })
    }

    navigate("/loginfirst")
    
  }  
}


  //handle the changes in the card element
  const handleChange = event => {
    //if event is empty disable the submit button
    setDisabled(event.empty);
    //if there is error change the card element state to error
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>Checkout (
            <Link to="/checkout">{basket?.length} items</Link>    
        )</h1>

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email }</p>
            </div>

        </div>

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment__items'>
                {basket.map(item => (
                    <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        url={item.url}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>

        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Payment method</h3>
                </div>
                <div className='payment__details'>

                    {/* Payment from */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        {/* Display the price in this section */}
                        <div className='payment__priceContainer'>
                            {/* This snippet renders the total price for us */}
                            <CurrencyFormat
                                //value is the render prop calculated by getBasketTotal 
                                renderText={(value) => (
                                    <h3>
                                    Order total: <strong>{value}</strong>
                                    </h3>
                                    )}
                                    decimalScale={2}
                                    // this func sums up the basket total
                                    value={getBasketTotal(basket)} 
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                            />

                            {/* Buttom for the payment form */}
                            <button disabled={processing || disabled ||
                            succeeded}> 
                                {/* This span is used to show the user the status of the payment process*/}
                                <span>{processing ? <p>Processing</p> : 
                                "Buy Now"}</span>
                            </button>
                        </div>

                        {/*   */}
                        {/* fancy if statement */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
