import { Toaster, toast } from 'react-hot-toast';

const toastStyles = {
    success: {
        style: {
            border: '3px solid #734aef',
            padding: '10px',
            color: '#fbfbfb',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
    },
    error: {
        style: {
            border: '3px solid #F00000',
            padding: '10px',
            color: '#fbfbfb',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
    },
};

export const showToast = (type = 'success', message = 'Action completed') => {
    toast[type](message, toastStyles[type]);
};

const CustomToaster = () => {
    return <Toaster position="top-center" reverseOrder={false} />;
};

export default CustomToaster;
