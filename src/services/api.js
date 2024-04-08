import axios from 'axios';

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const {
        params,
        urlParams,
        ...body
    } = requestData;

    axios.defaults.withCredentials = true;
    return await axios({
        method: serviceUrlObject.method,
        url: `${import.meta.env.VITE_BACKEND_PATH}/${serviceUrlObject.endpoint}/${type}`,
        params: requestData,
        data: requestData,
        withCredentials: true,
    })
}

export default API_GMAIL;