import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, userTransactionsApi } from '../../api/userTransactionsApi';
// https://wallet.b.goit.study/docs

export const getTransactionsSummaryByPeriod = createAsyncThunk('transactions/summary', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (savedToken) {
        setToken(savedToken);
    } else {
        return thunkApi.rejectWithValue('Unable to fetch');
    }
    try {
        const { data } = await userTransactionsApi.get(`/api/transactions-summary?month=${month}&year=${year}`);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const getTransactionsCategories = createAsyncThunk('transactions/categories', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.get('/api/transaction-categories');
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
