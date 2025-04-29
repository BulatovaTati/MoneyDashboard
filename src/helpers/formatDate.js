export const formatDate = dateString => {
    if (!dateString) return 'Invalid date';
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
};
