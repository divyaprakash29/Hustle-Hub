import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchAllProjects } from '../controllers/projectController';
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
    Tooltip,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

export default function Home() {
    const theme = useTheme();
    const { t } = useTranslation(); // Initialize i18next
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector((state: RootState) => state.project);
    const { userId } = useParams();
    const username = localStorage.getItem('username');
    useEffect(() => {
        dispatch(fetchAllProjects()); // Fetch projects when component mounts
    }, [dispatch]);

    const handleViewDetails = (projectId: string) => {
        navigate(`/view-project-freelancer/${projectId}`);
    };

    const handleSubmitBid = (projectId: string) => {
        navigate(`/postbid/${projectId}`);
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
                {t('loadingError', { error })}
            </Typography>
        );
    }

    return (
        <>
            {/* View Name , All Profiles and Submitted Bids Section */}
            <Card
                sx={{
                    maxWidth: 300,
                    margin: 'auto',
                    padding: 2,
                    background: 'linear-gradient(to right, #E0C2FF, #F5EBFF)',
                    borderRadius: 2,
                    position: 'absolute',
                    top: 85,
                    right: 16
                }}
            >
                <CardContent sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Tooltip title={t('viewfreelancerprofile')} arrow>
                        <Button
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                backgroundColor: 'primary.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                color: '#fff',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                padding: 0,
                            }}
                            onClick={() => navigate(`/profile-list`)}
                        >
                            {username?.split(' ').map(n => n[0]).join('') || 'NA'}
                        </Button>
                    </Tooltip>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: '#fff', color: 'primary.main',
                            fontWeight: 'bold',
                        }}
                        onClick={() => navigate('/retrieve-freelancer-bids')}
                    >
                        {t('submitted-bid')}
                    </Button>
                </CardActions>
            </Card>
            {/* Project Listings Section */}
            <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                    {t('projectListings')}
                </Typography>
                <Stack spacing={3}>
                    {projects.map((project) => (
                        <Card key={project._id} sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                        {project.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {project.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {t('budgets', { budget: project.budget })}
                                </Typography>
                                <Typography variant="body2">
                                    {t('deadlines', { deadline: new Date(project.deadline).toLocaleDateString() })}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleViewDetails(project._id)} variant="contained" size="small">
                                    {t('viewDetails')}
                                </Button>
                                <Button onClick={() => handleSubmitBid(project._id)} variant="contained" size="small">
                                    {t('submitBid')}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </>
    );
}
