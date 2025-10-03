// src/store/projectActions.ts
import { AppDispatch } from '../store';
import axios from 'axios';
import { setProjects, deleteProject, editProject, showSuccessSnackbar, showErrorSnackbar, fetchProjectByIdStart, fetchProjectByIdSuccess, fetchProjectByIdFailure } from '../reducers/projectReducer';
import { Project } from '../reducers/projectReducer';
import moment from 'moment-timezone';

interface PostProjectData {
    title: string;
    description: string;
    budget: string | number;
    daysToComplete: string | number;
    deadline: string;
    tags: string[];
    category: string;
}

interface EditProjectData {
    _id: string;
    title: string;
    description: string;
    budget: number;
    daysToComplete: number;
    deadline: string;
    tags: string[];
    category: string;
    clientId: string;
    postedAt: string;
    status: string;
    currentBidCount: number;
    minimumBid: number;
    averageBid: number;
}
export const postProject = (formData: PostProjectData) => async (dispatch: AppDispatch) => {
    const payload = {
        ...formData,
        budget: Number(formData.budget),
        daysToComplete: Number(formData.daysToComplete),
        clientId: localStorage.getItem('userId'),
        postedAt: moment(new Date()).format('MMM-DD-YYYY hh:mm A'),
        status: 'open', // Default status
        currentBidCount: 0,
        minimumBid: 0,
        averageBid: 0,
    };

    try {
        await axios.post('http://localhost:5000/api/projects', payload);
        dispatch(showSuccessSnackbar('Project posted successfully!'));
    } catch (error) {
        console.error('Error posting project:', error);
        dispatch(showErrorSnackbar('Failed to post project. Please try again.'));
    }
};

export const fetchProjects = () => async (dispatch: AppDispatch) => {
    const clientId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`http://localhost:5000/api/projects/client/${clientId}`); // Replace with actual API endpoint
        dispatch(setProjects(response.data)); // Set the projects in the store
    } catch (error) {
        console.error('Error fetching projects:', error);
        dispatch(showErrorSnackbar('Failed to fetch projects. Please try again.'));
    }
};

// Delete project
export const deleteProjectById = (projectId: string) => async (dispatch: AppDispatch) => {

    try {
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
        dispatch(deleteProject(projectId)); // Remove the project from the store
        dispatch(showSuccessSnackbar('Project deleted successfully!'));
    } catch (error) {
        console.error('Error deleting project:', error);
        dispatch(showErrorSnackbar('Failed to delete project. Please try again.'));
    }
};

// Edit project
export const editProjectById = (updatedProject: EditProjectData) => async (dispatch: AppDispatch) => {
    const payload = {
        ...updatedProject,
        budget: Number(updatedProject.budget),
        daysToComplete: Number(updatedProject.daysToComplete),
        deadline: String(updatedProject.deadline),
        clientId: localStorage.getItem('userId'),
        postedAt: moment(new Date()).format('MMM-DD-YYYY hh:mm A'),
        status: String(updatedProject.status),
        currentBidCount: Number(updatedProject.currentBidCount),
        minimumBid: Number(updatedProject.minimumBid),
        averageBid: Number(updatedProject.averageBid),
    };

    try {
        const response = await axios.put(`http://localhost:5000/api/projects/${updatedProject._id}`, payload);
        dispatch(editProject(response.data)); // Use the updated project data from the API response
        dispatch(showSuccessSnackbar('Project updated successfully!'));
    } catch (error) {
        console.error('Error editing project:', error);
        dispatch(showErrorSnackbar('Failed to update project. Please try again.'));
    }
};

export const fetchProjectById = (projectId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchProjectByIdStart());
    try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        dispatch(fetchProjectByIdSuccess(response.data)); // Store the fetched project in the state
        dispatch(showSuccessSnackbar('Project details loaded successfully!'));
    } catch (error: any) {
        console.error('Error fetching project by ID:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch project details. Please try again.';
        dispatch(fetchProjectByIdFailure(errorMessage));
        dispatch(showErrorSnackbar(errorMessage));
    }
};

export const fetchAllProjects = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/projects'); // Replace with actual API endpoint
        dispatch(setProjects(response.data)); // Set the projects in the store
    } catch (error) {
        console.error('Error fetching projects:', error);
        dispatch(showErrorSnackbar('Failed to fetch projects. Please try again.'));
    }
};

