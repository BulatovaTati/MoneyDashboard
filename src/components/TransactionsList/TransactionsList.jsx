import TransactionsItem from '../TransactionsItem/TransactionsItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/transactions/selectors';
import useMedia from '../../hooks/useMedia';
import s from './TransactionsList.module.css';
import { openAddModal } from '../../redux/modals/slice';
import FormButton from '../FormButton/FormButton';
import Loader from '../Loader/Loader';
import { selectTransactionsError, selectTransactionsLoading } from '../../redux/transactions/selectors';

const TransactionsList = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isLoading = useSelector(selectTransactionsLoading);
    const isError = useSelector(selectTransactionsError);
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    const { isMobile } = useMedia();

    return (
        <>
            {isLoading && <Loader />}
            {isError && <p className={s.text}>Oops, something went wrong...</p>}
            {!isLoading && transactions.length === 0 ? (
                <div className={s.container}>
                    <p>No transactions available yet.</p>
                    <p>Let's add your first transaction</p>
                    <FormButton type="button" text="Add transaction" variant="multiColorButton" handlerFunction={() => dispatch(openAddModal())} />
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
                            {sortedTransactions.map((transaction, index) => (
                                <TransactionsItem key={transaction.id || `${transaction.transactionDate}-${index}`} transaction={transaction} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default TransactionsList;
