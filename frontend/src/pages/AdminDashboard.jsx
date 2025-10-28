import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Building2,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import '../styles/Dashboard.css';

// Components
import Overview from '../components/admin/Overview';
import BranchManagement from '../components/admin/BranchManagement';
import EmployeeManagement from '../components/admin/EmployeeManagement';
import Reports from '../components/admin/Reports';
import ProfileEditModal from '../components/common/ProfileEditModal';

const AdminDashboard = ({ user, setUser }) => {
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
    { icon: Building2, label: 'Quản lý chi nhánh', path: 'branches' },
    { icon: Users, label: 'Quản lý nhân viên', path: 'employees' },
    { icon: FileText, label: 'Báo cáo', path: 'reports' },
  ];

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const currentItem = menuItems.find(item => item.path === path || (path === 'admin' && item.path === ''));
    return currentItem ? currentItem.label : 'Dashboard Quản trị';
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Building2 size={32} />
          <h2>ABC Bank Admin</h2>
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
            <div className="user-role">Quản trị viên</div>
            <div className="user-code">{user.username}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={`/admin/${item.path}`}
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
            <Route path="branches" element={<BranchManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="reports" element={<Reports />} />
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
        user={{...user, role: 'admin', employeeCode: user.username}}
        onSave={(updatedData) => {
          setUser({...user, ...updatedData});
        }}
      />
    </div>
  );
};

export default AdminDashboard;
