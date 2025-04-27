import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatLoading, selectStatError, selectSummary, selectIncomeSummaryByPeriod, selectExpenseSummaryByPeriod } from '../../redux/statistics/selectors';

import { getTransactionsCategories, getExpenseSummaryByCategories, getIncomeAndExpenseSummaryByPeriod } from '../../redux/statistics/operations';

import Chart from '../../components/Chart/Chart';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Loader from '../../components/Loader/Loader';

import css from './StatisticsTab.module.css';

const StatisticsTab = () => {
    const dispatch = useDispatch();

    const summary = useSelector(selectSummary);
    const isLoading = useSelector(selectStatLoading);
    const error = useSelector(selectStatError);
    const incomeSummaryByPeriod = useSelector(selectIncomeSummaryByPeriod);
    const expensesSummaryByPeriod = useSelector(selectExpenseSummaryByPeriod);

    const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const now = new Date();
    const currentMonthName = months[now.getMonth() + 1];
    const currentYear = `${now.getFullYear()}`;

    const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    useEffect(() => {
        fetchData(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const fetchData = (monthName, year) => {
        if (!monthName || !year) return;

        const yearNumber = Number(year);
        const monthIndex = months.indexOf(monthName);

        const period = monthName === 'All month' ? { year: yearNumber } : { month: monthIndex, year: yearNumber };

        dispatch(getExpenseSummaryByCategories(period));
        dispatch(getIncomeAndExpenseSummaryByPeriod(period));
    };

    const handleMonthChange = month => {
        setSelectedMonth(month);
    };

    const handleYearChange = year => {
        setSelectedYear(year);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className={css.statistics}>
                <p className={css.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={css.statistics}>
            <div>
                <h2 className={css.statisticsTitle}>Statistics</h2>

                <div className={css.chart}>
                    <Chart summary={summary || []} expensesSummaryByPeriod={expensesSummaryByPeriod || 0} />
                </div>
            </div>

            <div className={css.statisticsData}>
                <div className={css.statisticsDashboard}>
                    <StatisticsDashboard selectedMonth={selectedMonth} selectedYear={selectedYear} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
                </div>

                <StatisticsTable summary={summary || []} incomeSummaryByPeriod={incomeSummaryByPeriod || 0} expensesSummaryByPeriod={expensesSummaryByPeriod || 0} />
            </div>
        </div>
    );
};

export default StatisticsTab;
