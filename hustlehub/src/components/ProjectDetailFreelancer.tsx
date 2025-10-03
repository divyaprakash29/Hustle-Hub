import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProjectById } from '../controllers/projectController'; // Thunk for fetching a single project
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
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ProjectDetailFreelancer: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>(); // Get the project ID from URL
    const dispatch = useDispatch<AppDispatch>();
    const { project, loading, error } = useSelector((state: RootState) => state.project);
    const navigate = useNavigate();
    const { t } = useTranslation(); // Use the translation hook

    useEffect(() => {
        if (projectId) {
            dispatch(fetchProjectById(projectId)); // Fetch project by ID
        }
    }, [dispatch, projectId]);

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
                {t('failedToLoad')}: {error}
            </Typography>
        );
    }

    if (!project) {
        return (
            <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 5 }}>
                {t('projectNotFound')}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        {project.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                        {project.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>{t('budget')}:</strong> ${project.budget}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>{t('deadline')}:</strong> {new Date(project.deadline).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>{t('status')}:</strong> {project.status}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t('daysToComplete')}:</strong> {project.daysToComplete}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t('tags')}:</strong> {project.tags}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t('category')}:</strong> {project.category}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t('postedAt')}:</strong> {project.postedAt}
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

export default ProjectDetailFreelancer;
