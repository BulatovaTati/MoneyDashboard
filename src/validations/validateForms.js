import * as yup from 'yup';

export const validationEditTransaction = yup.object().shape({
    amount: yup.number().typeError('Amount must be a number').positive('Amount must be a positive number').required('Amount is required'),
    comment: yup.string().max(100, 'Comment cannot exceed 100 characters').required('Comment is required'),
});

export const validationAddTransaction = yup.object().shape({
    amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive'),
    comment: yup.string().max(100, 'Max 100 characters').required('Comment is required'),
    date: yup.date().required('Date is required'),
});
