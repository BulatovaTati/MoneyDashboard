export const formattedBalance = balance =>
    new Intl.NumberFormat('uk-UA', {
        style: 'decimal',
        minimumFractionDigits: 2,
    })
        .format(balance)
        .replace(',', '.');
