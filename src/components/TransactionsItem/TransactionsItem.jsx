import { useDispatch, useSelector } from 'react-redux';
import useMedia from '../../hooks/useMedia';
import { deleteTransactions } from '../../redux/transactions/operations';
import { openEditModal, addEditId } from '../../redux/modals/slice';
import s from './TransactionsItem.module.css';
import { selectCategories } from '../../redux/statistics/selectors';
import { LuPencil } from 'react-icons/lu';
import { setCurrentTransaction } from '../../redux/transactions/slice';

const getTransactionCategory = (categoryId, categories) => {
    const transactionCategory = categories.find((item) => item.id === categoryId);
    return transactionCategory ? transactionCategory.name : 'Unknown';
};


const formatDate = dateString => {
    if (!dateString) return 'Invalid date';
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
};


function TransactionsItem({ transaction }) {
    if (!transaction) return null;


    const sum = Math.abs(transaction.amount);
    const formSum = new Intl.NumberFormat().format(sum);
    const categories = useSelector(selectCategories);
    const category = getTransactionCategory(transaction.categoryId, categories);
    const dispatch = useDispatch();
    const { isMobile } = useMedia();

    const onEdit = () => {
      dispatch(openEditModal());
      dispatch(setCurrentTransaction({ transaction }));
    };


    const onDelete = async () => {
        dispatch(deleteTransactions(transaction._id));
    };

    return !isMobile ? (
      <tr className={s.tableSection}>
<td className={s.date}>{formatDate(transaction.date)}</td>
<td className={s.type}>{transaction.type === 'INCOME' ? '+' : '-'}</td>
<td className={s.category}>{category}</td>
<td className={s.comment}>{transaction.comment}</td>
<td className={transaction.type === 'INCOME' ? s.income : s.expense}>
  {formSum}
</td>
<td className={s.actionBtn}>
  
                      <button type="button" className={s.editBtn} onClick={onEdit}>
                      <LuPencil style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button type="button" className={s.deleteBtn} onClick={onDelete}>
                        Delete
                      </button>
</td>
</tr>
  ):(
        <tr className={transaction.type === 'INCOME' ? s.tableSection : s.tableSectionExp}>
            <td className={s.date}>{formatDate(transaction.date)}</td>
            <td className={s.type}>{transaction.type === 'INCOME' ? '+' : '-'}</td>
            <td className={s.category}>{category}</td>
            <td className={s.comment}>{transaction.comment}</td>
            <td className={transaction.type === 'INCOME' ? s.income : s.expense}>
                {formSum}
            </td>
            <td className={s.actionBtn}>
                 <button type="button" className={s.deleteBtn} onClick={onDelete}>
                    Delete
                </button>
                <button type="button" className={s.editBtn} onClick={onEdit}>Edit
                    <LuPencil style={{ width: '14px', height: '14px' }} />
                </button>
               
            </td>
        </tr>
    );
}

export default TransactionsItem;
