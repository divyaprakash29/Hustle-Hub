import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const PostBid: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state: RootState) => state.auth);
    const freelancerName = loggedInUser.name;
    const { t } = useTranslation(); // Access translations

    const [formData, setFormData] = useState({
        bidAmount: '',
        deliveryTime: '',
    });

    const [projectName, setProjectName] = useState<string>('Loading...');
    const [isBidSubmitted, setIsBidSubmitted] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectResponse = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
                setProjectName(projectResponse.data.title || 'Unknown Project');

                const bidResponse = await axios.get(
                    `http://localhost:5000/api/bids/${loggedInUser.id}/projects/${projectId}`
                );
                if (bidResponse.data) {
                    setIsBidSubmitted(true);
                    setSnackbar({
                        open: true,
                        message: t('bid_already_submitted'),
                        severity: 'error',
                    });
                }
            } catch (err: any) {
                if (err.response?.status === 404) {
                    setIsBidSubmitted(false);
                } else {
                    console.error('Error:', err);
                }
            }
        };

        fetchProjectDetails();
    }, [projectId, freelancerName, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Allow only numbers for bidAmount and deliveryTime
        if (name === 'bidAmount' || name === 'deliveryTime') {
            if (!/^\d*$/.test(value)) return; // Reject non-numeric input
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleClear = () => {
        setFormData({
            bidAmount: '',
            deliveryTime: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { bidAmount, deliveryTime } = formData;

        const payload = {
            freelancerId: loggedInUser.id,
            bidAmount: Number(bidAmount),
            deliveryTime: Number(deliveryTime),
        };

        try {
            await axios.post(`http://localhost:5000/api/bids/projects/${projectId}`, payload);
            setIsBidSubmitted(true);

            setSnackbar({ open: true, message: 'Bid submitted successfully!', severity: 'success' });
            setFormData({ bidAmount: '', deliveryTime: '' });
        } catch (error) {
            console.error('Error submitting bid:', error);
            setSnackbar({ open: true, message: t('bid_error'), severity: 'error' });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                {t('submit_bid')}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label={t('project_name')} value={projectName} fullWidth disabled />
                    <TextField
                        label="Freelancer Name"
                        value={loggedInUser.name} // Display the freelancer name
                        fullWidth
                        disabled
                    />

                    <TextField
                        label={t('bid_amount')}
                        name="bidAmount"
                        type="text"
                        value={formData.bidAmount}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isBidSubmitted}
                    />
                    <TextField
                        label={t('delivery_time')}
                        name="deliveryTime"
                        type="text"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isBidSubmitted}
                    />
                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isBidSubmitted}
                        >
                            {isBidSubmitted ? t('bid_submitted') : t('submit_bid')}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleClear}
                            disabled={isBidSubmitted}
                        >
                            {t('clear')}
                        </Button>
                    </Stack>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleBack}
                    >
                        {t('back')}
                    </Button>
                </Stack>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default PostBid;
