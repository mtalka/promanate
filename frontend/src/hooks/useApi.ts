import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useApi = () => {
    const { getAccessTokenSilently } = useAuth0();

    const instance = axios.create();

    instance.interceptors.request.use(
        async (config) => {
            const token = await getAccessTokenSilently();
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};
