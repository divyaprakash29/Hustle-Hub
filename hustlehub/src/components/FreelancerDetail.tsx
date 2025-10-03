import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFreelancerProfileById } from '../controllers/freelancerprofileController';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReviewListing from './ReviewListing';
import { fetchReviewsByFreelancerId } from '../controllers/reviewController';
import FreelancerReviewListing from './FreelancerReviewListing';

/**
 * FreelancerProfileDetail Component
 * 
 * Functionality:
 * - Fetches and displays detailed information about a freelancer's profile using the profile ID from the URL.
 * - Fetches reviews related to the freelancer and integrates review listing.
 * - Handles loading and error states gracefully.
 * - Provides a "Back" button to navigate to the previous page.
 */
const FreelancerProfileDetail: React.FC = () => {
    const { profileId } = useParams<{ profileId: string }>(); // Get the project ID from URL
    const dispatch = useDispatch<AppDispatch>();
    const { freelancerprofile, loading, error } = useSelector((state: RootState) => state.freelancerprofile);
    const { t } = useTranslation();  // useTranslation hook for translation
    const freelancerId = localStorage.getItem('userId') || '';
    useEffect(() => {
        if (profileId) {
            dispatch(fetchFreelancerProfileById(profileId)); // Fetch freelancer profile by ID
            dispatch(fetchReviewsByFreelancerId(freelancerId));
        }
    }, [dispatch, profileId, freelancerId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                Failed to load project details: {error}
            </Typography>
        );
    }

    if (!freelancerprofile) {
        return (
            <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 5 }}>
                Profile not found
            </Typography>
        );
    } else {
        console.log(freelancerprofile);
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {freelancerprofile.description}
                    </Typography>
                    {/* <Typography variant="body2" >
                        <strong> {t('skillss')}</strong>{freelancerprofile.skills}
                    </Typography> */}
                    <Typography variant="body2">
                        <strong>{t('skillss')}:</strong> {freelancerprofile.skills.join(', ')}
                    </Typography>
                    {/* <Typography variant="body2">
                        <strong> {t('category')}:</strong> {freelancerprofile.category}
                    </Typography> */}
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>{t('pricing')}:</strong> ${freelancerprofile.pricing}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t('daysToComplete')}:</strong> {freelancerprofile.noOfDaysToComplete}
                    </Typography>
                    {/* <Typography variant="body2">
                        <strong> {t('previousCompanies')}:</strong> {freelancerprofile.previousCompanies}
                    </Typography> */}
                    <Typography variant="body2">
                        <strong>{t('previousCompanies')}:</strong> {freelancerprofile.previousCompanies.join(', ')}
                    </Typography>
                    <Typography variant="body2">
                        <strong> {t('portfolio')}:</strong> {freelancerprofile.portfolio}
                    </Typography>
                </CardContent>
            </Card>
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
        </Box>
    );
};

export default FreelancerProfileDetail;
