import React, { useState, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip);

const formatNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const Chart = ({ summary, expensesSummaryByPeriod }) => {
    const chartRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];
    const hasExpenses = summary.length > 0;

    const labels = hasExpenses ? summary.map(item => item.category) : ['No Data'];
    const values = hasExpenses ? summary.map(item => item.total) : [1];

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: hasExpenses
                    ? values.map((_, i) => (activeIndex === null ? colors[i % colors.length] : i === activeIndex ? colors[i % colors.length] : `${colors[i % colors.length]}80`))
                    : ['#e0e0e0'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        cutout: '70%',
        onHover: (event, elements) => {
            if (event?.native?.target) {
                event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
            }
        },
    };

    const handleCanvasClick = event => {
        const chart = chartRef.current;
        if (!chart) return;

        const points = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);
        setActiveIndex(points.length > 0 ? points[0].index : null);
    };

    useEffect(() => {
        const handleOutsideClick = e => {
            if (!chartRef.current?.canvas.contains(e.target)) {
                setActiveIndex(null);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    const activeCategory = activeIndex !== null ? labels[activeIndex] : null;
    const activeAmount = activeIndex !== null ? values[activeIndex].toFixed(2) : null;

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
                        <span className={css.amountText}>₴ {formatNumber(expensesSummaryByPeriod.toFixed(2))}</span>
                    )
                ) : (
                    <p className={css.emptyText}>No expenses</p>
                )}
            </div>
        </div>
    );
};

export default Chart;
