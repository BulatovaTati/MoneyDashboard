import clsx from 'clsx';
import s from './Logo.module.css';

const Logo = ({ type }) => {
    return (
        <div className={clsx(s.logo, type === 'header' && s.headerLogo, type === 'modal' && s.modalLogo)}>
            <img src="/public/favicon.svg" alt="Money Guard Logo" className={s.logoImage} />
            <h2 className={s.textLogo}>Money Guard</h2>
        </div>
    );
};

export default Logo;
