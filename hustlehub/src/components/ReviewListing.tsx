import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, IconButton, Card, CardContent, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByFreelancerId, deleteReviewById } from '../controllers/reviewController';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Hook for translations
 
interface ReviewListingProps {
    freelancerId: string; // Freelancer ID to fetch reviews for
}
 
const ReviewListing: React.FC<ReviewListingProps> = ({ freelancerId }) => {
    const { t } = useTranslation(); // Translation hook
    const dispatch = useDispatch<AppDispatch>(); // Redux dispatch
    const { reviews, loading } = useSelector((state: RootState) => state.review); // Select reviews and loading state
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null); // State for notification
 
    useEffect(() => {
        // Fetch reviews for the specific freelancer when freelancerId changes
        if (freelancerId) {
            dispatch(fetchReviewsByFreelancerId(freelancerId));
        }
    }, [dispatch, freelancerId]);
 
    // Handle edit action, navigating to the edit page
    const handleEdit = (review: any) => {
        navigate(`/edit-review/${review._id}`, { state: review });
    };
 
    // Handle delete action with confirmation dialog
    const handleDelete = (reviewId: string) => {
        console.log('Dispatching delete action for review ID:', reviewId); // Log the review ID being deleted

        if (window.confirm(t('reviewListing.confirmDelete'))) {
            dispatch(deleteReviewById(reviewId));
            setNotification(t('Review deleted successfully!')); // Set notification message
        }
    };
 
    // Close notification
    const handleCloseNotification = () => {
        setNotification(null);
    };
 
    // Log the snackbar state to debug
    // console.log('Snackbar state:', snackbar);
 
    // Show loading spinner while fetching reviews
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }
 
    return (
        <Box padding="16px">
            {/* Page title */}
            <Typography variant="h5" gutterBottom>
                {t('reviewListing.title')}
            </Typography>
 
            {/* List of reviews or fallback if no reviews found */}
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card
                        key={review._id}
                        sx={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}
                    >
                        <CardContent sx={{ flex: 1 }}>
                            {/* Display rating and comments */}
                            <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                {t('reviewListing.rating')}: {review.rating}
                            </Typography>
                            <Typography variant="body1">
                                {t('reviewListing.comments')}: {review.comments}
                            </Typography>
                        </CardContent>
 
                        {/* Action buttons for edit and delete */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <IconButton
                                onClick={() => handleEdit(review)}
                                color="primary"
                                sx={{ mr: 1 }}
                                title={t('reviewListing.edit')}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => handleDelete(review._id)}
                                color="error"
                                title={t('reviewListing.delete')}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Card>
                ))
            ) : (
                // No reviews fallback message
                <Typography>{t('reviewListing.noReviews')}</Typography>
            )}
 
            {/* Snackbar for delete notification */}
            <Snackbar
                open={!!notification}
                autoHideDuration={1500}
                color="primary"
                onClose={handleCloseNotification}
                message={notification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar at the top center
                sx={{ margin: '0 auto' }} // Centering the Snackbar
                ContentProps={{
                    sx: {
                        display: 'flex',
                        justifyContent: 'center', // Center the content
                        textAlign: 'center', // Center text alignment
                        backgroundColor: '#4caf50', // Set background color (example: green)
                        color: 'black', // Set text color to white for contrast
                    },
                }}
            />

        </Box>
    );
};
 
export default ReviewListing;
