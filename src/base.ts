import axios from 'axios';

export const Axios = axios.create({
    baseURL: `http://18.177.235.233:5000/api/`,
});

