import React from 'react';
import { Navigate } from 'react-router-dom';

// Define Props Type
type AuthenticatedRouteProps = {
    children: React.ReactNode;
    requiredRole?: string; 
};

/**
 * AuthenticatedRoute Component
 * 
 * Protects routes by ensuring the user is authenticated and optionally checks for a required role.
 * - Redirects to "/login" if no token is found.
 * - Redirects to "/unauthorized" if the user's role doesn't match `requiredRole`.
 * - Renders `children` if authentication and role checks pass.
 *
 * Props:
 * - `children`: Protected content to render.
 * - `requiredRole`: Optional role required to access the route.
 */
const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token'); // Retrieve the token
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse user info from localStorage

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }
    return <>{children}</>;
};

export default AuthenticatedRoute;
