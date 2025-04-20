import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import useMedia from '../../hooks/useMedia';
import { deleteTransactions } from '../../redux/transactions/operations';
import { openEditModal, addEditId } from '../../redux/modals/slice';
import s from './TransactionItem.module.css';
import { LuPencil } from 'react-icons/lu';
import { getBalanceThunk } from '../../redux/auth/operations';


function TransactionsItem({ transaction, id }) {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();
    const { type } = transaction;

    function onEdit() {
        dispatch(addEditId(id));
        dispatch(openEditModal());
    }

    async function OnDelete() {
        await dispatch(deleteTransactions(id));
        dispatch(getBalanceThunk());
    }

    const typeClass = type === '+' ? 'income' : 'expense';

    return isMobile ? (
        <ul className={clsx(s.card, s[typeClass])}>
            {Object.entries(transaction).map(([key, value], idx) => (
                <li key={idx} className={s.row}>
                    <span className={s.rowItem}>{key}</span>
                    <span className={s.rowItem}>{value}</span>
                </li>
            ))}
            <li className={s.row}>
                <button type="button" className={clsx(s.btnEdit, s.rowItem)} onClick={onEdit}>
                    <LuPencil />
                </button>
                <button type="button" className={s.deleteBtn} onClick={OnDelete}>
                    Delete
                </button>
            </li>
        </ul>
    ) : (
        <ul className={clsx(s.row, s[typeClass])}>
            {Object.values(transaction).map((value, idx) => (
                <li key={idx} className={s.rowItem}>
                    {value}
                </li>
            ))}
            <li className={clsx(s.rowItem, s.controls)}>
                <button type="button" className={s.btnEdit} onClick={onEdit}>
                    <LuPencil />
                </button>
                <button type="button" className={s.deleteBtn} onClick={OnDelete}>
                    Delete
                </button>
            </li>
        </ul>
    );
}


export default TransactionsItem;