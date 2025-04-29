import React, { useState, useMemo } from 'react';
import { FaSort } from 'react-icons/fa';
import { formatNumber } from '../../helpers/formatNumber';
import { getCategoryColor } from '../../helpers/getCategoryColor';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ summary, incomeSummaryByPeriod, expensesSummaryByPeriod }) => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');

    const toggleSort = field => {
        if (sortField === field) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedSummary = useMemo(() => {
        let sorted = [...summary];

        if (sortField === 'sum') {
            sorted.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.total - b.total;
                } else {
                    return b.total - a.total;
                }
            });
        }

        return sorted;
    }, [summary, sortField, sortOrder]);

    return (
        <div className={css.tableWrapper}>
            <div className={css.tableHeader}>
                <span>Category</span>
                <span className={css.sumHeader} onClick={() => toggleSort('sum')}>
                    Sum
                    <FaSort className={`${css.sortIcon} ${sortField === 'sum' && sortOrder === 'asc' ? css.asc : ''}`} />
                </span>
            </div>
            <table className={css.table}>
                <tbody>
                    {sortedSummary.map((item, index) => {
                        const color = getCategoryColor(index);
                        return (
                            <tr key={item.category}>
                                <td className={css.dotCell}>
                                    <span className={css.colorDot} style={{ backgroundColor: color }} />
                                </td>
                                <td>{item.category}</td>
                                <td>{formatNumber(item.total)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className={css.expenses}>
                <span className={css.label}>Expenses:</span>
                <span className={css.value}>{formatNumber(expensesSummaryByPeriod)}</span>
            </div>
            <div className={css.income}>
                <span className={css.label}>Income:</span>
                <span className={css.value}>{formatNumber(incomeSummaryByPeriod)}</span>
            </div>
        </div>
    );
};

export default StatisticsTable;
