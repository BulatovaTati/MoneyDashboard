import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useMedia from '../../hooks/useMedia';
import Balance from '../../components/Balance/Balance';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import { getTransactions } from '../../redux/transactions/operations';

import css from './HomeTab.module.css';
import EditTransactionForm from '../../components/EditTransactionForm/EditTransactionForm.jsx';

const HomeTab = () => {
    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    return (
        <div className={css.homeTab}>
            {isMobile && <Balance />}
            <TransactionsList />
            <EditTransactionForm />
            <ButtonAddTransactions />
        </div>
    );
};

export default HomeTab;
