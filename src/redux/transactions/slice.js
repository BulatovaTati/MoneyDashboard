import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTransactions, addTransactions, editTransactions, deleteTransactions } from './operations';

const initialState = {
    isTransactionsLoading: false,
    isTransactionsError: null,
    transactions: [],
    currentTransaction: null,
};

const slice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setCurrentTransaction(state, action) {
            state.currentTransaction = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTransactions.fulfilled, (state, { payload }) => {
                state.transactions = payload.data;
            })
            .addCase(addTransactions.fulfilled, (state, { payload }) => {
                state.transactions.push(payload);
            })
            .addCase(editTransactions.fulfilled, (state, { payload }) => {
                const transactionIndex = state.transactions.findIndex(transaction => {
                    return transaction._id === payload._id;
                });
                if (transactionIndex !== -1) {
                    state.transactions[transactionIndex] = payload;
                }
            })
            .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
                state.transactions = state.transactions.filter(transaction => {
                    return transaction._id !== payload;
                });
            })
            .addMatcher(isAnyOf(getTransactions.fulfilled, addTransactions.fulfilled, editTransactions.fulfilled, deleteTransactions.fulfilled), state => {
                state.isTransLoading = false;
                state.isTransError = null;
            })
            .addMatcher(isAnyOf(getTransactions.pending, addTransactions.pending, editTransactions.pending, deleteTransactions.pending), state => {
                state.isTransLoading = true;
                state.isTransError = null;
            })
            .addMatcher(isAnyOf(getTransactions.rejected, addTransactions.rejected, editTransactions.rejected, deleteTransactions.rejected), (state, { payload }) => {
                state.isTransLoading = false;
                state.isTransError = payload;
            });
    },
});

export const transactionsReducer = slice.reducer;
export const { setCurrentTransaction } = slice.actions;
