import axios from 'axios';

const prod = {
    url: {
     API_URL: '',
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8000'
    }
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;


export default axios.create({
  baseURL: config.url.API_URL
});