import axios from 'axios';

const API_URI = 'https://gmailclone-backend-olkn.onrender.com'

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const { params, urlParams, ...body } = requestData;

    return await axios({
        method: serviceUrlObject.method,
        url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
        data: requestData
    })
}

export default API_GMAIL;