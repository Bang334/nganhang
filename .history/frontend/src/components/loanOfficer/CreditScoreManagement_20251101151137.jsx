import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Award, Filter, Eye, Edit, X } from 'lucide-react';
import { formatDate, formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const CreditScoreManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data - trong thực tế sẽ fetch từ database
  const customersData = [
    {
      id: 1,
      customerCode: 'KH001',
      name: 'Nguyễn Văn A',
      score: 780,
      grade: 'AAA',
      trend: 'up',
      lastUpdated: '2024-01-15',
      totalLoans: 2,
      totalDebt: 500000000,
      monthlyIncome: 30000000,
      debtRatio: 25,
      paymentHistory: 'Tốt - 100% thanh toán đúng hạn'
    },
    {
      id: 2,
      customerCode: 'KH002',
      name: 'Trần Thị B',
      score: 720,
      grade: 'AA',
      trend: 'up',
      lastUpdated: '2024-01-14',
      totalLoans: 1,
      totalDebt: 200000000,
      monthlyIncome: 25000000,
      debtRatio: 20,
      paymentHistory: 'Tốt - Thanh toán đúng hạn'
    },
    {
      id: 3,
      customerCode: 'KH003',
      name: 'Lê Văn C',
      score: 650,
      grade: 'A',
      trend: 'stable',
      lastUpdated: '2024-01-13',
      totalLoans: 3,
      totalDebt: 400000000,
      monthlyIncome: 20000000,
      debtRatio: 35,
      paymentHistory: 'Trung bình - 1 lần chậm trả'
    },
    {
      id: 4,
      customerCode: 'KH004',
      name: 'Phạm Thị D',
      score: 550,
      grade: 'BBB',
      trend: 'down',
      lastUpdated: '2024-01-12',
      totalLoans: 2,
      totalDebt: 350000000,
      monthlyIncome: 15000000,
      debtRatio: 45,
      paymentHistory: 'Cần cải thiện - 2 lần chậm trả'
    },
    {
      id: 5,
      customerCode: 'KH005',
      name: 'Hoàng Văn E',
      score: 450,
      grade: 'BB',
      trend: 'down',
      lastUpdated: '2024-01-11',
      totalLoans: 1,
      totalDebt: 180000000,
      monthlyIncome: 12000000,
      debtRatio: 50,
      paymentHistory: 'Kém - Quá hạn 30 ngày'
    }
  ];

  const getGradeColor = (grade) => {
    const colors = {
      'AAA': '#10b981', 'AA': '#10b981', 'A': '#3b82f6',
      'BBB': '#f59e0b', 'BB': '#f59e0b', 'B': '#f97316',
      'CCC': '#ef4444', 'CC': '#ef4444', 'C': '#dc2626'
    };
    return colors[grade] || '#6b7280';
  };

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = !searchText || 
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customerCode.toLowerCase().includes(searchText.toLowerCase());
    const matchesGrade = !gradeFilter || customer.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  return (
    <div className="fade-in">
      {/* Stats Overview */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem'}}>
        <div className="teller-card">
          <div className="teller-card-body">
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Điểm TB</div>
            <div style={{fontSize: '1.875rem', fontWeight: 700, color: '#3b82f6'}}>
              {(customersData.reduce((sum, c) => sum + c.score, 0) / customersData.length).toFixed(0)}
            </div>
          </div>
        </div>
        <div className="teller-card">
          <div className="teller-card-body">
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Hạng AAA-AA</div>
            <div style={{fontSize: '1.875rem', fontWeight: 700, color: '#10b981'}}>
              {customersData.filter(c => ['AAA', 'AA'].includes(c.grade)).length}
            </div>
          </div>
        </div>
        <div className="teller-card">
          <div className="teller-card-body">
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Cần theo dõi</div>
            <div style={{fontSize: '1.875rem', fontWeight: 700, color: '#f59e0b'}}>
              {customersData.filter(c => ['BBB', 'BB', 'B'].includes(c.grade)).length}
            </div>
          </div>
        </div>
        <div className="teller-card">
          <div className="teller-card-body">
            <div style={{fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem'}}>Rủi ro cao</div>
            <div style={{fontSize: '1.875rem', fontWeight: 700, color: '#ef4444'}}>
              {customersData.filter(c => ['CCC', 'CC', 'C'].includes(c.grade)).length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-body">
          <div className="teller-grid-3">
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Search size={16} />
                Tìm kiếm
              </label>
              <input
                type="text"
                className="teller-form-input"
                placeholder="Tên khách hàng, mã KH..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Hạng tín dụng
              </label>
              <select
                className="teller-form-select"
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="">Tất cả hạng</option>
                <option value="AAA">AAA (Xuất sắc)</option>
                <option value="AA">AA (Rất tốt)</option>
                <option value="A">A (Tốt)</option>
                <option value="BBB">BBB (Khá)</option>
                <option value="BB">BB (Trung bình)</option>
                <option value="B">B (Yếu)</option>
                <option value="CCC">CCC (Kém)</option>
              </select>
            </div>

            <div style={{display: 'flex', alignItems: 'flex-end'}}>
              <button
                className="teller-btn teller-btn-secondary"
                onClick={() => {
                  setSearchText('');
                  setGradeFilter('');
                }}
              >
                <X size={18} />
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="teller-card">
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h3>
            <Award size={20} />
            Quản lý Điểm Tín Dụng ({filteredCustomers.length} khách hàng)
          </h3>
        </div>
        <div className="teller-card-body" style={{padding: 0}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#f9fafb', borderBottom: '2px solid #e5e7eb'}}>
                <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600}}>Khách hàng</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Điểm</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Hạng</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Xu hướng</th>
                <th style={{padding: '1rem', textAlign: 'right', fontWeight: 600}}>Nợ hiện tại</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Tỷ lệ nợ</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Cập nhật</th>
                <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr 
                  key={customer.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    background: index % 2 === 0 ? 'white' : '#f9fafb'
                  }}
                >
                  <td style={{padding: '1rem'}}>
                    <div style={{fontWeight: 600}}>{customer.name}</div>
                    <div style={{fontSize: '0.813rem', color: '#6b7280'}}>{customer.customerCode}</div>
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center'}}>
                    <div style={{fontSize: '1.5rem', fontWeight: 700, color: getGradeColor(customer.grade)}}>
                      {customer.score}
                    </div>
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center'}}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.813rem',
                      fontWeight: 600,
                      background: getGradeColor(customer.grade) + '20',
                      color: getGradeColor(customer.grade)
                    }}>
                      {customer.grade}
                    </span>
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center'}}>
                    {customer.trend === 'up' ? (
                      <TrendingUp size={20} color="#10b981" />
                    ) : customer.trend === 'down' ? (
                      <TrendingDown size={20} color="#ef4444" />
                    ) : (
                      <div style={{width: '20px', height: '2px', background: '#6b7280', margin: '0 auto'}} />
                    )}
                  </td>
                  <td style={{padding: '1rem', textAlign: 'right', fontWeight: 600}}>
                    {formatCurrency(customer.totalDebt)}
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center'}}>
                    <span style={{
                      fontWeight: 600,
                      color: customer.debtRatio < 30 ? '#10b981' : customer.debtRatio < 40 ? '#f59e0b' : '#ef4444'
                    }}>
                      {customer.debtRatio}%
                    </span>
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center', fontSize: '0.813rem', color: '#6b7280'}}>
                    {formatDate(customer.lastUpdated)}
                  </td>
                  <td style={{padding: '1rem', textAlign: 'center'}}>
                    <button
                      className="teller-btn teller-btn-secondary"
                      style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                      onClick={() => handleViewDetail(customer)}
                    >
                      <Eye size={14} />
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div style={{padding: '3rem', textAlign: 'center', color: '#6b7280'}}>
              <Search size={48} style={{opacity: 0.3, margin: '0 auto 1rem'}} />
              <div>Không tìm thấy khách hàng</div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{margin: 0, fontSize: '1.25rem', fontWeight: 600}}>
                Chi tiết Tín dụng - {selectedCustomer.name}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X size={24} color="#6b7280" />
              </button>
            </div>

            <div style={{padding: '1.5rem'}}>
              {/* Score Overview */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{fontSize: '3rem', fontWeight: 700}}>{selectedCustomer.score}</div>
                <div style={{fontSize: '1.25rem', fontWeight: 600}}>Hạng {selectedCustomer.grade}</div>
              </div>

              {/* Customer Info */}
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{marginBottom: '1rem'}}>Thông tin khách hàng</h4>
                <div style={{background: '#f9fafb', padding: '1rem', borderRadius: '8px'}}>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Mã khách hàng:</span>
                    <span className="teller-info-value">{selectedCustomer.customerCode}</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Họ tên:</span>
                    <span className="teller-info-value">{selectedCustomer.name}</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Thu nhập:</span>
                    <span className="teller-info-value">{formatCurrency(selectedCustomer.monthlyIncome)}/tháng</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Tổng nợ:</span>
                    <span className="teller-info-value">{formatCurrency(selectedCustomer.totalDebt)}</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Tỷ lệ nợ:</span>
                    <span className="teller-info-value" style={{
                      color: selectedCustomer.debtRatio < 30 ? '#10b981' : selectedCustomer.debtRatio < 40 ? '#f59e0b' : '#ef4444',
                      fontWeight: 600
                    }}>
                      {selectedCustomer.debtRatio}%
                    </span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Số khoản vay:</span>
                    <span className="teller-info-value">{selectedCustomer.totalLoans} khoản</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Lịch sử thanh toán:</span>
                    <span className="teller-info-value">{selectedCustomer.paymentHistory}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{display: 'flex', gap: '1rem'}}>
                <button
                  className="teller-btn teller-btn-primary"
                  style={{flex: 1}}
                  onClick={() => alert('Tính năng cập nhật điểm sẽ tích hợp với hệ thống thẩm định')}
                >
                  <Edit size={18} />
                  Cập nhật điểm
                </button>
                <button
                  className="teller-btn teller-btn-secondary"
                  onClick={() => setShowDetailModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditScoreManagement;

