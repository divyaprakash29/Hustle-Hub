import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import projectReducer from './reducers/projectReducer';
import freelancerReducer from './reducers/freelancerReducer';
import authReducer from './reducers/authReducer'; 
import reviewReducer from './reducers/reviewReducer';

interface AuthState {
    id: string;
    name: string;
    email: string;
    role: string;
}

const initialAuthState: AuthState = {
    id: '',
    name: '',
    email: '',
    role: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => action.payload,
        logout: () => initialAuthState,
    },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
    reducer: {
        project: projectReducer,
        freelancerprofile: freelancerReducer,
        auth: authSlice.reducer,
        review: reviewReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
