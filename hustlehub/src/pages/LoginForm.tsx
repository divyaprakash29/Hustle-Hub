import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginimage from '../assets/Team spirit-pana.svg';
import { useDispatch } from 'react-redux';
import { login } from '../store';
import { useTranslation } from 'react-i18next';

type PropsType = {
    initialData?: {
        email: string;
        password: string;
    };
};

/**
 * LoginForm Component
 *
 * This component provides a login form for users to sign in to the application.
 * It includes the following features:
 * - Email and password input fields with validation for proper email format and minimum password length.
 * - Password visibility toggle to show or hide the password.
 * - Form submission that triggers an API request to authenticate the user.
 * - Success or error messages displayed using a Snackbar component.
 * - On successful login, the user is redirected to their respective dashboard based on their role (admin, client, freelancer).
 * - User credentials and authentication token are stored in localStorage for session persistence.
 * 
 * Translations are handled using the 'i18next' library for multi-language support.
 */

const LoginForm: React.FC<PropsType> = ({ initialData }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        initialData || {
            email: '',
            password: '',
        }
    );

    const [errors, setErrors] = useState({
        email: '',
        password: '',
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

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: any = {};

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('enterValidEmail');
        } else {
            newErrors.email = '';
        }

        if (formData.password.length < 8) {
            newErrors.password = t('passwordMinLength');
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        const payload = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { token, user } = response.data;

            dispatch(
                login({
                    id: user.id,
                    name: user.fullname,
                    email: user.email,
                    role: user.role,
                })
            );

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username',user.fullname);

            setSnackbar({
                open: true,
                message: t('loginSuccess'),
                severity: 'success',
            });

            setFormData({
                email: '',
                password: '',
            });

            switch (user.role) {
                case 'admin':
                    navigate('/HomeAdmin');
                    break;
                case 'client':
                    navigate('/HomeClient');
                    break;
                case 'freelancer':
                    navigate('/HomeFreelancer');
                    break;
                default:
                    navigate('/unauthorized');
            }
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || t('loginFailure'),
                severity: 'error',
            });
        }
    };

    useEffect(() => {
        validate();
    }, [formData.email, formData.password]);

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                    {t('logins')}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label={t('email')}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label={t('password')}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={!formData.email || !formData.password || !!errors.email || !!errors.password}
                        >
                            {t('logins')}
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
                src={loginimage}
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
    );
};

export default LoginForm;
