import { useState } from 'react';
import { PiggyBank, TrendingUp, Calendar, DollarSign, Plus, Clock } from 'lucide-react';
import { getCustomerSavings, getCustomerAccounts, interestRates, formatCurrency, formatDate, currentUser } from '../../data/mockData';
import NewSavingsModal from './NewSavingsModal';
import SavingsMaturityModal from './SavingsMaturityModal';

const Savings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  
  // Lấy dữ liệu của customer hiện tại
  const customerId = currentUser.id || 1;
  const savingsDeposits = getCustomerSavings(customerId);
  const accounts = getCustomerAccounts(customerId);
  
  // Handle maturity action
  const handleMaturityClick = (deposit) => {
    setSelectedDeposit(deposit);
    setShowMaturityModal(true);
  };
  
  return (
    <div className="fade-in">
      <div className="flex-between mb-4">
        <div></div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Mở sổ tiết kiệm mới
          </button>
        </div>
      </div>

      {/* Interest Rates */}
      <div className="card mb-4">
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
          {interestRates.savings.map((rate) => (
            <div key={rate.termMonths} style={{
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
                {rate.termName}
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
                {rate.rate}%
                <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>/năm</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Savings */}
      <h3 className="text-xl font-semibold mb-3">Sổ tiết kiệm của tôi</h3>
      <div className="grid grid-2">
        {savingsDeposits.map((deposit) => {
          const progress = ((deposit.term_months * 30 - deposit.daysUntilMaturity) / (deposit.term_months * 30)) * 100;
          
          return (
            <div key={deposit.deposit_id} className="card savings-card">
              <div className="flex-between mb-3">
                <div>
                  <div className="font-semibold">Sổ tiết kiệm {deposit.term_months} tháng</div>
                  <div className="text-sm text-secondary">{deposit.deposit_number}</div>
                </div>
                <span className={`badge badge-${deposit.status === 'ACTIVE' ? 'success' : 'secondary'}`}>
                  {deposit.status === 'ACTIVE' ? 'Đang gửi' : deposit.status}
                </span>
              </div>

              <div className="savings-amount">
                <div className="text-sm text-secondary">Số tiền gốc</div>
                <div className="amount-value">{formatCurrency(deposit.principal_amount)}</div>
              </div>

              <div className="savings-info">
                <div>
                  <div className="text-xs text-secondary">Lãi suất</div>
                  <div className="font-semibold text-success">{deposit.interest_rate}% /năm</div>
                </div>
                <div>
                  <div className="text-xs text-secondary">Lãi dự kiến</div>
                  <div className="font-semibold text-primary">
                    {formatCurrency(deposit.expectedInterest)}
                  </div>
                </div>
              </div>

              <div className="savings-dates">
                <div>
                  <Calendar size={14} className="inline" /> Ngày gửi: {formatDate(deposit.start_date)}
                </div>
                <div>
                  <Calendar size={14} className="inline" /> Đáo hạn: {formatDate(deposit.maturity_date)}
                </div>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-secondary text-center mt-1">
                Còn {deposit.daysUntilMaturity} ngày đến hạn
              </div>

              {deposit.autoRenew && (
                <div className="mt-2 text-xs text-success flex items-center gap-1">
                  <TrendingUp size={14} /> Tự động tái tục
                </div>
              )}

              {/* Maturity Action Button */}
              {deposit.daysUntilMaturity <= 7 && deposit.status === 'ACTIVE' && (
                <button 
                  className="btn-maturity mt-3"
                  onClick={() => handleMaturityClick(deposit)}
                >
                  <Clock size={16} />
                  {deposit.daysUntilMaturity === 0 ? 'Xử lý đáo hạn ngay' : 'Xem tùy chọn đáo hạn'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <NewSavingsModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        accounts={accounts}
      />

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .rate-card {
          text-align: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 2px solid var(--border-color);
        }

        .rate-term {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .rate-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .savings-card {
          border: 2px solid var(--border-color);
        }

        .savings-amount {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .amount-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-top: 0.25rem;
        }

        .savings-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .savings-dates {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .progress-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--success-color), #34d399);
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Savings;

