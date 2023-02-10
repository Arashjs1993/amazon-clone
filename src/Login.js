import React, {useState} from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import {auth} from "./firebase";

function Login() {

  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Sign in function
  const signIn = e => {
    //To avoid page refresh after the signin
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .then(auth => {
      history('/')
    })
    .catch(error => alert(error.message))
  }

  //Register function
  const register = e => {
    e.preventDefault();

    //Do firebase stuff
    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      //If everything went well it means a new user
      //is created and user is redirected to homepage
      if (auth) {
        history('/')
      }
    })
    .catch(error => alert(error.message))

  }

  return (
    <div className='login'>
        <Link to="/">
            <img className="login__logo" 
            src="https://pngimg.com/uploads/amazon/small/amazon_PNG24.png"
            />
        </Link>
        
        <div className="login__form">
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange=
                {e => setEmail(e.target.value)}></input>
                <h5>Password</h5>
                <input type="password" value={password} onChange=
                {e => setPassword(e.target.value)}></input>
                <button type='submit' onClick={signIn} className='login__signInButton'>Sign in</button>
                <button onClick={register} className='login__registerButton'>Create your account</button>
            </form>
        </div>
    </div>
  )
}

export default Login