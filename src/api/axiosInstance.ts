import axios from 'axios';
import { parseCookies } from 'nookies';
import { ENV } from '@/lib/env';

const BASE_URL = ENV.BASE_URL ? ENV.BASE_URL : 'https://zen-moda.com/api';
const getAxiosInstance = () => {
    const cookies = parseCookies();
    const lang = cookies['NEXT_LOCALE'];
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Accept-Language': lang,
        },
    });
    return axiosInstance;
};

export { getAxiosInstance, BASE_URL };
