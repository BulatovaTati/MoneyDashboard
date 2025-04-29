import React from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { months, years } from '../../helpers/constants';
import css from './StatisticsDashboard.module.css';

const StatisticsDashboard = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
    return (
        <div className={css.wrapper}>
            {/* Month */}
            <Listbox value={selectedMonth} onChange={onMonthChange}>
                {({ open }) => (
                    <div className={`${css.dropdownWrapper} ${open ? css.open : ''}`}>
                        <ListboxButton className={css.dropdownButton}>{selectedMonth}</ListboxButton>
                        <ListboxOptions className={css.dropdownList}>
                            {months.map(month => (
                                <ListboxOption key={month} value={month} as="li">
                                    {({ selected }) => <div className={`${css.dropdownItem} ${selected ? css.dropdownItemActive : ''}`}>{month}</div>}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                )}
            </Listbox>

            {/* Year */}
            <Listbox value={selectedYear} onChange={onYearChange}>
                {({ open }) => (
                    <div className={`${css.dropdownWrapper} ${open ? css.open : ''}`}>
                        <ListboxButton className={css.dropdownButton}>{selectedYear}</ListboxButton>
                        <ListboxOptions className={css.dropdownList}>
                            {years.map(year => (
                                <ListboxOption key={year} value={year} as="li">
                                    {({ selected }) => <div className={`${css.dropdownItem} ${selected ? css.dropdownItemActive : ''}`}>{year}</div>}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                )}
            </Listbox>
        </div>
    );
};

export default StatisticsDashboard;
