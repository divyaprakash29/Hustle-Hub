import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FreelancerProfile {
    _id: string;
    description: string;
    skills: string[];
    category: string;
    pricing: string | number;
    noOfDaysToComplete: string | number;
    previousCompanies: string[];
    portfolio:string;
}

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

interface FreelancerProfileState {
    snackbar: SnackbarState;
    freelancerprofiles: FreelancerProfile[];
    freelancerprofile: FreelancerProfile | null; // For storing a single freelancer profile
    loading: boolean;
    error: string | null;
}

const initialState: FreelancerProfileState = {
    snackbar: {
        open: false,
        message: '',
        severity: 'success',
    },
    freelancerprofiles: [],
    freelancerprofile: null, // Initialize with null
    loading: false,
    error: null,
};

const freelancerprofileSlice = createSlice({
    name: 'freelancerprofile',
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
        setFreelancerProfiles(state, action: PayloadAction<FreelancerProfile[]>) {
            state.freelancerprofiles = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchFreelancerProfilesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchFreelancerProfilesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchFreelancerProfileByIdStart(state) {
            state.loading = true;
            state.error = null;
            state.freelancerprofile = null; // Clear any existing profile data
        },
        fetchFreelancerProfileByIdSuccess(state, action: PayloadAction<FreelancerProfile>) {
            state.loading = false;
            state.freelancerprofile = action.payload;
        },
        fetchFreelancerProfileByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteFreelancerProfile(state, action: PayloadAction<string>) {
            state.freelancerprofiles = state.freelancerprofiles.filter((freelancerprofile) => freelancerprofile._id !== action.payload);
        },
        editFreelancerProfile(state, action: PayloadAction<FreelancerProfile>) {
            const updatedFreelancerProfile = action.payload; // The updated profile data
            const index = state.freelancerprofiles.findIndex((freelancerprofile) => freelancerprofile._id === updatedFreelancerProfile._id);

            if (index !== -1) {
                // Update the profile data in the array immutably
                state.freelancerprofiles[index] = {
                    ...state.freelancerprofiles[index],
                    ...updatedFreelancerProfile, // Merge existing profile with updated data
                };
            }
        },

    },
});

export const {
    showSuccessSnackbar,
    showErrorSnackbar,
    resetSnackbar,
    setFreelancerProfiles,
    fetchFreelancerProfilesStart,
    fetchFreelancerProfilesFailure,
    fetchFreelancerProfileByIdStart,
    fetchFreelancerProfileByIdSuccess,
    fetchFreelancerProfileByIdFailure,
    deleteFreelancerProfile,
    editFreelancerProfile,
} = freelancerprofileSlice.actions;

export default freelancerprofileSlice.reducer;


