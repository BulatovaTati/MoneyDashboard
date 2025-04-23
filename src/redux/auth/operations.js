import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeToken, setToken, userTransactionsApi } from '../../api/userTransactionsApi';

export const registerThunk = createAsyncThunk('auth/sign-up', async (credentials, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.post('/api/auth/sign-up', credentials);
        setToken(data.data.token);

        return data.data;
    } catch (error) {
        const message = error.response?.data?.message || error.data?.message || 'Registration failed';
        return thunkApi.rejectWithValue(message);
    }

    // lolita@lolo.com
    // lolitalolo
});

export const loginThunk = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const { data } = await userTransactionsApi.post('/api/auth/sign-in', credentials);
        setToken(data.token);
        return data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.delete('/api/auth/sign-out');
        removeToken();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const refreshThunk = createAsyncThunk('auth/current', async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (savedToken) {
        setToken(savedToken);
    } else {
        return thunkApi.rejectWithValue("Token doesn't exist");
    }

    try {
        const { data } = await userTransactionsApi.get('/api/users/current');
        return data.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const getBalanceThunk = createAsyncThunk('getBalance', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.get('/api/users/current');

        return data.data.balance;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
