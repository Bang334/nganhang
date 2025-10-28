import { useState } from 'react';
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  PieChart,
  RefreshCw,
  Eye,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { systemStats, formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Mock data for enhanced dashboard
  const growthData = [
    { label: 'Khách hàng mới', value: 245, change: 12.5, trend: 'up' },
    { label: 'Tài khoản mở mới', value: 320, change: 8.3, trend: 'up' },
    { label: 'Hồ sơ vay duyệt', value: 68, change: -2.1, trend: 'down' },
    { label: 'Thẻ phát hành', value: 412, change: 15.7, trend: 'up' },
    { label: 'Giao dịch thành công', value: 15420, change: 5.2, trend: 'up' },
    { label: 'Doanh thu', value: 15680000, change: 18.4, trend: 'up' }
  ];

  const branchPerformance = [
    {
      name: 'Hà Nội - Hoàn Kiếm',
      customers: 15234,
      employees: 45,
      revenue: 8500000000,
      rating: 95,
      status: 'excellent',
      trend: 'up'
    },
    {
      name: 'TP.HCM - Quận 1',
      customers: 18567,
      employees: 52,
      revenue: 12500000000,
      rating: 98,
      status: 'excellent',
      trend: 'up'
    },
    {
      name: 'Đà Nẵng - Hải Châu',
      customers: 8901,
      employees: 28,
      revenue: 4200000000,
      rating: 87,
      status: 'good',
      trend: 'up'
    },
    {
      name: 'Cần Thơ - Ninh Kiều',
      customers: 6543,
      employees: 22,
      revenue: 3100000000,
      rating: 82,
      status: 'good',
      trend: 'down'
    }
  ];

  const recentTransactions = [
    {
      time: '11:30 - 23/10/2025',
      branch: 'Hà Nội - Hoàn Kiếm',
      type: 'Nạp tiền',
      customer: 'Nguyễn Văn A',
      amount: 50000000,
      status: 'success',
      typeColor: 'success'
    },
    {
      time: '11:15 - 23/10/2025',
      branch: 'TP.HCM - Quận 1',
      type: 'Mở tài khoản',
      customer: 'Trần Thị B',
      amount: 10000000,
      status: 'success',
      typeColor: 'primary'
    },
    {
      time: '11:00 - 23/10/2025',
      branch: 'Đà Nẵng - Hải Châu',
      type: 'Duyệt vay',
      customer: 'Lê Văn C',
      amount: 500000000,
      status: 'success',
      typeColor: 'warning'
    },
    {
      time: '10:45 - 23/10/2025',
      branch: 'Hà Nội - Hoàn Kiếm',
      type: 'Rút tiền',
      customer: 'Phạm Thị D',
      amount: -20000000,
      status: 'success',
      typeColor: 'danger'
    },
    {
      time: '10:30 - 23/10/2025',
      branch: 'TP.HCM - Quận 1',
      type: 'Chuyển khoản',
      customer: 'Hoàng Minh E',
      amount: -15000000,
      status: 'pending',
      typeColor: 'info'
    }
  ];

  const alerts = [
    { type: 'warning', message: '3 hồ sơ vay sắp đến hạn duyệt', time: '2 giờ trước' },
    { type: 'info', message: 'Báo cáo tháng đã được tạo', time: '4 giờ trước' },
    { type: 'success', message: 'Hệ thống backup hoàn tất', time: '6 giờ trước' }
  ];

  return (
    <div className="fade-in" style={{ padding: '0' }}>
      {/* Header with Actions */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        padding: '0 0.5rem'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1f2937',
            margin: '0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Tổng quan hệ thống
          </h2>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
            Theo dõi hiệu suất và hoạt động ngân hàng
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="teller-form-select"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="1year">1 năm qua</option>
          </select>
          
          <button
            className="teller-btn teller-btn-secondary"
            onClick={handleRefresh}
            style={{ padding: '0.5rem', minWidth: 'auto' }}
            disabled={isRefreshing}
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          
          <button className="teller-btn teller-btn-primary" style={{ padding: '0.5rem 1rem',width: '300px' }}>
            <Download size={30} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  Tổng khách hàng
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {systemStats.totalCustomers.toLocaleString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <ArrowUpRight size={16} />
                  <span>+12.5% so với tháng trước</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <Users size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
        }}>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  Tổng huy động
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {(systemStats.totalDeposits / 1000000000).toFixed(1)}B ₫
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <ArrowUpRight size={16} />
                  <span>+8.3% so với tháng trước</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <TrendingUp size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
        }}>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  Tổng cho vay
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {(systemStats.totalLoans / 1000000000).toFixed(1)}B ₫
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <ArrowUpRight size={16} />
                  <span>+5.2% so với tháng trước</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <DollarSign size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
        }}>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  Doanh thu tháng
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {(systemStats.monthlyRevenue / 1000000).toFixed(1)}M ₫
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                  <ArrowUpRight size={16} />
                  <span>+18.4% so với tháng trước</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <Activity size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Savings Interest Rates */}
      <div className="teller-card" style={{ marginBottom: '2rem' }}>
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          borderBottom: '2px solid #0e7490'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
            <TrendingUp size={20} />
            Lãi suất tiết kiệm hiện tại
          </h3>
        </div>
        <div className="teller-card-body" style={{ padding: '1.5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
            gap: '1rem' 
          }}>
            {[
              { term: '1 tháng', rate: 3.5 },
              { term: '3 tháng', rate: 4.2 },
              { term: '6 tháng', rate: 5.0 },
              { term: '12 tháng', rate: 6.5 },
              { term: '24 tháng', rate: 7.2 },
              { term: '36 tháng', rate: 7.8 }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
                borderRadius: '10px',
                border: '1px solid #99f6e4',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#0f766e',
                  fontWeight: '500',
                  marginBottom: '0.375rem'
                }}>
                  {item.term}
                </div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700',
                  color: '#0891b2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}>
                  {item.rate}%
                  <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>/năm</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Analytics Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {/* Growth Analytics */}
        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderBottom: '2px solid #1e40af'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
              <BarChart3 size={20} />
              Biểu đồ tăng trưởng
            </h3>
          </div>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {growthData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: item.trend === 'up' ? '#10b981' : '#ef4444'
                    }}></div>
                    <span style={{ fontWeight: '500', color: '#374151' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '120px', 
                      height: '8px', 
                      background: '#e5e7eb', 
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${Math.min(Math.abs(item.change) * 5, 100)}%`,
                        height: '100%',
                        background: item.trend === 'up' ? 
                          'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                          'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        borderRadius: '9999px',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', minWidth: '80px' }}>
                      {item.trend === 'up' ? <ArrowUpRight size={14} color="#10b981" /> : <ArrowDownRight size={14} color="#ef4444" />}
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '600',
                        color: item.trend === 'up' ? '#10b981' : '#ef4444'
                      }}>
                        {item.trend === 'up' ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Performance */}
        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderBottom: '2px solid #047857'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
              <Building2 size={20} />
              Hoạt động chi nhánh
            </h3>
          </div>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {branchPerformance.map((branch, index) => (
                <div key={index} style={{
                  padding: '1.25rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#1f2937',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {branch.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {branch.customers.toLocaleString()} khách hàng • {branch.employees} nhân viên
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: branch.status === 'excellent' ? '#d1fae5' : '#fef3c7',
                        color: branch.status === 'excellent' ? '#065f46' : '#92400e'
                      }}>
                        {branch.status === 'excellent' ? 'Xuất sắc' : 'Tốt'}
                      </span>
                      <div style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white'
                      }}>
                        {branch.rating}%
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Doanh thu:</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                        {(branch.revenue / 1000000000).toFixed(1)}B ₫
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {branch.trend === 'up' ? <ArrowUpRight size={14} color="#10b981" /> : <ArrowDownRight size={14} color="#ef4444" />}
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        color: branch.trend === 'up' ? '#10b981' : '#ef4444'
                      }}>
                        {branch.trend === 'up' ? '+' : ''}5.2%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Transactions and Alerts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {/* Recent Transactions */}
        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            borderBottom: '2px solid #6d28d9'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
              <Activity size={20} />
              Giao dịch gần đây
            </h3>
          </div>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentTransactions.map((transaction, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: transaction.typeColor === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                               transaction.typeColor === 'primary' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' :
                               transaction.typeColor === 'warning' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                               transaction.typeColor === 'danger' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                               'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    marginRight: '1rem'
                  }}>
                    {transaction.type.charAt(0)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <div>
                        <h4 style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: '#1f2937',
                          margin: '0 0 0.125rem 0'
                        }}>
                          {transaction.type}
                        </h4>
                        <p style={{ 
                          fontSize: '0.75rem', 
                          color: '#6b7280',
                          margin: '0 0 0.125rem 0'
                        }}>
                          {transaction.customer} • {transaction.branch}
                        </p>
                        <p style={{ 
                          fontSize: '0.75rem', 
                          color: '#9ca3af',
                          margin: '0'
                        }}>
                          {transaction.time}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '700',
                          color: transaction.amount > 0 ? '#10b981' : '#ef4444',
                          marginBottom: '0.125rem'
                        }}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                        </div>
                        <span style={{
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.625rem',
                          fontWeight: '600',
                          background: transaction.status === 'success' ? '#d1fae5' : '#fef3c7',
                          color: transaction.status === 'success' ? '#065f46' : '#92400e'
                        }}>
                          {transaction.status === 'success' ? 'Hoàn thành' : 'Đang xử lý'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="teller-card">
          <div className="teller-card-header" style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderBottom: '2px solid #b45309'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
              <AlertTriangle size={20} />
              Thông báo hệ thống
            </h3>
          </div>
          <div className="teller-card-body" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {alerts.map((alert, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  borderLeft: `4px solid ${alert.type === 'warning' ? '#f59e0b' : alert.type === 'info' ? '#3b82f6' : '#10b981'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: alert.type === 'warning' ? '#fef3c7' : alert.type === 'info' ? '#dbeafe' : '#d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '0.125rem'
                    }}>
                      {alert.type === 'warning' ? <AlertTriangle size={14} color="#f59e0b" /> :
                       alert.type === 'info' ? <Clock size={14} color="#3b82f6" /> :
                       <CheckCircle size={14} color="#10b981" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#1f2937',
                        margin: '0 0 0.25rem 0',
                        lineHeight: '1.4'
                      }}>
                        {alert.message}
                      </p>
                      <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#9ca3af',
                        margin: '0'
                      }}>
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="teller-card">
        <div className="teller-card-header" style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          borderBottom: '2px solid #3730a3'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', margin: '0' }}>
            <Target size={20} />
            Thao tác nhanh
          </h3>
        </div>
        <div className="teller-card-body" style={{ padding: '1.5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <button className="teller-btn teller-btn-primary" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users size={20} />
              Quản lý khách hàng
            </button>
            <button className="teller-btn teller-btn-secondary" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Building2 size={20} />
              Quản lý chi nhánh
            </button>
            <button className="teller-btn teller-btn-success" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BarChart3 size={20} />
              Xem báo cáo
            </button>
            <button className="teller-btn teller-btn-warning" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Filter size={20} />
              Lọc dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

