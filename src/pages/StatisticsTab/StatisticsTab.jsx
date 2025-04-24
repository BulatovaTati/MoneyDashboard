import React from 'react';
// import { useSelector } from 'react-redux';
// import {
//     selectStatLoading,
//     selectStatError,
//     selectSummary,
//     selectCategories,
//     selectIncomeSummaryByPeriod,
//     selectExpenseSummaryByPeriod,
// } from '../../redux/statistics/selectors';

import Chart from '../../components/Chart/Chart';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import Loader from '../../components/Loader/Loader';

import css from './StatisticsTab.module.css';

// Тимчасові дані
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
    { categoryId: '10', type: 'INCOME', INCOME: 27000.0 },
    { categoryId: '10', type: 'INCOME', INCOME: 350.0 },
];

// const categories = useSelector(selectCategories);
// const summary = useSelector(selectSummary);
// const isLoading = useSelector(selectStatLoading);
// const error = useSelector(selectStatError);
// const incomeSummaryByPeriod = useSelector(selectIncomeSummaryByPeriod);
// const expensesSummaryByPeriod = useSelector(selectExpenseSummaryByPeriod);

const expensesSummaryByPeriod = summary.filter(item => item.type === 'EXPENSE').reduce((acc, item) => acc + item.EXPENSE, 0);

const incomeSummaryByPeriod = summary.filter(item => item.type === 'INCOME').reduce((acc, item) => acc + item.INCOME, 0);

const StatisticsTab = () => {
    // if (isLoading) {
    //     return <Loader />;
    // }

    // if (error) {
    //     return (
    //         <div className={css.statistics}>
    //             <p className={css.error}>{error}</p>
    //         </div>
    //     );
    // }

    return (
        <div className={css.statistics}>
            <div>
                <h2 className={css.statisticsTitle}>Statistics</h2>

                <div className={css.chart}>
                    <Chart summary={summary} categories={categories} expensesSummaryByPeriod={expensesSummaryByPeriod} />
                </div>
            </div>

            <div className={css.statisticsData}>
                <div className={css.statisticsDashboard}>
                    <StatisticsDashboard />
                </div>

                <StatisticsTable summary={summary} categories={categories} incomeSummaryByPeriod={incomeSummaryByPeriod} expensesSummaryByPeriod={expensesSummaryByPeriod} />
            </div>
        </div>
    );
};

export default StatisticsTab;

// ДЛЯ БЕКЕНДА робочого

// import React from 'react';
// import { useSelector } from 'react-redux';
// import {
//   selectSummaryByCategories,
//   selectSummaryByPeriod,
//   selectStatLoading,
//   selectStatError,
// } from '../../redux/statistics/selectors';

// import Chart from '../../components/Chart/Chart';
// import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
// import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
// import Loader from '../../components/Loader/Loader';

// import css from './StatisticsTab.module.css';

// const StatisticsTab = () => {
//   const summaryByCategories = useSelector(selectSummaryByCategories);
//   const { incomeSummaryByPeriod, expenseSummaryByPeriod } = useSelector(selectSummaryByPeriod);
//   const isLoading = useSelector(selectStatLoading);
//   const error = useSelector(selectStatError);

//   if (isLoading) return <Loader />;
//   if (error) return <p className={css.error}>{error}</p>;

//   return (
//     <div className={css.statistics}>
//       <div>
//         <h2 className={css.statisticsTitle}>Statistics</h2>
//         <div className={css.chart}>
//           <Chart
//             summary={summaryByCategories}
//             expensesSummaryByPeriod={expenseSummaryByPeriod}
//           />
//         </div>
//       </div>

//       <div className={css.statisticsData}>
//         <div className={css.statisticsDashboard}>
//           <StatisticsDashboard />
//         </div>
//         <StatisticsTable
//           summary={summaryByCategories}
//           incomeSummaryByPeriod={incomeSummaryByPeriod}
//           expensesSummaryByPeriod={expenseSummaryByPeriod}
//         />
//       </div>
//     </div>
//   );
// };

// export default StatisticsTab;
