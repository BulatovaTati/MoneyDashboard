import { FiPlus } from 'react-icons/fi';
import s from './ButtonAddTransactions.module.css';
import { openAddModal } from '../../redux/modals/slice';
import { useDispatch } from 'react-redux';

const ButtonAddTransactions = () => {
    const dispatch = useDispatch();

    return (
        <button
            className={s.btn}
            type="button"
            onClick={() => {
                dispatch(openAddModal());
            }}
        >
            <FiPlus className={s.icon} />
        </button>
    );
};

export default ButtonAddTransactions;
