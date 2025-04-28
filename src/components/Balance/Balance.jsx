import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBalanceThunk } from '../../redux/auth/operations';
import { selectUserBalance } from '../../redux/auth/selectors';
import s from './Balance.module.css';

const Balance = () => {
    const balance = useSelector(selectUserBalance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBalanceThunk());
    }, [dispatch]);

    const formattedBalance = new Intl.NumberFormat('uk-UA', {
        style: 'decimal',
        minimumFractionDigits: 2,
    })
        .format(balance)
        .replace(',', '.');

    return (
        <div className={s.balanceWrapper}>
            <p className={s.text}> Your balance</p>
            <p className={s.amount}>₴ {formattedBalance}</p>
        </div>
    );
};

export default Balance;
