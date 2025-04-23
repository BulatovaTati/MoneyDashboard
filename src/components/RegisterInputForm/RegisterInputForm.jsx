import { Icons } from '../Icons/Icons';

import s from './RegisterInputForm.module.css';

const RegisterInputForm = ({ iconName, type, name, placeholder, register, error }) => {
    return (
        <div className={s.inputBox}>
            <Icons className={s.inputIcon} name={iconName} width={24} height={24} />
            <input type={type} {...register(name)} placeholder={placeholder} className={s.input} />
            {error && <span className={s.error}>{error.message}</span>}
        </div>
    );
};

export default RegisterInputForm;
