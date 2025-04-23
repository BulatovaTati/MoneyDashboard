import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import useMedia from '../hooks/useMedia';
import Loader from './Loader/Loader';
import PrivateRoute from '../routes/PrivateRoute';
import RestrictedRoute from '../routes/RestrictedRoute';

import { selectIsRefreshing } from '../redux/auth/selectors';
import { refreshThunk } from '../redux/auth/operations';
import NotFound from '../pages/NotFound/NotFound.jsx';
import CustomToaster from './CustomToaster/CustomToaster.jsx';

const HomeTab = lazy(() => import('../pages/HomeTab/HomeTab'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage/RegistrationPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage'));
const CurrencyTab = lazy(() => import('../pages/CurrencyTab/CurrencyTab'));
const StatisticsTab = lazy(() => import('../pages/StatisticsTab/StatisticsTab'));

function App() {
    const dispatch = useDispatch();
    const { isMobile } = useMedia();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshThunk());
    }, [dispatch]);

    return isRefreshing ? (
        <Loader />
    ) : (
        <>
            <CustomToaster />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<PrivateRoute component={<DashboardPage />} />}>
                        <Route index element={<HomeTab />} />
                        <Route path="statistics" element={<StatisticsTab />} />
                        <Route path="currency" element={isMobile ? <CurrencyTab /> : <Navigate to="/" />} />
                    </Route>
                    <Route path="/register" element={<RestrictedRoute component={<RegistrationPage />} />} />
                    <Route path="/login" element={<RestrictedRoute component={<LoginPage />} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
