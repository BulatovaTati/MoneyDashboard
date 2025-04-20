import { FiPlus } from 'react-icons/fi';
import s from './ButtonAddTransactions.module.css';
import { openAddModal } from '../../redux/modals/slice';
import { useDispatch } from 'react-redux';

const ButtonAddTransactions = () => {
    const dispatch = useDispatch();

    return (
        <div className={s.wrap}>
            <button
                className={s.btn}
                type="button"
                onClick={() => {
                    dispatch(openAddModal());
                }}
            >
                  <FiPlus className={s.icon} /> 
            </button>
        </div>
    );
};

export default ButtonAddTransactions;
