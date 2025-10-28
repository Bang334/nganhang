import { useState, useMemo } from 'react';
import { Eye, Search, Calendar, Filter, X } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import LoanDetailModal from './LoanDetailModal';
import '../../styles/TellerDashboard.css';

const RejectedLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    searchText: '',
    loanType: '',
    creditGrade: '',
    dateFrom: '',
    dateTo: '',
  });

  const rejectedLoans = [
    {
      id: 1,
      loanNumber: 'LN002340',
      customerName: 'Phạm Văn D',
      customerCode: 'KH012345',
      customerPhone: '0901234567',
      customerEmail: 'phamvand@email.com',
      customerAddress: '234 Lê Lợi, Quận 1, TP.HCM',
      customerOccupation: 'Kinh doanh tự do',
      customerMonthlyIncome: 35000000,
      debtRatio: 75,
      creditScore: 450,
      creditGrade: 'D',
      employmentStatus: 'UNSTABLE',
      loanType: 'Vay mua nhà',
      loanAmount: 3000000000,
      termMonths: 300,
      purpose: 'Mua căn hộ cao cấp',
      submissionDate: '2025-10-10T09:00:00',
      status: 'REJECTED',
      rejectedDate: '19/10/2025',
      rejectedBy: 'Nguyễn Thị Loan',
      reason: 'Điểm tín dụng không đạt yêu cầu tối thiểu',
      ltvRatio: 85,
      collateralType: 'Bất động sản',
      collateralName: 'Căn hộ The Vista',
      collateralAddress: '234 Xa lộ Hà Nội, Quận 2, TP.HCM',
      collateralCertificate: 'SH-2025-11111',
      collateralValue: 3500000000,
      appraisedValue: 3520000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá DEF',
      appraisedDate: '2025-10-08',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Sổ hồng nhà đất', status: 'PENDING' },
        { name: 'Báo cáo thẩm định giá', status: 'COMPLETED' },
        { name: 'Hợp đồng mua bán', status: 'PENDING' },
      ],
      notes: 'Từ chối do điểm tín dụng quá thấp (450 điểm). Khách hàng có thể nộp lại hồ sơ sau 6 tháng nếu cải thiện được điểm tín dụng.',
    },
    {
      id: 2,
      loanNumber: 'LN002335',
      customerName: 'Hoàng Thị E',
      customerCode: 'KH023456',
      customerPhone: '0912345678',
      customerEmail: 'hoangthie@email.com',
      customerAddress: '567 Nguyễn Trãi, Quận 5, TP.HCM',
      customerOccupation: 'Nhân viên bán hàng',
      customerMonthlyIncome: 12000000,
      debtRatio: 68,
      creditScore: 520,
      creditGrade: 'C',
      employmentStatus: 'UNSTABLE',
      loanType: 'Vay tiêu dùng',
      loanAmount: 200000000,
      termMonths: 48,
      purpose: 'Trang trải chi phí cá nhân và du lịch',
      submissionDate: '2025-10-12T14:30:00',
      status: 'REJECTED',
      rejectedDate: '17/10/2025',
      rejectedBy: 'Nguyễn Thị Loan',
      reason: 'Thu nhập không ổn định, không đủ khả năng thanh toán',
      ltvRatio: 0,
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Hợp đồng lao động', status: 'PENDING' },
        { name: 'Bảng lương 6 tháng', status: 'PENDING' },
      ],
      notes: 'Từ chối do thu nhập không ổn định (chỉ 12 triệu/tháng) và tỷ lệ nợ/thu nhập cao (68%). Đề xuất khách hàng xem xét vay số tiền thấp hơn hoặc kéo dài thời gian vay.',
    },
    {
      id: 3,
      loanNumber: 'LN002328',
      customerName: 'Trương Văn F',
      customerCode: 'KH034567',
      customerPhone: '0923456789',
      customerEmail: 'truongvanf@email.com',
      customerAddress: '890 Cách Mạng Tháng 8, Quận 10, TP.HCM',
      customerOccupation: 'Chủ cửa hàng',
      customerMonthlyIncome: 45000000,
      debtRatio: 58,
      creditScore: 680,
      creditGrade: 'B',
      employmentStatus: 'STABLE',
      loanType: 'Vay kinh doanh',
      loanAmount: 800000000,
      termMonths: 84,
      purpose: 'Mở rộng cửa hàng và nhập hàng hóa mới',
      submissionDate: '2025-10-08T11:00:00',
      status: 'REJECTED',
      rejectedDate: '15/10/2025',
      rejectedBy: 'Nguyễn Thị Loan',
      reason: 'Tài sản thế chấp không đủ giá trị (LTV vượt 80%)',
      ltvRatio: 92,
      collateralType: 'Bất động sản',
      collateralName: 'Mặt bằng kinh doanh',
      collateralAddress: '890 Cách Mạng Tháng 8, Quận 10, TP.HCM',
      collateralCertificate: 'SD-2025-22222',
      collateralValue: 850000000,
      appraisedValue: 870000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá GHI',
      appraisedDate: '2025-10-05',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Giấy phép kinh doanh', status: 'VERIFIED' },
        { name: 'Báo cáo tài chính', status: 'VERIFIED' },
        { name: 'Sổ đỏ nhà đất', status: 'VERIFIED' },
        { name: 'Hợp đồng thuê mặt bằng', status: 'VERIFIED' },
      ],
      notes: 'Từ chối do LTV quá cao (92% > 70%). Giá trị tài sản thế chấp chỉ đủ cho khoản vay tối đa 600 triệu. Đề xuất khách hàng bổ sung thêm tài sản thế chấp hoặc giảm số tiền vay xuống.',
    },
  ];

  // Filtered loans
  const filteredLoans = useMemo(() => {
    return rejectedLoans.filter(loan => {
      // Search text filter
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        const matchesSearch = 
          loan.customerName.toLowerCase().includes(searchLower) ||
          loan.loanNumber.toLowerCase().includes(searchLower) ||
          loan.customerCode.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Loan type filter
      if (filters.loanType && loan.loanType !== filters.loanType) {
        return false;
      }

      // Credit grade filter
      if (filters.creditGrade && loan.creditGrade !== filters.creditGrade) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleViewDetail = (loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  const handleClearFilters = () => {
    setFilters({
      searchText: '',
      loanType: '',
      creditGrade: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.searchText || filters.loanType || filters.creditGrade || filters.dateFrom || filters.dateTo;

  return (
    <div className="fade-in">
      {/* Filter Section */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderBottom: '2px solid #dc2626'
        }}>
          <h3 style={{color: '#991b1b'}}>
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
              Tìm thấy <strong style={{color: '#dc2626'}}>{filteredLoans.length}</strong> hồ sơ từ chối
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="teller-card">
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderBottom: '2px solid #dc2626'
        }}>
          <h3 style={{color: '#991b1b'}}>
            Danh sách hồ sơ từ chối ({filteredLoans.length})
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
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Điểm TS</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>LTV</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Ngày từ chối</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Lý do</th>
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
                      <td style={{padding: '1rem', fontWeight: 600, color: '#1f2937'}}>{loan.loanNumber}</td>
                      <td style={{padding: '1rem'}}>
                        <div style={{fontWeight: 600, color: '#1f2937'}}>{loan.customerName}</div>
                        <div style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>{loan.customerCode}</div>
                      </td>
                      <td style={{padding: '1rem', color: '#374151'}}>{loan.loanType}</td>
                      <td style={{padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#1f2937'}}>
                        {formatCurrency(loan.loanAmount)}
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <span 
                          className="badge"
                          style={{
                            background: loan.creditScore >= 700 ? '#10b981' : 
                                       loan.creditScore >= 600 ? '#f59e0b' : '#ef4444',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {loan.creditScore}
                        </span>
                      </td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        {loan.ltvRatio > 0 ? (
                          <span 
                            className="badge"
                            style={{
                              background: loan.ltvRatio > 70 ? '#dc2626' : '#10b981',
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {loan.ltvRatio}%
                          </span>
                        ) : (
                          <span style={{color: '#9ca3af', fontSize: '0.875rem'}}>N/A</span>
                        )}
                      </td>
                      <td style={{padding: '1rem', color: '#374151', fontSize: '0.875rem'}}>{loan.rejectedDate}</td>
                      <td style={{padding: '1rem'}}>
                        <div style={{fontSize: '0.875rem', color: '#6b7280', maxWidth: '200px'}}>
                          {loan.reason}
                        </div>
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

export default RejectedLoans;

