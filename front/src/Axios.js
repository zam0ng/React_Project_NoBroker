import axios from 'axios';

// Set default base URL for API requests
axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.baseURL = 'http://localhost:8080';

// Set default headers, such as authorization token
// axios.defaults.headers.common['Authorization'] = 'Bearer your-auth-token';

// Now you can use axios for making requests throughout your React components
export default axios;
