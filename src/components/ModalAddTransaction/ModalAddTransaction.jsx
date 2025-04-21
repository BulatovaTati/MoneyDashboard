import { useSelector } from 'react-redux';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { selectIsAddModalOpen } from '../../redux/modals/selectors';
// import s from './ModalAddTransaction.module.css';

const ModalAddTransaction = () => {
    const isAddModalOpen = useSelector(selectIsAddModalOpen);
    return (
        <ModalWrapper isOpenModal={isAddModalOpen}>
            <AddTransactionForm />
        </ModalWrapper>
    );
};
export default ModalAddTransaction;
