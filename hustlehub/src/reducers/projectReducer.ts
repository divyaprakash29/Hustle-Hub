import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
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

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

interface ProjectState {
    snackbar: SnackbarState;
    projects: Project[];
    project: Project | null; // For storing a single project
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    snackbar: {
        open: false,
        message: '',
        severity: 'success',
    },
    projects: [],
    project: null, // Initialize with null
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        showSuccessSnackbar(state, action: PayloadAction<string>) {
            state.snackbar = { open: true, message: action.payload, severity: 'success' };
        },
        showErrorSnackbar(state, action: PayloadAction<string>) {
            state.snackbar = { open: true, message: action.payload, severity: 'error' };
        },
        resetSnackbar(state) {
            state.snackbar = { open: false, message: '', severity: 'success' };
        },
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProjectsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProjectsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProjectByIdStart(state) {
            state.loading = true;
            state.error = null;
            state.project = null; // Clear any existing project data
        },
        fetchProjectByIdSuccess(state, action: PayloadAction<Project>) {
            state.loading = false;
            state.project = action.payload;
        },
        fetchProjectByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProject(state, action: PayloadAction<string>) {
            // Remove the project from the state by filtering out the deleted project by id
            state.projects = state.projects.filter((project) => project._id !== action.payload);
        },
        editProject(state, action: PayloadAction<Project>) {
            const updatedProject = action.payload; // The updated project data
            const index = state.projects.findIndex((project) => project._id === updatedProject._id);

            if (index !== -1) {
                // Update the project data in the array immutably
                state.projects[index] = {
                    ...state.projects[index],
                    ...updatedProject, // Merge existing project with updated data
                };
            }
        },

    },
});

export const {
    showSuccessSnackbar,
    showErrorSnackbar,
    resetSnackbar,
    setProjects,
    fetchProjectsStart,
    fetchProjectsFailure,
    fetchProjectByIdStart,
    fetchProjectByIdSuccess,
    fetchProjectByIdFailure,
    deleteProject,
    editProject,
} = projectSlice.actions;

export default projectSlice.reducer;
