import { useState } from 'react';
import s from './InputFormField.module.css';
import clsx from 'clsx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputFormField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={s.inputGroup}>
      <Icon className={s.inputIcon} />

      <input
        type={isPassword && showPassword ? 'text' : type}
        {...register(name)}
        placeholder={placeholder}
        className={clsx(s.input, error && s.inputError)}
      />

      {isPassword && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className={s.toggleBtn}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      )}

      {error && <span className={s.error}>{error.message}</span>}
    </div>
  );
};

export default InputFormField;