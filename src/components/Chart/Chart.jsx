import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement);

const Chart = ({ summary, categories, balance }) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];

    const expensesOnly = summary?.filter(item => item.type === 'EXPENSE') || [];

    const hasExpenses = expensesOnly.length > 0;

    const data = {
        labels: hasExpenses
            ? expensesOnly.map(item => {
                  const category = categories.find(cat => cat.id === item.categoryId);
                  return category ? category.name : 'Невідомо';
              })
            : ['No Data'],
        datasets: [
            {
                data: hasExpenses ? expensesOnly.map(item => item.EXPENSE) : [1], // один сірий сектор
                backgroundColor: hasExpenses ? colors.slice(0, expensesOnly.length) : ['#e0e0e0'], // сірий
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: '70%',
    };

    return (
        <div className={css.chartWrapper}>
            <Doughnut data={data} options={options} />
            <div className={css.chartCenter}>
                {hasExpenses ? (
                    <>
                        <span>₴</span>
                        <span>{balance.toFixed(2)}</span>
                    </>
                ) : (
                    <p className={css.emptyText}>No Transactions Yet</p>
                )}
            </div>
        </div>
    );
};

export default Chart;
