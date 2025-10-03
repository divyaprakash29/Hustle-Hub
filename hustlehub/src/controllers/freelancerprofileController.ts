import { AppDispatch } from '../store';
import { showSuccessSnackbar,
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
    FreelancerProfile
} from '../reducers/freelancerReducer';

interface PostFreelancerProfileData {
    description: string;
    skills: string[];
    category: string;
    pricing: string | number;
    noOfDaysToComplete: string | number;
    previousCompanies: string[];
    portfolio:string;
}

interface EditFreelancerProfileData extends PostFreelancerProfileData {
    _id: string;
}

const getAuthHeaders = () => {
    const authToken = localStorage.getItem('token');
    if (!authToken) throw new Error('Authorization token is missing');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
    };
};


export const postFreelancerProfile = (userId:string,formData: PostFreelancerProfileData) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(userId)}/profile`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...formData,
                category:formData.category,
                pricing: Number(formData.pricing),
                noOfDaysToComplete: Number(formData.noOfDaysToComplete),
            }),
        });

        if (!response.ok) throw new Error(await response.text());

        dispatch(showSuccessSnackbar('Profile posted successfully!'));
    } catch (error) {
        console.error('Error posting profile:', error);
        dispatch(showErrorSnackbar('Failed to post profile. Please try again.'));
    }
};


export const fetchFreelancerProfiles = ()=>async(dispatch: AppDispatch) => {
    try {
        dispatch(fetchFreelancerProfilesStart());
        const freelancerId = localStorage.getItem('userId');
        if (!freelancerId) throw new Error('User ID is missing');

        const response = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(freelancerId)}/profile`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        if (data.profiles && typeof data.profiles === 'object') {
            const profilesArray: FreelancerProfile[] = Object.values(data.profiles);
            // console.log("Remove this : freelancercontroller:"+profilesArray[0].category);
            // console.log("Remove this : freelancercontroller 2:"+profilesArray[0].description);
            dispatch(setFreelancerProfiles(profilesArray));
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        console.error('Error fetching profiles:', error);
        dispatch(fetchFreelancerProfilesFailure('Failed to fetch profiles. Please try again.'));
    }
};

export const fetchFreelancerProfilesByFreelancerId = (freelancerId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchFreelancerProfilesStart());

        const response = await fetch(`http://localhost:5000/api/freelancers/${encodeURIComponent(freelancerId)}/profiles`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        if (data.profiles && Array.isArray(data.profiles)) {
            dispatch(setFreelancerProfiles(data.profiles));
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        console.error('Error fetching profiles:', error);
        dispatch(fetchFreelancerProfilesFailure('Failed to fetch profiles. Please try again.'));
    }
};


export const fetchFreelancerProfileById = (profileId:string)=>async(dispatch: AppDispatch) => {
    try {
        dispatch(fetchFreelancerProfileByIdStart());
        const freelancerId = localStorage.getItem('userId');
        if (!freelancerId) throw new Error('User ID is missing');

        const response = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(freelancerId)}/profile/${profileId}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        if (data.profiles && typeof data.profiles === 'object') {
            dispatch(fetchFreelancerProfileByIdSuccess(data.profiles));
            dispatch(showErrorSnackbar("Profile details fetched sucessfully"))
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error: any) {
        console.error('Error fetching profile by ID:', error);
        const errorMessage = error.message || 'Failed to fetch profile details. Please try again.';
        dispatch(fetchFreelancerProfileByIdFailure(errorMessage));
        dispatch(showErrorSnackbar(errorMessage));
    }
};

export const deleteFreelancerProfileByID =  (profileId: string)=>async(dispatch: AppDispatch) => {
    try {
        const freelancerId = localStorage.getItem('userId');
        if (!freelancerId) throw new Error('User ID is missing');

        const response = await fetch(`http://localhost:5000/api/user/${encodeURIComponent(freelancerId)}/profile/${profileId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error(await response.text());

        dispatch(deleteFreelancerProfile(profileId));
        dispatch(showSuccessSnackbar('Profile deleted successfully!'));
    } catch (error) {
        console.error('Error deleting profile:', error);
        dispatch(showErrorSnackbar('Failed to delete profile. Please try again.'));
    }
};

// Edit proflile
export const editFreelancerProfileById = (updatedProfile: EditFreelancerProfileData) => async (dispatch: AppDispatch) => {
    try {
        const freelancerId = localStorage.getItem('userId');
        if (!freelancerId) throw new Error('User ID is missing');

        const response = await fetch(`http://localhost:5000/api/user/${freelancerId}/profile/${updatedProfile._id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...updatedProfile,
                pricing: Number(updatedProfile.pricing),
                noOfDaysToComplete: Number(updatedProfile.noOfDaysToComplete),
            }),
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        dispatch(editFreelancerProfile(data));
        dispatch(showSuccessSnackbar('Profile updated successfully!'));
    } catch (error) {
        console.error('Error updating profile:', error);
        dispatch(showErrorSnackbar('Failed to update profile. Please try again.'));
    }
};


