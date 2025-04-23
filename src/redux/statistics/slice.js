import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getTransactionsCategories, getExpenseSummaryByCategories, getIncomeAndExpenseSummaryByPeriod } from './operations';

const initialState = {
    summary: [],
    categories: [],
    isStatisticsLoading: false,
    isStatisticsError: null,

    incomeSummaryByPeriod: 0,
    expenseSummaryByPeriod: 0,
};

const slice = createSlice({
    name: 'statistics',
    initialState,
    extraReducers: builder => {
        builder
            // Категорії транзакцій
            .addCase(getTransactionsCategories.fulfilled, (state, { payload }) => {
                state.isStatisticsLoading = false;
                state.categories = payload;
            })

            // Зведення за період
            .addCase(getExpenseSummaryByCategories.fulfilled, (state, { payload }) => {
                state.isStatisticsLoading = false;
                state.summary = payload;
            })

            // Баланс за період
            .addCase(getIncomeAndExpenseSummaryByPeriod.fulfilled, (state, { payload }) => {
                state.isStatisticsLoading = false;
                state.incomeSummaryByPeriod = payload.incomeSummaryByPeriod;
                state.expenseSummaryByPeriod = payload.expenseSummaryByPeriod;
            })

            // Помилки
            .addMatcher(isAnyOf(getTransactionsCategories.rejected, getExpenseSummaryByCategories.rejected, getIncomeAndExpenseSummaryByPeriod.rejected), (state, { payload }) => {
                state.isStatisticsLoading = false;
                state.isStatisticsError = payload;
            })

            // Pending стани
            .addMatcher(isAnyOf(getTransactionsCategories.pending, getExpenseSummaryByCategories.pending, getIncomeAndExpenseSummaryByPeriod.pending), state => {
                state.isStatisticsLoading = true;
                state.isStatisticsError = null;
            });
    },
});

export const statisticsReducer = slice.reducer;
