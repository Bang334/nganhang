import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Eye, Award, AlertCircle, Users, BarChart3, X } from 'lucide-react';
import { getAllCustomersCreditScores, formatCurrency } from '../../data/mockData';
import CreditScoreDetailModal from './CreditScoreDetailModal';
import '../../styles/TellerDashboard.css';

const CreditScoreManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('score_desc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const allScores = getAllCustomersCreditScores();

  // Apply filters and sorting
  const filteredScores = useMemo(() => {
    let filtered = allScores.filter(customer => {
      const matchSearch = customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGrade = gradeFilter === 'ALL' || 
                         (gradeFilter === 'AAA_AA' && (customer.creditGrade.startsWith('AAA') || customer.creditGrade.startsWith('AA'))) ||
                         (gradeFilter === 'A_BBB' && (customer.creditGrade.startsWith('A') || customer.creditGrade.startsWith('BBB'))) ||
                         (gradeFilter === 'BB_B' && (customer.creditGrade.startsWith('BB') || customer.creditGrade.startsWith('B'))) ||
                         (gradeFilter === 'C' && customer.creditGrade.startsWith('C'));
      
      return matchSearch && matchGrade;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score_desc': return b.creditScore - a.creditScore;
        case 'score_asc': return a.creditScore - b.creditScore;
        case 'name_asc': return a.customerName.localeCompare(b.customerName);
        case 'debt_desc': return b.totalOutstandingDebt - a.totalOutstandingDebt;
        default: return 0;
      }
    });

    return filtered;
  }, [allScores, searchTerm, gradeFilter, sortBy]);

  const getScoreColor = (score) => {
    if (score >= 800) return '#10b981';
    if (score >= 700) return '#3b82f6';
    if (score >= 600) return '#f59e0b';
    return '#ef4444';
  };

  const getGradeBadgeColor = (grade) => {
    if (grade.startsWith('AAA') || grade.startsWith('AA')) return 'badge-success';
    if (grade.startsWith('A') || grade.startsWith('BBB')) return 'badge-primary';
    if (grade.startsWith('BB') || grade.startsWith('B')) return 'badge-warning';
    return 'badge-danger';
  };

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  // Statistics
  const stats = useMemo(() => {
    const total = allScores.length;
    const excellent = allScores.filter(c => c.creditScore >= 800).length;
    const good = allScores.filter(c => c.creditScore >= 700 && c.creditScore < 800).length;
    const average = allScores.filter(c => c.creditScore >= 600 && c.creditScore < 700).length;
    const poor = allScores.filter(c => c.creditScore < 600).length;
    const avgScore = allScores.reduce((sum, c) => sum + c.creditScore, 0) / total;

    return { total, excellent, good, average, poor, avgScore: avgScore.toFixed(0) };
  }, [allScores]);

  return (
    <div className="fade-in">
      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Total Customers */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Tổng khách hàng</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart3 size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Điểm TB</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.avgScore}</div>
            </div>
          </div>
        </div>

        {/* Excellent */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Xuất sắc (≥800)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.excellent}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                {((stats.excellent / stats.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Good */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Tốt (700-799)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.good}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                {((stats.good / stats.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Average */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertCircle size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Trung bình (600-699)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.average}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                {((stats.average / stats.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Poor */}
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          border: 'none',
          color: 'white',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingDown size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Yếu ({'<'}600)</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.poor}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                {((stats.poor / stats.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '2px solid #764ba2'
        }}>
          <h3 style={{color: 'white'}}>
            <Filter size={20} />
            Bộ lọc tìm kiếm
          </h3>
        </div>
        <div className="teller-card-body">
          <div className="teller-grid-2" style={{marginBottom: '1rem'}}>
            {/* Search Text */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Search size={16} />
                Tìm kiếm
              </label>
              <input
                type="text"
                className="teller-form-input"
                placeholder="Tên khách hàng, mã KH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Grade Filter */}
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
                <option value="ALL">Tất cả hạng</option>
                <option value="AAA_AA">AAA - AA (Xuất sắc)</option>
                <option value="A_BBB">A - BBB (Tốt)</option>
                <option value="BB_B">BB - B (Trung bình)</option>
                <option value="C">C (Yếu)</option>
              </select>
            </div>
          </div>

          <div className="teller-grid-2">
            {/* Sort By */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Sắp xếp theo
              </label>
              <select
                className="teller-form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="score_desc">Điểm cao → thấp</option>
                <option value="score_asc">Điểm thấp → cao</option>
                <option value="name_asc">Tên A → Z</option>
                <option value="debt_desc">Dư nợ cao → thấp</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="teller-actions" style={{marginTop: '1rem'}}>
            {(searchTerm || gradeFilter !== 'ALL') && (
              <button
                className="teller-btn teller-btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setGradeFilter('ALL');
                }}
              >
                <X size={18} />
                Xóa bộ lọc
              </button>
            )}
            <div style={{flex: 1, textAlign: 'right', fontSize: '0.875rem', color: '#6b7280'}}>
              Hiển thị <strong style={{color: '#667eea'}}>{filteredScores.length}</strong> / {stats.total} khách hàng
            </div>
          </div>
        </div>
      </div>

      {/* Credit Score Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Điểm tín dụng</th>
                <th>Hạng</th>
                <th>Lãi suất</th>
                <th>Dư nợ hiện tại</th>
                <th>Tỷ lệ trả đúng hạn</th>
                <th>Xu hướng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    Không tìm thấy khách hàng nào
                  </td>
                </tr>
              ) : (
                filteredScores.map((customer) => {
                  const scoreChange = customer.scoreChange || 0;
                  const isScoreUp = scoreChange >= 0;
                  
                  return (
                    <tr key={customer.customerId}>
                      <td>
                        <div>
                          <div className="font-medium">{customer.customerName}</div>
                          <div className="text-xs text-secondary">{customer.customerCode}</div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: getScoreColor(customer.creditScore),
                          }}>
                            {customer.creditScore}
                          </div>
                          <div style={{
                            width: '60px',
                            height: '6px',
                            background: '#e5e7eb',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${((customer.creditScore - 300) / (850 - 300)) * 100}%`,
                              height: '100%',
                              background: getScoreColor(customer.creditScore),
                            }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getGradeBadgeColor(customer.creditGrade)}`}>
                          {customer.creditGrade}
                        </span>
                      </td>
                      <td>
                        <span className="font-semibold">{customer.interestRate}%</span>
                        <span className="text-xs text-secondary">/năm</span>
                      </td>
                      <td>
                        {customer.totalOutstandingDebt > 0 ? (
                          <div>
                            <div className="font-medium">{formatCurrency(customer.totalOutstandingDebt)}</div>
                            <div className="text-xs text-secondary">
                              Nợ/Thu nhập: {customer.debtToIncomeRatio}%
                            </div>
                          </div>
                        ) : (
                          <span className="text-success">Không có nợ</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '50px',
                            height: '6px',
                            background: '#e5e7eb',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${customer.onTimePaymentRate}%`,
                              height: '100%',
                              background: customer.onTimePaymentRate >= 95 ? '#10b981' :
                                         customer.onTimePaymentRate >= 80 ? '#f59e0b' : '#ef4444',
                            }} />
                          </div>
                          <span className="text-sm">{customer.onTimePaymentRate}%</span>
                        </div>
                      </td>
                      <td>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          color: isScoreUp ? '#10b981' : '#ef4444',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                        }}>
                          {isScoreUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {isScoreUp ? '+' : ''}{scoreChange}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleViewDetail(customer)}
                        >
                          <Eye size={16} />
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <CreditScoreDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CreditScoreManagement;
