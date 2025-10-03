import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteFreelancerProfileByID, fetchFreelancerProfiles } from '../controllers/freelancerprofileController';
import { AppDispatch } from '../store';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Stack,
    CircularProgress,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import FreelancerReviewListing from './FreelancerReviewListing';

/**
 * FreelancerProfileListing Component
 * 
 * Functionality:
 * - Fetches and displays a list of freelancer profiles.
 * - Provides options to edit, delete, or view detailed information for each profile.
 * - Allows users to create a new profile using a "Create New Profile" button.
 * - Integrates a `FreelancerReviewListing` component to display reviews for the logged-in freelancer.
 * - Handles loading and error states with appropriate feedback to the user.
 * - Includes a "Back" button to navigate to the previous page.
 */
const FreelancerProfileListing: React.FC = () => {
    const { freelancerId } = useParams<{ freelancerId: string }>() || { freelancerId: '' }; // Fallback value
    console.log(freelancerId);
    const { t } = useTranslation();  // useTranslation hook for translation
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const userId = localStorage.getItem('userId') || "";
    const dispatch = useDispatch<AppDispatch>();
    const { freelancerprofiles, loading, error } = useSelector((state: RootState) => state.freelancerprofile);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        dispatch(fetchFreelancerProfiles()); // Fetch profiles when component mounts
    }, [dispatch]);

    const handleEdit = (freelancerprofile: any) => {
        console.log(`Edit profile with ID: ${freelancerprofile._id}`);
        navigate(`/edit-profile/${freelancerprofile._id}`, { state: freelancerprofile });
    };

    const handleDelete = (profileId: string) => {
        if (window.confirm(t('confirm_delete'))) {
            dispatch(deleteFreelancerProfileByID(profileId));
        }
    };

    const handleViewDetails = (profileId: string) => {
        navigate(`/view-profile/${profileId}`);
    };

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
                {t('failed_to_load_profiles')}: {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="16px"
                sx={{
                    borderBottom: '1px solid #ddd',
                }}
            >
                <h1 style={{ margin: 0 }}>{t('profiles')}</h1>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: '#FFF',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={() => navigate(`/post-profile/${user.id}`)}
                >
                    {t('create_new_profile')}
                </Button>
            </Box>
            <Stack spacing={3}>
                {freelancerprofiles.map((freelancerprofile) => (
                    <Card key={freelancerprofile._id} sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                    {freelancerprofile.description}
                                </Typography>
                                <Box>
                                    <IconButton onClick={() => handleEdit(freelancerprofile)} key={freelancerprofile._id} color="primary" sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(freelancerprofile._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {t('pricing')}: ${freelancerprofile.pricing}
                            </Typography>
                            <Typography variant="body2">
                                {t('days_to_complete')}: {freelancerprofile.noOfDaysToComplete}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleViewDetails(freelancerprofile._id)} variant="contained" size="small">
                                {t('view_details')}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
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
            <FreelancerReviewListing freelancerId={userId}/>
        </Box>

    );
};

export default FreelancerProfileListing;
