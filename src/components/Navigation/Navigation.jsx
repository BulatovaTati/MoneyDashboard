import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Icons } from '../Icons/Icons';
import useMedia from '../../hooks/useMedia';
import s from '../Navigation/Navigation.module.css';

const Navigation = () => {
    const { isMobile } = useMedia();

    const buildLinkClass = ({ isActive }) => {
        return clsx(s.item, isActive && s.linkActive);
    };
    return (
        <nav>
            <ul className={s.list}>
                <li>
                    <NavLink className={buildLinkClass} to="/">
                        <div className={s.wrapper}>
                            <Icons className={s.icon} name={'home'} width={24} height={24} />
                        </div>
                        {!isMobile && <span className={s.navText}>Home</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink className={buildLinkClass} to="/statistics">
                        <div className={s.wrapper}>
                            <Icons className={s.icon} name={'statistics'} width={24} height={24} />
                        </div>
                        {!isMobile && <span className={s.navText}>Statistics</span>}
                    </NavLink>
                </li>
                {isMobile && (
                    <li>
                        <NavLink className={buildLinkClass} to="/currency">
                            <div className={s.wrapper}>
                                <Icons className={s.icon} name={'dollar'} width={24} height={24} />
                            </div>
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
