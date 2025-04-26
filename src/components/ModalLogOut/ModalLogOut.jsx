import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modals/slice';
import { logoutThunk } from '../../redux/auth/operations';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Logo from '../Logo/Logo';
import s from './ModalLogOut.module.css';

const ModalLogOut = () => {
    const dispatch = useDispatch();
    const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);

    const handleLogOut = () => {
        dispatch(logoutThunk());
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

    return (
        <ModalWrapper isOpenModal={isLogOutModalOpen} className="customModalSize">
            <div className="customModalSize">
                <div className={s.logo}>
                    <Logo type="modal" />
                </div>
                <p className={s.text}>Are you sure you want to log out?</p>
                <div className={s.buttons}>
                    <button onClick={handleLogOut} className={s.logoutBtn}>
                        LOGOUT
                    </button>
                    <button onClick={handleCancel} className={s.cancelBtn}>
                        CANCEL
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ModalLogOut;
