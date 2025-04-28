import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSort } from 'react-icons/fa';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';

import TransactionsItem from '../TransactionsItem/TransactionsItem';
import FormButton from '../FormButton/FormButton';
import Loader from '../Loader/Loader';
import useMedia from '../../hooks/useMedia';

import { openAddModal } from '../../redux/modals/slice';
import { selectTransactions, selectTransactionsLoading, selectTransactionsError } from '../../redux/transactions/selectors';
import { selectCategories } from '../../redux/statistics/selectors';

import s from './TransactionsList.module.css';

const typeOptions = ['All Types', '+', '-'];
const categoryOptions = ['All Categories', 'Main expenses', 'Products', 'Car', 'Self care', 'Child care', 'Household products', 'Education', 'Leisure', 'Other expenses', 'Entertainment', 'Income'];

const mapTypeSymbolToKey = symb => (symb === '+' ? 'INCOME' : symb === '-' ? 'EXPENSE' : null);

const getCategoryName = (categoryId, categories) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : 'Unknown';
};

function TransactionsList() {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isLoading = useSelector(selectTransactionsLoading);
    const isError = useSelector(selectTransactionsError);
    const categories = useSelector(selectCategories);
    const { isMobile } = useMedia();

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const toggleSort = field => {
        if (sortField === field) {
            setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedFilteredTransactions = useMemo(() => {
        let list = [...transactions];

        if (selectedType !== 'All Types') {
            const key = mapTypeSymbolToKey(selectedType);
            list = list.filter(t => t.type === key);
        }
        if (selectedCategory !== 'All Categories') {
            list = list.filter(t => getCategoryName(t.categoryId, categories) === selectedCategory);
        }
        if (sortField) {
            list.sort((a, b) => {
                const aVal = sortField === 'date' ? new Date(a.date) : Math.abs(a.amount);
                const bVal = sortField === 'date' ? new Date(b.date) : Math.abs(b.amount);
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            });
        }
        return list;
    }, [transactions, categories, selectedType, selectedCategory, sortField, sortOrder]);

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <p className={s.text}>Oops, something went wrong...</p>;
    }

    if (!isLoading && transactions.length === 0) {
        return (
            <div className={s.container}>
                <p>No transactions available yet.</p>
                <p>Let's add your first transaction</p>
                <FormButton type="button" text="Add transaction" variant="multiColorButton" handlerFunction={() => dispatch(openAddModal())} />
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className={s.mobileList}>
                <AnimatePresence>
                    {sortedFilteredTransactions.map((tx, idx) => (
                        <TransactionsItem key={tx.id ?? tx._id ?? `${tx.date}-${idx}`} transaction={tx} />
                    ))}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className={s.financeTableContainer}>
            <table className={s.financeTable}>
                <thead className={s.headTab}>
                    <tr className={s.tr}>
                        <th className={`${s.date} ${s.column1}`} onClick={() => toggleSort('date')}>
                            Date
                            <FaSort
                                className={s.sortIcon}
                                style={{
                                    transform: sortField === 'date' ? (sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)') : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </th>

                        <th className={`${s.type} ${s.column2}`}>
                            <Listbox value={selectedType} onChange={setSelectedType}>
                                {({ open }) => (
                                    <div className={`${s.listboxWrapper} ${open ? s.open : ''}`}>
                                        <ListboxButton className={s.listboxButton}>{selectedType}</ListboxButton>
                                        <ListboxOptions className={s.listboxOptions}>
                                            {typeOptions.map(type => (
                                                <ListboxOption key={type} value={type} as="li">
                                                    {({ selected }) => <div className={`${s.listboxOption} ${selected ? s.active : ''}`}>{type}</div>}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                )}
                            </Listbox>
                        </th>

                        <th className={`${s.category} ${s.column3}`}>
                            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                {({ open }) => (
                                    <div className={`${s.listboxWrapper} ${open ? s.open : ''}`}>
                                        <ListboxButton className={s.listboxButton}>{selectedCategory}</ListboxButton>
                                        <ListboxOptions className={s.listboxOptions}>
                                            {categoryOptions.map(cat => (
                                                <ListboxOption key={cat} value={cat} as="li">
                                                    {({ selected }) => <div className={`${s.listboxOption} ${selected ? s.active : ''}`}>{cat}</div>}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                )}
                            </Listbox>
                        </th>

                        <th className={`${s.comment} ${s.column4}`}>Comment</th>

                        <th className={`${s.sum} ${s.column5}`} onClick={() => toggleSort('sum')}>
                            Sum
                            <FaSort
                                className={s.sortIcon}
                                style={{
                                    transform: sortField === 'sum' ? (sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)') : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </th>

                        <th className={`${s.actions} ${s.column6}`}></th>
                    </tr>
                </thead>
                <tbody className={s.tbody}>
                    <AnimatePresence>
                        {sortedFilteredTransactions.map((tx, idx) => (
                            <TransactionsItem key={tx.id ?? tx._id ?? `${tx.date}-${idx}`} transaction={tx} />
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
}

export default TransactionsList;
