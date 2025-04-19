import { RotatingLines } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
    return (
        <div className={s.loaderBackdrop}>
            <div className={s.spinnerWrapper}>
                <RotatingLines strokeColor="lavender" strokeWidth="4" animationDuration="0.8" width="96" visible={true} />
            </div>
        </div>
    );
};

export default Loader;
