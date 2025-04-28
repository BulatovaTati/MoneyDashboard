import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modals/slice';
import Modal from 'react-modal';
import useMedia from '../../hooks/useMedia';
import { Icons } from '../Icons/Icons';
import s from './ModalWrapper.module.css';
import { useEffect } from 'react';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors';

Modal.setAppElement('#root');

const ModalWrapper = ({ children, isOpenModal, className = '' }) => {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();
    const isLogOutModal = useSelector(selectIsLogOutModalOpen);

    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpenModal]);

    return (
        <Modal isOpen={isOpenModal} onRequestClose={() => dispatch(closeModal())} className={`${s.modal} ${className}`} overlayClassName={s.overlay} preventScroll={false}>
            <div className={s.modalWrapper}>
                <div className={s.modalEllipse}></div>
                {!isMobile && !isLogOutModal && (
                    <button
                        className={s.btnCloseModal}
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        <Icons name={'icon-close'} width={18} height={18} />
                    </button>
                )}
                <div className={s.modalContent}>{children}</div>
            </div>
        </Modal>
    );
};

export default ModalWrapper;
