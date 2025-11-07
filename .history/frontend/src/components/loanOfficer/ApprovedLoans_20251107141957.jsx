import { useState, useMemo } from 'react';
import { Eye, Search, Calendar, Filter, X } from 'lucide-react';
import { formatCurrency, formatDate, getApprovedLoansWithDetails } from '../../data/mockData';
import LoanDetailModal from './LoanDetailModal';
import '../../styles/TellerDashboard.css';

const ApprovedLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    searchText: '',
    loanType: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  // Lấy danh sách hồ sơ đã duyệt với đầy đủ thông tin
  const approvedLoans = getApprovedLoansWithDetails();

  // Filtered loans
  const filteredLoans = useMemo(() => {
    return approvedLoans.filter(loan => {
      // Search text filter
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const matchesSearch = 
          loan.customerName.toLowerCase().includes(searchLower) ||
          loan.loan_number.toLowerCase().includes(searchLower) ||
          loan.customerCode.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Loan type filter
      if (filters.loanType && loan.loanTypeName !== filters.loanType) {
        return false;
      }

      // Status filter
      if (filters.status && loan.status !== filters.status) {
        return false;
      }

      // Date range filter (simplified - in real app would parse dates properly)
      // For now just showing the UI

      return true;
    });
  }, [filters, approvedLoans]);

  const handleViewDetail = (loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  const handleClearFilters = () => {
    setFilters({
      searchText: '',
      loanType: '',
      status: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.searchText || filters.loanType || filters.status || filters.dateFrom || filters.dateTo;

  return (
    <div className="fade-in">
      {/* Filter Section */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-header blue">
          <h3>
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
                placeholder="Tên khách hàng, mã hồ sơ, mã KH..."
                value={filters.searchText}
                onChange={(e) => setFilters({...filters, searchText: e.target.value})}
              />
            </div>

            {/* Loan Type */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Loại hình vay
              </label>
              <select
                className="teller-form-select"
                value={filters.loanType}
                onChange={(e) => setFilters({...filters, loanType: e.target.value})}
              >
                <option value="">Tất cả loại hình</option>
                <option value="Vay mua nhà">Vay mua nhà</option>
                <option value="Vay mua xe">Vay mua xe</option>
                <option value="Vay tiêu dùng">Vay tiêu dùng</option>
                <option value="Vay kinh doanh">Vay kinh doanh</option>
              </select>
            </div>
          </div>

          <div className="teller-grid-3">
            {/* Date From */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Calendar size={16} />
                Từ ngày
              </label>
              <input
                type="date"
                className="teller-form-input"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
            </div>

            {/* Date To */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Calendar size={16} />
                Đến ngày
              </label>
              <input
                type="date"
                className="teller-form-input"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>

            {/* Status */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Trạng thái
              </label>
              <select
                className="teller-form-select"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="Chờ giải ngân">Chờ giải ngân</option>
                <option value="Đã giải ngân">Đã giải ngân</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="teller-actions" style={{marginTop: '1rem'}}>
            {hasActiveFilters && (
              <button
                className="teller-btn teller-btn-secondary"
                onClick={handleClearFilters}
              >
                <X size={18} />
                Xóa bộ lọc
              </button>
            )}
            <div style={{flex: 1, textAlign: 'right', fontSize: '0.875rem', color: '#6b7280'}}>
              Tìm thấy <strong style={{color: '#3b82f6'}}>{filteredLoans.length}</strong> hồ sơ
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="teller-card">
        <div className="teller-card-header green">
          <h3>
            Danh sách hồ sơ đã duyệt ({filteredLoans.length})
          </h3>
        </div>
        <div className="teller-card-body" style={{padding: 0}}>
          {filteredLoans.length === 0 ? (
            <div style={{padding: '3rem', textAlign: 'center'}}>
              <Search size={64} style={{color: '#d1d5db', margin: '0 auto 1rem'}} />
              <h4 style={{color: '#6b7280', marginBottom: '0.5rem'}}>Không tìm thấy hồ sơ</h4>
              <p style={{color: '#9ca3af', fontSize: '0.875rem'}}>
                Thử điều chỉnh bộ lọc để tìm kiếm hồ sơ khác
              </p>
            </div>
          ) : (
            <div className="teller-table">
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc', borderBottom: '2px solid #e2e8f0'}}>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Mã hồ sơ</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Khách hàng</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Loại vay</th>
                    <th style={{padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#374151'}}>Số tiền</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Lãi suất</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Kỳ hạn</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Ngày duyệt</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Trạng thái</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan, index) => (
                    <tr 
                      key={loan.id}
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        background: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                      }}
                    >
                      <td style={{padding: '1rem', fontWeight: 600, color: '#1f2937'}}>{loan.loan_number}</td>
                      <td style={{padding: '1rem'}}>
                        <div style={{fontWeight: 600, color: '#1f2937'}}>{loan.customerName}</div>
                        <div style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>{loan.customerCode}</div>
                      </td>
                      <td style={{padding: '1rem', color: '#374151'}}>{loan.loanTypeName}</td>
                      <td style={{padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#1f2937'}}>
                        {formatCurrency(loan.loan_amount)}
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center', color: '#374151'}}>
                        <span style={{
                          background: '#dbeafe',
                          color: '#1e40af',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.813rem',
                          fontWeight: 600
                        }}>
                          {loan.interest_rate}%
                        </span>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center', color: '#374151'}}>{loan.term_months} tháng</td>
                      <td style={{padding: '1rem', color: '#374151', fontSize: '0.875rem'}}>{formatDate(loan.approved_date)}</td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <span 
                          className="badge"
                          style={{
                            background: loan.status === 'ACTIVE' ? '#10b981' : loan.status === 'DISBURSED' ? '#3b82f6' : '#f59e0b',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {loan.status === 'ACTIVE' ? 'Đang trả' : loan.status === 'DISBURSED' ? 'Đã giải ngân' : 'Đã duyệt'}
                        </span>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <button
                          className="teller-btn teller-btn-primary"
                          style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                          onClick={() => handleViewDetail(loan)}
                        >
                          <Eye size={14} /> Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <LoanDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        loanData={selectedLoan}
      />
    </div>
  );
};

export default ApprovedLoans;
