import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert, AlertColor, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import signupimage from './../assets/Creative team-pana.svg';
import { useTranslation } from 'react-i18next';

// Define Props Type
type PropsType = {
    roles: string[];
    initialData?: {
        fullName: string;
        email: string;
        password: string | number;
        role: string;
    };
};

/**
 * SignUpForm Component
 *
 * This component provides a registration form for new users to sign up.
 * It includes the following features:
 * - Full name, email, password, and role selection input fields with validation:
 *   - Email must be in a valid format.
 *   - Password must have at least 8 characters.
 *   - Role selection is a dropdown populated with available roles passed as a prop.
 * - Password visibility toggle to show or hide the password.
 * - Form submission that triggers an API request to register the user.
 * - Success or error messages are displayed using a Snackbar component.
 * - On successful registration, the form resets and a success message is displayed.
 * - If the email is already registered, an error is shown.
 * - Users can navigate to the login page if they already have an account.
 * 
 */
const SignUpForm: React.FC<PropsType> = ({ roles, initialData }) => {
    const { t } = useTranslation(); // Use translations from 'common' namespace
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        initialData || {
            fullName: '',
            email: '',
            password: '',
            role: '',
        }
    );

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        role: '',
    });

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor;
    }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors: any = {};

        if (!formData.fullName) {
            newErrors.fullName = t('fullNameError');
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('emailError');
        }

        if (formData.password.length < 8) {
            newErrors.password = t('passwordError');
        } else {
            newErrors.password = '';
        }

        if (!formData.role) {
            newErrors.role = t('roleError');
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
    const handleButtonClick = () => {
        navigate("/login");
        window.location.reload(); // Force reload the new page
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();

        if (Object.values(errors).some((error) => error !== '')) {
            return;
        }

        const payload = {
            fullname: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSnackbar({
                open: true,
                message: t('registrationSuccess'),
                severity: 'success',
            });

            setFormData({
                fullName: '',
                email: '',
                password: '',
                role: '',
            });
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.response?.data.message.includes('Email already exists')) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: t('emailError'),
                }));
            }
            setSnackbar({
                open: true,
                message: t('registrationError'),
                severity: 'error',
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        validate();
    }, [formData]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
            <Box
                component="img"
                src={signupimage}
                alt="Signup Image"
                sx={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '50%',
                    marginRight: '40px',
                    flex: 1
                }}
            />

            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, mb: 5, p: 3, boxShadow: 3, borderRadius: 2, flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                    {t('signUp')}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label={t('fullName')}
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                        <TextField
                            label={t('emails')}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label={t('passwords')}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.password}
                            helperText={errors.password}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label={t('role')}
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            select
                            fullWidth
                            required
                            error={!!errors.role}
                            helperText={errors.role}
                        >
                            {roles && roles.length > 0 ? (
                                roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No roles available</MenuItem>
                            )}
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: 'primary.main',
                                color: '#FFF',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                            disabled={!!Object.values(errors).find((error) => error !== '') || !formData.fullName || !formData.email || !formData.password || !formData.role}
                        >
                            {t('signUp')}
                        </Button>
                        <p>{t('alreadyHaveAccount')}</p>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: 'primary.main',
                                color: '#FFF',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                            onClick={handleButtonClick}
                        >
                            {t('loginss')}
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
        </div>
    );
};

export default SignUpForm;
