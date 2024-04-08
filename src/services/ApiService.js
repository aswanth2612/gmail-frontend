import axios from 'axios';

const apiservice = axios.create({
    baseUrl: `${import.meta.env.VITE_BACKEND_PATH}`,
    withCredentials: true
});

export default apiservice;