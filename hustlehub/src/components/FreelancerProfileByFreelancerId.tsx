import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, Stack, Button, Tooltip } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewListing from './ReviewListing';

//type for freelancer profile
type FreelancerProfile = {
    _id: string;
    description: string;
    pricing: number;
    noOfDaysToComplete: number;
    portfolio?: string;
    skills?: string[];
    previousCompanies?: string[];
    rating?: number;
    reviews?: any[];
};

/**
 * FreelancerProfilesByFreelancerId Component
 * 
 * Functionality:
 * - Fetches and displays all freelancer profiles associated with a specific freelancer ID from the API.
 * - Handles loading and error states, showing appropriate messages.
 * - Displays profiles with details such as description, pricing, days to complete, portfolio, skills, and previous companies.
 * - Includes a "Write a Review" button that navigates to the review submission page.
 * - Integrates a `ReviewListing` component to show reviews related to the freelancer.
 * - Provides a "Back" button to navigate to the previous page.
 */
const FreelancerProfilesByFreelancerId: React.FC = () => {
    const { freelancerId } = useParams<{ freelancerId: string }>();
    const { t } = useTranslation();
    const [profiles, setProfiles] = useState<FreelancerProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!freelancerId) {
                setError(t('freelancerIdMissing'));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:5000/api/user/${freelancerId}/profile`
                );

                // Log the response to debug the structure
                console.log("API Response Data:", response.data);

                // Extract the profiles array
                const profilesData = response.data.profiles;
                if (profilesData && Array.isArray(profilesData)) {
                    setProfiles(profilesData);
                } else if (profilesData && typeof profilesData === 'object') {
                    // Convert object to array if profilesData is an object
                    setProfiles(Object.values(profilesData));
                } else {
                    setError(t('noProfilesFound'));
                }

                setLoading(false);
            } catch (err: any) {
                console.error('Error fetching profiles:', err);
                setError(t('fetchError'));
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [freelancerId, t]);

    const handleReviewClick = () => {
        navigate(`/post-review/${freelancerId}`); // Navigate to the PostReviewForm route
        // navigate(`/freelancer/${id}/review`); // Navigate to the PostReviewForm route

    };

    // Handle loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                {t('Freelancer Profiles')}
            </Typography>
            {profiles.length > 0 ? (
                <Stack spacing={3}>
                    {profiles.map((profile) => (
                        <Card key={profile._id} sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5">{profile.description || t('descriptionNotAvailable')}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {t('pricing')}: ${profile.pricing ?? t('notSpecified')}
                                </Typography>
                                <Typography variant="body2">
                                    {t('daysToComplete')}: {profile.noOfDaysToComplete ?? t('notSpecified')}
                                </Typography>
                                {profile.portfolio && (
                                    <Typography variant="body2">
                                        {t('portfolio')}: <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">{profile.portfolio}</a>
                                    </Typography>
                                )}
                                {profile.skills && (
                                    <Typography variant="body2">
                                        {t('skills')}: {profile.skills.join(', ')}
                                    </Typography>
                                )}
                                {profile.previousCompanies && (
                                    <Typography variant="body2">
                                        {t('previousCompanies')}: {profile.previousCompanies.join(', ')}
                                    </Typography>
                                )}

                                
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    {t('noProfilesFound')}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                            variant="contained"
                            color="primary"
                            startIcon={<RateReviewIcon />}
                            onClick={handleReviewClick}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                backgroundColor: 'primary.main', // Customize color
                                '&:hover': {
                                backgroundColor: 'inherit', // Darker shade
                                },
                            }}
                            >
                            Write a Review
                            </Button>
                                </Box>
                                <ReviewListing  freelancerId={ freelancerId || ''}/>
            <Box sx={{ textAlign: 'center', mt: 3  }}>
                <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                    {t('backButton')}
                </Button>
            </Box>
        </Box>
    );
};

export default FreelancerProfilesByFreelancerId;
