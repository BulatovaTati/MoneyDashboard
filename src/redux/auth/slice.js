import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { registerThunk, loginThunk, logoutThunk, refreshThunk } from './operations';
import { addTransactions, deleteTransactions, editTransactions } from '../transactions/operations';

const initialState = {
    user: {
        name: null,
        email: null,
        balance: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isAuthLoading: false,
    isAuthError: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(logoutThunk.fulfilled, () => {
                return initialState;
            })
            .addCase(refreshThunk.pending, state => {
                state.isRefreshing = true;
                state.isAuthLoading = true;
                state.isLoggedIn = true;
            })
            .addCase(refreshThunk.rejected, state => {
                return initialState;
            })
            .addCase(refreshThunk.fulfilled, (state, { payload }) => {
                state.user.name = payload.name;
                state.user.email = payload.email;
                state.user.balance = payload.balance;

                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.isAuthLoading = false;
            })
            .addCase(addTransactions.fulfilled, (state, { payload }) => {
                state.user.balance = payload.balanceAfter;
            })
            .addCase(editTransactions.fulfilled, (state, { payload }) => {
                state.user.balance = payload.balanceAfter;
            })
            .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
                state.user.balance = payload.balanceAfter;
            })
            .addMatcher(isAnyOf(loginThunk.fulfilled, registerThunk.fulfilled), (state, { payload }) => {
                state.user.name = payload.user.name;
                state.user.email = payload.user.email;
                state.user.balance = payload.user.balance;
                state.token = payload.token;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
                state.isAuthError = null;
            })
            .addMatcher(isAnyOf(loginThunk.pending, registerThunk.pending), state => {
                state.isAuthLoading = true;
                state.isAuthError = null;
            })
            .addMatcher(isAnyOf(loginThunk.rejected, registerThunk.rejected), (state, { payload }) => {
                state.isAuthLoading = false;
                state.isAuthError = payload;
            });
    },
});

export const authReducer = slice.reducer;
