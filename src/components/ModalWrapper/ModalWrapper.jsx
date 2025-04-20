import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Icons } from '../Icons/Icons';
import { closeModal } from '../../redux/modals/slice';
import useMedia from '../../hooks/useMedia';

import s from './ModalWrapper.module.css';

Modal.setAppElement('#root');

const ModalWrapper = ({ children, isOpenModal }) => {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();

    return (
        <Modal isOpen={isOpenModal} onRequestClose={() => dispatch(closeModal())} className={s.modal} overlayClassName={s.overlay}>
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
