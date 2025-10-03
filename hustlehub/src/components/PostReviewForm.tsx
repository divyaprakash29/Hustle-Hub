import React, { useEffect, useState } from 'react'; // Import React and hooks
import { TextField, Button, Box, Typography, Stack, Snackbar, Alert } from '@mui/material'; // Import Material UI components
import Rating from '@mui/material/Rating'; // Import Rating component
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux state management
import { RootState } from '../store'; // Import root state type for Redux
import { postReview } from '../controllers/reviewController'; // Action to post a review
import { resetSnackbar } from '../reducers/reviewReducer'; // Action to reset Snackbar state
import { AppDispatch } from '../store'; // Dispatch type for Redux actions
import { useLocation } from 'react-router-dom'; // Hook to access the current route
import { useTranslation } from 'react-i18next'; // Import i18n hook for translations

// Define the props type for the component
type PropsType = {
  categories: string[]; // List of review categories (optional for future use)
  initialData?: {
    rating: number; // Initial rating value
    comments: string; // Initial comments value
    clientId: string; // Client ID (user submitting the review)
    freelancerId: string; // Freelancer ID (user being reviewed)
  };
};

const PostReviewForm: React.FC<PropsType> = ({ categories, initialData }) => {
  const { t } = useTranslation(); // Translation hook for handling i18n strings
  const location = useLocation(); // Get the current URL location
  const freelancerIdFromURL = location.pathname.split('/')[2]; // Extract freelancer ID from the URL

  // Initialize the form data with either props or default values
  const [formData, setFormData] = useState(
    initialData || {
      rating: 0, // Default rating is 0
      comments: '', // Default comments are empty
      clientId: localStorage.getItem('userId') || '', // Fetch client ID from localStorage
      freelancerId: freelancerIdFromURL || '', // Use freelancer ID from URL
    }
  );

  const dispatch = useDispatch<AppDispatch>(); // Dispatch hook for Redux actions
  const snackbar = useSelector((state: RootState) => state.review.snackbar); // Select Snackbar state from Redux

  // Update freelancerId if URL changes
  useEffect(() => {
    const freelancerIdFromURL = location.pathname.split('/')[2]; // Extract freelancer ID again if URL changes
    if (freelancerIdFromURL) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        freelancerId: freelancerIdFromURL, // Update form data with new freelancer ID
      }));
    }
  }, [location]); // Depend on location changes

  // Handle changes in text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Get name and value from the event target
    setFormData({ ...formData, [name]: value }); // Update corresponding form data field
  };

  // Handle changes in the rating component
  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    setFormData({ ...formData, rating: value ?? 0 }); // Use value or 0 as a fallback
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (!formData.freelancerId) {
      console.error(t('freelancerIdError')); // Log an error if freelancer ID is missing
      return;
    }
    dispatch(postReview(formData)); // Dispatch action to post the review
  };

  // Close Snackbar when the user clicks close
  const handleSnackbarClose = () => {
    dispatch(resetSnackbar()); // Reset Snackbar state
  };

  // Render the form component
  return (
    <Box
      sx={{
        maxWidth: 600, // Set maximum width of the form
        mx: 'auto', // Center horizontally
        mt: 5, // Add top margin
        p: 3, // Add padding
        boxShadow: 3, // Add shadow for depth
        borderRadius: 2, // Round corners
      }}
    >
      {/* Header for the form */}
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        {t('submitReview')} {/* Internationalized string */}
      </Typography>

      {/* Review form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}> {/* Stack for vertical spacing between fields */}
          <Typography component="legend">{t('ratingLabel')}</Typography> {/* Rating label */}
          <Rating
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
            size="large"
          />
          <TextField
            label={t('commentsLabel')} // Internationalized comments label
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
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
              color: 'black',
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '12px 16px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t('submitButton')} {/* Internationalized submit button text */}
          </Button>
        </Stack>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={1500}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message} {/* Display Snackbar message */}
        </Alert>
      </Snackbar>

      {/* Back button to navigate to the previous page */}
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
    </Box>
  );
};

// Export the component for use in other parts of the app
export default PostReviewForm;
