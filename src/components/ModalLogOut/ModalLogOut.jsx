import { useDispatch, useSelector } from 'react-redux';

// import { logoutThunk } from '../../redux/auth/operations';

import { Icons } from '../Icons/Icons';

// import useMedia from '../../hooks/useMedia';
// import { closeModal } from '../../redux/modals/slice';

import s from './ModalLogOut.module.css';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors.js';

const ModalLogOut = () => {
    return <ModalWrapper>ModalLogOut</ModalWrapper>;
};
export default ModalLogOut;
