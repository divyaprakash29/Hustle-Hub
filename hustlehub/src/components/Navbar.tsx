import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../reducers/authReducer';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../pages/LanguageSelector';

const Navbar: React.FC = () => {
    const { t } = useTranslation(); // Access translations
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id: userId } = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!userId;

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/');
    };
    const handleButtonClick = () => {
        navigate("/login");
        window.location.reload(); // Force reload the new page
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {t('welcome')}
                </Typography>
                <LanguageSelector />
                <Button color="inherit" component={Link} to="/">
                    {t('home')}
                </Button>
                {isLoggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        {t('logout')}
                    </Button>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleButtonClick}>
                            {t('login')}
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            {t('register')}
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
