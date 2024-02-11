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
  const {amount, currency} = req.body;
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51OfUNeB8XQNXDXaoZIYebF3zFmSFrH78G9C95YfpTmQchcz5siOq2VU482ZqhMb8rsXBKWOwo0GXL1dfb9zRjKUf00V39pPHnW',
  });
});

app.listen(4002, () => console.log('Running on http://localhost:4002'));
