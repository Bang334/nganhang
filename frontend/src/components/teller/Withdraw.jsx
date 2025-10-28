import { useState } from 'react';
import { Search, DollarSign, User, CreditCard, AlertCircle, CheckCircle, Clock, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Withdraw = () => {
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
    
    // Giả lập tìm kiếm khách hàng
    if (accountNumber) {
      setCustomerInfo({
        accountNumber: accountNumber,
        customerName: 'Trần Thị B',
        customerCode: 'KH005678',
        balance: 25000000,
        accountType: 'Tài khoản thanh toán',
        dailyLimit: 50000000,
        withdrawnToday: 5000000,
      });
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    
    if (!customerInfo || !amount) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const withdrawAmount = parseInt(amount);
    const remainingLimit = customerInfo.dailyLimit - customerInfo.withdrawnToday;

    if (withdrawAmount > customerInfo.balance) {
      alert('❌ Số dư không đủ để thực hiện giao dịch!');
      return;
    }

    if (withdrawAmount > remainingLimit) {
      alert(`❌ Vượt quá hạn mức rút tiền trong ngày!\nHạn mức còn lại: ${formatCurrency(remainingLimit)}`);
      return;
    }

    const newBalance = customerInfo.balance - withdrawAmount;
    
    alert(
      `✅ Rút tiền thành công!\n\n` +
        `Số tài khoản: ${customerInfo.accountNumber}\n` +
        `Khách hàng: ${customerInfo.customerName}\n` +
        `Số tiền rút: ${formatCurrency(withdrawAmount)}\n` +
        `Số dư cũ: ${formatCurrency(customerInfo.balance)}\n` +
        `Số dư mới: ${formatCurrency(newBalance)}\n` +
        `Ghi chú: ${note || 'Không có'}\n\n` +
        `Vui lòng chuẩn bị ${formatCurrency(withdrawAmount)} để trao cho khách hàng.`
    );

    // Reset form
    setAccountNumber('');
    setCustomerInfo(null);
    setAmount('');
    setNote('');
  };

  const remainingLimit = customerInfo 
    ? customerInfo.dailyLimit - customerInfo.withdrawnToday 
    : 0;

  const isOverLimit = amount && customerInfo && parseInt(amount) > remainingLimit;
  const isOverBalance = amount && customerInfo && parseInt(amount) > customerInfo.balance;

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
                  <span className="label">Loại TK:</span>
                  <span className="value">{customerInfo.accountType}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Số dư hiện tại:</span>
                  <span className="value" style={{color: '#4299e1'}}>
                    {formatCurrency(customerInfo.balance)}
                  </span>
                </div>
                <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0'}}>
                  <div className="customer-info-item">
                    <span className="label">Hạn mức/ngày:</span>
                    <span className="value">{formatCurrency(customerInfo.dailyLimit)}</span>
                  </div>
                  <div className="customer-info-item">
                    <span className="label">Đã rút hôm nay:</span>
                    <span className="value" style={{color: '#f56565'}}>
                      {formatCurrency(customerInfo.withdrawnToday)}
                    </span>
                  </div>
                  <div className="customer-info-item">
                    <span className="label">Còn lại:</span>
                    <span className="value" style={{color: '#48bb78'}}>
                      {formatCurrency(remainingLimit)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Withdraw Form Card */}
        <div className="teller-card">
          <div className="teller-card-header red">
            <h3>
              <DollarSign size={20} />
              Thông tin rút tiền
            </h3>
          </div>
          <form onSubmit={handleWithdraw} className="teller-card-body">
            <div className="teller-form-group">
              <label className="teller-form-label">
                <DollarSign size={16} style={{color: '#f56565'}} />
                Số tiền rút (VND)
                <span className="required">*</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="teller-form-input"
                placeholder="Nhập số tiền cần rút"
                min="50000"
                disabled={!customerInfo}
                required
              />
              <div className="teller-form-helper">Số tiền tối thiểu: 50,000 VND</div>
            </div>

            {(isOverLimit || isOverBalance) && (
              <div className="teller-alert error">
                <AlertCircle size={18} />
                <div>
                  {isOverBalance && <div>⚠️ Số dư không đủ để thực hiện giao dịch!</div>}
                  {isOverLimit && <div>⚠️ Vượt quá hạn mức rút tiền trong ngày!</div>}
                </div>
              </div>
            )}

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

            {amount && customerInfo && !isOverLimit && !isOverBalance && (
              <div className="transaction-summary withdraw">
                <div className="summary-row">
                  <span>Số dư hiện tại:</span>
                  <span>{formatCurrency(customerInfo.balance)}</span>
                </div>
                <div className="summary-row">
                  <span>Số tiền rút:</span>
                  <span style={{color: '#f56565'}}>
                    -{formatCurrency(parseInt(amount))}
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Số dư sau giao dịch:</span>
                  <span style={{color: '#f56565'}}>
                    {formatCurrency(customerInfo.balance - parseInt(amount))}
                  </span>
                </div>
              </div>
            )}

            <div className="teller-actions">
              <button 
                type="submit" 
                className="teller-btn teller-btn-danger" 
                disabled={!customerInfo || isOverLimit || isOverBalance}
              >
                Xác nhận rút tiền
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
        <div className="teller-card-header red">
          <h3>
            <TrendingDown size={20} />
            Lịch sử rút tiền gần đây
          </h3>
        </div>
        
        {/* Filter Section */}
        <div style={{
          padding: '1.25rem',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          borderBottom: '2px solid #fca5a5'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#991b1b',
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
                  border: '2px solid #fca5a5',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fca5a5';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#991b1b',
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
                  border: '2px solid #fca5a5',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fca5a5';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#991b1b',
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
                  border: '2px solid #fca5a5',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fca5a5';
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
                    border: '2px solid #fca5a5',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#dc2626',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fee2e2';
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
              <tr style={{background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)'}}>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  <Clock size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Thời gian
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  <CreditCard size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số tài khoản
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  <User size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Khách hàng
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'right',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  <DollarSign size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số tiền
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  Ghi chú
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#991b1b',
                  borderBottom: '2px solid #fca5a5'
                }}>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{
                background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#991b1b'}}>
                  11:20 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#dc2626'}}>
                    9876543210
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#991b1b'}}>Trần Thị B</div>
                  <div style={{fontSize: '0.75rem', color: '#b91c1c'}}>KH001235</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#ef4444'}}>
                    -{formatCurrency(3000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#b91c1c'}}>
                  💵 Rút tiền mặt
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
                e.currentTarget.style.background = 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#7f1d1d'}}>
                  10:05 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#dc2626'}}>
                    1111222233
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#7f1d1d'}}>Phạm Thị D</div>
                  <div style={{fontSize: '0.75rem', color: '#991b1b'}}>KH001237</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#ef4444'}}>
                    -{formatCurrency(2000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#991b1b'}}>
                  🏪 Chi tiêu
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Thành công
                  </span>
                </td>
              </tr>
              
              <tr style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#991b1b'}}>
                  09:30 - 23/10/2025
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#dc2626'}}>
                    7777888899
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#991b1b'}}>Hoàng Văn E</div>
                  <div style={{fontSize: '0.75rem', color: '#b91c1c'}}>KH001238</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#ef4444'}}>
                    -{formatCurrency(5000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#b91c1c'}}>
                  -
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

export default Withdraw;
