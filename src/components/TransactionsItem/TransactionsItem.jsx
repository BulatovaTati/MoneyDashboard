import { useDispatch, useSelector } from 'react-redux';
import useMedia from '../../hooks/useMedia';
import { LuPencil } from 'react-icons/lu';
import { AnimatePresence, motion } from 'framer-motion';

import { openEditModal } from '../../redux/modals/slice';
import { deleteTransactions } from '../../redux/transactions/operations';
import { setCurrentTransaction } from '../../redux/transactions/slice';
import { selectCategories } from '../../redux/statistics/selectors';

import s from './TransactionsItem.module.css';

const getTransactionCategory = (categoryId, categories) => {
    const found = categories.find(item => item.id === categoryId);
    return found ? found.name : 'Unknown';
};

const formatDate = dateString => {
    if (!dateString) return 'Invalid date';
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
};

const itemVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' },
    exit: { opacity: 0, y: 10, height: 0 },
};

const defaultTransition = { duration: 0.3, ease: 'easeInOut' };

function TransactionsItem({ transaction }) {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();
    const categories = useSelector(selectCategories);

    if (!transaction) return null;

    const formatNumber = number => {
        return number
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const onEdit = () => {
        dispatch(openEditModal());
        dispatch(setCurrentTransaction({ transaction }));
    };

    const onDelete = () => {
        dispatch(deleteTransactions(transaction._id));
    };

    const categoryName = getTransactionCategory(transaction.categoryId, categories);
    const isIncome = transaction.type === 'INCOME';

    return (
        <AnimatePresence>
            {!isMobile ? (
                <motion.tr className={isIncome ? s.tableSection : s.tableSectionExp} variants={itemVariants} initial="hidden" animate="visible" exit="exit" transition={defaultTransition}>
                    <td className={`${s.date} ${s.column1}`}>{formatDate(transaction.date)}</td>
                    <td className={`${s.type} ${s.column2}`}>{isIncome ? '+' : '-'}</td>
                    <td className={`${s.category} ${s.column3}`}>{categoryName}</td>
                    <td className={`${s.comment} ${s.column4}`}>{transaction.comment}</td>
                    <td className={`${isIncome ? s.income : s.expense} ${s.column5}`}>{formatNumber(transaction.amount)}</td>
                    <td className={`${s.actionBtn} ${s.column6}`}>
                        <button type="button" className={s.editBtn} onClick={onEdit}>
                            <LuPencil style={{ width: '14px', height: '14px' }} />
                        </button>
                        <button type="button" className={s.deleteBtn} onClick={onDelete}>
                            Delete
                        </button>
                    </td>
                </motion.tr>
            ) : (
                <motion.div className={isIncome ? s.mobileSection : s.mobileSectionExp} variants={itemVariants} initial="hidden" animate="visible" exit="exit" transition={defaultTransition}>
                    <div className={s.field}>
                        <span className={s.spanLabel}>Date</span>
                        <span className={s.spanValue}>{formatDate(transaction.date)}</span>
                    </div>
                    <div className={s.field}>
                        <span className={s.spanLabel}>Type</span>
                        <span className={s.spanValue}>{isIncome ? '+' : '-'}</span>
                    </div>
                    <div className={s.field}>
                        <span className={s.spanLabel}>Category</span>
                        <span className={s.spanValue}>{categoryName}</span>
                    </div>
                    <div className={s.field}>
                        <span className={s.spanLabel}>Comment</span>
                        <span className={s.spanValue}>{transaction.comment}</span>
                    </div>
                    <div className={s.field}>
                        <span className={s.spanLabel}>Sum</span>
                        <span className={`${s.spanValue} ${isIncome ? s.income : s.expense}`}>{formatNumber(transaction.amount)}</span>
                    </div>
                    <div className={s.actionsMobile}>
                        <button type="button" className={s.deleteBtn} onClick={onDelete}>
                            Delete
                        </button>
                        <button type="button" className={s.editBtn} onClick={onEdit}>
                            <LuPencil style={{ width: '14px', height: '14px' }} />
                            Edit
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TransactionsItem;
