import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectListing from "../components/ProjectListing";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

export default function Home() {
    const { t } = useTranslation(); // Initialize translation hook
    const navigate = useNavigate();

    return (
        <>
            <Button
                onClick={() => navigate('/post-project')}
                variant="contained"
                color="primary"
                size="large"
            >
                {t('postProject')} {/* Use translation key here */}
            </Button>
            <ProjectListing />
        </>
    );
}
