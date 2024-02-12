import axios from 'axios';

const creatPaymentIntent = data => {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:5001/payment-sheet', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export default creatPaymentIntent;
