import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from 'react-router';
import Login from "./pages/Login.tsx"
import Signup from "./pages/Signup.tsx"
import RootLayout from './layout/RootLayout.tsx';
import About from './pages/About.tsx';
import Service from './pages/Service.tsx';
import Dashboard from './pages/Users/Dashboard.tsx';
import Layout from './pages/Users/Layout.tsx';
import Profile from './pages/Users/Profile.tsx';
import EmissionCalculator from './pages/Users/EmissionCalculator.tsx';
import OAuthSuccess from './pages/OAuthSuccess.tsx';
import OAuthFailure from './pages/OAuthFailure.tsx';
import Contact from './pages/Contact.tsx';
import Analytics from './pages/Users/Analytics.tsx';
import Goals from './pages/Users/Goals.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* Page Routes */}
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<App />} />
        <Route path="/about" element= {<About/>}/>
        <Route path="/service" element= {<Service/>}/>
        <Route path="/contact" element= {<Contact/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/signup" element= {<Signup/>}/>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="emissionCalculator" element={<EmissionCalculator />} />
          <Route path="goals" element={<Goals />} />
        </Route>
        <Route path="/oauth/success" element={<OAuthSuccess/>}/>
        <Route path="/oauth/failure" element={<OAuthFailure/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
