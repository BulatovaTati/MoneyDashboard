import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const HomeTab = () => {
    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    return <p>Home</p>;
};

export default HomeTab;
