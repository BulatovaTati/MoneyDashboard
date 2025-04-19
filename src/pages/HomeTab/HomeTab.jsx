import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useMedia from '../../hooks/useMedia.jsx';
import { getTransactions } from '../../redux/transactions/operations.js';
import Balance from '../../components/Balance/Balance.jsx';
import TransactionsList from '../../components/TransactionsList/TransactionsList.jsx';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions.jsx';
import { getTransactionsCategories } from '../../redux/statistics/operations.js';

const HomeTab = () => {
    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    // Написати операцію, яка робить запит за транзакціями авторизованого користувача і записує результат у redux store
    // Написати операцію, яка робить запит за категоріями транзакцій і записує результат у redux store

    // useEffect(() => {
    //     dispatch(getTransactions());
    // }, [dispatch]);
    // useEffect(() => {
    //     dispatch(getTransactionsCategories());
    // }, [dispatch]);

    return (
        <div>
            HomeTab
            {isMobile && <Balance />}
            <TransactionsList />
            <ButtonAddTransactions />
        </div>
    );
};

export default HomeTab;
