import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 *  Payment Page for making payment to freelancer on project completion it utilizes stripe API for processing the payment
 *  A form is displyed to enter the card details after successful completion of payment you get a success snackbar 
 * else a payment failed snackbar
 *  Then redirects to project listing page
 * @returns {TSX.Element} The rendered PaymentPage component
 */
const PaymentPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const location = useLocation();
    const { t } = useTranslation();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const passedProject = location.state?.project;

    useEffect(() => {
        if (passedProject) {
            setProject(passedProject);
            setLoading(false);
        } else if (projectId) {
            const fetchProjectDetails = async () => {
                try {
                    const response = await axios.get(`/api/project/${projectId}`);
                    setProject(response.data);
                } catch (error) {
                    console.error('Failed to fetch project:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProjectDetails();
        }
    }, [projectId, passedProject]);

     /**
     * handlePayment function
     * 
     * This function is responsible for processing the payment through Stripe
     * When the user submits the form  a request is sent to backend for creating a payment intent based on the project budget
     * the payment is confirmed based on details provided and shows a success or error message for the payment
     *  
     */
    const handlePayment = async () => {
        if (!stripe || !elements || !project) return;

        try {
            const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', { amount: project.budget * 100 });

            const clientSecret = data.clientSecret;
            const cardEle = elements.getElement(CardElement);
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardEle!,
                },
            });

            if (error) {
                setSnackbarMessage(t('payment.payment_failed'));
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            } else if (paymentIntent?.status === 'succeeded') {
                setSnackbarMessage(t('payment.payment_success'));
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setSnackbarMessage(t('payment.error_message'));
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

     /** 
     * Handles closing the snackbar notification
     */
    const handleCloseSnackbar = () => {
        navigate('/HomeClient');
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!project) {
        return <Typography variant="h6" color="error">{t('payment.project_not_found')}</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{t('payment.title')} : {project.title}</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{t('payment.budget')}: ${project.budget}</Typography>
            <CardElement />
            <Button onClick={handlePayment} variant="contained" color="primary" sx={{ mt: 3 }}>
                {t('payment.pay_button', { amount: project.budget })}
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1300,
                    width: 'auto',
                    maxWidth: '100%',
                }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PaymentPage;
