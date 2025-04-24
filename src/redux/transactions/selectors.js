export const selectTransactions = state => state.transactions.transactions;
export const selectTransactionsLoading = state => state.transactions.isTransactionsLoading;
export const selectTransactionsError = state => state.transactions.isTransactionsError;
export const selectCurrentTransaction = state => state.transactions.currentTransaction;
