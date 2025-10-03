// src/components/EditProjectForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { editProjectById } from '../controllers/projectController'; // Correct path to actions
import { resetSnackbar } from '../reducers/projectReducer'; // Correct path to resetSnackbar
import { AppDispatch } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type PropsType = {
    categories: string[];
};

const EditProjectForm: React.FC<PropsType> = ({ categories }) => {
    const { t } = useTranslation(); // use the i18next translation hook

    const location = useLocation();
    const projectData = location.state;
    const [formData, setFormData] = useState(projectData);

    const dispatch = useDispatch<AppDispatch>();
    const snackbar = useSelector((state: RootState) => state.project.snackbar);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(projectData); // Pre-populate form with the existing project data when component mounts or projectData changes
    }, [projectData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, tags: e.target.value.split(',') });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editProjectById(formData)); // Dispatching the thunk to update project
        navigate('/HomeClient');
    };

    const handleSnackbarClose = () => {
        dispatch(resetSnackbar()); // Reset snackbar state when closed
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                {t('editProject')} {/* Translate text */}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label={t('title')} // Translate text
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t('description')} // Translate text
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label={t('budget')} // Translate text
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t('daysToComplete')} // Translate text
                        name="daysToComplete"
                        type="number"
                        value={formData.daysToComplete}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t('deadline')} // Translate text
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label={t('category')} // Translate text
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        select
                        fullWidth
                        required
                    >
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>{t('noCategoriesAvailable')}</MenuItem> // Translate text
                        )}
                    </TextField>
                    <TextField
                        label={t('tags')} // Translate text
                        name="tags"
                        value={formData.tags.join(',')}
                        onChange={handleTagsChange}
                        fullWidth
                    />
                    <TextField
                        label={t('status')} // Translate text
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        {t('updateProject')} {/* Translate text */}
                    </Button>
                </Stack>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditProjectForm;
