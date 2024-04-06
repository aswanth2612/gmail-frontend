import axios from 'axios';

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const {
        params,
        urlParams,
        ...body
    } = requestData;

    return await axios({
        method: serviceUrlObject.method,
        url: `${import.meta.env.VITE_FRONT_PATH}/${serviceUrlObject.endpoint}/${type}`,
        params: requestData,
        data: requestData
    })
}

export default API_GMAIL;