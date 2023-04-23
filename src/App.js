import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './routes/WelcomeScreen';
import JobFormScreen from './routes/JobFormScreen';
import JobsScreen from './routes/JobsScreen';
import LoginScreen from './routes/LoginScreen';
import SignupScreen from './routes/SignUpScreen';
import JobsMoreInfo from './routes/JobsMoreInfo';
import MyJobsScreen from './routes/MyJobsScreen';

// 1. HomeScreen (simple welcome)
// 2. Post Jobs (form page)
// 3. show all available jobs
function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<WelcomeScreen />} />
        <Route path="/jobform" element={<JobFormScreen />} />
        <Route path="/jobs" element={<JobsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/jobsinfo" element={<JobsMoreInfo />} />
        <Route path="/myjobs" element={<MyJobsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
