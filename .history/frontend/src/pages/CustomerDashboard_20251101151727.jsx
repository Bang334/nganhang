import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  FileText,
  User,
  Building2,
  FilePlus,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';
import '../styles/Dashboard.css';

// Components
import Overview from '../components/customer/Overview';
import Accounts from '../components/customer/Accounts';
import Transactions from '../components/customer/Transactions';
import Savings from '../components/customer/Savings';
import Loans from '../components/customer/Loans';
import LoanApplication from '../components/customer/LoanApplication';
import Transfer from '../components/customer/Transfer';
import Assets from '../components/customer/Assets';
import CreditScore from '../components/customer/CreditScore';
import Profile from '../components/customer/Profile';
import ProfileEditModal from '../components/common/ProfileEditModal';

const CustomerDashboard = ({ user, setUser }) => {
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
    { icon: CreditCard, label: 'Tài khoản', path: 'accounts' },
    { icon: ArrowLeftRight, label: 'Chuyển khoản', path: 'transfer' },
    { icon: FileText, label: 'Giao dịch', path: 'transactions' },
    { icon: PiggyBank, label: 'Tiết kiệm', path: 'savings' },
    { icon: FileText, label: 'Khoản vay', path: 'loans' },
    { icon: FilePlus, label: 'Đăng ký vay', path: 'loan-application' },
    { icon: Building2, label: 'Tài sản', path: 'assets' },
    { icon: TrendingUp, label: 'Điểm tín dụng', path: 'credit-score' },
    { icon: User, label: 'Hồ sơ', path: 'profile' },
  ];

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const currentItem = menuItems.find(item => item.path === path || (path === 'customer' && item.path === ''));
    return currentItem ? currentItem.label : 'Dashboard Khách hàng';
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <CreditCard size={32} />
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
            <div className="user-role">Khách hàng</div>
            <div className="user-code">{user.customerCode}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={`/customer/${item.path}`}
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
            <Route index element={<Overview user={user} />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="transfer" element={<Transfer user={user} />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="savings" element={<Savings />} />
            <Route path="loans" element={<Loans />} />
            <Route path="loan-application" element={<LoanApplication />} />
            <Route path="assets" element={<Assets />} />
            <Route path="credit-score" element={<CreditScore />} />
            <Route path="profile" element={<Profile user={user} />} />
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
        user={{...user, role: 'customer'}}
        onSave={(updatedData) => {
          setUser({...user, ...updatedData});
        }}
      />
    </div>
  );
};

export default CustomerDashboard;

