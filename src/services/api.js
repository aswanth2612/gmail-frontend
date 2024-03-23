import axios from 'axios';

const API_GMAIL = async (urlObject, payload, type) => {
    console.log(process.env.REACT_APP_API_URL + urlObject.endpoint + type);
    return await axios({
        method: urlObject.method,
        url: `${process.env.API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    })
}

export default API_GMAIL;