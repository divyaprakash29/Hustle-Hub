// src/store/reviewActions.ts
import { AppDispatch } from '../store';
import axios from 'axios';
import { setReviews, deleteReview, editReview, showSuccessSnackbar, showErrorSnackbar, fetchReviewByIdStart, fetchReviewByIdSuccess, fetchReviewByIdFailure, getReviewsByFreelancerIdStart, getReviewsByFreelancerIdSuccess, getReviewsByFreelancerIdFailure } from '../reducers/reviewReducer';
import { Review } from '../reducers/reviewReducer';
import moment from 'moment-timezone';

interface PostReviewData {
    rating: number;
    comments: string;
    clientId: string;
    freelancerId: string;
}

interface EditReviewData {
    _id: string;
    rating: number;
    comments: string;
    
}
export const postReview = (formData: PostReviewData) => async (dispatch: AppDispatch) => {
    const clientId = localStorage.getItem('userId'); // Assign clientId to a variable
    const payload = {
        ...formData,
        rating: Number(formData.rating),
        comments: String(formData.comments),
        clientId,
        // freelancerId: String(formData.freelancerId),
        freelancerId: formData.freelancerId,   
    };

        // Logging to verify data before sending it
        console.log('Payload being sent:', payload); // Log payload before API call
        console.log("Client Id is:", clientId);
        console.log("Freelancer Id is:", formData.freelancerId); // Ensure freelancerId is available in formData

    try {
        console.log("Freelancer Id before post is:", formData.freelancerId);
        await axios.post('http://localhost:5000/api/reviews', payload);
        console.log("Client Id is:", clientId);
        console.log("Freelancer Id is:", formData.freelancerId);
        dispatch(showSuccessSnackbar('Review posted successfully!'));
        console.log("Client Id is:", clientId);
        console.log("Freelancer Id is:", formData.freelancerId);
    } catch (error) {
        console.error('Error posting review:', error);
        dispatch(showErrorSnackbar('Failed to post review. Please try again.'));
    }
};

// Fetch all reviews for a freelancer by freelancerId
export const fetchReviewsByFreelancerId = (freelancerId: string) => async (dispatch: AppDispatch) => {
    dispatch(getReviewsByFreelancerIdStart()); // Start the loading state

    try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${freelancerId}`);
        dispatch(getReviewsByFreelancerIdSuccess(response.data)); // Set the reviews for the specific freelancer
    } catch (error) {
        console.error('Error fetching reviews:', error);
        dispatch(getReviewsByFreelancerIdFailure('Failed to fetch reviews. Please try again.'));
    }
};

export const fetchReviews = (freelancerId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${freelancerId}`); // Replace with actual API endpoint
        dispatch(setReviews(response.data)); // Set the reviews in the store
    } catch (error) {
        console.error('Error fetching reviews:', error);
        dispatch(showErrorSnackbar('Failed to fetch reviews. Please try again.'));
    }
};

// Delete review
export const deleteReviewById = (reviewId: string) => async (dispatch: AppDispatch) => {

    try {
        await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
        console.log('Review deleted successfully.'); // Log success
        dispatch(deleteReview(reviewId)); // Remove the review from the store
        // dispatch(showSuccessSnackbar('Review deleted successfully!'));
       
    } catch (error) {
        console.error('Error deleting review:', error);
        // dispatch(showErrorSnackbar('Failed to delete review. Please try again.'));
    }
};

// Edit review
export const editReviewById = (updatedReview: EditReviewData) => async (dispatch: AppDispatch) => {
    const payload = {
        ...updatedReview,
        rating: Number(updatedReview.rating),
        comments: String(updatedReview.comments),
        clientId: localStorage.getItem('userId'),
    };
    console.log('Edit payload being sent:', payload); // Log the payload

    try {
        const response = await axios.put(`http://localhost:5000/api/reviews/${updatedReview._id}`, payload);
        console.log('Edit review successful, response:', response.data); // Log successful response
        dispatch(editReview(response.data)); // Use the updated review data from the API response
        dispatch(showSuccessSnackbar('Review updated successfully!'));
       
    } catch (error) {
        console.error('Error editing review:', error);
        dispatch(showErrorSnackbar('Failed to update review. Please try again.'));
    }
};

export const fetchReviewById = (reviewId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchReviewByIdStart());
    try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${reviewId}`);
        dispatch(fetchReviewByIdSuccess(response.data)); // Store the fetched review in the state
        dispatch(showSuccessSnackbar('Review details loaded successfully!'));
    } catch (error: any) {
        console.error('Error fetching review by ID:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch review details. Please try again.';
        dispatch(fetchReviewByIdFailure(errorMessage));
        dispatch(showErrorSnackbar(errorMessage));
    }
};

export const fetchAllReviews = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/reviews'); // Replace with actual API endpoint
        dispatch(setReviews(response.data)); // Set the reviews in the store
    } catch (error) {
        console.error('Error fetching reviews:', error);
        dispatch(showErrorSnackbar('Failed to fetch reviews. Please try again.'));
    }
};



