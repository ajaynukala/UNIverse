const axios = require('axios');
console.log(axios.getUri({ baseURL: 'http://localhost:8080/api', url: '/auth/register' }));
console.log(axios.getUri({ baseURL: 'http://localhost:8080/api', url: 'auth/register' }));
