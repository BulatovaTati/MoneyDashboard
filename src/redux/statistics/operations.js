import { createAsyncThunk } from '@reduxjs/toolkit';

import { setToken, userTransactionsApi } from '../../api/userTransactionsApi';

export const getTransactionsCategories = createAsyncThunk('transactions/categories', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.get('/api/transaction-categories');
        return data.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Something went wrong';
        return thunkApi.rejectWithValue(errorMessage);
    }
});

export const getExpenseSummaryByCategories = createAsyncThunk('transactions/summaryByCategories', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
        return thunkApi.rejectWithValue('Unable to fetch');
    }

    setToken(savedToken);

    try {
        let query = `api/transactions/summary/categories?year=${year}`;
        if (month !== 'All month') {
            query += `&month=${month}`;
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const getIncomeAndExpenseSummaryByPeriod = createAsyncThunk('transactions/summaryByPeriod', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) return thunkApi.rejectWithValue('No token');

    setToken(savedToken);

    try {
        let query = `api/transactions/summary/period?year=${year}`;
        if (month !== 'All month') {
            query += `&month=${month}`;
        }

        const { data } = await userTransactionsApi.get(query);

        return {
            incomeSummaryByPeriod: data.incomeSummaryByPeriod,
            expenseSummaryByPeriod: data.expenseSummaryByPeriod,
        };
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
