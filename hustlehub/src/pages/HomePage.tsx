import './LandingPage.css'; // Add your styles here
import shriyaPhoto from '../images/Shriya.jpg';
import priyaPhoto from '../images/priya.jpg';
import divyaPhoto from '../images/Divya.jpg';
import shivaniPhoto from '../images/Shivani.jpg';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1>{t('landingPage.heroTitle')}</h1>
                    <p>{t('landingPage.heroSubtitle')}</p>
                </div>
            </header>

            {/* Features Section */}
            <section className="features">
                <h2>{t('landingPage.whyChoose')}</h2>
                <div className="features-list">
                    <div className="feature">
                        <h3>{t('landingPage.features.postProjects.title')}</h3>
                        <p>{t('landingPage.features.postProjects.description')}</p>
                    </div>
                    <div className="feature">
                        <h3>{t('landingPage.features.findFreelancers.title')}</h3>
                        <p>{t('landingPage.features.findFreelancers.description')}</p>
                    </div>
                    <div className="feature">
                        <h3>{t('landingPage.features.securePayments.title')}</h3>
                        <p>{t('landingPage.features.securePayments.description')}</p>
                    </div>
                    <div className="feature">
                        <h3>{t('landingPage.features.reviewsFeedback.title')}</h3>
                        <p>{t('landingPage.features.reviewsFeedback.description')}</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>{t('landingPage.testimonialsTitle')}</h2>
                <div className="testimonial">
                    <p>{t('landingPage.testimonials.0.quote')}</p>
                    <p className="author">{t('landingPage.testimonials.0.author')}</p>
                </div>
                <div className="testimonial">
                    <p>{t('landingPage.testimonials.1.quote')}</p>
                    <p className="author">{t('landingPage.testimonials.1.author')}</p>
                </div>
            </section>

            {/* Authors Section */}
            <section className="testimonials-authors">
                <h2>{t('landingPage.authorsTitle')}</h2>
                <div className="authors-list">
                    <div className="author-card">
                        <img
                            src={divyaPhoto}
                            alt={t('landingPage.authors.divya.name')}
                            className="author-photo"
                        />
                        <p className="author-name">{t('landingPage.authors.divya.name')}</p>
                        <p className="author-specialization">{t('landingPage.authors.divya.specialization')}</p>
                    </div>
                    <div className="author-card">
                        <img
                            src={priyaPhoto}
                            alt={t('landingPage.authors.priyanka.name')}
                            className="author-photo"
                        />
                        <p className="author-name">{t('landingPage.authors.priyanka.name')}</p>
                        <p className="author-specialization">{t('landingPage.authors.priyanka.specialization')}</p>
                    </div>
                    <div className="author-card">
                        <img
                            src={shivaniPhoto}
                            alt={t('landingPage.authors.shivani.name')}
                            className="author-photo"
                        />
                        <p className="author-name">{t('landingPage.authors.shivani.name')}</p>
                        <p className="author-specialization">{t('landingPage.authors.shivani.specialization')}</p>
                    </div>
                    <div className="author-card">
                        <img
                            src={shriyaPhoto}
                            alt={t('landingPage.authors.shriya.name')}
                            className="author-photo"
                        />
                        <p className="author-name">{t('landingPage.authors.shriya.name')}</p>
                        <p className="author-specialization">{t('landingPage.authors.shriya.specialization')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
