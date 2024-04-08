import axios from 'axios';

const authservice = axios.create({
    baseUrl: `${import.meta.env.VITE_BACKEND_PATH}`,
    headers: {
        'Access-Control-Allow-Origin': true,
    }
});

export default authservice;