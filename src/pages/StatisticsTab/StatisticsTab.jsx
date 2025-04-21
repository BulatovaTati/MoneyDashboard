import React from 'react';
import Chart from '../../components/Chart/Chart';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';

import css from './StatisticsTab.module.css';

const StatisticsTab = () => {
    const categories = [
        { id: '1', name: 'Main expenses' },
        { id: '2', name: 'Products' },
        { id: '3', name: 'Car' },
        { id: '4', name: 'Self care' },
        { id: '5', name: 'Child care' },
        { id: '6', name: 'Household products' },
        { id: '7', name: 'Education' },
        { id: '8', name: 'Leisure' },
        { id: '9', name: 'Other expenses' },
    ];

    const summary = [
        { categoryId: '1', type: 'EXPENSE', EXPENSE: 8700.0 },
        { categoryId: '2', type: 'EXPENSE', EXPENSE: 3800.74 },
        { categoryId: '3', type: 'EXPENSE', EXPENSE: 1500.0 },
        { categoryId: '4', type: 'EXPENSE', EXPENSE: 800.0 },
        { categoryId: '5', type: 'EXPENSE', EXPENSE: 2208.5 },
        { categoryId: '6', type: 'EXPENSE', EXPENSE: 300.0 },
        { categoryId: '7', type: 'EXPENSE', EXPENSE: 3400.0 },
        { categoryId: '8', type: 'EXPENSE', EXPENSE: 1230.0 },
        { categoryId: '9', type: 'EXPENSE', EXPENSE: 610.0 },
    ];

    // Якщо витрат немає, він показує зображення із повідомленням, що немає транзакцій.

    // const summary = [
    //     { categoryId: '1', type: 'INCOME', INCOME: 8700.0 },
    //     { categoryId: '2', type: 'INCOME', INCOME: 3800.74 },
    //     { categoryId: '3', type: 'INCOME', INCOME: 1500.0 },
    //     { categoryId: '4', type: 'INCOME', INCOME: 800.0 },
    //     { categoryId: '5', type: 'INCOME', INCOME: 2208.5 },
    //     { categoryId: '6', type: 'INCOME', INCOME: 300.0 },
    //     { categoryId: '7', type: 'INCOME', INCOME: 3400.0 },
    //     { categoryId: '8', type: 'INCOME', INCOME: 1230.0 },
    //     { categoryId: '9', type: 'INCOME', INCOME: 610.0 },
    // ];

    const expenses = summary.filter(item => item.type === 'EXPENSE').reduce((acc, item) => acc + item.EXPENSE, 0);
    const income = 27350;
    const balance = income - expenses;

    return (
        <div className={css.statistics}>
            <div>
                <h2 className={css.statisticsTitle}>Statistics</h2>
                <div className={css.chart}>
                    <Chart summary={summary} categories={categories} balance={balance} />
                </div>
            </div>
            <div className={css.statisticsData}>
                <div className={css.statisticsDashboard}>
                    <StatisticsDashboard />
                </div>
                <div className={css.statisticsTable}>
                    <StatisticsTable summary={summary} categories={categories} income={income} expenses={expenses} />
                </div>
            </div>
        </div>
    );
};

export default StatisticsTab;
