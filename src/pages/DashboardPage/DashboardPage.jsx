import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';

import s from './DashboardPage.module.css';
import ModalLogOut from '../../components/ModalLogOut/ModalLogOut.jsx';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction.jsx';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction.jsx';

const DashboardPage = () => {
    const { isMobile } = useMedia();
    return (
        <>
            <Header />
            <div className={s.container}>
                <main className={s.main}>
                    <div className={s.navItem}>
                        <div className={s.wrapper}>
                            <Navigation />
                            {!isMobile && <Balance />}
                        </div>
                        {!isMobile && <Currency />}
                    </div>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </main>
                <ModalLogOut />
                <ModalEditTransaction />
                <ModalAddTransaction />
                <Toaster />
            </div>
        </>
    );
};

export default DashboardPage;
