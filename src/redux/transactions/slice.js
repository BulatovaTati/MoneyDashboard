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
                state.transactions = state.transactions.map(item => (item._id === payload._id ? payload : item));
            })
            .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
                state.transactions = state.transactions.filter(transaction => {
                    return transaction._id !== payload.id;
                });
            })
            .addMatcher(isAnyOf(getTransactions.fulfilled, addTransactions.fulfilled, editTransactions.fulfilled, deleteTransactions.fulfilled), state => {
                state.isTransactionsLoading = false;
                state.isTransactionsError = null;
            })
            .addMatcher(isAnyOf(getTransactions.pending, addTransactions.pending, editTransactions.pending, deleteTransactions.pending), state => {
                state.isTransactionsLoading = true;
                state.isTransactionsError = null;
            })
            .addMatcher(isAnyOf(getTransactions.rejected, addTransactions.rejected, editTransactions.rejected, deleteTransactions.rejected), (state, { payload }) => {
                state.isTransactionsLoading = false;
                state.isTransactionsError = payload;
            });
    },
});

export const transactionsReducer = slice.reducer;
export const { setCurrentTransaction } = slice.actions;
