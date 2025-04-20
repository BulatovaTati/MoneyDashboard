import { useSelector } from 'react-redux';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import { selectIsAddModalOpen } from '../../redux/modals/selectors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const ModalAddTransaction = () => {
    return (
        <ModalWrapper>
            <AddTransactionForm />
        </ModalWrapper>
    );
};

export default ModalAddTransaction;
