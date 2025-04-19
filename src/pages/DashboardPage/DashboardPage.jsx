import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import Currency from '../../components/Currency/Currency.jsx';

import css from './DashboardPage.module.css';

const DashboardPage = () => {
    const location = useLocation();

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
                            <div className={css.balance}>
                                <Balance />
                            </div>
                        </div>
                        <div className={css.currency}>
                            <Currency />
                        </div>
                    </div>

                    <div className={css.divider}></div>

                    <div>
                        <Outlet />
                    </div>
                </div>
            </main>
        </section>
    );
};

export default DashboardPage;
