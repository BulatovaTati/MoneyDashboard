import { useEffect, useState } from 'react';
import CurrencyChart from './CurrencyChart';
import { getCurrencyRates } from '../../api/currencyApi';
import s from '../Currency/Currency.module.css';
import Loader from '../Loader/Loader.jsx';
import clsx from 'clsx';

const Currency = () => {
    const [usdRate, setUsdRate] = useState({ rateBuy: 0, rateSell: 0 });
    const [euroRate, setEuroRate] = useState({ rateBuy: 0, rateSell: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchRates = async () => {
            try {
                const currencyData = await getCurrencyRates();

                if (currencyData.usdRate) setUsdRate(currencyData.usdRate);
                if (currencyData.euroRate) setEuroRate(currencyData.euroRate);
            } catch (error) {
                setError('Failed to load currency exchange data. Please try again later.');
                throw new Error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const data = [
        { name: 'start', currency: 8, label: '' },
        { name: 'USD', currency: usdRate.rateBuy, label: usdRate.rateBuy },
        { name: 'middle', currency: 10, label: '' },
        { name: 'EURO', currency: euroRate.rateBuy, label: euroRate.rateBuy },
        { name: 'end', currency: 25, label: '' },
    ];

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                {loading && <Loader />}
                {error && <p className={s.error}>{error}</p>}
                {!loading && !error && (
                    <>
                        <table className={s.tab}>
                            <thead>
                                <tr className={clsx(s.tr, s.header)}>
                                    <th className={s.item}>Currency</th>
                                    <th className={s.item}>Purchase</th>
                                    <th className={s.item}>Sale</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={s.tr}>
                                    <td className={s.item}>USD</td>
                                    <td className={s.item}>{usdRate.rateBuy}</td>
                                    <td className={s.item}>{usdRate.rateSell}</td>
                                </tr>
                                <tr className={s.tr}>
                                    <td className={s.item}>EUR</td>
                                    <td className={s.item}>{euroRate.rateBuy}</td>
                                    <td className={s.item}>{euroRate.rateSell}</td>
                                </tr>
                            </tbody>
                        </table>
                        <CurrencyChart data={data} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Currency;
