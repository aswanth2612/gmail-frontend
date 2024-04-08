import axios from 'axios';

const apiservice = axios.create({
    baseUrl: `${import.meta.env.VITE_BACKEND_PATH}`,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': true,
    }
});

export default apiservice;