// import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import useMedia from '../../hooks/useMedia';
import { deleteTransactions } from '../../redux/transactions/operations';
import { openEditModal, addEditId } from '../../redux/modals/slice';
import s from './TransactionsItem.module.css';
// import { selectCategories } from '../../redux/statistics/selectors';
import { LuPencil } from 'react-icons/lu';
import { getBalanceThunk } from '../../redux/auth/operations';

const getTransactionCategory = (categoryId, categories) => {
    const transactionCategory = categories.find((item) => item.id === categoryId);
    if (!transactionCategory) return;
    return transactionCategory.name;
  };

const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };



const mockCategories = [
  { id: '1', name: 'Gifts' },
  { id: '2', name: 'Salary' },
  { id: '3', name: 'Transport' },
  { id: '4', name: 'Groceries' },
]; 

function TransactionsItem({ transaction }) {
    const sum = Math.abs(transaction.amount);
  const formSum = new Intl.NumberFormat().format(sum);
  // const categories = useSelector(selectCategories);
  const categories = mockCategories;
  const category = getTransactionCategory(transaction.categoryId, categories);
  const dispatch = useDispatch();
  const { isMobile } = useMedia();



    const onEdit = () => {
        dispatch(addEditId(id));
        dispatch(openEditModal());
    };

    const onDelete = async () => {
        await dispatch(deleteTransactions(id));
        dispatch(getBalanceThunk());
    };

    // Мобільна версія — таблиця
    return !isMobile ? (
            <tr className={s.tableSection}>
      <td className={s.date}>{formatDate(transaction.transactionDate)}</td>
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
        ) : (
            <tr
            className={
              transaction.type === 'INCOME' ? s.tableSection : s.tableSectionExp
            }
          >
            <td className={s.date}>
              <span className={s.spanDate}>Date</span>
              {formatDate(transaction.transactionDate)}
            </td>
            <td className={s.type}>
              <span className={s.spanType}>Type</span>
              {transaction.type === 'INCOME' ? '+' : '-'}
            </td>
            <td className={s.category}>
              <span className={s.spanCategory}>Category</span>
              {category}
            </td>
            <td className={s.comment}>
              <span className={s.spanComment}>Comment</span>
              <p>{transaction.comment}</p>
            </td>
            <td className={transaction.type === 'INCOME' ? s.income : s.expense}>
              <span className={s.spanSum}>Sum</span>
              {sum}
            </td>
            <td className={s.actionBtn}>
            <div className={s.buttonContainer}>
            <button type="button" className={s.deleteBtn} onClick={onDelete}>
                    Delete
                </button>
                <button type="button" className={s.editBtn} onClick={onEdit}>
                <LuPencil style={{ width: '14px', height: '14px' }} />
                    Edit
                </button>
                </div>
            </td>
        </tr>
    );
};


export default TransactionsItem;

