import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, userTransactionsApi } from '../../api/userTransactionsApi';

export const getTransactionsCategories = createAsyncThunk('transactions/categories', async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
        return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
        const { data } = await userTransactionsApi.get('/api/transaction-categories');
        return data.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message || 'Failed to fetch categories');
    }
});

export const getExpenseSummaryByCategories = createAsyncThunk('transactions/summaryByCategories', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
        return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
        let query = `api/transactions-summary/categories?year=${year}`;
        if (typeof month === 'number') {
            query += `&month=${month}`;
        }

        const { data } = await userTransactionsApi.get(query);
        return data.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        return thunkApi.rejectWithValue(error.message || 'Failed to fetch expense summary');
    }
});

export const getIncomeAndExpenseSummaryByPeriod = createAsyncThunk('transactions/summaryByPeriod', async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
        return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
        let query = `api/transactions-summary-by-period?year=${year}`;
        if (typeof month === 'number') {
            query += `&month=${month}`;
        }

        const { data } = await userTransactionsApi.get(query);
        const { incomeSummaryByPeriod, expenseSummaryByPeriod } = data.data;

        return {
            incomeSummaryByPeriod,
            expenseSummaryByPeriod,
        };
    } catch (error) {
        if (error.response?.status === 404) {
            return {
                incomeSummaryByPeriod: 0,
                expenseSummaryByPeriod: 0,
            };
        }
        return thunkApi.rejectWithValue(error.message || 'Failed to fetch summary by period');
    }
});
