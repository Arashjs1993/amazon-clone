/* eslint-disable */ 

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51MRGt5DOBPdnR9WHghDR8QDiPXWX0cXm1CaqZq5f5UOATVag18ayRVsbLJKtUA9Aw0FVUduI4sDduXVneantb1El00fQDASodP');

//API setup

//App config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json())

//API routes
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
})

app.post("/payments/create", async(req, res) => {
    //Here we get the parameter sent in the URL by user
    const total = req.query.total;

    console.log("Payment request received!!!", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    //Send the create confirmation to user
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

app.post("/payments/cansel", async(req,res) => {
    const total = req.query.total;

    console.log("Payment canselled!!", total);


    const paymentIntent = await stripe.paymentIntents.cancel({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)