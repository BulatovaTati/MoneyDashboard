import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi } from '../../api/userTransactionsApi';

export const getTransactions = createAsyncThunk('transactions/all', async (_, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.get('/api/transactions');

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const addTransactions = createAsyncThunk('transactions/add', async (transaction, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.post('/api/transactions', transaction);

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const deleteTransactions = createAsyncThunk('transactions/delete', async (id, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.delete(`/api/transactions/${id}`);

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const editTransactions = createAsyncThunk('transactions/edit', async ({ id, updatedTransaction }, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.patch(`/api/transactions/${id}`, updatedTransaction);

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
