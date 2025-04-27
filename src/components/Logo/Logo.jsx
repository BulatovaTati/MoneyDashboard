import clsx from 'clsx';
import s from './Logo.module.css';

const Logo = ({ type, imageClassName, textClassName }) => {
    return (
        <div className={clsx(s.logo, type === 'header' && s.headerLogo, type === 'modal' && s.modalLogo)}>
            <img src="/favicon.svg" alt="Money Guard Logo" className={clsx(s.logoImage, imageClassName)} />
            <h2 className={clsx(s.textLogo, textClassName)}>Money Guard</h2>
        </div>
    );
};

export default Logo;
