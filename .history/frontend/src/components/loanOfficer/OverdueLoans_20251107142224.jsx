import { useState, useMemo } from 'react';
import { Eye, Phone, Mail, AlertTriangle, TrendingDown, Clock, Search, Calendar, Filter, X } from 'lucide-react';
import { formatCurrency, formatDate, getOverdueLoansWithDetails } from '../../data/mockData';
import LoanDetailModal from './LoanDetailModal';
import '../../styles/TellerDashboard.css';

const OverdueLoans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    searchText: '',
    loanType: '',
    overdueDaysFilter: '', // all, under30, 30to60, over90
    dateFrom: '',
    dateTo: '',
  });

  // Lấy danh sách khoản vay quá hạn với đầy đủ thông tin  
  const overdueLoans = getOverdueLoansWithDetails();
  
  // Hard-coded data (không dùng nữa)
  const overdueLoans_old = [
    {
      id: 1,
      loanNumber: 'LN002120',
      customerName: 'Đặng Văn G',
      customerCode: 'KH045678',
      phone: '0987654321',
      email: 'dangvang@email.com',
      customerPhone: '0987654321',
      customerEmail: 'dangvang@email.com',
      customerAddress: '789 Võ Văn Tần, Quận 3, TP.HCM',
      customerOccupation: 'Nhân viên văn phòng',
      customerMonthlyIncome: 25000000,
      debtRatio: 38,
      creditScore: 650,
      creditGrade: 'B',
      employmentStatus: 'STABLE',
      loanType: 'Vay tiêu dùng',
      loanAmount: 150000000,
      termMonths: 36,
      purpose: 'Trang trải chi phí cá nhân và mua sắm',
      submissionDate: '2023-08-15T10:30:00',
      outstandingBalance: 95000000,
      overdueDays: 45,
      overdueAmount: 8500000,
      lastPaymentDate: '08/09/2025',
      nextPaymentDue: '08/10/2025',
      status: 'Quá hạn 30-60 ngày',
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Hợp đồng lao động', status: 'VERIFIED' },
        { name: 'Bảng lương 6 tháng', status: 'VERIFIED' },
      ],
      notes: 'Khách hàng đã liên hệ cam kết thanh toán trong tuần tới. Cần theo dõi sát.',
    },
    {
      id: 2,
      loanNumber: 'LN001985',
      customerName: 'Võ Thị H',
      customerCode: 'KH056789',
      phone: '0976543210',
      email: 'vothih@email.com',
      customerPhone: '0976543210',
      customerEmail: 'vothih@email.com',
      customerAddress: '456 Nguyễn Đình Chiểu, Quận 1, TP.HCM',
      customerOccupation: 'Giám đốc công ty',
      customerMonthlyIncome: 85000000,
      debtRatio: 42,
      creditScore: 720,
      creditGrade: 'A',
      employmentStatus: 'STABLE',
      loanType: 'Vay mua nhà',
      loanAmount: 1500000000,
      termMonths: 180,
      purpose: 'Mua căn hộ chung cư cao cấp',
      submissionDate: '2022-05-10T14:15:00',
      outstandingBalance: 1200000000,
      overdueDays: 15,
      overdueAmount: 15000000,
      lastPaymentDate: '08/10/2025',
      nextPaymentDue: '08/10/2025',
      status: 'Quá hạn dưới 30 ngày',
      collateralType: 'Bất động sản',
      collateralName: 'Căn hộ Vinhomes Central Park',
      collateralAddress: '456 Nguyễn Hữu Cảnh, Quận Bình Thạnh, TP.HCM',
      collateralCertificate: 'SH-2022-12345',
      collateralValue: 2500000000,
      appraisedValue: 2400000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá ABC',
      appraisedDate: '2022-05-05',
      ltvRatio: 62.5,
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Sổ hộ khẩu', status: 'VERIFIED' },
        { name: 'Sổ hồng nhà đất', status: 'VERIFIED' },
        { name: 'Báo cáo thẩm định giá', status: 'VERIFIED' },
        { name: 'Hợp đồng mua bán', status: 'VERIFIED' },
      ],
      notes: 'Khách hàng đang đi công tác nước ngoài. Đã gửi email nhắc nhở nhiều lần.',
    },
    {
      id: 3,
      loanNumber: 'LN001756',
      customerName: 'Bùi Văn I',
      customerCode: 'KH067890',
      phone: '0965432109',
      email: 'buivani@email.com',
      customerPhone: '0965432109',
      customerEmail: 'buivani@email.com',
      customerAddress: '321 Lê Văn Sỹ, Quận Tân Bình, TP.HCM',
      customerOccupation: 'Chủ doanh nghiệp',
      customerMonthlyIncome: 60000000,
      debtRatio: 65,
      creditScore: 580,
      creditGrade: 'C',
      employmentStatus: 'UNSTABLE',
      loanType: 'Vay kinh doanh',
      loanAmount: 600000000,
      termMonths: 60,
      purpose: 'Mở rộng kinh doanh và nhập hàng hóa',
      submissionDate: '2022-11-20T09:00:00',
      outstandingBalance: 450000000,
      overdueDays: 92,
      overdueAmount: 25000000,
      lastPaymentDate: '22/07/2025',
      nextPaymentDue: '22/08/2025',
      status: 'Quá hạn trên 90 ngày',
      collateralType: 'Bất động sản',
      collateralName: 'Nhà phố 2 mặt tiền',
      collateralAddress: '123 Trần Hưng Đạo, Quận 5, TP.HCM',
      collateralCertificate: 'SD-2022-98765',
      collateralValue: 1200000000,
      appraisedValue: 1150000000,
      appraisedBy: 'Công ty TNHH Thẩm định giá XYZ',
      appraisedDate: '2022-11-15',
      ltvRatio: 52.2,
      documents: [
        { name: 'CMND/CCCD', status: 'VERIFIED' },
        { name: 'Giấy phép kinh doanh', status: 'VERIFIED' },
        { name: 'Báo cáo tài chính', status: 'PENDING' },
        { name: 'Sổ đỏ nhà đất', status: 'VERIFIED' },
        { name: 'Hợp đồng thuê mặt bằng', status: 'VERIFIED' },
      ],
      notes: 'CẢNH BÁO: Khách hàng không liên lạc được. Kinh doanh gặp khó khăn. Cần xem xét biện pháp pháp lý để thu hồi nợ.',
    },
  ];

  const handleViewDetail = (loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  // Filtered loans
  const filteredLoans = useMemo(() => {
    return overdueLoans.filter(loan => {
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

      // Overdue days filter
      if (filters.overdueDaysFilter === 'under30' && loan.overdueDays >= 30) {
        return false;
      }
      if (filters.overdueDaysFilter === '30to60' && (loan.overdueDays < 30 || loan.overdueDays > 90)) {
        return false;
      }
      if (filters.overdueDaysFilter === 'over90' && loan.overdueDays <= 90) {
        return false;
      }

      return true;
    });
  }, [filters, overdueLoans]);

  const handleContact = (loan, method) => {
    alert(
      `📞 Liên hệ khách hàng qua ${method === 'phone' ? 'điện thoại' : 'email'}\n\n` +
      `Khách hàng: ${loan.customerName}\n` +
      `Mã hồ sơ: ${loan.loan_number}\n` +
      `${method === 'phone' ? 'SĐT' : 'Email'}: ${method === 'phone' ? loan.phone : loan.email}\n` +
      `Số tiền quá hạn: ${formatCurrency(loan.overdueAmount)}\n` +
      `Số ngày quá hạn: ${loan.overdueDays} ngày`
    );
  };

  const handleClearFilters = () => {
    setFilters({
      searchText: '',
      loanType: '',
      overdueDaysFilter: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.searchText || filters.loanType || filters.overdueDaysFilter || filters.dateFrom || filters.dateTo;

  const getStatusColor = (status) => {
    if (status.includes('dưới 30')) return 'badge-warning';
    if (status.includes('30-60')) return 'badge-danger';
    return 'badge-dark';
  };

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
            {/* Overdue Days Filter */}
            <div className="teller-form-group">
              <label className="teller-form-label">
                <Filter size={16} />
                Số ngày quá hạn
              </label>
              <select
                className="teller-form-select"
                value={filters.overdueDaysFilter}
                onChange={(e) => setFilters({...filters, overdueDaysFilter: e.target.value})}
              >
                <option value="">Tất cả</option>
                <option value="under30">Dưới 30 ngày</option>
                <option value="30to60">30-90 ngày</option>
                <option value="over90">Trên 90 ngày</option>
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
              Tìm thấy <strong style={{color: '#dc2626'}}>{filteredLoans.length}</strong> hồ sơ quá hạn
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
          <h3 style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#991b1b'}}>
            <AlertTriangle size={20} />
            Danh sách nợ quá hạn ({filteredLoans.length})
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
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Liên hệ</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Loại vay</th>
                    <th style={{padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#374151'}}>Dư nợ gốc</th>
                    <th style={{padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#374151'}}>Số tiền quá hạn</th>
                    <th style={{padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151'}}>Số ngày</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151'}}>Ngày TT cuối</th>
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
                    <td style={{padding: '1rem'}}>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button
                          className="teller-btn teller-btn-secondary"
                          style={{padding: '0.5rem', minWidth: 'auto'}}
                          onClick={() => handleContact(loan, 'phone')}
                          title="Gọi điện"
                        >
                          <Phone size={14} />
                        </button>
                        <button
                          className="teller-btn teller-btn-secondary"
                          style={{padding: '0.5rem', minWidth: 'auto'}}
                          onClick={() => handleContact(loan, 'email')}
                          title="Gửi email"
                        >
                          <Mail size={14} />
                        </button>
                      </div>
                    </td>
                    <td style={{padding: '1rem', color: '#374151'}}>{loan.loanTypeName}</td>
                    <td style={{padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#1f2937'}}>
                      {formatCurrency(loan.outstandingBalance)}
                    </td>
                    <td style={{padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#dc2626'}}>
                      {formatCurrency(loan.overdueAmount)}
                    </td>
                    <td style={{padding: '1rem', textAlign: 'center'}}>
                      <span 
                        className="badge"
                        style={{
                          background: loan.overdueDays > 90 ? '#dc2626' : loan.overdueDays > 30 ? '#f59e0b' : '#10b981',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {loan.overdueDays} ngày
                      </span>
                    </td>
                    <td style={{padding: '1rem', color: '#374151'}}>{loan.lastPaymentDate}</td>
                    <td style={{padding: '1rem', textAlign: 'center'}}>
                      <span 
                        className="badge"
                        style={{
                          background: getStatusColor(loan.status) === 'badge-warning' ? '#f59e0b' : 
                                     getStatusColor(loan.status) === 'badge-danger' ? '#dc2626' : '#374151',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {loan.status}
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

      <div className="teller-grid-2" style={{marginTop: '1.5rem'}}>
        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            borderBottom: '2px solid #9ca3af'
          }}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#374151'}}>
              <Clock size={20} />
              Phân loại theo thời gian quá hạn
            </h3>
          </div>
          <div className="teller-card-body">
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b'}}>
                <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#92400e'}}>Dưới 30 ngày</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span 
                    className="badge"
                    style={{
                      background: '#f59e0b',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {filteredLoans.filter(l => l.status.includes('dưới 30')).length} hồ sơ
                  </span>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#fee2e2', borderRadius: '8px', border: '1px solid #dc2626'}}>
                <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#991b1b'}}>30-60 ngày</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span 
                    className="badge"
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {filteredLoans.filter(l => l.status.includes('30-60')).length} hồ sơ
                  </span>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f3f4f6', borderRadius: '8px', border: '1px solid #374151'}}>
                <span style={{fontSize: '0.875rem', fontWeight: 500, color: '#374151'}}>Trên 90 ngày</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <span 
                    className="badge"
                    style={{
                      background: '#374151',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {filteredLoans.filter(l => l.status.includes('trên 90')).length} hồ sơ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderBottom: '2px solid #f59e0b'
          }}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#92400e'}}>
              <AlertTriangle size={20} />
              Hành động cần thực hiện
            </h3>
          </div>
          <div className="teller-card-body">
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b'}}>
                <div style={{fontWeight: 600, marginBottom: '0.5rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  ⚠️ Ưu tiên cao
                </div>
                <div style={{fontSize: '0.875rem', color: '#78350f'}}>
                  {filteredLoans.filter(l => l.overdueDays > 90).length} hồ sơ quá hạn trên 90 ngày cần xử lý gấp
                </div>
              </div>
              <div style={{padding: '1rem', background: '#dbeafe', borderRadius: '8px', border: '1px solid #3b82f6'}}>
                <div style={{fontWeight: 600, marginBottom: '0.5rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  📞 Liên hệ khách hàng
                </div>
                <div style={{fontSize: '0.875rem', color: '#1e3a8a'}}>
                  Gọi điện nhắc nhở {filteredLoans.filter(l => l.overdueDays > 30 && l.overdueDays <= 90).length} khách hàng
                </div>
              </div>
              <div style={{padding: '1rem', background: '#fee2e2', borderRadius: '8px', border: '1px solid #dc2626'}}>
                <div style={{fontWeight: 600, marginBottom: '0.5rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  ⚖️ Xem xét pháp lý
                </div>
                <div style={{fontSize: '0.875rem', color: '#7f1d1d'}}>
                  Chuẩn bị hồ sơ pháp lý cho {filteredLoans.filter(l => l.overdueDays > 90).length} trường hợp
                </div>
              </div>
            </div>
          </div>
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

export default OverdueLoans;

