import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import contactImage from '../assets/Connected world-pana.svg';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Define Props Type
type PropsType = {
    initialData?: {
        name: string;
        email_from: string;
        message: string;
    };
};

/**
 * ContactForm Component
 * 
 * Functionality:
 * - Allows users to send messages via a contact form.
 * - Form includes fields for name, email, and message with validation for proper input:
 *   - Name must be at least 5 characters.
 *   - Email must be in a valid format.
 *   - Message must be at least 20 characters.
 * - Uses `EmailJS` API for sending messages.
 * - Handles submission success and failure with a `Snackbar` for feedback.
 * - Displays error messages for invalid input fields.
 * - Dynamically updates validation as the user interacts with the form.
 * - Provides a visual design with responsive layout, including an illustration alongside the form.
 */

const ContactForm: React.FC<PropsType> = ({ initialData }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState(
        initialData || {
            name: '',
            email_from: '',
            message: '',
        }
    );

    const [errors, setErrors] = useState({
        name: '',
        email_from: '',
        message: '',
    });

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const validate = () => {
        const newErrors: any = {};
        if (formData.name.length < 5) {
            newErrors.name = t('contact.validation.name');
        } else {
            newErrors.name = '';
        }

        if (!formData.email_from || !/\S+@\S+\.\S+/.test(formData.email_from)) {
            newErrors.email = t('contact.validation.email');
        } else {
            newErrors.email_from = '';
        }

        if (formData.message.length < 20) {
            newErrors.message = t('contact.validation.message');
        } else {
            newErrors.message = '';
        }

        setErrors(newErrors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBlur = () => {
        validate();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();

        const serviceId = import.meta.env.VITE_SERVICE_ID as string;
        const templateId = import.meta.env.VITE_TEMPLATE_ID as string;
        const publicKey = import.meta.env.VITE_PUBLIC_KEY as string;

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_name: formData.name,
                email_from: formData.email_from,
                message: formData.message,
            },
        };

        if (!serviceId || !templateId || !publicKey) {
            console.error('Environment variables are missing.');
        }

        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
            setSnackbar({
                open: true,
                message: t('contact.successMessage'),
                severity: 'success',
            });

            setFormData({
                name: '',
                email_from: '',
                message: '',
            });
        } catch (error) {
            console.error('Message send failed error:', error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || t('contact.errorMessage'),
                severity: 'error',
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        validate();
    }, [formData.email_from, formData.message]);

    return (
        <>
            <Box sx={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h3" align="center" sx={{ fontWeight: 'bold' }}>
                    {t('contact.welcomeMessage')}
                </Typography>
                <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                    {t('contact.detailsMessage')}
                </Typography>
            </Box>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label={t('contact.name')}
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                label={t('contact.email')}
                                name="email_from"
                                type="email"
                                value={formData.email_from}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                required
                                error={!!errors.email_from}
                                helperText={errors.email_from}
                            />
                            <TextField
                                label={t('contact.message')}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                                rows={4}
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={!formData.email_from || !formData.message || !!errors.email_from || !!errors.message}
                            >
                                {t('contact.send')}
                            </Button>
                        </Stack>
                    </form>

                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </Box>

                <Box
                    component="img"
                    src={contactImage}
                    alt="Signup Image"
                    sx={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '50%',
                        marginRight: '40px',
                        flex: 1,
                    }}
                />
            </div>


        </>
    );
};

export default ContactForm;
