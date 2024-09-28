import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.AXIOS_URL,
    timeout: Number(process.env.AXIOS_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosInstance };
