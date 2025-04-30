import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { openLogOutModal } from '../../redux/modals/slice';
import { selectUser } from '../../redux/auth/selectors';
import { Icons } from '../Icons/Icons';
import Logo from '../Logo/Logo';
import s from './Header.module.css';

const Header = () => {
    const dispatch = useDispatch();

    const handleExitClick = () => {
        dispatch(openLogOutModal());
    };

    const { name } = useSelector(selectUser);

    return (
        <>
            <header className={s.headerWrapper}>
                <div className={s.header}>
                    <div className={s.logo}>
                        <Logo imageClassName={s.customImage} textClassName={s.customText} />
                    </div>
                    <div className={s.other}>
                        <nav className={s.nav}>
                            <ul>
                                <li>
                                    <p className={s.nameText}>{name}</p>
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
        </>
    );
};

export default Header;
