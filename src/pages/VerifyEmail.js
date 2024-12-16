import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // or use URLSearchParams if not using react-router
import firebase from 'firebase/app'; // Ensure Firebase is imported correctly

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Verifying email...');

    useEffect(() => {
        const oobCode = searchParams.get('oobCode'); // Get the oobCode from the URL

        if (oobCode) {
            firebase.auth().applyActionCode(oobCode) // Apply the action code to verify the email
                .then(() => {
                    setMessage('Email verified successfully!');
                })
                .catch(error => {
                    setMessage('Error verifying email: ' + error.message);
                    console.error('Verification error:', error);
                });
        }
    }, [searchParams]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default VerifyEmailPage;
