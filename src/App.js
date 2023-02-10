import './App.css';
import React, {useEffect} from "react"
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Checkout from "./Checkout"
import Login from "./Login"
import { auth } from './firebase';
import {useStateValue} from "./StateProvider"
import Payment from "./Payment"
import Orders from "./Orders"
import Loginfirst from './Loginfirst';

//Stripe libraries
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js"

//Public key for stripe API request
const promise = loadStripe(
  "pk_test_51MRGt5DOBPdnR9WHH8606Qt52aE3Zv5hhjJqZvPr3O09W0HEKhqswhjpiY2qsK8M0irdgYOqXjvTWPZMdzM9CaDr00UsxANJ1V"
);  

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //Only runs once when the App component loads
    auth.onAuthStateChanged(authUser => {
      console.log("The user is >>>", authUser)
      
      if (authUser) {
        //The user is just logged in or the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      }
      else {
        //The user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])


  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div>
            <Header />
            <Home />
          </div>} />

          <Route path="/orders" element={<div>
            <Header />
            <Orders />
          </div>} />

          <Route path="/loginfirst" element={<div>
            <Header />
            <Loginfirst />
          </div>} />

          <Route path="/checkout" element={<div>
            <Header />
            <Checkout />
          </div>}/>

          <Route path='/login' element={<div>
            <Login />
          </div>}/>

          <Route path='/payment' element={<div>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </div>}/>
        </Routes>
     </div>
    </Router>
  );
}

export default App;
