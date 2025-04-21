import React from 'react';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ summary, categories, income, expenses }) => {
    const getCategoryName = id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Невідомо';
    };

    const getCategoryColor = index => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];
        return colors[index % colors.length];
    };

    return (
        <div className={css.tableWrapper}>
            <div className={css.tableHeader}>
                <span>Category</span>
                <span>Sum</span>
            </div>
            <table className={css.table}>
                <tbody>
                    {summary
                        .filter(item => item.type === 'EXPENSE')
                        .map((item, index) => {
                            const categoryName = getCategoryName(item.categoryId);
                            const color = getCategoryColor(index);
                            return (
                                <tr key={item.categoryId}>
                                    <td className={css.dotCell}>
                                        <span className={css.colorDot} style={{ backgroundColor: color }} />
                                    </td>
                                    <td>{categoryName}</td>
                                    <td>{item.EXPENSE.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            <div className={css.expenses}>
                <span className={css.label}>Expenses:</span>
                <span className={css.value}>{expenses.toFixed(2)}</span>
            </div>
            <div className={css.income}>
                <span className={css.label}>Income:</span>
                <span className={css.value}>{income.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default StatisticsTable;
