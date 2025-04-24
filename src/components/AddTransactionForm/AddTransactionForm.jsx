import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { addTransactions } from '../../redux/transactions/operations';
import { selectCategories } from '../../redux/statistics/selectors';
import { closeModal } from '../../redux/modals/slice';

import ToggleModal from '../ToggleModal/ToggleModal.jsx';
import CustomIconForCalendar from './CustomIconForCalendar';

import css from './AddTransactionForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
    amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive'),
    comment: yup.string().max(100, 'Max 100 characters').required('Comment is required'),
});

const AddTransactionForm = () => {
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [isTransactionIncome, setIsTransactionIncome] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const rawCategories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            amount: '',
            comment: '',
        },
        resolver: yupResolver(schema),
    });

    const filteredCategories = rawCategories
        .filter(category => category.type !== 'INCOME')
        .map(category => ({
            value: category.id,
            label: category.name,
            isDisabled: category.name === 'Main expenses',
        }));

    const onSubmit = data => {
        const categoryId = isTransactionIncome ? '063f1132-ba5d-42b4-951d-44011ca46262' : selectedCategoryId;

        const newTransaction = {
            type: isTransactionIncome ? 'INCOME' : 'EXPENSE',
            transactionDate: transactionDate.toISOString(),
            comment: data.comment,
            amount: isTransactionIncome ? parseFloat(data.amount) : parseFloat(data.amount),
            categoryId,
        };

        dispatch(addTransactions(newTransaction))
            .unwrap()
            .then(() => {
                reset();
                dispatch(closeModal());
            })
            .catch(error => {
                console.log(`Failed to add transaction: ${error.message}`);
            });
    };

    const reactSelectStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isDisabled ? '#d4d4d4' : '#fff',
        }),
    };

    return (
        <div className={css.modalContainer}>
            <h2 className={css.title}>Add transaction</h2>
            <ToggleModal onChange={setIsTransactionIncome} defaultActive={false} />
            <form className={css.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                {!isTransactionIncome && (
                    <Select
                        name="select"
                        className={css.selectInput}
                        placeholder="Select a category"
                        options={filteredCategories}
                        required
                        onChange={selected => setSelectedCategoryId(selected.value)}
                        classNamePrefix="react-select"
                        styles={reactSelectStyles}
                    />
                )}
                <div className={css.amountDateInputWrapper}>
                    <div>
                        <input className={css.amountInput} type="number" step="0.01" placeholder="0.00" {...register('amount')} autoComplete="off" />
                        {errors.amount && <div className={css.errorForAmount}>{errors.amount.message}</div>}
                    </div>
                    <Controller
                        control={control}
                        name="transactionDate"
                        render={() => (
                            <DatePicker
                                selected={transactionDate}
                                onChange={date => setTransactionDate(date)}
                                calendarStartDay={1}
                                dateFormat="dd.MM.yyyy"
                                maxDate={new Date()}
                                customInput={<CustomIconForCalendar />}
                            />
                        )}
                    />
                </div>
                <div>
                    <textarea rows="2" placeholder="Comment" {...register('comment')} className={css.commentInput} />
                    {errors.comment && <div className={css.errorForComment}>{errors.comment.message}</div>}
                </div>
                <div className={css.buttonsWrapper}>
                    <button className={css.btnAdd} type="submit">
                        Add
                    </button>
                    <button className={css.btnCancel} type="button" onClick={() => dispatch(closeModal())}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransactionForm;
