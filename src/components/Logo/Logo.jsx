import clsx from 'clsx';
import s from './Logo.module.css';

const Logo = ({ imageClassName, textClassName }) => {
    return (
        <div className={clsx(s.logo)}>
            <img src="/favicon.svg" alt="Money Guard Logo" className={clsx(s.logoImage, imageClassName)} />
            <h2 className={clsx(s.textLogo, textClassName)}>Money Guard</h2>
        </div>
    );
};

export default Logo;
