import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  UserPlus,
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import '../styles/Dashboard.css';

// Components
import Overview from '../components/teller/Overview';
import NewAccount from '../components/teller/NewAccount';
import Deposit from '../components/teller/Deposit';
import Withdraw from '../components/teller/Withdraw';
import CardActivation from '../components/teller/CardActivation';
import ProfileEditModal from '../components/common/ProfileEditModal';

const TellerDashboard = ({ user, setUser }) => {
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
    { icon: UserPlus, label: 'Mở tài khoản', path: 'new-account' },
    { icon: ArrowDownCircle, label: 'Nạp tiền', path: 'deposit' },
    { icon: ArrowUpCircle, label: 'Rút tiền', path: 'withdraw' },
    { icon: CreditCard, label: 'Kích hoạt thẻ', path: 'card-activation' },
  ];

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const currentItem = menuItems.find(item => item.path === path || (path === 'teller' && item.path === ''));
    return currentItem ? currentItem.label : 'Dashboard Giao dịch viên';
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
            <div className="user-role">Nhân viên Giao dịch</div>
            <div className="user-code">{user.employeeCode}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={`/teller/${item.path}`}
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
            <Route path="new-account" element={<NewAccount />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="card-activation" element={<CardActivation />} />
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
        user={{...user, role: 'teller'}}
        onSave={(updatedData) => {
          setUser({...user, ...updatedData});
        }}
      />
    </div>
  );
};

export default TellerDashboard;
