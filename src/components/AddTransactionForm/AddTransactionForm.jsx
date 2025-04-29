import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { addTransactions } from '../../redux/transactions/operations';
import { selectCategories } from '../../redux/statistics/selectors';
import { closeModal } from '../../redux/modals/slice';

import { showToast } from '../CustomToaster/CustomToaster';
import ToggleModal from '../ToggleModal/ToggleModal';
import CustomIconForCalendar from './CustomIconForCalendar';
import FormButton from '../FormButton/FormButton.jsx';
import { validationAddTransaction } from '../../validations/validateForms';
import { reactSelectStyles } from '../../helpers/reactSelectStyles';

import css from './AddTransactionForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const AddTransactionForm = () => {
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
            date: new Date(),
        },
        resolver: yupResolver(validationAddTransaction),
    });

    const filteredCategories = rawCategories
        .filter(category => category.type !== 'INCOME')
        .map(category => ({
            value: category.id,
            label: category.name,
        }));

    const onSubmit = data => {
        const categoryId = isTransactionIncome ? '063f1132-ba5d-42b4-951d-44011ca46262' : selectedCategoryId;

        const newTransaction = {
            type: isTransactionIncome ? 'INCOME' : 'EXPENSE',
            date: new Date(data.date).toISOString(),
            comment: data.comment.trim(),
            amount: parseFloat(data.amount),
            categoryId,
        };

        dispatch(addTransactions(newTransaction))
            .unwrap()
            .then(() => {
                reset({ amount: '', comment: '', date: new Date() });
                dispatch(closeModal());
            })
            .catch(error => {
                showToast('error', 'Please try again.');
            });
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
                        name="date"
                        defaultValue={new Date()}
                        render={({ field }) => (
                            <DatePicker selected={field.value} onChange={field.onChange} calendarStartDay={1} dateFormat="dd.MM.yyyy" maxDate={new Date()} customInput={<CustomIconForCalendar />} />
                        )}
                    />
                    {errors.date && <div className={css.errorForDate}>{errors.date.message}</div>} {}
                </div>
                <div>
                    <textarea rows="2" placeholder="Comment" {...register('comment')} className={css.commentInput} />
                    {errors.comment && <div className={css.errorForComment}>{errors.comment.message}</div>}
                </div>
                <div className={css.buttonsWrapper}>
                    <FormButton type={'submit'} text={'Add'} variant={'multiColorButton'} />
                    <FormButton type={'button'} text={'cancel'} variant={'whiteButton'} handlerFunction={() => dispatch(closeModal())} />
                </div>
            </form>
        </div>
    );
};

export default AddTransactionForm;
