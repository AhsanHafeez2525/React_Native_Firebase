const stripe = require('stripe')(
  'sk_test_51OfUNeB8XQNXDXaoWZji4KD1udgjmLXS1qBSm5QV8kXTX6uBFXzQtiJexO3pJjxo5gLOJObW83i0DEbT4WZl6hjh001bFjH2Mc',
);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Folks..!!! Please subscribe my channel');
});

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.

  const {amount, currency} = req.body;

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-08-01'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    payment_method_types: ['card'],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.listen(3006, () => console.log('Running on http://localhost:3006'));
