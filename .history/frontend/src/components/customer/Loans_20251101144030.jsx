import { useState } from 'react';
import { FileText, AlertCircle, TrendingDown, Home, Clock } from 'lucide-react';
import { getCustomerLoans, formatCurrency, formatDate, currentUser } from '../../data/mockData';
import LoanMaturityModal from './LoanMaturityModal';
import LoanPaymentModal from './LoanPaymentModal';

const Loans = () => {
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  // Lấy loans của customer hiện tại (với JOIN)
  const customerId = currentUser.id || 1;
  const loans = getCustomerLoans(customerId);
  
  // Handle maturity action
  const handleMaturityClick = (loan) => {
    setSelectedLoan(loan);
    setShowMaturityModal(true);
  };
  
  return (
    <div className="fade-in">

      {loans.filter(loan => loan.status === 'ACTIVE').map((loan) => {
        // Tính toán số kỳ đã trả (mock - trong thực tế sẽ query từ LoanPaymentSchedule)
        const totalPeriods = loan.term_months;
        const monthsSinceStart = loan.first_payment_date ? 
          Math.floor((new Date() - new Date(loan.first_payment_date)) / (1000 * 60 * 60 * 24 * 30)) : 0;
        const paidPeriods = Math.min(monthsSinceStart, totalPeriods);
        const progress = totalPeriods > 0 ? ((paidPeriods / totalPeriods) * 100).toFixed(1) : 0;
        
        // Next payment date (mock)
        const nextPaymentDate = loan.first_payment_date ? 
          new Date(new Date(loan.first_payment_date).setMonth(new Date(loan.first_payment_date).getMonth() + paidPeriods + 1)) : null;
        
        // Check maturity (30 days before maturity_date)
        const maturityDate = new Date(loan.maturity_date);
        const today = new Date();
        const daysUntilMaturity = Math.floor((maturityDate - today) / (1000 * 60 * 60 * 24));
        const isNearMaturity = daysUntilMaturity <= 30 && daysUntilMaturity >= 0;
        
        return (
          <div key={loan.loan_id} className="card mb-4">
            <div className="flex-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{loan.loanTypeName}</h3>
                <div className="text-sm text-secondary">{loan.loan_number}</div>
              </div>
              <span className={`badge badge-${loan.status === 'ACTIVE' ? 'success' : 'warning'}`}>
                {loan.status === 'ACTIVE' ? 'Đang trả' : loan.status}
              </span>
            </div>

            {/* Loan Details Grid */}
            <div className="loan-grid">
              <div className="loan-stat">
                <div className="stat-label">Số tiền vay</div>
                <div className="stat-value text-primary">{formatCurrency(loan.approved_amount)}</div>
              </div>
              <div className="loan-stat">
                <div className="stat-label">Dư nợ gốc</div>
                <div className="stat-value text-warning">{formatCurrency(loan.outstanding_balance)}</div>
              </div>
              <div className="loan-stat">
                <div className="stat-label">Lãi suất</div>
                <div className="stat-value text-danger">{loan.interest_rate}% /năm</div>
              </div>
              <div className="loan-stat">
                <div className="stat-label">Trả hàng tháng</div>
                <div className="stat-value">{formatCurrency(loan.monthly_payment)}</div>
              </div>
            </div>

            {/* Collateral Info */}
            {loan.collateralInfo && (
              <div className="collateral-info">
                <div className="flex items-center gap-2 mb-2">
                  <Home size={16} className="text-primary" />
                  <strong>Tài sản thế chấp:</strong>
                </div>
                <div className="text-sm mb-1">{loan.collateralInfo.collateral_name}</div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-secondary">Giá trị thẩm định:</span>{' '}
                    <span className="font-semibold">{formatCurrency(loan.collateral_value)}</span>
                  </div>
                  <div>
                    <span className="text-secondary">LTV:</span>{' '}
                    <span className={`font-semibold ${loan.ltv_ratio > 70 ? 'text-danger' : 'text-success'}`}>
                      {loan.ltv_ratio}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Progress */}
            <div className="mt-3">
              <div className="flex-between text-sm mb-2">
                <span>Đã trả {paidPeriods}/{totalPeriods} kỳ</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Maturity Warning */}
            {isNearMaturity && (
              <div className="maturity-warning">
                <Clock size={18} className="text-warning" />
                <div>
                  <div className="text-sm font-medium">Khoản vay sắp đáo hạn</div>
                  <div className="text-xs text-secondary">
                    Ngày đáo hạn: {formatDate(loan.maturity_date)} (còn {daysUntilMaturity} ngày)
                  </div>
                </div>
                <button 
                  className="btn btn-warning btn-sm ml-auto"
                  onClick={() => handleMaturityClick(loan)}
                >
                  Xử lý đáo hạn
                </button>
              </div>
            )}

            {/* Next Payment */}
            {nextPaymentDate && (
              <div className="next-payment">
                <AlertCircle size={18} className="text-warning" />
                <div>
                  <div className="text-sm font-medium">Kỳ trả tiếp theo</div>
                  <div className="text-xs text-secondary">
                    Ngày {formatDate(nextPaymentDate.toISOString().split('T')[0])} - {formatCurrency(loan.monthly_payment)}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm ml-auto">Trả nợ</button>
              </div>
            )}
          </div>
        );
      })}

      <LoanMaturityModal
        isOpen={showMaturityModal}
        onClose={() => {
          setShowMaturityModal(false);
          setSelectedLoan(null);
        }}
        loan={selectedLoan}
      />

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .loan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 8px;
        }

        .loan-stat {
          text-align: center;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 700;
        }

        .collateral-info {
          background: #eff6ff;
          border-left: 4px solid var(--primary-color);
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .progress-bar {
          height: 10px;
          background: var(--bg-tertiary);
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
          transition: width 0.3s ease;
        }

        .maturity-warning {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .next-payment {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #fef3c7;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .btn-warning:hover {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        }
      `}</style>
    </div>
  );
};

export default Loans;

