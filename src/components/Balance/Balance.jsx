import { useSelector } from 'react-redux';
import { selectUserBalance } from '../../redux/auth/selectors';
import { formattedBalance } from '../../helpers/formattedBalance';
import s from './Balance.module.css';

const Balance = () => {
    const balance = useSelector(selectUserBalance);

    return (
        <div className={s.balanceWrapper}>
            <p className={s.text}> Your balance</p>
            <p className={s.amount}>₴ {formattedBalance(balance)}</p>
        </div>
    );
};

export default Balance;
