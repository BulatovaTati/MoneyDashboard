import { useDispatch, useSelector } from 'react-redux';
import { selectTransactionsError, selectTransactionsLoading } from '../../redux/transactions/selectors';
// import { selectCategories } from '../../redux/statistics/selectors';

import s from './TransactionList.module.css';
import Loader from '../Loader/Loader';
import TransactionItem from '../TransactionsItem/TransactionsItem';
import FormButton from '../FormButton/FormButton';
import { openAddModal } from '../../redux/modals/slice';
import useMedia from '../../hooks/useMedia';

function getHeadTransaction() {
    return ['date', 'type', 'category', 'comment', 'sum'];
}

function getFormattedTransactions(transactions, categories) {
    return transactions
        .map(transaction => {
            const { transactionDate: date, amount: sum, categoryId, type, comment, id } = transaction;
            console.log('Transaction Type:', type); // Перевірка значення type
            const category = categories.find(item => item.id === categoryId)?.name || 'Invalid';
            return {
                id,
                date,
                type: type === 'EXPENSE' ? '-' : type === 'INCOME' ? '+' : 'Unknown',
                category,
                comment,
                sum: Math.abs(sum),
            };
        })
        .toSorted((a, b) => b.date.localeCompare(a.date));
}

const mockTransactions = [
    {
        id: '1',
        transactionDate: '2023-01-04',
        amount: -300,
        categoryId: '1',
        type: 'EXPENSE',
        comment: 'Gift for your wife',
    },
    {
        id: '2',
        transactionDate: '2023-01-05',
        amount: 8000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'January bonus',
    },
    {
        id: '3',
        transactionDate: '2023-01-07',
        amount: -1000,
        categoryId: '3',
        type: 'EXPENSE',
        comment: 'Oil',
    },
    {
        id: '4',
        transactionDate: '2023-01-07',
        amount: -280,
        categoryId: '4',
        type: 'EXPENSE',
        comment: 'Vegetables for the week',
    },
    {
        id: '5',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '6',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '7',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '8',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '9',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '10',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '11',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
    {
        id: '12',
        transactionDate: '2023-01-07',
        amount: 1000,
        categoryId: '2',
        type: 'INCOME',
        comment: 'Gift',
    },
];

const mockCategories = [
    { id: '1', name: 'Other' },
    { id: '2', name: 'Income' },
    { id: '3', name: 'Car' },
    { id: '4', name: 'Products' },
];

function TransactionList() {
    const reduxTransactions = mockTransactions;
    const isLoading = useSelector(selectTransactionsLoading);
    const isError = useSelector(selectTransactionsError);
    const categories = mockCategories;

    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    return (
        <>
            {isLoading && <Loader />}
            {isError && <p className={s.text}>Oops, something went wrong...</p>}
            {!isLoading && reduxTransactions.length === 0 ? (
                <div className={s.container}>
                    <p>No transactions available yet.</p> <p> Let's add your first transaction:</p>
                    <FormButton type="button" text={'Add transaction'} variant={'multiColorButton'} handlerFunction={() => dispatch(openAddModal())} />
                </div>
            ) : (
                <>
                    {!isMobile && (
                        <ul className={s.headRow}>
                            {getHeadTransaction().map((value, idx) => {
                                return (
                                    <li key={idx} className={s.rowItem}>
                                        {value}
                                    </li>
                                );
                            })}
                            <li className={s.rowItem}></li>
                        </ul>
                    )}
                    <ul className={s.list}>
                        {getFormattedTransactions(reduxTransactions, categories).map(({ id, ...item }) => {
                            return <TransactionItem key={id} id={id} transaction={item} />;
                        })}
                    </ul>
                </>
            )}
        </>
    );
}

export default TransactionList;
