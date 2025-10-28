import { useState } from 'react';
import { Download, Calendar, FileText, TrendingUp, TrendingDown, DollarSign, Users, PieChart, BarChart3, Activity } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    from: '2025-10-01',
    to: '2025-10-23',
  });
  const [selectedTab, setSelectedTab] = useState('overview'); // overview, financial, operational

  const handleGenerateReport = () => {
    alert(
      `📊 Tạo báo cáo\n\n` +
      `Loại báo cáo: ${reportType === 'daily' ? 'Theo ngày' : reportType === 'monthly' ? 'Theo tháng' : 'Theo năm'}\n` +
      `Từ ngày: ${dateRange.from}\n` +
      `Đến ngày: ${dateRange.to}\n\n` +
      `Trong ứng dụng thực tế, báo cáo sẽ được tạo và tải xuống.`
    );
  };

  const handleDownloadReport = (reportName) => {
    alert(
      `📥 Tải xuống báo cáo\n\n` +
      `Báo cáo: ${reportName}\n` +
      `Định dạng: PDF/Excel\n\n` +
      `Trong ứng dụng thực tế, file sẽ được tải về máy.`
    );
  };

  // Mock data for charts
  const monthlyRevenue = [
    { month: 'T1', value: 15000000000, growth: 12 },
    { month: 'T2', value: 16500000000, growth: 10 },
    { month: 'T3', value: 14800000000, growth: -10 },
    { month: 'T4', value: 17200000000, growth: 16 },
    { month: 'T5', value: 18500000000, growth: 8 },
    { month: 'T6', value: 19200000000, growth: 4 },
    { month: 'T7', value: 17800000000, growth: -7 },
    { month: 'T8', value: 20100000000, growth: 13 },
    { month: 'T9', value: 21500000000, growth: 7 },
    { month: 'T10', value: 18500000000, growth: -14 },
  ];

  const loansByType = [
    { type: 'Vay mua nhà', amount: 25000000000, percentage: 35, color: '#3b82f6' },
    { type: 'Vay kinh doanh', amount: 18000000000, percentage: 25, color: '#10b981' },
    { type: 'Vay tiêu dùng', amount: 14000000000, percentage: 20, color: '#f59e0b' },
    { type: 'Vay mua xe', amount: 10000000000, percentage: 14, color: '#8b5cf6' },
    { type: 'Khác', amount: 4000000000, percentage: 6, color: '#6b7280' },
  ];

  const branchPerformance = [
    { branch: 'CN Quận 1', revenue: 8500000000, transactions: 12450, rating: 95 },
    { branch: 'CN Quận 3', revenue: 7200000000, transactions: 10230, rating: 88 },
    { branch: 'CN Quận 7', revenue: 6800000000, transactions: 9870, rating: 85 },
    { branch: 'CN Bình Thạnh', revenue: 5900000000, transactions: 8560, rating: 82 },
    { branch: 'CN Tân Bình', revenue: 5400000000, transactions: 7890, rating: 78 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value));

  return (
    <div className="fade-in">
      {/* Tabs */}
      <div className="teller-card" style={{marginBottom: '1rem'}}>
        <div className="teller-card-body" style={{padding: '0.75rem'}}>
          <div style={{display: 'flex', gap: '0.375rem', flexWrap: 'wrap'}}>
            <button
              className={`teller-btn ${selectedTab === 'overview' ? 'teller-btn-primary' : 'teller-btn-secondary'}`}
              style={{padding: '0.625rem 1rem', fontSize: '0.875rem'}}
              onClick={() => setSelectedTab('overview')}
            >
              <PieChart size={16} /> Tổng quan
            </button>
            <button
              className={`teller-btn ${selectedTab === 'financial' ? 'teller-btn-primary' : 'teller-btn-secondary'}`}
              style={{padding: '0.625rem 1rem', fontSize: '0.875rem'}}
              onClick={() => setSelectedTab('financial')}
            >
              <DollarSign size={16} /> Tài chính
            </button>
            <button
              className={`teller-btn ${selectedTab === 'operational' ? 'teller-btn-primary' : 'teller-btn-secondary'}`}
              style={{padding: '0.625rem 1rem', fontSize: '0.875rem'}}
              onClick={() => setSelectedTab('operational')}
            >
              <Activity size={16} /> Nghiệp vụ
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <>
          {/* KPI Cards - Ultra Compact in One Row */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.625rem', marginBottom: '1rem'}}>
            <div className="teller-card" style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '1px solid #93c5fd'}}>
              <div className="teller-card-body" style={{padding: '0.75rem', textAlign: 'center'}}>
                <TrendingUp size={20} style={{color: '#3b82f6', margin: '0 auto 0.375rem'}} />
                <div style={{fontSize: '1rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.188rem', lineHeight: 1.2}}>
                  185B
                </div>
                <div style={{fontSize: '0.688rem', color: '#1e40af', fontWeight: 500}}>Doanh thu</div>
                <div style={{fontSize: '0.625rem', color: '#3b82f6', marginTop: '0.25rem'}}>
                  +12.5%
                </div>
              </div>
            </div>

            <div className="teller-card" style={{background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '1px solid #6ee7b7'}}>
              <div className="teller-card-body" style={{padding: '0.75rem', textAlign: 'center'}}>
                <Users size={20} style={{color: '#10b981', margin: '0 auto 0.375rem'}} />
                <div style={{fontSize: '1rem', fontWeight: 700, color: '#065f46', marginBottom: '0.188rem', lineHeight: 1.2}}>
                  42,702
                </div>
                <div style={{fontSize: '0.688rem', color: '#065f46', fontWeight: 500}}>Khách hàng</div>
                <div style={{fontSize: '0.625rem', color: '#10b981', marginTop: '0.25rem'}}>
                  +2,345
                </div>
              </div>
            </div>

            <div className="teller-card" style={{background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '1px solid #fcd34d'}}>
              <div className="teller-card-body" style={{padding: '0.75rem', textAlign: 'center'}}>
                <DollarSign size={20} style={{color: '#f59e0b', margin: '0 auto 0.375rem'}} />
                <div style={{fontSize: '1rem', fontWeight: 700, color: '#78350f', marginBottom: '0.188rem', lineHeight: 1.2}}>
                  420B
                </div>
                <div style={{fontSize: '0.688rem', color: '#78350f', fontWeight: 500}}>Dư nợ</div>
                <div style={{fontSize: '0.625rem', color: '#f59e0b', marginTop: '0.25rem'}}>
                  +8.3%
                </div>
              </div>
            </div>

            <div className="teller-card" style={{background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '1px solid #a5b4fc'}}>
              <div className="teller-card-body" style={{padding: '0.75rem', textAlign: 'center'}}>
                <FileText size={20} style={{color: '#6366f1', margin: '0 auto 0.375rem'}} />
                <div style={{fontSize: '1rem', fontWeight: 700, color: '#312e81', marginBottom: '0.188rem', lineHeight: 1.2}}>
                  425K
                </div>
                <div style={{fontSize: '0.688rem', color: '#312e81', fontWeight: 500}}>Giao dịch</div>
                <div style={{fontSize: '0.625rem', color: '#6366f1', marginTop: '0.25rem'}}>
                  +15.2%
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart - Compact */}
          <div className="teller-card" style={{marginBottom: '1rem'}}>
            <div className="teller-card-header blue">
              <h3 style={{fontSize: '0.95rem'}}>
                <BarChart3 size={18} />
                Doanh thu 10 tháng đầu năm 2025
              </h3>
            </div>
            <div className="teller-card-body" style={{padding: '1.5rem 1rem 1rem'}}>
              <div style={{display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: '200px'}}>
                {monthlyRevenue.map((item, index) => (
                  <div key={index} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%'}}>
                    <div 
                      style={{
                        width: '100%',
                        height: `${(item.value / maxRevenue) * 80}%`,
                        background: index === monthlyRevenue.length - 1 
                          ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)'
                          : 'linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 100%)',
                        borderRadius: '6px 6px 0 0',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        minHeight: '20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'brightness(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'brightness(1)';
                      }}
                      title={formatCurrency(item.value)}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '-28px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px'
                      }}>
                        <div style={{
                          fontSize: '0.625rem',
                          fontWeight: 700,
                          color: '#1e40af',
                          whiteSpace: 'nowrap',
                          background: 'white',
                          padding: '1px 4px',
                          borderRadius: '4px'
                        }}>
                          {(item.value / 1000000000).toFixed(1)}B
                        </div>
                        <div style={{fontSize: '0.625rem', fontWeight: 600, color: item.growth >= 0 ? '#10b981' : '#ef4444'}}>
                          {item.growth >= 0 ? '+' : ''}{item.growth}%
                        </div>
                      </div>
                    </div>
                    <div style={{fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginTop: '0.5rem'}}>
                      {item.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loan Distribution & Branch Performance */}
          <div className="teller-grid-2" style={{marginBottom: '1rem', gap: '0.75rem'}}>
            <div className="teller-card">
              <div className="teller-card-header purple">
                <h3 style={{fontSize: '0.95rem'}}>
                  <PieChart size={18} />
                  Phân bố dư nợ theo loại hình
                </h3>
              </div>
              <div className="teller-card-body" style={{padding: '1rem'}}>
                {loansByType.map((item, index) => (
                  <div key={index} style={{marginBottom: '0.75rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.375rem'}}>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '2px',
                          background: item.color
                        }}></div>
                        <span style={{fontSize: '0.813rem', fontWeight: 500, color: '#374151'}}>{item.type}</span>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.813rem', fontWeight: 700, color: '#1f2937'}}>
                          {formatCurrency(item.amount)}
                        </div>
                        <div style={{fontSize: '0.688rem', color: '#6b7280'}}>
                          {item.percentage}%
                        </div>
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#f3f4f6',
                      borderRadius: '9999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${item.percentage}%`,
                        height: '100%',
                        background: item.color,
                        borderRadius: '9999px',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="teller-card">
              <div className="teller-card-header green">
                <h3 style={{fontSize: '0.95rem'}}>
                  <Activity size={18} />
                  Hiệu suất chi nhánh
                </h3>
              </div>
              <div className="teller-card-body" style={{padding: 0}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#f8fafc', borderBottom: '2px solid #e2e8f0'}}>
                      <th style={{padding: '0.75rem', textAlign: 'left', fontWeight: 600, fontSize: '0.813rem', color: '#374151'}}>Chi nhánh</th>
                      <th style={{padding: '0.75rem', textAlign: 'right', fontWeight: 600, fontSize: '0.813rem', color: '#374151'}}>Doanh thu</th>
                      <th style={{padding: '0.75rem', textAlign: 'center', fontWeight: 600, fontSize: '0.813rem', color: '#374151'}}>Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchPerformance.map((branch, index) => (
                      <tr key={index} style={{borderBottom: '1px solid #e5e7eb', background: index % 2 === 0 ? '#ffffff' : '#f9fafb'}}>
                        <td style={{padding: '0.75rem'}}>
                          <div style={{fontWeight: 600, color: '#1f2937', fontSize: '0.813rem'}}>{branch.branch}</div>
                          <div style={{fontSize: '0.688rem', color: '#6b7280', marginTop: '0.125rem'}}>
                            {branch.transactions.toLocaleString()} GD
                          </div>
                        </td>
                        <td style={{padding: '0.75rem', textAlign: 'right', fontWeight: 700, color: '#1f2937', fontSize: '0.813rem'}}>
                          {formatCurrency(branch.revenue)}
                        </td>
                        <td style={{padding: '0.75rem', textAlign: 'center'}}>
                          <div style={{
                            display: 'inline-block',
                            padding: '0.188rem 0.625rem',
                            borderRadius: '9999px',
                            background: branch.rating >= 90 ? '#d1fae5' : branch.rating >= 80 ? '#fef3c7' : '#fee2e2',
                            color: branch.rating >= 90 ? '#065f46' : branch.rating >= 80 ? '#78350f' : '#991b1b',
                            fontSize: '0.688rem',
                            fontWeight: 700
                          }}>
                            {branch.rating}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Financial Tab */}
      {selectedTab === 'financial' && (
        <>
          <div className="teller-card" style={{marginBottom: '1.5rem'}}>
            <div className="teller-card-header blue">
              <h3>
                <DollarSign size={20} />
                Tạo báo cáo tài chính
              </h3>
            </div>
            <div className="teller-card-body">
              <div className="teller-grid-3" style={{marginBottom: '1.5rem'}}>
                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <FileText size={16} /> Loại báo cáo
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="teller-form-select"
                  >
                    <option value="daily">Báo cáo theo ngày</option>
                    <option value="monthly">Báo cáo theo tháng</option>
                    <option value="yearly">Báo cáo theo năm</option>
                    <option value="branch">Báo cáo theo chi nhánh</option>
                    <option value="profit">Báo cáo lợi nhuận</option>
                    <option value="balance">Bảng cân đối kế toán</option>
                  </select>
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Calendar size={16} /> Từ ngày
                  </label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="teller-form-input"
                  />
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Calendar size={16} /> Đến ngày
                  </label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="teller-form-input"
                  />
                </div>
              </div>

              <div className="teller-actions">
                <button className="teller-btn teller-btn-primary" onClick={handleGenerateReport}>
                  <FileText size={18} />
                  Tạo báo cáo
                </button>
                <button className="teller-btn teller-btn-success" onClick={() => handleDownloadReport('Báo cáo tài chính')}>
                  <Download size={18} />
                  Tải xuống
                </button>
              </div>
            </div>
          </div>

          <div className="teller-grid-2">
            <div className="teller-card">
              <div className="teller-card-header green">
                <h3>Báo cáo tài chính có sẵn</h3>
              </div>
              <div className="teller-card-body" style={{padding: '0.5rem'}}>
                {[
                  { name: 'Báo cáo doanh thu tháng 10/2025', date: '23/10/2025', size: '2.4 MB' },
                  { name: 'Báo cáo chi phí Q3/2025', date: '01/10/2025', size: '1.8 MB' },
                  { name: 'Báo cáo lợi nhuận năm 2024', date: '15/01/2025', size: '3.2 MB' },
                  { name: 'Bảng cân đối kế toán Q2/2025', date: '30/06/2025', size: '4.1 MB' },
                ].map((report, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      margin: '0.5rem',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
                      e.currentTarget.style.borderColor = '#86efac';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    onClick={() => handleDownloadReport(report.name)}
                  >
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, fontSize: '0.9rem', color: '#1f2937', marginBottom: '0.25rem'}}>
                        {report.name}
                      </div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>
                        {report.date} • {report.size}
                      </div>
                    </div>
                    <Download size={20} style={{color: '#10b981'}} />
                  </div>
                ))}
              </div>
            </div>

            <div className="teller-card">
              <div className="teller-card-header purple">
                <h3>Thống kê tài chính tháng 10/2025</h3>
              </div>
              <div className="teller-card-body">
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Doanh thu</span>
                    <span style={{fontSize: '1rem', fontWeight: 700, color: '#10b981'}}>
                      {formatCurrency(18500000000)}
                    </span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Chi phí</span>
                    <span style={{fontSize: '1rem', fontWeight: 700, color: '#ef4444'}}>
                      {formatCurrency(12300000000)}
                    </span>
                  </div>
                  <div style={{borderTop: '2px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.75rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '1rem', fontWeight: 600, color: '#374151'}}>Lợi nhuận</span>
                      <span style={{fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6'}}>
                        {formatCurrency(6200000000)}
                      </span>
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#10b981', textAlign: 'right', marginTop: '0.25rem'}}>
                      <TrendingUp size={12} style={{display: 'inline', marginRight: '0.25rem'}} />
                      Biên lợi nhuận: 33.5%
                    </div>
                  </div>
                </div>

                <div style={{padding: '1rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac'}}>
                  <div style={{fontWeight: 600, color: '#166534', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                    📈 So với tháng trước
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#15803d', marginBottom: '0.25rem'}}>
                    • Doanh thu tăng 8.3%
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#15803d', marginBottom: '0.25rem'}}>
                    • Chi phí giảm 2.1%
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#15803d'}}>
                    • Lợi nhuận tăng 15.7%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Operational Tab */}
      {selectedTab === 'operational' && (
        <>
          <div className="teller-card" style={{marginBottom: '1.5rem'}}>
            <div className="teller-card-header">
              <h3>
                <Activity size={20} />
                Tạo báo cáo nghiệp vụ
              </h3>
            </div>
            <div className="teller-card-body">
              <div className="teller-grid-3" style={{marginBottom: '1.5rem'}}>
                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <FileText size={16} /> Loại báo cáo
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="teller-form-select"
                  >
                    <option value="loan">Báo cáo tín dụng</option>
                    <option value="deposit">Báo cáo huy động</option>
                    <option value="employee">Báo cáo hiệu suất nhân viên</option>
                    <option value="branch">Báo cáo chi nhánh</option>
                    <option value="npl">Báo cáo nợ xấu</option>
                  </select>
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Calendar size={16} /> Từ ngày
                  </label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="teller-form-input"
                  />
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Calendar size={16} /> Đến ngày
                  </label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="teller-form-input"
                  />
                </div>
              </div>

              <div className="teller-actions">
                <button className="teller-btn teller-btn-primary" onClick={handleGenerateReport}>
                  <FileText size={18} />
                  Tạo báo cáo
                </button>
                <button className="teller-btn teller-btn-success" onClick={() => handleDownloadReport('Báo cáo nghiệp vụ')}>
                  <Download size={18} />
                  Tải xuống
                </button>
              </div>
            </div>
          </div>

          <div className="teller-grid-2">
            <div className="teller-card">
              <div className="teller-card-header">
                <h3>Báo cáo nghiệp vụ có sẵn</h3>
              </div>
              <div className="teller-card-body" style={{padding: '0.5rem'}}>
                {[
                  { name: 'Báo cáo tín dụng tháng 10/2025', date: '23/10/2025', size: '1.9 MB', type: 'loan' },
                  { name: 'Báo cáo huy động vốn Q3/2025', date: '01/10/2025', size: '2.1 MB', type: 'deposit' },
                  { name: 'Báo cáo nợ xấu tháng 09/2025', date: '30/09/2025', size: '1.5 MB', type: 'npl' },
                  { name: 'Báo cáo hiệu suất nhân viên Q3/2025', date: '05/10/2025', size: '2.8 MB', type: 'employee' },
                ].map((report, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      margin: '0.5rem',
                      background: '#f9fafb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                      e.currentTarget.style.borderColor = '#93c5fd';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    onClick={() => handleDownloadReport(report.name)}
                  >
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, fontSize: '0.9rem', color: '#1f2937', marginBottom: '0.25rem'}}>
                        {report.name}
                      </div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>
                        {report.date} • {report.size}
                      </div>
                    </div>
                    <Download size={20} style={{color: '#3b82f6'}} />
                  </div>
                ))}
              </div>
            </div>

            <div className="teller-card">
              <div className="teller-card-header" style={{background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderBottom: '2px solid #dc2626'}}>
                <h3 style={{color: '#991b1b'}}>
                  <TrendingDown size={20} />
                  Cảnh báo nợ xấu
                </h3>
              </div>
              <div className="teller-card-body">
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Tổng dư nợ xấu</span>
                    <span style={{fontSize: '1rem', fontWeight: 700, color: '#ef4444'}}>
                      {formatCurrency(48500000000)}
                    </span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Tỷ lệ nợ xấu</span>
                    <span style={{fontSize: '1rem', fontWeight: 700, color: '#dc2626'}}>
                      1.85%
                    </span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Số hồ sơ quá hạn</span>
                    <span style={{fontSize: '1rem', fontWeight: 700, color: '#f59e0b'}}>
                      247 hồ sơ
                    </span>
                  </div>
                </div>

                <div style={{padding: '1rem', background: '#fef3c7', borderRadius: '12px', border: '1px solid #f59e0b', marginBottom: '1rem'}}>
                  <div style={{fontWeight: 600, color: '#92400e', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                    ⚠️ Phân loại nợ xấu
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#78350f', marginBottom: '0.25rem'}}>
                    • Nợ nhóm 3: {formatCurrency(15200000000)}
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#78350f', marginBottom: '0.25rem'}}>
                    • Nợ nhóm 4: {formatCurrency(22100000000)}
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#78350f'}}>
                    • Nợ nhóm 5: {formatCurrency(11200000000)}
                  </div>
                </div>

                <div style={{padding: '1rem', background: '#fee2e2', borderRadius: '12px', border: '1px solid #dc2626'}}>
                  <div style={{fontWeight: 600, color: '#991b1b', marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                    🚨 Hành động cần thiết
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#7f1d1d'}}>
                    Cần xử lý 32 hồ sơ quá hạn trên 90 ngày trong tuần này
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
