import React from 'react';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
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
        { categoryId: '1', expenses: 8700.0 },
        { categoryId: '2', expenses: 3800.74 },
        { categoryId: '3', expenses: 1500.0 },
        { categoryId: '4', expenses: 800.0 },
        { categoryId: '5', expenses: 2208.5 },
        { categoryId: '6', expenses: 300.0 },
        { categoryId: '7', expenses: 3400.0 },
        { categoryId: '8', expenses: 1230.0 },
        { categoryId: '9', expenses: 610.0 },
    ];

    const expenses = summary.reduce((acc, item) => acc + item.expenses, 0);
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
