import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLogOutModalOpen } from '../../redux/modals/selectors.js';
import { openLogOutModal } from '../../redux/modals/slice';
import s from './Header.module.css';
import { Icons } from '../Icons/Icons';
import Logo from '../Logo/Logo';
import ModalLogOut from '../ModalLogOut/ModalLogOut';
import { selectUser } from '../../redux/auth/selectors.js';

const Header = () => {
    const dispatch = useDispatch();

    const handleExitClick = () => {
        dispatch(openLogOutModal());
    };

    const user = useSelector(selectUser);

    const userName = user?.email?.split('@')[0];

    return (
        <>
            <header className={s.headerWrapper}>
                <div className={s.header}>
                    <div className={s.logo}>
                        <Logo type="header" imageClassName={s.customImage} textClassName={s.customText} />
                    </div>
                    <div className={s.other}>
                        <nav className={s.nav}>
                            <ul>
                                <li>
                                    <p className={s.nameText}>{userName}</p>
                                </li>
                                <li className={s.separator}></li>
                                <li>
                                    <button onClick={handleExitClick} className={s.exitIcon}>
                                        <span>
                                            <Icons name="icon-exit" width={18} height={18} className={s.IconExit} />
                                        </span>
                                        <span className={s.exitText}>Exit</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <ModalLogOut />
        </>
    );
};

export default Header;
