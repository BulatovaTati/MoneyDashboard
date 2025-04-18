import { useState } from 'react';

import { Icons } from '../../components/Icons/Icons';

import s from './ToggleModal.module.css';

const ToggleModal = ({ onChange, defaultActive }) => {
    const [isActive, setIsActive] = useState(defaultActive);

    const handleToggle = () => {
        const newActiveState = !isActive;
        setIsActive(newActiveState);
        onChange(newActiveState);
    };

    return (
        <div className={s.toggleContainer}>
            <span className={`${s.toggleLabel} ${isActive ? s.toggleLabelActive : ''}`}>Income</span>
            <div className={s.toggleSwitch} onClick={handleToggle}>
                <div className={`${s.toggleCircle} ${isActive ? s.toggleCircleActive : ''}`}>
                    {isActive ? <Icons className={s.plusToggle} name={'plus'} height={20} width={20} /> : <Icons className={s.minusToggle} name={'minus'} height={20} width={20} />}
                </div>
            </div>
            <span className={`${s.toggleLabel} ${!isActive ? s.toggleLabelRedActive : ''}`}>Expense</span>
        </div>
    );
};

export default ToggleModal;
