import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                textAlign: 'center',
                py: 1,
                px: 3,
                position: 'relative',
                bottom: 0,
            }}
        >
            <Typography variant="body2" sx={{ mb: 1, color: 'white' }}>
                {t('footer.copyright', { year })}
            </Typography>
            <Box>
                <Link
                    href="/about"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                >
                    {t('footer.links.about')}
                </Link>
                <Link
                    href="/privacy"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                >
                    {t('footer.links.privacy')}
                </Link>
                <Link
                    href="/ContactUs"
                    color="inherit"
                    underline="hover"
                    sx={{ mx: 1 }}
                >
                    {t('footer.links.contact')}
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
