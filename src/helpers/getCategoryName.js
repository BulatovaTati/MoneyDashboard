export const getCategoryName = (categoryId, categories) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
};
