import React, { useState, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip);

// Функция форматирования для добавления пробелов между тысячами
const formatNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const Chart = ({ summary, categories, balance }) => {
    const chartRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];
    const expensesOnly = summary?.filter(item => item.type === 'EXPENSE') || [];
    const hasExpenses = expensesOnly.length > 0;

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
                backgroundColor: hasExpenses ? expensesOnly.map((_, i) => (activeIndex === null ? colors[i] : i === activeIndex ? colors[i] : `${colors[i]}80`)) : ['#e0e0e0'],
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
            tooltip: {
                enabled: false,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ₴${formatNumber(value.toFixed(2))}`;
                    },
                },
            },
        },
        cutout: '70%',
        onHover: (event, elements) => {
            const isMobile = window.innerWidth < 1024;

            if (event?.native?.target) {
                event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
            }

            if (isMobile) {
                if (elements.length > 0) {
                    setActiveIndex(elements[0].index);
                } else {
                    setActiveIndex(null);
                }
            }
        },
    };

    const handleCanvasClick = event => {
        const chart = chartRef.current;
        if (!chart) return;

        const points = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);

        if (points.length > 0) {
            setActiveIndex(points[0].index);
        } else {
            setActiveIndex(null);
        }
    };

    useEffect(() => {
        const handleOutsideClick = e => {
            if (!chartRef.current?.canvas) return;

            if (!chartRef.current.canvas.contains(e.target)) {
                setActiveIndex(null);
            }
        };

        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const activeCategory = activeIndex !== null ? labels[activeIndex] : null;
    const activeAmount = activeIndex !== null ? expensesOnly[activeIndex]?.EXPENSE?.toFixed(2) : null;

    return (
        <div className={css.chartWrapper}>
            <Doughnut ref={chartRef} data={data} options={options} onClick={handleCanvasClick} />
            <div className={`${css.chartCenter} ${activeIndex !== null ? css.fadeIn : css.fadeBack}`}>
                {hasExpenses ? (
                    activeIndex !== null ? (
                        <>
                            <span className={css.categoryText}>{activeCategory}</span>
                            <span className={css.amountText}>₴ {formatNumber(activeAmount)}</span>
                        </>
                    ) : (
                        <span className={css.amountText}>₴ {formatNumber(balance.toFixed(2))}</span>
                    )
                ) : (
                    <p className={css.emptyText}>No expenses</p>
                )}
            </div>
        </div>
    );
};

export default Chart;
