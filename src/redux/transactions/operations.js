import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionsApi } from '../../api/userTransactionsApi';
import { getBalanceThunk } from '../auth/operations';

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

        thunkApi.dispatch(getBalanceThunk());
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const deleteTransactions = createAsyncThunk('transactions/delete', async (id, thunkApi) => {
    try {
        await userTransactionsApi.delete(`/api/transactions/${id}`);
        thunkApi.dispatch(getBalanceThunk());
        return id;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const editTransactions = createAsyncThunk('transactions/edit', async ({ id, transaction }, thunkApi) => {
    try {
        const { data } = await userTransactionsApi.patch(`/api/transactions/${id}`, transaction);
        thunkApi.dispatch(getBalanceThunk());
        thunkApi.dispatch(getTransactions());
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
