import './App.css';
import React, {useEffect} from "react"
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Checkout from "./Checkout"
import Login from "./Login"
import { auth } from './firebase';
import {useStateValue} from "./StateProvider"


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
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<div>
            <Home />
          </div>} />

          <Route path="/checkout" element={<div>
            <Checkout />
          </div>}/>

          <Route path='/login' element={<div>
            <Login />
          </div>}/>
        </Routes>
     </div>
    </Router>
  );
}

export default App;
