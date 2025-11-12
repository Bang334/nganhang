import { useState, useMemo } from 'react';
import { Eye, Search, Calendar, Filter, X } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import LoanDetailModal from './LoanDetailModal';
import '../../styles/TellerDashboard.css';

const ApprovedLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    searchText: '',
    loanType: '',
    creditGrade: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  const approvedLoans = [
    {
      id: 1,
      loanNumber: 'LN002345',
      customerName: 'Nguyễn Văn A',
      customerCode: 'KH001234',
      customerPhone: '0901111111',
      customerEmail: 'nguyenvana@email.com',
      customerAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      customerOccupation: 'Kỹ sư phần mềm',
      customerMonthlyIncome: 25000000,
      debtRatio: 35,
      creditScore: 750,
      creditGrade: 'A',
      employmentStatus: 'STABLE',
      loanType: 'Vay mua nhà',
      loanAmount: 2000000000,
      termMonths: 240,
      interestRate: 8.5,
      purpose: 'Mua căn hộ chung cư',
      submissionDate: '2025-10-15T10:00:00',
      status: 'APPROVED',
      approvedDate: '20/10/2025',
      approvedBy: 'Nguyễn Thị Loan',
      disbursementStatus: 'Đã giải ngân',
      ltvRatio: 65,
      collateralType: 'Bất động sản',
      collateralName: 'Căn hộ chung cư',
      collateralAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      collateralCertificate: 'SH-2025-00123',
      collateralValue: 3100000000,
      appraisedValue: 3080000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá ABC',
      appraisedDate: '2025-10-12',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Sổ hồng nhà đất', status: 'VERIFIED' },
        { name: 'Báo cáo thẩm định giá', status: 'COMPLETED' },
        { name: 'Hợp đồng mua bán', status: 'VERIFIED' },
      ],
      notes: 'Hồ sơ đầy đủ, điểm tín dụng tốt, tài sản thế chấp đủ giá trị. Đã duyệt và giải ngân thành công.',
    },
    {
      id: 2,
      loanNumber: 'LN002338',
      customerName: 'Trần Thị B',
      customerCode: 'KH005678',
      customerPhone: '0902222222',
      customerEmail: 'tranthib@email.com',
      customerAddress: '456 Lê Lợi, Quận 1, TP.HCM',
      customerOccupation: 'Giáo viên',
      customerMonthlyIncome: 15000000,
      debtRatio: 42,
      creditScore: 680,
      creditGrade: 'B',
      employmentStatus: 'STABLE',
      loanType: 'Vay tiêu dùng',
      loanAmount: 100000000,
      termMonths: 36,
      interestRate: 12.0,
      purpose: 'Mua sắm và chi tiêu cá nhân',
      submissionDate: '2025-10-18T14:00:00',
      status: 'APPROVED',
      approvedDate: '22/10/2025',
      approvedBy: 'Nguyễn Thị Loan',
      disbursementStatus: 'Chờ giải ngân',
      ltvRatio: 0,
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Hợp đồng lao động', status: 'VERIFIED' },
        { name: 'Bảng lương 6 tháng', status: 'VERIFIED' },
      ],
      notes: 'Thu nhập ổn định, tỷ lệ nợ/thu nhập trong mức cho phép. Đã duyệt, đang chờ giải ngân.',
    },
    {
      id: 3,
      loanNumber: 'LN002330',
      customerName: 'Lê Văn C',
      customerCode: 'KH009876',
      customerPhone: '0903333333',
      customerEmail: 'levanc@email.com',
      customerAddress: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
      customerOccupation: 'Chủ doanh nghiệp',
      customerMonthlyIncome: 50000000,
      debtRatio: 28,
      creditScore: 720,
      creditGrade: 'A',
      employmentStatus: 'STABLE',
      loanType: 'Vay kinh doanh',
      loanAmount: 500000000,
      termMonths: 60,
      interestRate: 10.5,
      purpose: 'Mở rộng sản xuất và nhập nguyên liệu',
      submissionDate: '2025-10-10T09:00:00',
      status: 'APPROVED',
      approvedDate: '18/10/2025',
      approvedBy: 'Nguyễn Thị Loan',
      disbursementStatus: 'Đã giải ngân',
      ltvRatio: 55,
      collateralType: 'Bất động sản',
      collateralName: 'Nhà xưởng sản xuất',
      collateralAddress: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
      collateralCertificate: 'SD-2025-00456',
      collateralValue: 900000000,
      appraisedValue: 910000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá XYZ',
      appraisedDate: '2025-10-08',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Giấy phép kinh doanh', status: 'VERIFIED' },
        { name: 'Báo cáo tài chính', status: 'VERIFIED' },
        { name: 'Sổ đỏ nhà đất', status: 'VERIFIED' },
        { name: 'Hợp đồng thuê mặt bằng', status: 'VERIFIED' },
      ],
      notes: 'Doanh nghiệp hoạt động tốt, tài sản thế chấp đủ giá trị. Đã duyệt và giải ngân.',
    },
    {
      id: 4,
      loanNumber: 'LN002325',
      customerName: 'Phạm Thị D',
      customerCode: 'KH011223',
      customerPhone: '0904444444',
      customerEmail: 'phamthid@email.com',
      customerAddress: '321 Võ Văn Tần, Quận 3, TP.HCM',
      customerOccupation: 'Bác sĩ',
      customerMonthlyIncome: 30000000,
      debtRatio: 38,
      creditScore: 710,
      creditGrade: 'A',
      employmentStatus: 'STABLE',
      loanType: 'Vay mua xe',
      loanAmount: 600000000,
      termMonths: 72,
      interestRate: 9.5,
      purpose: 'Mua xe ô tô phục vụ công việc',
      submissionDate: '2025-10-12T11:00:00',
      status: 'APPROVED',
      approvedDate: '15/10/2025',
      approvedBy: 'Nguyễn Thị Loan',
      disbursementStatus: 'Đã giải ngân',
      ltvRatio: 70,
      collateralType: 'Phương tiện',
      collateralName: 'Xe ô tô',
      collateralAddress: 'N/A',
      collateralCertificate: 'XE-2025-00789',
      collateralValue: 850000000,
      appraisedValue: 860000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá ABC',
      appraisedDate: '2025-10-10',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Hợp đồng lao động', status: 'VERIFIED' },
        { name: 'Bảng lương 6 tháng', status: 'VERIFIED' },
        { name: 'Hợp đồng mua xe', status: 'VERIFIED' },
      ],
      notes: 'Thu nhập cao và ổn định, LTV trong mức cho phép. Đã duyệt và giải ngân.',
    },
    {
      id: 5,
      loanNumber: 'LN002320',
      customerName: 'Hoàng Văn E',
      customerCode: 'KH013456',
      customerPhone: '0905555555',
      customerEmail: 'hoangvane@email.com',
      customerAddress: '654 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
      customerOccupation: 'Kế toán trưởng',
      customerMonthlyIncome: 20000000,
      debtRatio: 45,
      creditScore: 650,
      creditGrade: 'B',
      employmentStatus: 'STABLE',
      loanType: 'Vay tiêu dùng',
      loanAmount: 150000000,
      termMonths: 48,
      interestRate: 11.5,
      purpose: 'Cải thiện nhà ở và mua sắm',
      submissionDate: '2025-10-08T08:00:00',
      status: 'APPROVED',
      approvedDate: '12/10/2025',
      approvedBy: 'Nguyễn Thị Loan',
      disbursementStatus: 'Chờ giải ngân',
      ltvRatio: 0,
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Hợp đồng lao động', status: 'VERIFIED' },
        { name: 'Bảng lương 6 tháng', status: 'VERIFIED' },
      ],
      notes: 'Thu nhập ổn định, điểm tín dụng đạt yêu cầu. Đã duyệt, đang chờ giải ngân.',
    },
  ];

  // Filtered loans
  const filteredLoans = useMemo(() => {
    return approvedLoans.filter(loan => {
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

      // Status filter
      if (filters.status && loan.disbursementStatus !== filters.status) {
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
      status: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.searchText || filters.loanType || filters.creditGrade || filters.status || filters.dateFrom || filters.dateTo;

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

          <div className="teller-grid-2" style={{marginTop: '1rem'}}>
            {/* Status */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Trạng thái giải ngân
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
              Tìm thấy <strong style={{color: '#10b981'}}>{filteredLoans.length}</strong> hồ sơ đã duyệt
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
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Điểm TS</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>LTV</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Lãi suất</th>
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
                      <td style={{padding: '1rem', textAlign: 'center', color: '#374151'}}>
                        <span style={{
                          background: '#dbeafe',
                          color: '#1e40af',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.813rem',
                          fontWeight: 600
                        }}>
                          {loan.interestRate}%
                        </span>
                      </td>
                      <td style={{padding: '1rem', color: '#374151', fontSize: '0.875rem'}}>{loan.approvedDate}</td>
                      <td style={{padding: '1rem', textAlign: 'center'}}>
                        <span 
                          className="badge"
                          style={{
                            background: loan.disbursementStatus === 'Đã giải ngân' ? '#10b981' : '#f59e0b',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {loan.disbursementStatus}
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
