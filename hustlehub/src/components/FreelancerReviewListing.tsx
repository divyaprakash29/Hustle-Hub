import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByFreelancerId } from '../controllers/reviewController';
import { AppDispatch, RootState } from '../store';
import { useTranslation } from 'react-i18next'; // Importing translation hook

interface ReviewListingProps {
    freelancerId: string; // Freelancer ID passed as a prop
}

const FreelancerReviewListing: React.FC<ReviewListingProps> = ({ freelancerId }) => {
    const { t } = useTranslation(); // Hook for translations
    const dispatch = useDispatch<AppDispatch>(); // Redux dispatch
    const { reviews, loading } = useSelector((state: RootState) => state.review); // Fetching state data

    useEffect(() => {
        // Fetch reviews for the specific freelancer when freelancerId changes
        if (freelancerId) {
            dispatch(fetchReviewsByFreelancerId(freelancerId));
        }
    }, [dispatch, freelancerId]);

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
            {/* Page title with translation */}
            <Typography variant="h4" gutterBottom>
                {t('freelancerReviewListing.title')}
            </Typography>

            {/* Display list of reviews or fallback if no reviews found */}
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review._id} sx={{ marginBottom: '16px' }}>
                        <CardContent>
                            {/* Display rating with translation */}
                            <Typography variant="h6">
                                {t('freelancerReviewListing.rating')}: {review.rating}
                            </Typography>
                            {/* Display comments with translation */}
                            <Typography variant="body1">
                                {t('freelancerReviewListing.comments')}: {review.comments}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                // No reviews fallback message with translation
                <Typography>{t('freelancerReviewListing.noReviews')}</Typography>
            )}
        </Box>
    );
};

export default FreelancerReviewListing;
