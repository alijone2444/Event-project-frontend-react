// PageWrapper.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PageWrapper({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            {children}
        </div>
    );
}

export default PageWrapper;
