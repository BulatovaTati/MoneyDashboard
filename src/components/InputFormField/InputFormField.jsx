import s from './InputFormField.module.css';
import clsx from 'clsx';

const InputFormField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className={s.inputGroup}>
      <Icon className={s.inputIcon} />
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={clsx(s.input, error && s.inputError)}
      />
      {error && <span className={s.error}>{error.message}</span>}
    </div>
  );
};

export default InputFormField;
