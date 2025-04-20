import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const HomeTab = () => {
    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    return <p>Home</p>;
};

export default HomeTab;


// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import TransactionsList from '../../components/TransactionsList/TransactionsList'
// import useMedia from '../../hooks/useMedia'
// import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions'
// const HomeTab = () => {
//     const { isMobile } = useMedia();
//     const dispatch = useDispatch();

//     return (<div><TransactionsList/>
//         <ButtonAddTransactions/></div>);
// };

// export default HomeTab;