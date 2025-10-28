import { useState, useMemo } from 'react';
import { Eye, CheckCircle, XCircle, Search, Calendar, Filter, X } from 'lucide-react';
import { getPendingLoansWithDetails, formatCurrency } from '../../data/mockData';
import LoanDetailModal from './LoanDetailModal';
import LoanApprovalModal from './LoanApprovalModal';
import '../../styles/TellerDashboard.css';

const PendingLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Lấy pending loans với đầy đủ thông tin (JOIN)
  const pendingLoans = getPendingLoansWithDetails();

  // Filter states
  const [filters, setFilters] = useState({
    searchText: '',
    loanType: '',
    creditGrade: '',
    dateFrom: '',
    dateTo: '',
    ltvFilter: '', // all, valid, invalid
  });

  // Filtered loans
  const filteredLoans = useMemo(() => {
    return pendingLoans.filter(loan => {
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

      // Credit grade filter
      if (filters.creditGrade && loan.creditGrade !== filters.creditGrade) {
        return false;
      }

      // LTV filter
      if (filters.ltvFilter === 'valid' && loan.ltv_ratio > 70) {
        return false;
      }
      if (filters.ltvFilter === 'invalid' && loan.ltv_ratio <= 70) {
        return false;
      }

      return true;
    });
  }, [filters, pendingLoans]);

  const handleApprove = (loan) => {
    setSelectedLoan(loan);
    setShowApprovalModal(true);
  };

  const handleViewDetail = (loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  const handleReject = (loan) => {
    if (confirm(`Bạn có chắc chắn muốn từ chối hồ sơ ${loan.loan_number}?`)) {
      alert(
        `❌ Đã từ chối hồ sơ ${loan.loan_number}\n\n` +
        `Khách hàng: ${loan.customerName}\n` +
        `Số tiền: ${formatCurrency(loan.loan_amount)}\n` +
        `Lý do: Điểm tín dụng không đạt yêu cầu\n\n` +
        `Trong ứng dụng thực tế, quyết định sẽ được lưu vào database.`
      );
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchText: '',
      loanType: '',
      creditGrade: '',
      dateFrom: '',
      dateTo: '',
      ltvFilter: '',
    });
  };

  const hasActiveFilters = filters.searchText || filters.loanType || filters.creditGrade || 
                          filters.dateFrom || filters.dateTo || filters.ltvFilter;

  return (
    <div className="fade-in">
      {/* Filter Section */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderBottom: '2px solid #f59e0b'
        }}>
          <h3 style={{color: '#78350f'}}>
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
            {/* Credit Grade */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Hạng tín dụng
              </label>
              <select
                className="teller-form-select"
                value={filters.creditGrade}
                onChange={(e) => setFilters({...filters, creditGrade: e.target.value})}
              >
                <option value="">Tất cả hạng</option>
                <option value="A">Hạng A (Xuất sắc)</option>
                <option value="B">Hạng B (Tốt)</option>
                <option value="C">Hạng C (Trung bình)</option>
                <option value="D">Hạng D (Kém)</option>
              </select>
            </div>

            {/* LTV Filter */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                LTV Ratio
              </label>
              <select
                className="teller-form-select"
                value={filters.ltvFilter}
                onChange={(e) => setFilters({...filters, ltvFilter: e.target.value})}
              >
                <option value="">Tất cả LTV</option>
                <option value="valid">LTV hợp lệ (≤ 70%)</option>
                <option value="invalid">LTV vượt quá (&gt; 70%)</option>
              </select>
            </div>

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
              Tìm thấy <strong style={{color: '#f59e0b'}}>{filteredLoans.length}</strong> hồ sơ chờ duyệt
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="teller-card">
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderBottom: '2px solid #f59e0b'
        }}>
          <h3 style={{color: '#78350f'}}>
            Danh sách hồ sơ chờ duyệt ({filteredLoans.length})
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
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Kỳ hạn</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>LTV</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Điểm TS</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Chi tiết</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan, index) => (
                    <tr 
                      key={loan.loan_id}
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
                      <td style={{padding: '1rem', textAlign: 'center', color: '#374151'}}>{loan.term_months} tháng</td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <span 
                          className="badge"
                          style={{
                            background: loan.ltv_ratio > 70 ? '#dc2626' : '#10b981',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {loan.ltv_ratio}%
                        </span>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <span 
                          className="badge"
                          style={{
                            background: '#dbeafe',
                            color: '#1e40af',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {loan.creditGrade} ({loan.creditScore})
                        </span>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <button
                          className="teller-btn teller-btn-secondary"
                          style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                          onClick={() => handleViewDetail(loan)}
                        >
                          <Eye size={14} /> Chi tiết
                        </button>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                          <button
                            className="teller-btn teller-btn-success"
                            style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                            onClick={() => handleApprove(loan)}
                          >
                            <CheckCircle size={14} /> Duyệt
                          </button>
                          <button
                            className="teller-btn"
                            style={{
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              background: '#dc2626',
                              color: 'white',
                              border: 'none'
                            }}
                            onClick={() => handleReject(loan)}
                          >
                            <XCircle size={14} /> Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoanApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        loanData={selectedLoan}
      />

      <LoanDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        loanData={selectedLoan}
      />
    </div>
  );
};

export default PendingLoans;
