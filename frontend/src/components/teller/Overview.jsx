import { useState } from 'react';
import { Users, ArrowLeftRight, CreditCard, Home, CheckCircle, Clock, DollarSign, User, Activity } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Overview = () => {
  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterAccount, setFilterAccount] = useState('');
  const [filterType, setFilterType] = useState('');
  
  return (
    <div className="fade-in">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Khách hàng phục vụ</div>
              <div className="stat-value">24</div>
            </div>
            <Users size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng nạp tiền</div>
              <div className="stat-value">{formatCurrency(125000000)}</div>
            </div>
            <ArrowLeftRight size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng rút tiền</div>
              <div className="stat-value">{formatCurrency(85000000)}</div>
            </div>
            <ArrowLeftRight size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card danger">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tài khoản mở mới</div>
              <div className="stat-value">5</div>
            </div>
            <CreditCard size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="teller-card" style={{marginTop: '1.5rem'}}>
        <div className="teller-card-header blue">
          <h3>
            <Activity size={20} />
            Giao dịch gần đây
          </h3>
        </div>
        
        {/* Filter Section */}
        <div style={{
          padding: '1.25rem',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderBottom: '2px solid #93c5fd'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1e40af',
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
                  border: '2px solid #93c5fd',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#93c5fd';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1e40af',
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
                  border: '2px solid #93c5fd',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#93c5fd';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#1e40af',
                marginBottom: '0.5rem'
              }}>
                📊 Loại giao dịch
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  border: '2px solid #93c5fd',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  background: 'white',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#93c5fd';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Tất cả</option>
                <option value="deposit">Nạp tiền</option>
                <option value="withdraw">Rút tiền</option>
                <option value="new_account">Mở tài khoản</option>
                <option value="card">Kích hoạt thẻ</option>
              </select>
            </div>
            
            {(filterName || filterAccount || filterType) && (
              <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <button
                  onClick={() => {
                    setFilterName('');
                    setFilterAccount('');
                    setFilterType('');
                  }}
                  style={{
                    padding: '0.625rem 1rem',
                    background: 'white',
                    border: '2px solid #93c5fd',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#2563eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#dbeafe';
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
              <tr style={{background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'}}>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
                }}>
                  <Clock size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Thời gian
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
                }}>
                  <Activity size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Loại GD
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
                }}>
                  <CreditCard size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số TK
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
                }}>
                  <User size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Khách hàng
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'right',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
                }}>
                  <DollarSign size={16} style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle'}} />
                  Số tiền
                </th>
                <th style={{
                  padding: '1rem 1.25rem',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#1e40af',
                  borderBottom: '2px solid #93c5fd'
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
                  09:15
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <span className="badge badge-success">💰 Nạp tiền</span>
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
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Hoàn thành
                  </span>
                </td>
              </tr>
              
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
                  09:30
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <span className="badge badge-danger">💸 Rút tiền</span>
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
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Hoàn thành
                  </span>
                </td>
              </tr>
              
              <tr style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#1e40af'}}>
                  10:00
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <span className="badge badge-info">🏦 Mở TK</span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#2563eb'}}>
                    5555555555
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#1e40af'}}>Lê Văn C</div>
                  <div style={{fontSize: '0.75rem', color: '#3b82f6'}}>KH001236</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#10b981'}}>
                    +{formatCurrency(10000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Hoàn thành
                  </span>
                </td>
              </tr>
              
              <tr style={{
                background: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
                e.currentTarget.style.transform = 'scale(1.01)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#166534'}}>
                  10:20
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <span className="badge badge-success">💰 Nạp tiền</span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#059669'}}>
                    1111222233
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#166534'}}>Phạm Thị D</div>
                  <div style={{fontSize: '0.75rem', color: '#15803d'}}>KH001237</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right'}}>
                  <span style={{fontSize: '1.125rem', fontWeight: 700, color: '#10b981'}}>
                    +{formatCurrency(2000000)}
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Hoàn thành
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
                  10:45
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <span className="badge badge-warning">💳 Kích hoạt thẻ</span>
                </td>
                <td style={{padding: '1rem 1.25rem', fontSize: '0.875rem'}}>
                  <span style={{fontFamily: 'monospace', fontWeight: 600, color: '#d97706'}}>
                    7777888899
                  </span>
                </td>
                <td style={{padding: '1rem 1.25rem'}}>
                  <div style={{fontWeight: 600, color: '#92400e'}}>Hoàng Văn E</div>
                  <div style={{fontSize: '0.75rem', color: '#78350f'}}>KH001238</div>
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'right', color: '#6b7280', fontSize: '0.875rem'}}>
                  -
                </td>
                <td style={{padding: '1rem 1.25rem', textAlign: 'center'}}>
                  <span className="badge badge-success" style={{display: 'inline-flex', alignItems: 'center', gap: '0.25rem'}}>
                    <CheckCircle size={14} />
                    Hoàn thành
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

export default Overview;
