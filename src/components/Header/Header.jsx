import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors.js';
import { openLogOutModal } from '../../redux/modals/slice';
import s from './Header.module.css';
import { Icons } from '../Icons/Icons';
import Logo from '../Logo/Logo';
import ModalLogOut from '../ModalLogOut/ModalLogOut';

const Header = () => {
    const dispatch = useDispatch();
    const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);

    const handleExitClick = () => {
        dispatch(openLogOutModal());
    };

    return (
        <>
            <header className={s.header}>
                <div className={s.logo}>
                    <Logo type="header" />
                </div>
                <div className={s.other}>
                    <nav className={s.nav}>
                        <ul>
                            <li>
                                <a href="Name">Name</a>
                            </li>
                            <li className={s.separator}></li>
                            <li>
                                <button onClick={handleExitClick} className={s.exitIcon}>
                                    <span>
                                        <Icons name="icon-exit" width={18} height={18} className={s.IconExit} />
                                    </span>
                                    Exit
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {isLogOutModalOpen && <ModalLogOut />}
        </>
    );
};

export default Header;
