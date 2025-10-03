import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert, AlertColor } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'next-i18next'; // Import the useTranslation hook

type PropsType = {
    categories: string[];
    initialData?: {
        description: string;
        skills: string[];
        category: string;
        pricing: string | number;
        noOfDaysToComplete: string | number;
        previousCompanies: string[];
        portfolio: string;
    };
};

/**
 * CreateFreelancerProfileForm Component
 *
 * This component allows freelancers to create or edit their profiles by providing details such as:
 * - Description of their services
 * - Skills and previous work experience
 * - Pricing, completion time, and portfolio links
 *
 * It also includes form validation, error handling, and displays success/error messages through a Snackbar.
 * The form data is submitted to an API endpoint where the freelancer's profile is stored.
 *
 * The form is pre-populated with initial data if available (e.g., when editing an existing profile).
 * 
 */
const CreateFreelancerProfileForm: React.FC<PropsType> = ({ categories, initialData }) => {
    const { t } = useTranslation(); // Initialize the translation hook
    const { userId } = useParams();
    const [formData, setFormData] = useState(
        initialData || {
            description: '',
            skills: [] as string[],
            category: '',
            pricing: '',
            noOfDaysToComplete: '',
            previousCompanies: [] as string[],
            portfolio: '',
        }
    );

    const [errors, setErrors] = useState({
        description: '',
        skills: [] as string[],
        category: '',
        pricing: '',
        noOfDaysToComplete: '',
        previousCompanies: [] as string[],
        portfolio: '',
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

    const validate = () => {
        const newErrors: any = {};

        if (!formData.description) {
            newErrors.description = t('errorDescription');
        }

        if (!formData.pricing) {
            newErrors.pricing = t('errorPricing');
        }

        if (!formData.noOfDaysToComplete) {
            newErrors.noOfDaysToComplete = t('errorDaysToComplete');
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

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, skills: e.target.value.split(',') });
    };

    const handleCompaniesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, previousCompanies: e.target.value.split(',') });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();

        if (Object.values(errors).some((error) => error !== '')) {
            return;
        }

        const payload = {
            ...formData,
            pricing: Number(formData.pricing),
            noOfDaysToComplete: Number(formData.noOfDaysToComplete),
        };

        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw new Error('Authorization token is missing');
            }

            const url = `http://localhost:5000/api/user/${encodeURIComponent(userId)}/profile`;

            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setSnackbar({
                open: true,
                message: t('profileCreatedSuccess'),
                severity: 'success',
            });

            setFormData({
                description: '',
                skills: [] as string[],
                category: '',
                pricing: '',
                noOfDaysToComplete: '',
                previousCompanies: [] as string[],
                portfolio: '',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: t('profileCreationFailed'),
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
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                {t('createProfile')}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label={t('description')}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        label={t('skills')}
                        name="skills"
                        value={formData.skills.join(',')}
                        onChange={handleSkillsChange}
                        fullWidth
                    />
                    {/* <TextField
                        label={t('category')}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        select
                        fullWidth
                        required
                    >
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No categories available</MenuItem>
                        )}
                    </TextField> */}
                    <TextField
                        label={t('pricing')}
                        name="pricing"
                        type="number"
                        value={formData.pricing}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.pricing}
                        helperText={errors.pricing}
                    />
                    <TextField
                        label={t('daysToComplete')}
                        name="noOfDaysToComplete"
                        type="number"
                        value={formData.noOfDaysToComplete}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.noOfDaysToComplete}
                        helperText={errors.noOfDaysToComplete}
                    />
                    <TextField
                        label={t('companies')}
                        name="previousCompanies"
                        value={formData.previousCompanies.join(',')}
                        onChange={handleCompaniesChange}
                        fullWidth
                    />
                    <TextField
                        label={t('portfolio')}
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
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
                    >
                        {t('createProfileButton')}
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
    );
};

export default CreateFreelancerProfileForm;
