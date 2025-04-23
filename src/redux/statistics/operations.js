import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi } from '../../api/userTransactionsApi';

export const getTransactionsSummaryByPeriod = createAsyncThunk('transactions/summary', async (period, thunkApi) => {
    try {
        const { month, year } = period;
        if (month || year) {
            const { data } = await axios.get('/api/transactions-summary', {
                params: { month, year },
            });
            return data;
        }
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
