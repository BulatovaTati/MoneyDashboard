import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { useSelector } from 'react-redux';
// import { selectTransactions } from '../../redux/transactions/selectors';
import useMedia from '../../hooks/useMedia';
import s from './TransactionsList.module.css';
import { openAddModal } from '../../redux/modals/slice';
import FormButton from '../FormButton/FormButton';
import Loader from '../Loader/Loader'
import { selectTransactionsError, selectTransactionsLoading } from '../../redux/transactions/selectors';

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


const TransactionsList = () => {
    const transactions = mockTransactions;
    const isLoading = useSelector(selectTransactionsLoading);
    const isError = useSelector(selectTransactionsError);
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));


    const { isMobile } = useMedia();

    return (
        <>
            {isLoading && <Loader />}
            {isError && <p className={s.text}>Oops, something went wrong...</p>}
            {!isLoading && transactions.length === 0 ? (
                <div className={s.container}>
                    <p>No transactions available yet.</p>
                    <p>Let's add your first transaction:</p>
                    <FormButton type="button" text={'Add transaction'} variant={'multiColorButton'} handlerFunction={() => dispatch(openAddModal())} />
                </div>
            ) : (
                <div className={s.financeTableContainer}>
                    <table className={s.financeTable}>
                        {!isMobile && (
                            <thead className={s.headTab}>
                                <tr className={s.tr}>
                                    <th className={s.date}>Date</th>
                                    <th className={s.type}>Type</th>
                                    <th className={s.category}>Category</th>
                                    <th className={s.comment}>Comment</th>
                                    <th className={transactions.length === 0 ? s.nonActions : s.sum}>Sum</th>
                                    {transactions.length !== 0 && <th className={s.actions}></th>}
                                </tr>
                            </thead>
                        )}
                        <tbody className={s.th}>
                            {sortedTransactions.map(transaction => (
                                <TransactionsItem key={transaction.id} transaction={transaction} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default TransactionsList;
