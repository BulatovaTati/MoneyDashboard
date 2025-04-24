import { useSelector } from 'react-redux';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';
import { selectIsEditModalOpen } from '../../redux/modals/selectors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const ModalEditTransaction = () => {
    const isEditModalOpen = useSelector(selectIsEditModalOpen);
    return (
        <ModalWrapper isOpenModal={isEditModalOpen}>
            <EditTransactionForm />
        </ModalWrapper>
    );
};
export default ModalEditTransaction;
