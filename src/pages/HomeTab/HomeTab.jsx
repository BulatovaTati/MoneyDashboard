import useMedia from '../../hooks/useMedia';
import Balance from '../../components/Balance/Balance';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';

import s from './HomeTab.module.css';

const HomeTab = () => {
    const { isMobile } = useMedia();

    return (
        <>
            {isMobile && <Balance />}
            <TransactionsList />
            <ButtonAddTransactions />
        </>
    );
};

export default HomeTab;
