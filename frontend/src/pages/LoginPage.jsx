import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, CreditCard } from 'lucide-react';
import '../styles/LoginPage.css';

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const navigate = useNavigate();

  // Mock users data
  const mockUsers = {
    customer: {
      id: 1,
      username: 'customer001',
      role: 'CUSTOMER',
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      customerCode: 'CUS0001',
    },
    admin: {
      id: 2,
      username: 'admin',
      role: 'ADMIN',
      fullName: 'Admin User',
      email: 'admin@bank.com',
    },
    teller: {
      id: 3,
      username: 'teller',
      role: 'TELLER',
      fullName: 'Nguyễn Giao Dịch',
      email: 'teller@bank.com',
    },
    loanofficer: {
      id: 4,
      username: 'loanofficer',
      role: 'LOAN_OFFICER',
      fullName: 'Trần Tín Dụng',
      email: 'loanofficer@bank.com',
    },
  };

  const navigateToRole = (user) => {
    setUser(user);
    
    // Navigate based on role
    switch (user.role) {
      case 'CUSTOMER':
        navigate('/customer');
        break;
      case 'ADMIN':
        navigate('/admin');
        break;
      case 'TELLER':
        navigate('/teller');
        break;
      case 'LOAN_OFFICER':
        navigate('/loan-officer');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const selectedUser = mockUsers[username.toLowerCase()] || mockUsers[role.toLowerCase()];
    
    if (selectedUser) {
      navigateToRole(selectedUser);
    }
  };

  // Quick login for demo accounts
  const quickLogin = (accountType) => {
    const user = mockUsers[accountType];
    if (user) {
      navigateToRole(user);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <CreditCard size={48} className="login-icon" />
          <h1>ABC Banking System</h1>
          <p>Hệ Thống Quản Lý Ngân Hàng</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="CUSTOMER">Khách hàng</option>
              <option value="TELLER">Nhân viên Giao dịch</option>
              <option value="LOAN_OFFICER">Nhân viên Tín dụng</option>
              <option value="ADMIN">Quản trị viên</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            <LogIn size={20} />
            Đăng nhập
          </button>
        </form>

        <div className="login-footer">
          <div className="demo-accounts">
            <p className="text-secondary text-sm mb-2"><strong>Demo Accounts (Click để đăng nhập):</strong></p>
            <div className="demo-list">
              <div className="demo-item clickable" onClick={() => quickLogin('customer')}>
                <span className="badge badge-info">customer</span>
                <span className="text-xs text-secondary">Khách hàng</span>
              </div>
              <div className="demo-item clickable" onClick={() => quickLogin('teller')}>
                <span className="badge badge-success">teller</span>
                <span className="text-xs text-secondary">Giao dịch viên</span>
              </div>
              <div className="demo-item clickable" onClick={() => quickLogin('loanofficer')}>
                <span className="badge badge-warning">loanofficer</span>
                <span className="text-xs text-secondary">Nhân viên Tín dụng</span>
              </div>
              <div className="demo-item clickable" onClick={() => quickLogin('admin')}>
                <span className="badge badge-danger">admin</span>
                <span className="text-xs text-secondary">Quản trị viên</span>
              </div>
            </div>
            <p className="text-xs text-secondary mt-2">👆 Click vào bất kỳ tài khoản để đăng nhập nhanh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

