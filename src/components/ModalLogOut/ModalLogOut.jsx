import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modals/slice';
import { logoutThunk } from '../../redux/auth/operations';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors';
import { selectIsAuthLoading } from '../../redux/auth/selectors';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Loader from '../Loader/Loader';
import Logo from '../Logo/Logo';
import FormButton from '../FormButton/FormButton';

import s from './ModalLogOut.module.css';

const ModalLogOut = () => {
    const dispatch = useDispatch();
    const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return <Loader />;
    }

    return (
        <ModalWrapper isOpenModal={isLogOutModalOpen} className="customModalSize">
            <div className="customModalSize">
                <div className={s.logo}>
                    <Logo type="modal" />
                </div>
                <p className={s.text}>Are you sure you want to log out?</p>
                <div className={s.buttons}>
                    <FormButton type="button" text="Logout" variant="multiColorButton" handlerFunction={() => dispatch(logoutThunk())} />
                    <FormButton type="button" text="cancel" variant="whiteButton" handlerFunction={() => dispatch(closeModal())} />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ModalLogOut;
