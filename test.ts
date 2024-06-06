const axios = require('axios');
const { AxiosError } = require('axios');
const { AggregateError } = require('axios');

async function testGeneratePDFEndpoint() {
  try {
    const queryParams = {
      userName: encodeURIComponent("Sheane Tolentino"),
      email: 'sheanemtolentino@gmail.com',
      url: 'https://insiderperks.com/wp-content/endpoints/campspot/card-connect.php?cartId=7acb8022-8506-49ed-9e9a-252a0ddb8af7&amount=200&name=Sheane%20Jossel%20Tolentino&state=CA&type=SHIPPING&country=USA&city=Los%20Angeles&address1=123%20Sunny&postal=9001'
    };

    const response = await axios.get('http://localhost:3001/send-mail', {
      params: queryParams,
      responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
    });

    console.log('Email sent successfully');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response) {
        console.error('Error generating PDF:', axiosError.response.status, axiosError.response.data);
      } else {
        console.error('Error generating PDF:', axiosError.message);
      }
    } else if (error instanceof AggregateError) {
      error.errors.forEach(err => {
        console.error('Error generating PDF:', err);
      });
    } else {
      console.error('Error generating PDF:', error);
    }
  }
}

testGeneratePDFEndpoint();