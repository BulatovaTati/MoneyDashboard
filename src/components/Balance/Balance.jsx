import { useDispatch, useSelector } from 'react-redux';
import { getBalanceThunk } from '../../redux/auth/operations';
import { selectUserBalance } from '../../redux/auth/selectors';
import s from './Balance.module.css';

const Balance = () => {
    return <div>Balance</div>;
};

export default Balance;
