import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';
import '../styles/Dashboard.css';

// Components
import Overview from '../components/loanOfficer/Overview';
import PendingLoans from '../components/loanOfficer/PendingLoans';
import ApprovedLoans from '../components/loanOfficer/ApprovedLoans';
import RejectedLoans from '../components/loanOfficer/RejectedLoans';
import OverdueLoans from '../components/loanOfficer/OverdueLoans';
import CollateralVerification from '../components/loanOfficer/CollateralVerification';
import CreditScoreManagement from '../components/loanOfficer/CreditScoreManagement';
import ProfileEditModal from '../components/common/ProfileEditModal';

const LoanOfficerDashboard = ({ user, setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Tổng quan', path: '' },
    { icon: FileText, label: 'Hồ sơ chờ duyệt', path: 'pending' },
    { icon: CheckCircle, label: 'Hồ sơ đã duyệt', path: 'approved' },
    { icon: XCircle, label: 'Hồ sơ từ chối', path: 'rejected' },
    { icon: AlertCircle, label: 'Nợ quá hạn', path: 'overdue' },
    { icon: Building2, label: 'Xét duyệt tài sản', path: 'collateral-verification' },
    { icon: TrendingUp, label: 'Quản lý điểm tín dụng', path: 'credit-score-management' },
  ];

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const currentItem = menuItems.find(item => item.path === path || (path === 'loan-officer' && item.path === ''));
    return currentItem ? currentItem.label : 'Dashboard Nhân viên Tín dụng';
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <FileText size={32} />
          <h2>ABC Bank</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="user-info" onClick={() => setShowProfileModal(true)} style={{cursor: 'pointer'}}>
          <div className="user-avatar">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="user-name">{user.fullName}</div>
            <div className="user-role">Nhân viên Tín dụng</div>
            <div className="user-code">{user.employeeCode}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={`/loan-officer/${item.path}`}
              className="nav-item"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1>{getCurrentPageTitle()}</h1>
            <div className="topbar-actions">
              <span className="text-sm text-secondary">
                {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
        </header>

        <main className="content">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="pending" element={<PendingLoans />} />
            <Route path="approved" element={<ApprovedLoans />} />
            <Route path="rejected" element={<RejectedLoans />} />
            <Route path="overdue" element={<OverdueLoans />} />
            <Route path="collateral-verification" element={<CollateralVerification />} />
          </Routes>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={{...user, role: 'loan_officer'}}
        onSave={(updatedData) => {
          setUser({...user, ...updatedData});
        }}
      />
    </div>
  );
};

export default LoanOfficerDashboard;
