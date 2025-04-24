import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdOutlineMailOutline, MdLock } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { loginValidatiSchema } from '../../validations/validateLoginForm';
import InputFormField from '../../components/InputFormField/InputFormField';
import { Link, useNavigate } from 'react-router-dom';
import s from './LoginForm.module.css';
import Logo from '../../components/Logo/Logo';
import FormButton from '../../components/FormButton/FormButton';
import { showToast } from '../../components/CustomToaster/CustomToaster'; 

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(loginValidatiSchema),
        mode: 'onChange',
    });

    const onSubmit = async data => {
        try {
            await dispatch(loginThunk(data)).unwrap();
            reset();
            navigate('/');
        } catch (error) {
            showToast('error', 'Incorrect email or password. Please try again.');
    }
    };

    return (
        <div className={s.backdrop}>
            <div className={s.modal}>
                <Logo />
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputs}>
                        <InputFormField icon={MdOutlineMailOutline} type="email" name="email" placeholder="E - mail" register={register} error={errors.email} />
                        <InputFormField icon={MdLock} type="password" name="password" placeholder="Password" register={register} error={errors.password} />
                    </div>

                    <div className={s.btns}>
                        <FormButton type="submit" text={'LogIn'} variant={'multiColorButton'} />
                        <Link to="/register">
                            <FormButton type="button" text={'Register'} variant={'whiteButton'} />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
