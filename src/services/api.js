import axios from 'axios';


const API_URL = 'http://localhost:8443';

const API_GMAIL = async (urlObject, payload, type) => {
    return await axios({
        method: urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    })
}

export default API_GMAIL;