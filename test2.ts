const axios = require('axios');
const { AxiosError } = require('axios');
const { AggregateError } = require('axios');

async function testGeneratePDFEndpoint() {
  try {
  //   const queryParams = {
  //     email: encodeURIComponent('sheanemtolentino@gmail.com'),
  //     userInfo: encodeURIComponent(JSON.stringify({ 
  //         name: 'Sheanem Tolentino', 
  //         checkin: 'June 20', 
  //         checkout: 'June 21', 
  //         roomType: 'Single', 
  //         roomNumber: 1, 
  //         totalAmount: 1000 
  //     })),
  //     siteInfo: encodeURIComponent(JSON.stringify({ 
  //         siteName: 'Hotel California', 
  //         siteAddress: 'California', 
  //         siteContact: '1234567890',
  //         siteType: 'rv', 
  //         length: '30 feet', 
  //         slideouts: '2', 
  //         type: 'Class A'
  //     }))
  // };
  const queryParams = {
    email: encodeURIComponent('sheanemtolentino@gmail.com'),
    userInfo: encodeURIComponent(JSON.stringify({ name: 'Sheanem Tolentino', checkin: 'June 20', checkout: 'June 21', roomType: 'Single', roomNumber: 1, totalAmount: 1000 })),
    siteInfo: encodeURIComponent(JSON.stringify({ siteName: 'Hotel California', siteAddress: 'California', siteContact: '1234567890' }))
  };

    const response = await axios.get('http://localhost:3001/send-userinfo', {
      params: queryParams,
      responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
    });

    console.log('Email sent successfully');
  } catch (error) {``
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