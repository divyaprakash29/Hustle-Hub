import React from "react";
import { useTranslation } from "react-i18next";
import {
    AccountCircle,
    CheckCircle,
    Group,
    DirectionsRun,
    Payment
} from "@mui/icons-material";
import "./AboutUsPage.css"; // Import the corresponding CSS file

const AboutUsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="about-us-page">
            {/* About Section */}
            <section className="about-section">
                <h1>{t('about_us_title')}</h1>
                <p>{t('about_us_description')}</p>
                <p>{t('about_us_goal')}</p>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <h2><DirectionsRun /> {t('mission_title')}</h2>
                <p>{t('mission_description')}</p>
            </section>

            {/* Our Values Section */}
            <section className="values-section">
                <h2><Group /> {t('values_title')}</h2>
                <p>{t('values_description')}</p>
                <ul>
                    <li><CheckCircle /> <strong>{t('integrity')}</strong></li>
                    <li><CheckCircle /> <strong>{t('collaboration')}</strong></li>
                    <li><CheckCircle /> <strong>{t('innovation')}</strong></li>
                    <li><CheckCircle /> <strong>{t('respect')}</strong></li>
                </ul>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <h2><AccountCircle /> {t('how_it_works_title')}</h2>
                <p>{t('how_it_works_description')}</p>
                <div className="steps">
                    <div className="step">
                        <h3>{t('step_1_title')}</h3>
                        <p>{t('step_1_description')}</p>
                    </div>
                    <div className="step">
                        <h3>{t('step_2_title')}</h3>
                        <p>{t('step_2_description')}</p>
                    </div>
                    <div className="step">
                        <h3>{t('step_3_title')}</h3>
                        <p>{t('step_3_description')}</p>
                    </div>
                    <div className="step">
                        <h3>{t('step_4_title')}</h3>
                        <p>{t('step_4_description')}</p>
                    </div>
                    <div className="step">
                        <h3>{t('step_5_title')}</h3>
                        <p>{t('step_5_description')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
