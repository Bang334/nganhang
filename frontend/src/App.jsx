import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TellerDashboard from './pages/TellerDashboard';
import LoanOfficerDashboard from './pages/LoanOfficerDashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route 
          path="/customer/*" 
          element={user?.role === 'CUSTOMER' ? <CustomerDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/*" 
          element={user?.role === 'ADMIN' ? <AdminDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/teller/*" 
          element={user?.role === 'TELLER' ? <TellerDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/loan-officer/*" 
          element={user?.role === 'LOAN_OFFICER' ? <LoanOfficerDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

