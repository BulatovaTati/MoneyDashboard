import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useId } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';

import RegisterInputForm from '../RegisterInputForm/RegisterInputForm';
import FormButton from '../FormButton/FormButton';
import { registerValidationSchema } from '../../validations/validateRegisterForm';
import { registerThunk } from '../../redux/auth/operations';
import { showToast } from '../CustomToaster/CustomToaster';

import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
    const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const confirmPassId = useId();

    const {
        register,
        watch,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerValidationSchema),
        mode: 'onChange',
    });

    const onSubmit = async data => {
        setHasTriedSubmit(false);

        const trimmedValues = {
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password.trim(),
        };

        try {
            await dispatch(
                registerThunk({
                    name: trimmedValues.name,
                    email: trimmedValues.email,
                    password: trimmedValues.password,
                })
            )
                .unwrap()
                .then(() => navigate('/'));
            reset();
        } catch (error) {
            if (error === 'Email in use') {
                setError('email', {
                    type: 'manual',
                    message: 'Email in use',
                });
            } else {
                showToast('error', ` ${error}`);
            }
        }
    };

    return (
        <div className={s.background}>
            <div className={s.modal}>
                <div className={s.logoBox}>
                    <img src="/favicon.svg" alt="Logo" width="26" height="26" className={s.logoIcon} />
                    <h2 className={s.logoTitle}>Money Guard</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit, () => setHasTriedSubmit(true))} className={s.form}>
                    <div className={s.inpBox}>
                        <label htmlFor={nameId}>
                            <RegisterInputForm iconName={'icon-user'} type="name" name="name" placeholder="Name" register={register} error={errors.name} id={nameId} />
                        </label>
                        <label htmlFor={emailId}>
                            <RegisterInputForm iconName={'icon-email'} type="email" name="email" placeholder="E-mail" register={register} error={errors.email} id={emailId} />
                        </label>
                        <label htmlFor={passwordId}>
                            <RegisterInputForm iconName={'icon-lock'} type="password" name="password" placeholder="Password" register={register} error={errors.password} id={passwordId} />
                        </label>
                        <label htmlFor={confirmPassId}>
                            <RegisterInputForm
                                iconName={'icon-lock'}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                register={register}
                                error={errors.confirmPassword}
                                id={confirmPassId}
                            />
                        </label>
                    </div>
                    <div className={s.strengthBarBox}>
                        <PasswordStrengthBar
                            className={s.strengthBar}
                            password={watch('confirmPassword')}
                            barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
                            scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
                            shortScoreWord={''}
                            minLength={6}
                            scoreWordStyle={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', margin: '0' }}
                            scoreWordClassName="strength-score"
                        />
                    </div>
                    <div className={s.btnBox}>
                        <FormButton type="submit" text={'Register'} variant={'multiColorButton'} />
                        <Link to="/login">
                            <FormButton type="button" text={'Log in'} variant={'whiteButton'} />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
