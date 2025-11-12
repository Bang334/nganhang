import { useState } from 'react';
import { Search, DollarSign, User, CreditCard, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency, getAccountDetailsByNumber } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Deposit = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  
  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterAccount, setFilterAccount] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (!accountNumber) return;

    const details = getAccountDetailsByNumber(accountNumber);

    if (!details) {
      alert('Không tìm thấy tài khoản. Chế độ demo sẽ hiển thị dữ liệu mẫu để bạn đối chiếu.');
      setCustomerInfo({
        accountNumber: accountNumber || 'DEMO123456',
        customerName: 'Nguyễn Văn A',
        customerCode: 'KH001234',
        balance: 15000000,
        accountType: 'Tài khoản thanh toán',
        branchName: 'Chi nhánh Hà Nội',
        idCard: '001234567890',
      });
      return;
    }

    setCustomerInfo({
      accountNumber: details.accountNumber,
      customerName: details.ownerName,
      customerCode: details.ownerCode,
      balance: details.balance,
      accountType: details.accountTypeName,
      branchName: details.branchName,
      idCard: details.ownerIdCard,
    });
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    
    if (!customerInfo || !amount) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newBalance = customerInfo.balance + parseInt(amount);
    
    alert(
      `✅ Nạp tiền thành công!\n\n` +
        `Số tài khoản: ${customerInfo.accountNumber}\n` +
        `Khách hàng: ${customerInfo.customerName}\n` +
        `Số tiền nạp: ${formatCurrency(parseInt(amount))}\n` +
        `Số dư cũ: ${formatCurrency(customerInfo.balance)}\n` +
        `Số dư mới: ${formatCurrency(newBalance)}\n` +
        `Ghi chú: ${note || 'Không có'}\n\n` +
        `Giao dịch đã được ghi nhận.`
    );

    // Reset form
    setAccountNumber('');
    setCustomerInfo(null);
    setAmount('');
    setNote('');
  };

  return (
    <div className="fade-in">
      <div className="teller-grid-2">
        {/* Search Account Card */}
        <div className="teller-card">
          <div className="teller-card-header blue">
            <h3>
              <Search size={20} />
              Tìm kiếm tài khoản
            </h3>
          </div>
          <form onSubmit={handleSearch} className="teller-card-body">
            <div className="teller-form-group">
              <label className="teller-form-label">
                <CreditCard size={16} style={{color: '#4299e1'}} />
                Số tài khoản
              </label>
              <div style={{display: 'flex', gap: '0.75rem'}}>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="teller-form-input"
                  placeholder="Nhập số tài khoản"
                  required
                  style={{flex: 1}}
                />
                <button type="submit" className="teller-btn teller-btn-search">
                  <Search size={16} /> Tìm
                </button>
              </div>
            </div>

            {customerInfo && (
              <div className="customer-info-display">
                <h4>
                  <User size={16} />
                  Thông tin khách hàng
                </h4>
                <div className="customer-info-item">
                  <span className="label">Mã KH:</span>
                  <span className="value">{customerInfo.customerCode}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Họ tên:</span>
                  <span className="value">{customerInfo.customerName}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">CCCD/CMND:</span>
                  <span className="value" style={{fontWeight: 600}}>{customerInfo.idCard}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Loại TK:</span>
                  <span className="value">{customerInfo.accountType}</span>
                </div>
                {customerInfo.branchName && (
                  <div className="customer-info-item">
                    <span className="label">Chi nhánh mở:</span>
                    <span className="value">{customerInfo.branchName}</span>
                  </div>
                )}
                <div className="customer-info-item">
                  <span className="label">Số dư hiện tại:</span>
                  <span className="value" style={{color: '#4299e1'}}>
                    {formatCurrency(customerInfo.balance)}
                  </span>
                </div>
                <div className="teller-alert info" style={{marginTop: '1rem'}}>
                  <User size={16} />
                  <div>
                    <div style={{fontWeight: 600}}>Đối chiếu CCCD tại quầy</div>
                    <div style={{fontSize: '0.875rem'}}>Yêu cầu khách hàng xuất trình CCCD và so sánh với mã {customerInfo.idCard} trước khi thực hiện giao dịch.</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Deposit Form Card */}
        <div className="teller-card">
          <div className="teller-card-header green">
            <h3>
              <DollarSign size={20} />
              Thông tin nạp tiền
            </h3>
          </div>
          <form onSubmit={handleDeposit} className="teller-card-body">
            <div className="teller-form-group">
              <label className="teller-form-label">
                <DollarSign size={16} style={{color: '#48bb78'}} />
                Số tiền nạp (VND)
                <span className="required">*</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="teller-form-input"
                placeholder="Nhập số tiền cần nạp"
                min="10000"
                disabled={!customerInfo}
                required
              />
              <div className="teller-form-helper">Số tiền tối thiểu: 10,000 VND</div>
            </div>

            <div className="teller-form-group">
              <label className="teller-form-label">Ghi chú</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="teller-form-textarea"
                placeholder="Nhập ghi chú (nếu có)"
                disabled={!customerInfo}
              />
            </div>

            {amount && customerInfo && (
              <div className="transaction-summary">
                <div className="summary-row">
                  <span>Số dư hiện tại:</span>
                  <span>{formatCurrency(customerInfo.balance)}</span>
                </div>
                <div className="summary-row">
                  <span>Số tiền nạp:</span>
                  <span style={{color: '#48bb78'}}>
                    +{formatCurrency(parseInt(amount))}
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Số dư sau giao dịch:</span>
                  <span style={{color: '#48bb78'}}>
                    {formatCurrency(customerInfo.balance + parseInt(amount))}
                  </span>
                </div>
              </div>
            )}

            <div className="teller-actions">
              <button type="submit" className="teller-btn teller-btn-success" disabled={!customerInfo}>
                Xác nhận nạp tiền
              </button>
              <button
                type="button"
                className="teller-btn teller-btn-secondary"
                onClick={() => {
                  setAmount('');
                  setNote('');
                }}
              >
                Làm mới
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transaction History - Enhanced Table */}
      <div className="teller-card" style={{marginTop: '1.5rem'}}>
        <div className="teller-card-header purple">
          <h3>
            <TrendingUp size={20} />
            Lịch sử nạp tiền gần đây
          </h3>
        </div>
        
        {/* Filter Section */}
        <div style={{
          padding: '1.25rem',
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
          borderBottom: '2px solid #d8b4fe'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b21a8',
                marginBottom: '0.5rem'
              }}>
                🔍 Tìm theo tên
              </label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '2px solid #d8b4fe',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#9333ea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d8b4fe';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b21a8',
                marginBottom: '0.5rem'
              }}>
                💳 Số tài khoản
              </label>
              <input
                type="text"
                placeholder="Nhập số TK..."
                value={filterAccount}
                onChange={(e) => setFilterAccount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '2px solid #d8b4fe',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#9333ea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d8b4fe';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b21a8',
                marginBottom: '0.5rem'
              }}>
                📅 Ngày giao dịch
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '2px solid #d8b4fe',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#9333ea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d8b4fe';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {(filterName || filterAccount || filterDate) && (
              <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <button
                  onClick={() => {
                    setFilterName('');
                    setFilterAccount('');
                    setFilterDate('');
                  }}
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'white',
                    border: '2px solid #d8b4fe',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#9333ea',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f3e8ff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                  }}
                >
                  ✕ Xóa lọc
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="teller-card-body" style={{padding: 0, overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)'}}>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  <Clock size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Thời gian
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  <CreditCard size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số tài khoản
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  <User size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Khách hàng
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'right',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  <DollarSign size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số tiền
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  Ghi chú
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#6b21a8',
                  borderBottom: '2px solid #d8b4fe'
                }}>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#166534'}}>
                  10:30 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#059669'}}>
                    1234567890
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#166534'}}>Nguyễn Văn A</div>
                  <div style={{fontSize: '0.75rem', color: '#15803d'}}>KH001234</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#10b981'}}>
                    +{formatCurrency(5000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#15803d'}}>
                  📝 Nạp tiền mặt
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Thành công
                  </span>
                </td>
              </tr>
              
              <tr style={{
                background: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#1e40af'}}>
                  09:15 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#2563eb'}}>
                    9876543210
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#1e40af'}}>Trần Thị B</div>
                  <div style={{fontSize: '0.75rem', color: '#3b82f6'}}>KH001235</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#3b82f6'}}>
                    +{formatCurrency(3000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#1e3a8a'}}>
                  💰 Nạp tiền lương
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Thành công
                  </span>
                </td>
              </tr>
              
              <tr style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#92400e'}}>
                  08:45 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#d97706'}}>
                    5555555555
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#92400e'}}>Lê Văn C</div>
                  <div style={{fontSize: '0.75rem', color: '#78350f'}}>KH001236</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#f59e0b'}}>
                    +{formatCurrency(10000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#78350f'}}>
                  💵 Giao dịch lớn
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Thành công
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
