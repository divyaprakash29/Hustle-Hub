import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the AuthState interface
interface AuthState {
    id: string;
    name: string;
    email: string;
    role: string;
    token?: string; // Optional token for authenticated requests
}

// Initial state for authentication
const initialState: AuthState = {
    id: '',
    name: '',
    email: '',
    role: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => action.payload,
        logout: () => initialState, // Reset state on logout
    },

});

// Export the actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
