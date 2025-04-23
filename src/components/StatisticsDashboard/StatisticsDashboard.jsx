import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTransactionsCategories, getTransactionsSummaryByPeriod } from '../../redux/statistics/operations';

import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';

import css from './StatisticsDashboard.module.css';

const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => `${2020 + i}`);

const StatisticsDashboard = () => {
    const dispatch = useDispatch();

    const currentMonthIndex = new Date().getMonth() + 1;

    const currentMonth = months[currentMonthIndex];
    const currentYear = `${new Date().getFullYear()}`;

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);

    useEffect(() => {
        dispatch(getTransactionsCategories());
    }, [dispatch]);

    useEffect(() => {
        const period = selectedMonth === 'All month' ? { year: selectedYear } : { month: selectedMonth, year: selectedYear };

        dispatch(getTransactionsSummaryByPeriod(period));
    }, [dispatch, selectedMonth, selectedYear]);

    return (
        <div className={css.wrapper}>
            {/* Month Dropdown */}
            <div className={`${css.dropdownWrapper} ${isMonthOpen ? css.open : ''}`}>
                <Listbox value={selectedMonth} onChange={setSelectedMonth}>
                    <div>
                        <ListboxButton className={css.dropdownButton} onClick={() => setIsMonthOpen(prev => !prev)}>
                            {selectedMonth}
                        </ListboxButton>
                        <ListboxOptions className={css.dropdownList} onBlur={() => setIsMonthOpen(false)}>
                            {months.map(month => (
                                <ListboxOption key={month} value={month} as="li">
                                    {({ selected }) => <div className={`${css.dropdownItem} ${selected ? css.dropdownItemActive : ''}`}>{month}</div>}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>

            {/* Year Dropdown */}
            <div className={`${css.dropdownWrapper} ${isYearOpen ? css.open : ''}`}>
                <Listbox value={selectedYear} onChange={setSelectedYear}>
                    <div>
                        <ListboxButton className={css.dropdownButton} onClick={() => setIsYearOpen(prev => !prev)}>
                            {selectedYear}
                        </ListboxButton>
                        <ListboxOptions className={css.dropdownList} onBlur={() => setIsYearOpen(false)}>
                            {years.map(year => (
                                <ListboxOption key={year} value={year} as="li">
                                    {({ selected }) => <div className={`${css.dropdownItem} ${selected ? css.dropdownItemActive : ''}`}>{year}</div>}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};

export default StatisticsDashboard;
