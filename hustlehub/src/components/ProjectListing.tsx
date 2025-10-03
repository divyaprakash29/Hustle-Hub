import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteProjectById, fetchProjects } from '../controllers/projectController';
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
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjectListing: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector((state: RootState) => state.project);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleEdit = (project: any) => {
        navigate(`/edit-project/${project._id}`, { state: project });
    };

    const handleDelete = (projectId: string) => {
        if (window.confirm(t('projectListing.confirmDelete'))) {
            dispatch(deleteProjectById(projectId));
        }
    };

    const handleViewDetails = (projectId: string) => {
        navigate(`/view-project/${projectId}`);
    };

    const handleViewBids = (projectId: string) => {
        navigate(`/bids/projects/${projectId}`);
    };

    const handlePayment = (project: any) => {
        navigate(`/payment/${project._id}`, { state: { project } });
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
                {t('projectListing.error')}: {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                {t('projectListing.title')}
            </Typography>
            <Stack spacing={3}>
                {projects.map((project) => (
                    <Card key={project._id} sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                    {project.title}
                                </Typography>
                                <Box>
                                    <IconButton onClick={() => handleEdit(project)} color="primary" sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(project._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                {project.description}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {t('projectListing.budget')}: ${project.budget}
                            </Typography>
                            <Typography variant="body2">
                                {t('projectListing.deadline')}: {new Date(project.deadline).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2">
                                {t('projectListing.status')}: {project.status}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleViewDetails(project._id)} variant="contained" size="small">
                                {t('projectListing.viewDetails')}
                            </Button>
                            <Button
                                onClick={() => handleViewBids(project._id)}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                {t('projectListing.viewBids')}
                            </Button>
                            {project.status === 'completed' && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<PaymentIcon />}
                                    onClick={() => handlePayment(project)}
                                >
                                    {t('projectListing.makePayment')}
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};

export default ProjectListing;
