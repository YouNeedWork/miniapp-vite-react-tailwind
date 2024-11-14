import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Inviter() {
    const location = useLocation();

    useEffect(() => {
        // Get inviter code from URL search params
        const searchParams = new URLSearchParams(location.search);
        const inviterCode = searchParams.get('start_param');

        if (inviterCode) {
            console.log('inviterCode', inviterCode);
            const [inviter, code] = inviterCode.split('|');

            if (code && inviter) {
                localStorage.setItem('code', code);
                localStorage.setItem('inviter', inviter);
            } else {
                // Store inviter code in localStorage
                localStorage.setItem('inviter', inviterCode);
            }
        }
    }, [location]);

    // Component doesn't render anything visible
    return null;
}
