import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/app-layout';
import LandingPage from './pages/landing_page';
import Onboarding from './pages/onboarding';
import Joblisting from './pages/job-listing';
import JobPage from './pages/job';
import PostJob from './pages/post_job';
import SavedJob from './pages/saved_job';
import MyJob from './pages/my_job';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter ([
  {
    element: <AppLayout  />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/onboarding',
        element:
        <ProtectedRoute>
        <Onboarding />
        </ProtectedRoute>
      },
      {
        path: '/jobs',
        element: 
        <ProtectedRoute>
          <Joblisting />
        </ProtectedRoute>
      },
      {
        path: '/job/:id',
        element:
        <ProtectedRoute>
           <JobPage />
        </ProtectedRoute>
      },
      {
        path: '/post-job',
        element: 
       <ProtectedRoute>
        <PostJob />
       </ProtectedRoute>

      },
      {
        path: '/saved-jobs',
        element: 
        <ProtectedRoute>
          <SavedJob/>
        </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element: 
        <ProtectedRoute>
          <MyJob />
        </ProtectedRoute>
      }

    ]
  }
])



function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <RouterProvider router={router} />
    </ThemeProvider>
   
  )
}

export default App
