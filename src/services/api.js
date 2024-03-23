import axios from 'axios';


const API_URL = `${process.env.API_URL}`;

const API_GMAIL = async (urlObject, payload, type) => {
    console.log(API_URL + urlObject.endpoint + type);
    return await axios({
        method: urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    })
}

export default API_GMAIL;