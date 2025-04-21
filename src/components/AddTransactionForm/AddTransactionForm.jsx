import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelektor } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { addTransactions } from '../../redux/transactions/operations.js';
import { selectCategories } from '../../redux/transactions/selectors.js';
import { closeModal } from '../../redux/modals/slice.js';

import Notiflix from 'notiflix';
import ToggleModal from '../ToggleModal/ToggleModal.jsx';
import CustomIconForCalendar from './CustomIconForCalendar';

import css from './AddTransactionForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const AddTransactionForm = () => {
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [isTransactionIncome, setIsTransactionIncome] = useState(false);
    const rawCategories = useSelektor(selectCategories);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const dispatch = useDispatch();

    const filteredCategories = rawCategories
        .filter(category => category.type !== 'INCOME')
        .map(category => ({
            value: category.id,
            label: category.name,
            isDisabled: category.name === 'Main expenses',
        }));

    const handleCategoryName = selectedCategory => {
        setSelectedCategoryId(selectedCategory.value);
    };

    const handleClickCancel = () => {
        dispatch(closeModal());
    };

    const formInitialValues = {
        transactionDate: new Date(),
        comment: '',
        amount: '',
        categoryId: '',
        type: isTransactionIncome ? 'INCOME' : 'EXPENSE',
    };

    const handleSubmit = (values, options) => {
        const categoryId = isTransactionIncome ? '063f1132-ba5d-42b4-951d-44011ca46262' : selectedCategoryId;

        const newTransaction = {
            type: isTransactionIncome ? 'INCOME' : 'EXPENSE',
            transactionDate: transactionDate.toISOString(),
            comment: values.comment,
            amount: isTransactionIncome ? parseFloat(values.amount) : -parseFloat(values.amount),
            categoryId,
        };

        dispatch(addTransactions(newTransaction))
            .unwrap()
            .then(() => {
                Notiflix.Notify.success(`${newTransaction.type} added successfully!`);
                options.resetForm();
                handleClickCancel();
            })
            .catch(error => {
                Notiflix.Notify.failure(`Failed to add transaction: ${error.message}`);
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
            <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
                <Form className={css.formWrapper}>
                    {!isTransactionIncome && (
                        <Select
                            name="select"
                            className={css.selectInput}
                            placeholder="Select a category"
                            options={filteredCategories}
                            required
                            onChange={handleCategoryName}
                            classNamePrefix="react-select"
                            styles={reactSelectStyles}
                        />
                    )}
                    <div className={css.amountDateInputWrapper}>
                        <div>
                            <Field className={css.amountInput} name="amount" type="number" placeholder="0.00" required autoComplete="off" />
                            <ErrorMessage name="amount" component="div" className={css.errorForAmount} />
                        </div>
                        <DatePicker
                            selected={transactionDate}
                            onChange={date => setTransactionDate(date)}
                            calendarStartDay={1}
                            dateFormat="dd.MM.yyyy"
                            maxDate={new Date()}
                            customInput={<CustomIconForCalendar />}
                        />
                    </div>
                    <div>
                        <Field as="textarea" rows="2" name="comment" placeholder="Comment" className={css.commentInput} />
                        <ErrorMessage name="comment" component="div" className={css.errorForComment} />
                    </div>
                    <div className={css.buttonsWrapper}>
                        <button className={css.btnAdd} type="submit">
                            Add
                        </button>
                        <button className={css.btnCancel} type="button" onClick={handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddTransactionForm;
