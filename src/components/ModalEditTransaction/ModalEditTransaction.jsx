import EditTransactionForm from '../EditTransactionForm/EditTransactionForm.jsx';
import ModalWrapper from '../ModalWrapper/ModalWrapper.jsx';

const ModalEditTransaction = () => {
    return (
        <ModalWrapper isOpenModal={isOpenModal}>
            {/* /children */}
            <EditTransactionForm />
        </ModalWrapper>
    );
};

export default ModalEditTransaction;
