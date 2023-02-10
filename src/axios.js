import axios from "axios";

//axios library has a create function that 
//creats client secret to be sent to stripe
//API server
const instance = axios.create({
    //Local API endpoint
    baseURL:"https://us-central1-challenge-2cc25.cloudfunctions.net/api"
    // "http://127.0.0.1:5001/challenge-2cc25/us-central1/api" 
    //The API url goes here
})

export default instance;