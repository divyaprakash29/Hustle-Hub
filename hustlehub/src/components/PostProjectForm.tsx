// src/components/PostProjectForm.tsx
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { postProject } from '../controllers/projectController'; // Correct path to actions
import { resetSnackbar } from '../reducers/projectReducer'; // Correct path to resetSnackbar
import { AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

type PropsType = {
    categories: string[];
    initialData?: {
        title: string;
        description: string;
        budget: string | number;
        daysToComplete: string | number;
        deadline: string;
        tags: string[];
        category: string;
    };
};

const PostProjectForm: React.FC<PropsType> = ({ categories, initialData }) => {
    const [formData, setFormData] = useState(
        initialData || {
            title: '',
            description: '',
            budget: '',
            daysToComplete: '',
            deadline: '',
            tags: [] as string[],
            category: '',
        }
    );

    const dispatch = useDispatch<AppDispatch>();
    const snackbar = useSelector((state: RootState) => state.project.snackbar);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, tags: e.target.value.split(',') });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(postProject(formData)); // Dispatching the thunk to post project
        navigate('/HomeClient');
    };

    const handleSnackbarClose = () => {
        dispatch(resetSnackbar()); // Reset snackbar state when closed
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                Post Project
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Budget ($)"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Days to Complete"
                        name="daysToComplete"
                        type="number"
                        value={formData.daysToComplete}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="Category"
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
                            <MenuItem disabled>No categories available</MenuItem>
                        )}
                    </TextField>
                    <TextField
                        label="Tags (Comma separated)"
                        name="tags"
                        value={formData.tags.join(',')}
                        onChange={handleTagsChange}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Post Project
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
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.history.back()}
                    sx={{ width: '100px' }}  
                >
                    {'BACK'}
                </Button>
            </Box>
        </Box>
    );
};

export default PostProjectForm;
