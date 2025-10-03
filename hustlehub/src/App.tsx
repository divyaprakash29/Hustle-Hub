import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostProjectForm from './components/PostProjectForm';
import PostBid from './pages/postBid';
import ListAllBids from './pages/listAllBids';
import ContractDetails from './pages/contractDetails';
import RetrieveFreelancerBids from './pages/retrieveFreelancerBids';
import { Container } from '@mui/material';
import SignUp from './pages/SignUpForm';
import Login from './pages/LoginForm';
import HomePage from './pages/HomePage';
import HomeAdmin from './pages/HomeAdminPage';
import HomeClient from './pages/HomeClientPage';
import HomeFreelancer from './pages/HomeFreelancerPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ContactForm from './pages/ContactUsForm';
import store from './store';
import { Provider } from 'react-redux';
import EditProjectForm from './components/EditProject';
import ProjectDetail from './components/ProjectDetail';
import PostFreelancerProfileForm from './components/PostFreelancerProfileForm';
import ProfileList from './components/FreelancerProfileListing';
import EditFreelancerProfile from './components/EditFreelancerProfile';
import FreelancerDetail from './components/FreelancerDetail';
import ProjectDetailFreelancer from './components/ProjectDetailFreelancer';
import AboutUsPage from './pages/AboutUsPage';
import PrivatePolicyPage from './pages/PrivatePolicyPage';
import PaymentForm from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PostReviewForm from './components/PostReviewForm';
import ReviewListing from './components/ReviewListing';
import EditReview from './components/EditReview';
import FreelancerProfilesByFreelancerId from './components/FreelancerProfileByFreelancerId';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;
const stripePromise = loadStripe(stripePublicKey);

function App() {
  const categories = ['Web Development', 'Design', 'AI/ML', 'Content Writing', 'Other'];
  const roles = ['client', 'freelancer', 'admin'];
  const initialData = {
    title: ' Develop a Collaborative Team Management Web App',
    description: 'We need a skilled full-stack developer to create a team management web application to improve collaboration and task tracking. The app should include features like task assignment, progress tracking, a shared calendar, and a messaging system. The project requires integration with Google Calendar and Slack for seamless workflows. The front-end should be built using React or Vue.js, and the back-end should use Node.js and MongoDB. Deliverables include a fully functional app, documentation, and a user guide.',
    budget: '2500',
    daysToComplete: '25',
    deadline: '2024-12-15',
    tags: ['Team Collaboration', 'React', 'Node.js', 'MongoDB', 'API Integration'],
    category: 'Web Development',
  };

  const initialReviewData = {
    rating: 4,
    comments : 'Great Work!',
    clientId: '',
    freelancerId: '',
  }

  
  

  const initialProfileData = {
    description: 'Full-stack developer with over 5 years of experience building scalable and efficient web solutions. Proficient in technologies like Node.js, Express.js, MongoDB, React, and Vue.js. Skilled in developing RESTful APIs, integrating third-party services, and ensuring optimal performance for web applications. Passionate about writing clean, maintainable code and collaborating with clients to deliver exceptional results',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Vue.js','JavaScript', 'API Integration', 'RESTful API'],
    category: 'Web Development',
    pricing: '2000',
    noOfDaysToComplete: '15',
    previousCompanies: ['CodeCraft Solutions', 'Webify Systems'],
    portfolio: 'https://www.freelancerportfolio.com/codewhizkevin',
  };

  const initialRegisterData = {
    fullName: 'Lisa Doe',
    email: 'lisa@gmail.com',
    password: '12341234',
    role: 'admin',
  };

  const initialLoginData = {
    email: 'lisa@gmail.com',
    password: '12341234',
  };

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ minHeight: '80vh', marginTop: 2 }}>
          <Routes>
            <Route
              path="/post-project"
              element={
                <PostProjectForm
                  initialData={initialData}
                  categories={categories}
                />
              }
            />
            <Route path="/post-review/:freelancerId" 
            element={
              <PostReviewForm
              initialData={initialReviewData}
              categories={categories}
               />
             } 
             />

            <Route
              path="/register"
              element={<SignUp initialData={initialRegisterData} roles={roles} />}
            />
            <Route
              path="/post-profile/:userId"
              element={
                <PostFreelancerProfileForm
                  initialData={initialProfileData}
                  categories={categories}
                />
              }
            />
            <Route
              path="/login"
              element={<Login initialData={initialLoginData} />}
            />
            <Route
              path="/HomeAdmin"
              element={
                <AuthenticatedRoute requiredRole="admin">
                  <HomeAdmin />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/HomeClient"
              element={
                <AuthenticatedRoute requiredRole="client">
                  <HomeClient />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/HomeFreelancer"
              element={
                <AuthenticatedRoute requiredRole="freelancer">
                  <HomeFreelancer />
                </AuthenticatedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/ContactUs" element={<ContactForm />} />
            <Route path="/postbid/:projectId" element={<PostBid />} />
            <Route path="/bids/projects/:projectId" element={<ListAllBids />} />
            <Route path="/contractDetails" element={<ContractDetails />} />
            <Route
              path="/edit-project/:projectId"
              element={
                <EditProjectForm
                  categories={categories}
                />
              }
            />
            <Route path="/view-project/:projectId" element={<ProjectDetail />} />

            <Route
              path="/edit-review/:reviewId"
              element={
                <EditReview
                  categories={categories}
                />
              }
            />
           

            <Route
              path="/view-project-freelancer/:projectId"
              element={<ProjectDetailFreelancer />}
            />
            <Route path="/profile-list" element={<ProfileList />} />
            <Route
              path="/view-profile/:profileId"
              element={<FreelancerDetail />}
            />
            <Route
              path="/edit-profile/:profileId"
              element={
                <EditFreelancerProfile categories={categories} />
              }
            />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/privacy" element={<PrivatePolicyPage />} />
            <Route
              path="/payment/:id"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              }
            />
            <Route path="/retrieve-freelancer-bids" element={<RetrieveFreelancerBids />} />
            <Route path="/freelancer-profiles/:freelancerId" element={<FreelancerProfilesByFreelancerId />} />


          </Routes>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );

}

export default App;
