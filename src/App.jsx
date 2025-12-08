import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider, useUser } from './context/UserContext'

// Auth Pages
import { Login } from './auth/Login'
import { RoleDetector } from './auth/RoleDetector'
import { LandingPage } from './pages/LandingPage'

// Client Pages
import ClientDashboard from './roles/client/pages/Dashboard'
import PostJob from './roles/client/pages/PostJob'
import ClientProjects from './roles/client/pages/Projects'
import ClientJobs from './roles/client/pages/ClientJobs'
import ClientProfile from './roles/client/pages/Profile'
import ClientNotifications from './roles/client/pages/Notifications'
import ClientMessages from './roles/client/pages/Messages'
import JobDetails from './roles/client/pages/JobDetails'
import ClientSettings from './roles/client/pages/Settings'

// Freelancer Pages
import FreelancerDashboard from './roles/freelancer/pages/Dashboard'
import FreelancerMyJobs from './roles/freelancer/pages/MyJobs'
import FreelancerBrowseJobs from './roles/freelancer/pages/BrowseJobs'
import FreelancerProfile from './roles/freelancer/pages/Profile'
import FreelancerSettings from './roles/freelancer/pages/Settings'
import FreelancerNotifications from './roles/freelancer/pages/Notifications'
import FreelancerJobDetails from './roles/freelancer/pages/JobDetails'
import FreelancerMessages from './roles/freelancer/pages/Messages'
import FreelancerEarnings from './roles/freelancer/pages/Earnings'

// Admin Pages
import { AdminDashboard } from './roles/admin/pages/Dashboard'
import { ManageUsers } from './roles/admin/pages/ManageUsers'
import { ManageJobs } from './roles/admin/pages/ManageJobs'
import { Reports } from './roles/admin/pages/Reports'
import { Settings as AdminSettings } from './roles/admin/pages/Settings'

// Protected Route Component
// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated, isLoading } = useUser();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to the dashboard corresponding to their actual role
    if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (currentUser.role === 'client') return <Navigate to="/client/dashboard" replace />;
    if (currentUser.role === 'freelancer') return <Navigate to="/freelancer/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-select" element={<RoleDetector />} />

          {/* Client Routes */}
          <Route path="/client/*" element={
            <ProtectedRoute allowedRoles={['client']}>
                <Routes>
                <Route path="dashboard" element={<ClientDashboard />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="jobs" element={<ClientJobs />} />
                <Route path="projects" element={<ClientProjects />} />
                <Route path="profile" element={<ClientProfile />} />
                <Route path="notifications" element={<ClientNotifications />} />
                <Route path="messages" element={<ClientMessages />} />
                <Route path="job/:id" element={<JobDetails />} />
                <Route path="settings" element={<ClientSettings />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Freelancer Routes */}
          <Route path="/freelancer/*" element={
            <ProtectedRoute allowedRoles={['freelancer']}>
              <Routes>

                <Route path="dashboard" element={<FreelancerDashboard />} />
                <Route path="earnings" element={<FreelancerEarnings />} />
                <Route path="my-jobs" element={<FreelancerMyJobs />} />
                <Route path="browse-jobs" element={<FreelancerBrowseJobs />} />
                <Route path="profile" element={<FreelancerProfile />} />
                <Route path="settings" element={<FreelancerSettings />} />
                <Route path="notifications" element={<FreelancerNotifications />} />
                <Route path="messages" element={<FreelancerMessages />} />
                <Route path="job/:id" element={<FreelancerJobDetails />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="jobs" element={<ManageJobs />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
