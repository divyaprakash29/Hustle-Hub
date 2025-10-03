import React from "react";
import { useTranslation } from "react-i18next";
import "./PrivatePolicyPage.css"; // Import the corresponding CSS file

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="privacy-policy-page">
            <section className="privacy-policy-section">
                <h1>{t('privacy_policy_title')}</h1>
                <p>{t('privacy_policy_intro')}</p>

                <h2>{t('section_1_title')}</h2>
                <p>{t('section_1_description')}</p>
                <ul>
                    <li><strong>{t('personal_information_title')}</strong>: {t('personal_information_description')}</li>
                    <li><strong>{t('usage_information_title')}</strong>: {t('usage_information_description')}</li>
                    <li><strong>{t('transaction_information_title')}</strong>: {t('transaction_information_description')}</li>
                </ul>

                <h2>{t('section_2_title')}</h2>
                <p>{t('section_2_description')}</p>
                <ul>
                    <li>{t('use_1')}</li>
                    <li>{t('use_2')}</li>
                    <li>{t('use_3')}</li>
                    <li>{t('use_4')}</li>
                    <li>{t('use_5')}</li>
                </ul>

                <h2>{t('section_3_title')}</h2>
                <p>{t('section_3_description')}</p>
                <ul>
                    <li><strong>{t('service_providers_title')}</strong>: {t('service_providers_description')}</li>
                    <li><strong>{t('legal_requirements_title')}</strong>: {t('legal_requirements_description')}</li>
                    <li><strong>{t('business_transfers_title')}</strong>: {t('business_transfers_description')}</li>
                </ul>

                <h2>{t('section_4_title')}</h2>
                <p>{t('section_4_description')}</p>

                <h2>{t('section_5_title')}</h2>
                <p>{t('section_5_description')}</p>
                <ul>
                    <li><strong>{t('access_right')}</strong>: {t('access_right_description')}</li>
                    <li><strong>{t('correction_right')}</strong>: {t('correction_right_description')}</li>
                    <li><strong>{t('deletion_right')}</strong>: {t('deletion_right_description')}</li>
                    <li><strong>{t('opt_out_right')}</strong>: {t('opt_out_right_description')}</li>
                </ul>

                <h2>{t('section_6_title')}</h2>
                <p>{t('section_6_description')}</p>

                <h2>{t('section_7_title')}</h2>
                <p>{t('section_7_description')}</p>

                <h2>{t('section_8_title')}</h2>
                <p>{t('section_8_description')}</p>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
