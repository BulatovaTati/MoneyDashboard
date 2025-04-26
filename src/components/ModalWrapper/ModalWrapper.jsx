import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modals/slice';
import Modal from 'react-modal';
import useMedia from '../../hooks/useMedia';
import { Icons } from '../Icons/Icons';
import s from './ModalWrapper.module.css';

Modal.setAppElement('#root');

const ModalWrapper = ({ children, isOpenModal, className = '' }) => {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();

    return (
        <Modal isOpen={isOpenModal} onRequestClose={() => dispatch(closeModal())} className={`${s.modal} ${className}`} overlayClassName={s.overlay} preventScroll={false}>
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
