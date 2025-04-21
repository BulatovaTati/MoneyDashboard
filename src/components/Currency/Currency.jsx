
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import CurrencyChart from './CurrencyChart';

import { getCurrencyRates } from '../../api/currencyApi';
import s from '../Currency/Currency.module.css';

const CURRENCY_KEY = 'currencyData';
const ONE_HOUR = 3600 * 1000; 

const Currency = () => {
  const [usdRate, setUsdRate] = useState({ rateBuy: 0, rateSell: 0 });
  const [euroRate, setEuroRate] = useState({ rateBuy: 0, rateSell: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchRates = async () => {
    setLoading(true);
    setError(null);
      try {
        const now = Date.now();
        const storedData = JSON.parse(localStorage.getItem(CURRENCY_KEY));
        
        if (storedData && now - storedData.timestamp < ONE_HOUR) {
          setUsdRate(storedData.usdRate);
          setEuroRate(storedData.euroRate);
        } else {

        const currencyData = await getCurrencyRates();

        if (currencyData.usdRate) setUsdRate(currencyData.usdRate);
        if (currencyData.euroRate) setEuroRate(currencyData.euroRate);
        if(!storedData ||
            JSON.stringify(storedData.usdRate) !== JSON.stringify(currencyData.usdRate) ||
            JSON.stringify(storedData.euroRate) !== JSON.stringify(currencyData.euroRate)
          )
          localStorage.setItem(
            CURRENCY_KEY,
            JSON.stringify({
              timestamp: now,
              usdRate: currencyData.usdRate,
              euroRate: currencyData.euroRate,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching data:', err.message);
        setError('Failed to load currency exchange data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
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
    <div className={s.wrapper}>
  {loading && <p>Loading...</p>}
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
  );
};

export default Currency;