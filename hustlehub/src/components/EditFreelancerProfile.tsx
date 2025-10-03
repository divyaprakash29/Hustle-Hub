import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { editFreelancerProfileById } from '../controllers/freelancerprofileController';
import { resetSnackbar } from '../reducers/freelancerReducer';
import { AppDispatch } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation

type PropsType = {
    categories: string[];
};

/**
 * EditFreelancerProfileForm Component
 * 
 * A form for editing a freelancer's profile. It pre-fills the form with existing profile data,
 * allows the user to update fields like description, skills, category, pricing, and more, 
 * and submits the updated data to the backend.
 * 
 * Features:
 * - Pre-filled form with data from location state.
 * - Input validation and handling for multiple field types (text, select, numbers).
 * - Integration with Redux for managing state and showing notifications.
 * - Navigation upon successful submission.
 * 
 * Props:
 * - `categories`: An array of category options for the category select input.
 */
const EditFreelancerProfileForm: React.FC<PropsType> = ({ categories }) => {
    const { t } = useTranslation(); // Initialize translation
    const location = useLocation();
    const FreelancerProfileData = location.state;
    const [formData, setFormData] = useState(FreelancerProfileData);

    const dispatch = useDispatch<AppDispatch>();
    const snackbar = useSelector((state: RootState) => state.project.snackbar);
    const navigate = useNavigate();

    /**
    * Initializes form data and updates it when FreelancerProfileData changes.
    */
    useEffect(() => {
        setFormData(FreelancerProfileData);
    }, [FreelancerProfileData]);

    /**
    * Handles changes to text inputs and updates the corresponding field in the form data.
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
    * Handles changes to the skills input, splitting the input value into an array.
    */
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, skills: e.target.value.split(',') });
    };

    /**
    * Handles changes to the previous companies input, splitting the input value into an array.
    */
    const handleCompaniesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, previousCompanies: e.target.value.split(',') });
    };

    /**
    * Handles form submission by dispatching the profile update action and navigating back to the profile list.
    */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editFreelancerProfileById(formData));
        navigate('/profile-list');
    };

    /**
    * Closes the snackbar notification.
    */
    const handleSnackbarClose = () => {
        dispatch(resetSnackbar());
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                {t('edit_profile')}
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
                            <MenuItem disabled>{t('no_categories_available')}</MenuItem>
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
                        label={t('days_to_complete')}
                        name="noOfDaysToComplete"
                        type="number"
                        value={formData.noOfDaysToComplete}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t('previous_companies')}
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
                        {t('edit_profile_button')}
                    </Button>
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.history.back()} // Navigate back
                        sx={{ width: '100px' }}
                        >
                        {t('backButton')} {/* Internationalized back button text */}
                        </Button>
                    </Box>
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

export default EditFreelancerProfileForm;
