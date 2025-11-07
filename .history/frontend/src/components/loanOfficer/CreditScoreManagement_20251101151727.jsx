import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Eye, Award, AlertCircle } from 'lucide-react';
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
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
            <Award size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Tổng khách hàng</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Điểm TB</div>
            <div className="stat-value">{stats.avgScore}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
            <Award size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Xuất sắc (≥800)</div>
            <div className="stat-value">{stats.excellent}</div>
            <div className="stat-change text-secondary">
              {((stats.excellent / stats.total) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Tốt (700-799)</div>
            <div className="stat-value">{stats.good}</div>
            <div className="stat-change text-secondary">
              {((stats.good / stats.total) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Trung bình (600-699)</div>
            <div className="stat-value">{stats.average}</div>
            <div className="stat-change text-secondary">
              {((stats.average / stats.total) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Yếu ({'<'}600)</div>
            <div className="stat-value">{stats.poor}</div>
            <div className="stat-change text-secondary">
              {((stats.poor / stats.total) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="filter-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc mã khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="input"
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              style={{ minWidth: '160px' }}
            >
              <option value="ALL">Tất cả hạng</option>
              <option value="AAA_AA">AAA - AA (Xuất sắc)</option>
              <option value="A_BBB">A - BBB (Tốt)</option>
              <option value="BB_B">BB - B (Trung bình)</option>
              <option value="C">C (Yếu)</option>
            </select>

            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ minWidth: '180px' }}
            >
              <option value="score_desc">Điểm cao → thấp</option>
              <option value="score_asc">Điểm thấp → cao</option>
              <option value="name_asc">Tên A → Z</option>
              <option value="debt_desc">Dư nợ cao → thấp</option>
            </select>
          </div>
        </div>

        <div className="filter-results">
          <span className="text-sm text-secondary">
            Hiển thị <strong>{filteredScores.length}</strong> / {stats.total} khách hàng
          </span>
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
