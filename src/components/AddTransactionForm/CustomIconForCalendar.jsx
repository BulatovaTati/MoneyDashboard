import { forwardRef } from 'react';

import { Icons } from '../Icons/Icons';

import s from './CustomIconForCalendar.module.css';

const CustomIconForCalendar = forwardRef(({ value, onClick }, ref) => {
    return (
        <div className={s.calendarWrapper}>
            <button type="button" ref={ref} value={value} onClick={onClick} className={s.dateIconInput}>
                {value}
                <Icons className={s.dateIcon} name={'calendar'} width={24} height={24} />
            </button>
        </div>
    );
});

CustomIconForCalendar.displayName = 'CustomIconForCalendar';

export default CustomIconForCalendar;
