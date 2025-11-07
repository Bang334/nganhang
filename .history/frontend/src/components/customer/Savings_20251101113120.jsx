import { useState } from 'react';
import { PiggyBank, TrendingUp, Calendar, DollarSign, Plus, Clock, AlertCircle, X, FileText } from 'lucide-react';
import { getCustomerSavings, getCustomerAccounts, interestRates, formatCurrency, formatDate, currentUser } from '../../data/mockData';
import NewSavingsModal from './NewSavingsModal';
import SavingsMaturityModal from './SavingsMaturityModal';

// Modal Rút Trước Hạn
const EarlyWithdrawalModal = ({ isOpen, onClose, deposit }) => {
  if (!isOpen || !deposit) return null;

  // Tính lãi không kỳ hạn (giả sử 2.0%/năm)
  const nonTermRate = 2.0;
  const daysSinceStart = deposit.daysSinceStart || 0;
  const actualInterest = (deposit.principal_amount * nonTermRate / 100 * daysSinceStart) / 365;
  const penalty = deposit.expectedInterest * 0.1; // Phạt 10% lãi dự kiến
  const totalReceive = deposit.principal_amount + actualInterest - penalty;

  const handleConfirm = () => {
    alert(`Đã xử lý rút trước hạn thành công!\n\nSố tiền nhận được: ${formatCurrency(totalReceive)}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '500px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
          <h2 className="modal-title">
            <AlertCircle size={24} />
            Rút Trước Hạn
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="alert alert-warning mb-4">
            <AlertCircle size={20} />
            <div className="text-sm">
              <strong>Lưu ý:</strong> Rút trước hạn sẽ mất quyền lợi lãi suất ưu đãi!
            </div>
          </div>

          <div className="info-card mb-4">
            <h3 className="font-semibold mb-3">Thông tin sổ tiết kiệm</h3>
            <div className="info-grid">
              <div>
                <span className="text-secondary">Số sổ:</span>
                <span className="font-semibold ml-2">{deposit.deposit_number}</span>
              </div>
              <div>
                <span className="text-secondary">Số tiền gốc:</span>
                <span className="font-semibold ml-2">{formatCurrency(deposit.principal_amount)}</span>
              </div>
              <div>
                <span className="text-secondary">Ngày gửi:</span>
                <span className="font-semibold ml-2">{formatDate(deposit.start_date)}</span>
              </div>
              <div>
                <span className="text-secondary">Số ngày đã gửi:</span>
                <span className="font-semibold ml-2">{daysSinceStart} ngày</span>
              </div>
            </div>
          </div>

          <div className="comparison-box">
            <h3 className="font-semibold mb-3">So sánh lợi ích</h3>
            <div className="comparison-row">
              <div className="comparison-item loss">
                <div className="text-sm text-secondary">Lãi kỳ hạn ({deposit.interest_rate}%)</div>
                <div className="font-bold text-lg text-danger line-through">{formatCurrency(deposit.expectedInterest)}</div>
              </div>
              <div className="comparison-item gain">
                <div className="text-sm text-secondary">Lãi không kỳ hạn ({nonTermRate}%)</div>
                <div className="font-bold text-lg text-warning">{formatCurrency(actualInterest)}</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
              <div className="text-sm text-danger font-semibold">
                Phí phạt rút trước hạn: -{formatCurrency(penalty)}
              </div>
            </div>
          </div>

          <div className="total-box mt-4">
            <div className="total-row">
              <span>Tổng nhận về:</span>
              <span className="text-2xl font-bold text-primary">{formatCurrency(totalReceive)}</span>
            </div>
            <div className="text-xs text-secondary text-center mt-2">
              = Gốc + Lãi không kỳ hạn - Phí phạt
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">Hủy</button>
          <button onClick={handleConfirm} className="btn btn-warning">
            Xác nhận rút {formatCurrency(totalReceive)}
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Xem Chi Tiết
const SavingsDetailModal = ({ isOpen, onClose, deposit }) => {
  if (!isOpen || !deposit) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '500px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
          <h2 className="modal-title">
            <FileText size={24} />
            Chi Tiết Sổ Tiết Kiệm
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3 className="section-title">Thông tin cơ bản</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Số sổ:</span>
                <span className="value">{deposit.deposit_number}</span>
              </div>
              <div className="detail-item">
                <span className="label">Trạng thái:</span>
                <span className={`badge badge-${deposit.status === 'ACTIVE' ? 'success' : 'secondary'}`}>
                  {deposit.status === 'ACTIVE' ? 'Đang gửi' : deposit.status}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Số tài khoản:</span>
                <span className="value">{deposit.accountNumber}</span>
              </div>
              <div className="detail-item">
                <span className="label">Chi nhánh:</span>
                <span className="value">CN Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Thông tin tài chính</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Số tiền gốc:</span>
                <span className="value text-primary font-bold">{formatCurrency(deposit.principal_amount)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Lãi suất:</span>
                <span className="value text-success font-bold">{deposit.interest_rate}% /năm</span>
              </div>
              <div className="detail-item">
                <span className="label">Kỳ hạn:</span>
                <span className="value">{deposit.term_months} tháng</span>
              </div>
              <div className="detail-item">
                <span className="label">Lãi dự kiến:</span>
                <span className="value text-success font-bold">{formatCurrency(deposit.expectedInterest)}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Thời gian</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Ngày gửi:</span>
                <span className="value">{formatDate(deposit.start_date)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Ngày đáo hạn:</span>
                <span className="value">{formatDate(deposit.maturity_date)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Số ngày đã gửi:</span>
                <span className="value">{deposit.daysSinceStart} / {deposit.totalDays} ngày</span>
              </div>
              <div className="detail-item">
                <span className="label">Còn lại:</span>
                <span className={`value font-bold ${deposit.daysUntilMaturity < 0 ? 'text-danger' : deposit.daysUntilMaturity <= 7 ? 'text-warning' : 'text-secondary'}`}>
                  {deposit.daysUntilMaturity < 0 ? 
                    `Đã đáo hạn ${Math.abs(deposit.daysUntilMaturity)} ngày` :
                    `${deposit.daysUntilMaturity} ngày`
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Tùy chọn</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Tự động tái tục:</span>
                <span className="value">
                  {deposit.auto_renew === 'YES' ? (
                    <span className="text-success font-semibold">✓ Có</span>
                  ) : (
                    <span className="text-secondary">✗ Không</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">Đóng</button>
        </div>
      </div>
    </div>
  );
};

const Savings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMaturityModal, setShowMaturityModal] = useState(false);
  const [showEarlyWithdrawModal, setShowEarlyWithdrawModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
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
  
  // Handle early withdrawal
  const handleEarlyWithdraw = (deposit) => {
    setSelectedDeposit(deposit);
    setShowEarlyWithdrawModal(true);
  };
  
  // Handle view detail
  const handleViewDetail = (deposit) => {
    setSelectedDeposit(deposit);
    setShowDetailModal(true);
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
          const progress = deposit.totalDays > 0 ? 
            ((deposit.daysSinceStart / deposit.totalDays) * 100).toFixed(1) : 0;
          
          const isNearMaturity = deposit.daysUntilMaturity <= 7 && deposit.daysUntilMaturity >= 0;
          const isMatured = deposit.daysUntilMaturity < 0;
          
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
              <div className={`text-xs text-center mt-1 ${isMatured ? 'text-danger font-semibold' : isNearMaturity ? 'text-warning font-semibold' : 'text-secondary'}`}>
                {isMatured ? 
                  `Đã đáo hạn ${Math.abs(deposit.daysUntilMaturity)} ngày trước` :
                  `Còn ${deposit.daysUntilMaturity} ngày đến hạn (${progress}%)`
                }
              </div>

              {deposit.auto_renew === 'YES' && (
                <div className="mt-2 text-xs text-success flex items-center gap-1">
                  <TrendingUp size={14} /> Tự động tái tục
                </div>
              )}

              {/* Actions */}
              {deposit.status === 'ACTIVE' && (
                <div className="savings-actions mt-3">
                  {/* Nếu sắp/đã đáo hạn: Hiện nút đáo hạn + xem chi tiết */}
                  {(isNearMaturity || isMatured) ? (
                    <>
                      <button 
                        className="btn-maturity"
                        onClick={() => handleMaturityClick(deposit)}
                      >
                        <Clock size={16} />
                        {isMatured ? 'Xử lý đáo hạn ngay' : 
                         deposit.daysUntilMaturity === 0 ? 'Xử lý đáo hạn ngay' : 
                         'Xem tùy chọn đáo hạn'}
                      </button>
                      <div className="action-buttons">
                        <button 
                          className="btn-action btn-outline" 
                          onClick={() => handleViewDetail(deposit)}
                        >
                          📄 Xem chi tiết
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Nếu chưa đến hạn: Hiện nút rút trước hạn + xem chi tiết */
                    <div className="action-buttons">
                      <button 
                        className="btn-action btn-secondary" 
                        onClick={() => handleEarlyWithdraw(deposit)}
                      >
                        💰 Rút trước hạn
                      </button>
                      <button 
                        className="btn-action btn-outline" 
                        onClick={() => handleViewDetail(deposit)}
                      >
                        📄 Xem chi tiết
                      </button>
                    </div>
                  )}
                </div>
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
      
      <SavingsMaturityModal
        isOpen={showMaturityModal}
        onClose={() => {
          setShowMaturityModal(false);
          setSelectedDeposit(null);
        }}
        savingsDeposit={selectedDeposit}
      />

      {/* Early Withdrawal Modal */}
      {showEarlyWithdrawModal && selectedDeposit && (
        <EarlyWithdrawalModal
          isOpen={showEarlyWithdrawModal}
          onClose={() => {
            setShowEarlyWithdrawModal(false);
            setSelectedDeposit(null);
          }}
          deposit={selectedDeposit}
        />
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedDeposit && (
        <SavingsDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedDeposit(null);
          }}
          deposit={selectedDeposit}
        />
      )}

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

        .btn-maturity {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .btn-maturity:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .savings-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .btn-action {
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-action.btn-secondary {
          background: var(--primary-color);
          color: white;
        }

        .btn-action.btn-secondary:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .btn-action.btn-outline {
          background: transparent;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }

        .btn-action.btn-outline:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default Savings;

