import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { resetSnackbar } from '../reducers/freelancerReducer'; // Correct path to resetSnackbar
import { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { postFreelancerProfile } from '../controllers/freelancerprofileController';
import { useTranslation } from 'react-i18next'; // Importing i18next hook

// Define Props Type
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
 * PostFreelancerProfileForm Component
 *
 * This component provides a form for users (freelancers) to create or update their freelancer profiles.
 * The form includes fields for a description, skills, category, pricing, days to complete, previous companies,
 * and portfolio. The user can select a category from a list and input comma-separated values for skills and companies.
 * The form data is stored in the component's state and submitted to the server when the form is submitted.
 *
 * The form handles both the creation and editing of freelancer profiles and provides feedback through
 * a snackbar message to inform the user of the result.
 */

const PostFreelancerProfileForm: React.FC<PropsType> = ({ categories, initialData }) => {
    const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL
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

    const dispatch = useDispatch<AppDispatch>();
    const snackbar = useSelector((state: RootState) => state.freelancerprofile.snackbar);
    const { t } = useTranslation(); // Hook to get translation function

    // Form handling functions...
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, skills: e.target.value.split(',') });
    };

    const handleCompaniesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, previousCompanies: e.target.value.split(',') });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is missing from URL');
            return;
        }
        dispatch(postFreelancerProfile(userId, formData));
    };

    const handleSnackbarClose = () => {
        dispatch(resetSnackbar());
    };

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
                            <MenuItem disabled>{t('noCategories')}</MenuItem>
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
                    />
                    <TextField
                        label={t('daysToComplete')}
                        name="noOfDaysToComplete"
                        type="number"
                        value={formData.noOfDaysToComplete}
                        onChange={handleChange}
                        fullWidth
                        required
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
                    >
                        {t('createProfile')}
                    </Button>
                </Stack>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.history.back()}
                        sx={{ width: '100px' }}
                    >
                        {t('backButton')}
                    </Button>
                </Box>
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

export default PostFreelancerProfileForm;
