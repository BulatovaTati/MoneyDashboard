import { Link, Navigate } from 'react-router-dom';

import FormButton from '../../components/FormButton/FormButton';
import s from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={s.wrapper}>
            <p>Woops, the page does not exist</p>

            <Link to="/login">
                <FormButton type="button" text={'LogIn'} variant={'multiColorButton'} />
            </Link>
        </div>
    );
};

export default NotFound;
