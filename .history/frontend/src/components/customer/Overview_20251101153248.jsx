import { useState } from 'react';
import { CreditCard, TrendingUp, PiggyBank, FileText, ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from 'lucide-react';
import { 
  getCustomerAccounts, 
  getCustomerTransactions, 
  getCustomerSavings, 
  getCustomerLoans,
  formatCurrency,
  formatDate,
  currentUser 
} from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NewSavingsModal from './NewSavingsModal';
import LoanApplicationModal from './LoanApplicationModal';
import SavingsMaturityModal from './SavingsMaturityModal';
import LoanMaturityModal from './LoanMaturityModal';

const Overview = ({ user }) => {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showSavingsMaturityModal, setShowSavingsMaturityModal] = useState(false);
  const [showLoanMaturityModal, setShowLoanMaturityModal] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  // Lấy dữ liệu của customer hiện tại (với JOIN)
  const customerId = currentUser.id || 1;
  const accounts = getCustomerAccounts(customerId);
  const transactions = getCustomerTransactions(customerId);
  const savingsDeposits = getCustomerSavings(customerId);
  const loans = getCustomerLoans(customerId);
  
  // Check for upcoming maturities
  const today = new Date();
  const upcomingSavingsMaturities = savingsDeposits.filter(deposit => {
    if (deposit.status !== 'ACTIVE') return false;
    const daysUntil = deposit.daysUntilMaturity;
    // Chỉ hiển thị sổ SẮP đáo hạn (còn > 0 ngày và <= 7 ngày)
    return daysUntil !== undefined && daysUntil > 0 && daysUntil <= 7;
  });
  
  const upcomingLoanMaturities = loans.filter(loan => {
    if (loan.status !== 'ACTIVE') return false;
    const maturityDate = new Date(loan.maturity_date);
    const daysUntil = Math.floor((maturityDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil >= 0;
  });
  
  // Calculate totals
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalSavings = savingsDeposits.reduce((sum, dep) => sum + dep.current_value, 0);
  const totalLoanDebt = loans.reduce((sum, loan) => sum + loan.outstanding_balance, 0);
  const recentTransactions = transactions.slice(0, 5);

  // Chart data
  const monthlyData = [
    { month: 'T7', income: 25000000, expense: 18000000 },
    { month: 'T8', income: 30000000, expense: 22000000 },
    { month: 'T9', income: 28000000, expense: 20000000 },
    { month: 'T10', income: 35000000, expense: 25000000 },
  ];

  const assetData = [
    { name: 'Tài khoản', value: totalBalance },
    { name: 'Tiết kiệm', value: totalSavings },
  ];

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="fade-in">
      <div className="flex-between mb-4">
        <h2 className="page-title mb-0">Tổng quan</h2>
        <div className="topbar-actions">
          <span className="text-sm text-secondary">
            {new Date().toLocaleDateString('vi-VN')}
          </span>
        </div>
      </div>

      {/* Maturity Alerts */}
      {(upcomingSavingsMaturities.length > 0 || upcomingLoanMaturities.length > 0) && (
        <div className="maturity-alerts-section mb-4">
          <div className="alert-header">
            <Clock size={24} className="text-warning" />
            <h3 className="font-semibold text-lg">Thông báo sắp đáo hạn</h3>
          </div>
          
          {upcomingSavingsMaturities.length > 0 && (
            <div className="alert-group">
              <h4 className="alert-group-title">
                <PiggyBank size={18} />
                Sổ tiết kiệm ({upcomingSavingsMaturities.length})
              </h4>
              {upcomingSavingsMaturities.map(deposit => (
                <div key={deposit.deposit_id} className="alert-item">
                  <div className="alert-content">
                    <div className="font-medium">{deposit.deposit_number}</div>
                    <div className="text-sm text-secondary">
                      Gốc: {formatCurrency(deposit.principal_amount)} | 
                      Đáo hạn: {formatDate(deposit.maturity_date)} 
                      ({deposit.daysUntilMaturity === 0 ? 'Hôm nay' : `Còn ${deposit.daysUntilMaturity} ngày`})
                    </div>
                  </div>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setSelectedDeposit(deposit);
                      setShowSavingsMaturityModal(true);
                    }}
                  >
                    Xử lý ngay
                  </button>
                </div>
              ))}
            </div>
          )}

          {upcomingLoanMaturities.length > 0 && (
            <div className="alert-group">
              <h4 className="alert-group-title">
                <FileText size={18} />
                Khoản vay ({upcomingLoanMaturities.length})
              </h4>
              {upcomingLoanMaturities.map(loan => {
                const maturityDate = new Date(loan.maturity_date);
                const daysUntil = Math.floor((maturityDate - today) / (1000 * 60 * 60 * 24));
                return (
                  <div key={loan.loan_id} className="alert-item">
                    <div className="alert-content">
                      <div className="font-medium">{loan.loan_number} - {loan.loanTypeName}</div>
                      <div className="text-sm text-secondary">
                        Dư nợ: {formatCurrency(loan.outstanding_balance)} | 
                        Đáo hạn: {formatDate(loan.maturity_date)} (Còn {daysUntil} ngày)
                      </div>
                    </div>
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedLoan(loan);
                        setShowLoanMaturityModal(true);
                      }}
                    >
                      Xử lý ngay
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Số dư tài khoản</div>
              <div className="stat-value">{formatCurrency(totalBalance)}</div>
              <div className="stat-change">
                <TrendingUp size={16} /> +5.2% so với tháng trước
              </div>
            </div>
            <CreditCard size={40} className="stat-icon" />
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tiết kiệm</div>
              <div className="stat-value">{formatCurrency(totalSavings)}</div>
              <div className="stat-change">
                {savingsDeposits.length} sổ đang hoạt động
              </div>
            </div>
            <PiggyBank size={40} className="stat-icon" />
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-title">Dư nợ vay</div>
              <div className="stat-value">{formatCurrency(totalLoanDebt)}</div>
              <div className="stat-change">
                {loans.length} khoản vay đang trả
              </div>
            </div>
            <FileText size={40} className="stat-icon" />
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng tài sản</div>
              <div className="stat-value">{formatCurrency(totalBalance + totalSavings - totalLoanDebt)}</div>
              <div className="stat-change">
                Tài sản ròng
              </div>
            </div>
            <TrendingUp size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      {/* Current Savings Interest Rates */}
      <div className="card mt-4">
        <h3 className="card-header" style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          margin: '-1.5rem -1.5rem 1rem -1.5rem',
          borderRadius: '12px 12px 0 0'
        }}>
          <TrendingUp size={20} />
          Lãi suất tiết kiệm hiện tại
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '1rem',
          padding: '0 0.5rem'
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
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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

      {/* Charts and Recent Transactions */}
      <div className="grid grid-2 mt-4">
        {/* Income vs Expense Chart */}
        <div className="card">
          <h3 className="card-header">Thu nhập & Chi tiêu (4 tháng gần nhất)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="income" fill="#10b981" name="Thu nhập" />
              <Bar dataKey="expense" fill="#ef4444" name="Chi tiêu" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Distribution */}
        <div className="card">
          <h3 className="card-header">Phân bổ tài sản</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card mt-4">
        <div className="flex-between mb-3">
          <h3 className="card-header mb-0">Giao dịch gần đây</h3>
          <a href="/customer/transactions" className="text-primary text-sm font-medium">
            Xem tất cả →
          </a>
        </div>
        <div className="transaction-list">
          {recentTransactions.map((txn) => {
            // Xác định loại giao dịch (thu/chi) dựa vào from/to account
            const isIncome = txn.to_account_id && !txn.from_account_id;
            const isExpense = txn.from_account_id && !txn.to_account_id;
            const amount = isIncome ? txn.amount : -txn.amount;
            
            return (
              <div key={txn.transaction_id} className="transaction-item">
                <div className="transaction-icon">
                  {isIncome ? (
                    <ArrowDownRight className="text-success" size={20} />
                  ) : (
                    <ArrowUpRight className="text-danger" size={20} />
                  )}
                </div>
                <div className="transaction-details">
                  <div className="transaction-type font-medium">{txn.typeName}</div>
                  <div className="transaction-desc text-sm text-secondary">{txn.description}</div>
                  <div className="transaction-date text-xs text-secondary">{txn.transaction_date}</div>
                </div>
                <div className={`transaction-amount font-semibold ${isIncome ? 'text-success' : 'text-danger'}`}>
                  {isIncome ? '+' : ''}{formatCurrency(Math.abs(amount))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-3 mt-4">
        <a href="/customer/transfer" className="quick-action-card">
          <ArrowUpRight size={32} className="text-primary" />
          <h4>Chuyển khoản</h4>
          <p className="text-sm text-secondary">Chuyển tiền nhanh chóng</p>
        </a>
        <div className="quick-action-card" onClick={() => setShowSavingsModal(true)}>
          <PiggyBank size={32} className="text-success" />
          <h4>Gửi tiết kiệm</h4>
          <p className="text-sm text-secondary">Lãi suất hấp dẫn</p>
        </div>
        <div className="quick-action-card" onClick={() => setShowLoanModal(true)}>
          <FileText size={32} className="text-warning" />
          <h4>Đăng ký vay</h4>
          <p className="text-sm text-secondary">Thủ tục đơn giản</p>
        </div>
      </div>

      {/* Modals */}
      <NewSavingsModal 
        isOpen={showSavingsModal}
        onClose={() => setShowSavingsModal(false)}
        accounts={accounts}
      />
      <LoanApplicationModal
        isOpen={showLoanModal}
        onClose={() => setShowLoanModal(false)}
      />

      <SavingsMaturityModal
        isOpen={showSavingsMaturityModal}
        onClose={() => {
          setShowSavingsMaturityModal(false);
          setSelectedDeposit(null);
        }}
        savingsDeposit={selectedDeposit}
      />

      <LoanMaturityModal
        isOpen={showLoanMaturityModal}
        onClose={() => {
          setShowLoanMaturityModal(false);
          setSelectedLoan(null);
        }}
        loan={selectedLoan}
      />

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .transaction-item:hover {
          background: var(--bg-tertiary);
          transform: translateX(4px);
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .transaction-details {
          flex: 1;
        }

        .transaction-amount {
          font-size: 1.125rem;
        }

        .quick-action-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid var(--border-color);
          text-decoration: none;
          transition: all 0.2s;
          text-align: center;
        }

        .quick-action-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .quick-action-card h4 {
          margin: 0.75rem 0 0.25rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .maturity-alerts-section {
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
          border: 2px solid #fed7aa;
          border-left: 6px solid #f59e0b;
          border-radius: 12px;
          padding: 1.5rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #fed7aa;
        }

        .alert-group {
          margin-top: 1rem;
        }

        .alert-group-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 0.75rem;
          padding: 0.5rem;
          background: rgba(251, 191, 36, 0.1);
          border-radius: 6px;
        }

        .alert-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem;
          margin-bottom: 0.5rem;
          background: white;
          border: 1px solid #fde68a;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .alert-item:hover {
          border-color: #fbbf24;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
          transform: translateX(4px);
        }

        .alert-content {
          flex: 1;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          white-space: nowrap;
        }

        .btn-warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .btn-warning:hover {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Overview;

