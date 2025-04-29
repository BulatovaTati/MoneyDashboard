export const formatNumber = number => {
    return number
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
