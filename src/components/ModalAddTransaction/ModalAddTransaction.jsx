import Modal from 'react-modal';

import { useSelector, useDispatch } from 'react-redux';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import { selectIsAddModalOpen } from '../../redux/modals/selectors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import css from './ModalAddTransaction.module.css';

Modal.setAppElement('#root');

function ModalAddTransaction() {
    const dispatch = useDispatch();

    const isAddOpen = useSelector(selectIsAddModalOpen);

    return (
        <ModalWrapper>
            <AddTransactionForm />
        </ModalWrapper>
    );
}

export default ModalAddTransaction;
