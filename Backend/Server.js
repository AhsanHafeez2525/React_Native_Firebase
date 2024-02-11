const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Folks..!!! Please subscribe my channel');
});

app.listen(4002, () => console.log('Running on http://localhost:4002'));
