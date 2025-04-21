import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement);

const Chart = ({ summary, categories, balance }) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];
    const expensesOnly = summary?.filter(item => item.type === 'EXPENSE') || [];
    const hasExpenses = expensesOnly.length > 0;

    const [activeIndex, setActiveIndex] = useState(null);

    const labels = hasExpenses
        ? expensesOnly.map(item => {
              const category = categories.find(cat => cat.id === item.categoryId);
              return category ? category.name : 'Невідомо';
          })
        : ['No Data'];

    const data = {
        labels,
        datasets: [
            {
                data: hasExpenses ? expensesOnly.map(item => item.EXPENSE) : [1],
                backgroundColor: hasExpenses
                    ? expensesOnly.map(
                          (_, i) => (activeIndex === null ? colors[i] : i === activeIndex ? colors[i] : `${colors[i]}80`) // прозорість
                      )
                    : ['#e0e0e0'],
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
        onHover: (event, elements) => {
            if (elements.length > 0) {
                setActiveIndex(elements[0].index);
            } else {
                setActiveIndex(null);
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                setActiveIndex(elements[0].index);
            } else {
                setActiveIndex(null);
            }
        },
    };

    const activeCategory = activeIndex !== null ? labels[activeIndex] : null;
    const activeAmount = activeIndex !== null ? expensesOnly[activeIndex]?.EXPENSE?.toFixed(2) : null;

    return (
        <div className={css.chartWrapper}>
            <Doughnut data={data} options={options} />
            <div className={css.chartCenter}>
                {hasExpenses ? (
                    activeIndex !== null ? (
                        <>
                            <span>{activeCategory}</span>
                            <span>₴{activeAmount}</span>
                        </>
                    ) : (
                        <>
                            <span>₴{balance.toFixed(2)}</span>
                        </>
                    )
                ) : (
                    <p className={css.emptyText}>No expenses</p>
                )}
            </div>
        </div>
    );
};

export default Chart;
