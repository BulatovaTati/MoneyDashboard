import axios from 'axios';

export const userTransactionsApi = axios.create({
    baseURL: 'https://moneydashboard-back.onrender.com',
});

export const setToken = token => {
    userTransactionsApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
    userTransactionsApi.defaults.headers.common.Authorization = ``;
};
