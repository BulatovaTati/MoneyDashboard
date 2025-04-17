import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        let currentValue = null;
        try {
            currentValue = JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage with key "${key}":`, error);
            currentValue = defaultValue;
        }
        return currentValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};
