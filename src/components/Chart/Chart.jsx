import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement);

const Chart = ({ summary, categories, balance }) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];

    const data = {
        labels: summary.map(item => {
            const category = categories.find(cat => cat.id === item.categoryId);
            return category ? category.name : 'Невідомо';
        }),
        datasets: [
            {
                data: summary.map(item => item.expenses),
                backgroundColor: colors.slice(0, summary.length),
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
                <span>₴</span>
                <span>{balance.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Chart;
