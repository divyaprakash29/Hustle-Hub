import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editReviewById } from '../controllers/reviewController';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetSnackbar } from '../reducers/reviewReducer';
import { AppDispatch, RootState } from '../store';
import { Rating } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for i18n

type PropsType = {
    categories: string[];
};

const EditReviewForm: React.FC<PropsType> = ({ categories }) => {
    const { t } = useTranslation(); // Hook to access translation strings
    const location = useLocation(); // Get location to access state passed via navigation
    const reviewData = location.state; // Retrieve review data from location state
    const [formData, setFormData] = useState(reviewData); // Initialize form data state with review data

    const dispatch = useDispatch<AppDispatch>(); // Hook for dispatching Redux actions
    const snackbar = useSelector((state: RootState) => state.review.snackbar); // Get Snackbar state from Redux
    const navigate = useNavigate(); // Hook for navigating between routes

    // Effect to update form data when review data changes
    useEffect(() => {
        setFormData(reviewData); // Update formData with new review data
    }, [reviewData]);

    // Function to handle text input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData({ ...formData, [name]: value }); // Update specific field in formData
    };

    // Function to handle rating changes
    const handleRatingChange = (e: React.SyntheticEvent<Element>, value: number | null) => {
        setFormData({ ...formData, rating: value || 0 }); // Update rating value or set to 0 if null
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Dispatching edit action with data:', formData); // Log data being submitted

        dispatch(editReviewById(formData)); // Dispatch action to edit the review
        // window.history.back(); // Navigate back to the previous page
    };
    console.log('Snackbar state:', snackbar);

    // Function to close the Snackbar notification
    const handleSnackbarClose = () => {
        dispatch(resetSnackbar()); // Reset Snackbar state
    };

    // Render the form component
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            {/* Box component to style the form container */}
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                {t('submitReview')} {/* Title of the form, internationalized */}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {/* Stack component to add vertical spacing between form elements */}
                    <Typography component="legend">{t('ratingLabel')}</Typography>
                    {/* Label for the rating field */}
                    <Rating
                        name="rating"
                        value={formData.rating}
                        onChange={handleRatingChange}
                        size="large"
                    />
                    {/* Rating component for user input */}
                    <TextField
                        label={t('commentsLabel')} // Label for the comments field, internationalized
                        name="comments" // Name attribute for identifying the field
                        value={formData.comments} // Current value of the comments field
                        onChange={handleChange} // Update form data on change
                        fullWidth // Make the field take up the full width of the container
                        multiline // Enable multiline input
                        rows={4} // Set number of visible rows
                        required // Make the field mandatory
                    />
                    <Button
                        type="submit" // Button type for form submission
                        variant="contained" // Material UI contained button style
                        color="primary" // Primary color style
                        size="large" // Set button size to large
                        fullWidth // Make the button full-width
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {t('submitButton')} {/* Submit button text, internationalized */}
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
                open={snackbar.open} // Control visibility based on Snackbar state
                onClose={handleSnackbarClose} // Close handler
                autoHideDuration={1500} // Auto-hide after 6 seconds
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message} {/* Snackbar message, internationalized */}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditReviewForm;
