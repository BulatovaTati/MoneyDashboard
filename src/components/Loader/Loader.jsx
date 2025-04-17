import s from './Loader.module.css';

const DollarSpinner = () => {
    return (
        <div className={s.spinnerContainer}>
            <svg className={s.dollarSpinner} viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z"
                />
            </svg>
        </div>
    );
};

const Loader = () => {
    return (
        <div>
            <DollarSpinner />
            <div className={s.ellipse16}></div>
            <div className={s.ellipse18}></div>
            <div className={s.ellipse14}></div>
            <div className={s.ellipse17}></div>
            <div className={s.ellipse15}></div>
            <div className={s.ellipse19}></div>
        </div>
    );
};

export default Loader;
