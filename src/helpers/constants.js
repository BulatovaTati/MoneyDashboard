export const typeOptions = ['Type', '+', '-'];
export const categoryOptions = ['Category', 'Main expenses', 'Products', 'Car', 'Self care', 'Child care', 'Household products', 'Education', 'Leisure', 'Other expenses', 'Entertainment', 'Income'];
export const mapTypeSymbolToKey = symb => (symb === '+' ? 'INCOME' : symb === '-' ? 'EXPENSE' : null);

export const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => `${2020 + i}`);
