import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modals/slice';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors';
import Modal from 'react-modal';
import useMedia from '../../hooks/useMedia';
import { Icons } from '../Icons/Icons';
import s from './ModalWrapper.module.css';

Modal.setAppElement('#root');

const ModalWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();
    const isOpen = useSelector(selectIsLogOutModalOpen);

    return (
        <Modal isOpen={isOpen} onRequestClose={() => dispatch(closeModal())} className={s.modal} overlayClassName={s.overlay}>
            <div className={s.modalWrapper}>
                <div className={s.modalEllipse}></div>
                {!isMobile && (
                    <button
                        className={s.btnCloseModal}
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        <Icons name={'close'} width={18} height={18} />
                    </button>
                )}
                <div className={s.modalContent}>{children}</div>
            </div>
        </Modal>
    );
};

export default ModalWrapper;
