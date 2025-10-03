// src/reducers/reviewReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
    _id: string;
    rating: number;
    comments: string;
    clientId: string;
    freelancerId: string;
}

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

interface ReviewState {
    snackbar: SnackbarState;
    reviews: Review[];
    review: Review | null; // For storing a single review
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    snackbar: {
        open: false,
        message: '',
        severity: 'success',
    },
    reviews: [],
    review: null, // Initialize with null
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: 'review',
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
        setReviews(state, action: PayloadAction<Review[]>) {
            state.reviews = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchReviewsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchReviewsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchReviewByIdStart(state) {
            state.loading = true;
            state.error = null;
            state.review = null; // Clear any existing review data
        },
        fetchReviewByIdSuccess(state, action: PayloadAction<Review>) {
            state.loading = false;
            state.review = action.payload;
        },
        fetchReviewByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteReview(state, action: PayloadAction<string>) {
            // Remove the review from the state by filtering out the deleted review by id
            state.reviews = state.reviews.filter((review) => review._id !== action.payload);
        },
        editReview(state, action: PayloadAction<Review>) {
            const updatedReview = action.payload; // The updated review data
            const index = state.reviews.findIndex((review) => review._id === updatedReview._id);

            if (index !== -1) {
                // Update the review data in the array immutably
                state.reviews[index] = {
                    ...state.reviews[index],
                    ...updatedReview, // Merge existing review with updated data
                };
            }
        },
         /// New actions for fetching reviews by freelancerId
        getReviewsByFreelancerIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        getReviewsByFreelancerIdSuccess(state, action: PayloadAction<Review[]>) {
            state.loading = false;
            state.reviews = action.payload;
        },
        getReviewsByFreelancerIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    showSuccessSnackbar,
    showErrorSnackbar,
    resetSnackbar,
    setReviews,
    fetchReviewsStart,
    fetchReviewsFailure,
    fetchReviewByIdStart,
    fetchReviewByIdSuccess,
    fetchReviewByIdFailure,
    deleteReview,
    editReview,
    getReviewsByFreelancerIdStart,
    getReviewsByFreelancerIdFailure,
    getReviewsByFreelancerIdSuccess
} = reviewSlice.actions;

export default reviewSlice.reducer;
