import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';

import ModalLogOut from '../../components/ModalLogOut/ModalLogOut';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';

import css from './DashboardPage.module.css';

const DashboardPage = () => {
    const { isMobile } = useMedia();

    return (
        <section className={css.dashboardPage}>
            <div className={css.header}>
                <Header />
            </div>
            <main>
                <div className={css.dashboard}>
                    <div className={css.dashboardData}>
                        <div className={css.dashboardNavBal}>
                            <div className={css.navigation}>
                                <Navigation />
                            </div>
                            <div className={css.balance}>{!isMobile && <Balance />}</div>
                        </div>
                        <div className={css.currency}>{!isMobile && <Currency />}</div>
                    </div>
                    <div className={css.divider}></div>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                    <ModalLogOut />
                    <ModalEditTransaction />
                    <ModalAddTransaction />
                </div>
            </main>
            <Toaster />
        </section>
    );
};

export default DashboardPage;
