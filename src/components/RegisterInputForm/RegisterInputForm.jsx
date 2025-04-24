import clsx from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

import { Icons } from '../Icons/Icons';

import s from './RegisterInputForm.module.css';

const RegisterInputForm = ({ iconName, id, type, name, placeholder, register, error }) => {
    const [hiddenPass, setHiddenPass] = useState(true);
    const showToggle = type === 'password';

    const toggleHiddenPass = () => {
        setHiddenPass(prev => !prev);
    };

    return (
        <div className={s.inputBox}>
            <Icons className={s.inputIcon} name={iconName} width={24} height={24} />
            <input id={id} type={showToggle && hiddenPass ? 'password' : 'text'} {...register(name)} placeholder={placeholder} className={clsx(s.input, { [s.inputError]: error })} />
            {error && <span className={s.error}>{error.message}</span>}
            {showToggle && (
                <button type="button" className={s.eyeIcon} onClick={toggleHiddenPass}>
                    {hiddenPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
            )}
        </div>
    );
};

export default RegisterInputForm;
