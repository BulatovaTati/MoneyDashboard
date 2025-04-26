import React from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import css from './StatisticsDashboard.module.css';

const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => `${2020 + i}`);

const StatisticsDashboard = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
    return (
        <div className={css.wrapper}>
            {/* Month */}
            <div className={css.dropdownWrapper}>
                <Listbox value={selectedMonth} onChange={onMonthChange}>
                    <div>
                        <ListboxButton className={css.dropdownButton}>{selectedMonth}</ListboxButton>
                        <ListboxOptions className={css.dropdownList}>
                            {months.map(month => (
                                <ListboxOption key={month} value={month} as="li">
                                    {({ selected }) => <div className={`${css.dropdownItem} ${selected ? css.dropdownItemActive : ''}`}>{month}</div>}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>

            {/* Year */}
            <div className={css.dropdownWrapper}>
                <Listbox value={selectedYear} onChange={onYearChange}>
                    <div>
                        <ListboxButton className={css.dropdownButton}>{selectedYear}</ListboxButton>
                        <ListboxOptions className={css.dropdownList}>
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
