import { useState } from 'react';
import { X, Calendar, TrendingUp, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';

const SavingsMaturityModal = ({ isOpen, onClose, savingsDeposit }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [newTerm, setNewTerm] = useState(6);
  const [autoRenew, setAutoRenew] = useState(false);
  const [additionalAmount, setAdditionalAmount] = useState(0);

  if (!isOpen || !savingsDeposit) return null;

  // Tính toán
  const principal = savingsDeposit.principal_amount;
  const interest = savingsDeposit.total_interest_earned || 0;
  const total = principal + interest;

  // Lãi suất mới (mock - thực tế query từ DB)
  const newRates = {
    1: 2.0,
    3: 3.0,
    6: 4.5,
    12: 6.0,
    24: 7.0
  };

  const newRate = newRates[newTerm] || 4.5;

  // Tính lãi dự kiến kỳ mới
  const calculateNewInterest = (principalAmount, months, rate) => {
    return (principalAmount * rate * months) / (12 * 100);
  };

  const handleConfirm = () => {
    // TODO: Call API
    console.log('Processing maturity:', {
      option: selectedOption,
      newTerm: selectedOption !== 'withdraw' ? newTerm : null,
      autoRenew: selectedOption !== 'withdraw' ? autoRenew : null
    });
    
    alert(`Đã xử lý đáo hạn thành công!\nLựa chọn: ${
      selectedOption === 'withdraw' ? 'Rút tiền về tài khoản' :
      selectedOption === 'renew_principal' ? 'Tái tục gốc' :
      'Tái tục gốc + lãi'
    }`);
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Calendar size={24} />
            Đáo hạn Sổ Tiết kiệm
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div className="fade-in">
              {/* Thông tin sổ tiết kiệm */}
              <div className="info-card mb-4">
                <h3 className="font-semibold mb-3">📊 Thông tin sổ tiết kiệm</h3>
                <div className="info-grid">
                  <div>
                    <span className="text-secondary">Số sổ:</span>
                    <span className="font-semibold ml-2">{savingsDeposit.deposit_number}</span>
                  </div>
                  <div>
                    <span className="text-secondary">Ngày mở:</span>
                    <span className="font-semibold ml-2">{savingsDeposit.start_date}</span>
                  </div>
                  <div>
                    <span className="text-secondary">Kỳ hạn:</span>
                    <span className="font-semibold ml-2">{savingsDeposit.term_months} tháng</span>
                  </div>
                  <div>
                    <span className="text-secondary">Lãi suất:</span>
                    <span className="font-semibold ml-2 text-success">{savingsDeposit.interest_rate}%/năm</span>
                  </div>
                </div>
              </div>

              {/* Số tiền nhận được */}
              <div className="amount-summary">
                <div className="amount-row">
                  <span>Tiền gốc:</span>
                  <span className="font-semibold">{formatCurrency(principal)}</span>
                </div>
                <div className="amount-row">
                  <span>Lãi đã tích lũy:</span>
                  <span className="font-semibold text-success">+{formatCurrency(interest)}</span>
                </div>
                <div className="amount-row total">
                  <span>Tổng cộng:</span>
                  <span className="font-bold text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Lựa chọn xử lý */}
              <div className="mt-4">
                <h3 className="font-semibold mb-3">💡 Chọn cách xử lý:</h3>
                
                <div className="option-cards">
                  {/* Option 1: Rút tiền */}
                  <div 
                    className={`option-card ${selectedOption === 'withdraw' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('withdraw')}
                  >
                    <DollarSign size={24} className="text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">Rút tiền về tài khoản</div>
                      <div className="text-sm text-secondary">
                        Nhận {formatCurrency(total)} vào tài khoản thanh toán
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'withdraw' && <div className="radio-checked" />}
                    </div>
                  </div>

                  {/* Option 2: Tái tục gốc */}
                  <div 
                    className={`option-card ${selectedOption === 'renew_principal' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('renew_principal')}
                  >
                    <TrendingUp size={24} className="text-success" />
                    <div className="flex-1">
                      <div className="font-semibold">Tái tục chỉ gốc - Nhận lãi</div>
                      <div className="text-sm text-secondary">
                        Gửi lại {formatCurrency(principal)}, nhận {formatCurrency(interest)} về TK
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'renew_principal' && <div className="radio-checked" />}
                    </div>
                  </div>

                  {/* Option 3: Tái tục gốc + lãi */}
                  <div 
                    className={`option-card ${selectedOption === 'renew_full' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('renew_full')}
                  >
                    <CheckCircle size={24} className="text-warning" />
                    <div className="flex-1">
                      <div className="font-semibold">Tái tục gốc + lãi (Lãi kép)</div>
                      <div className="text-sm text-secondary">
                        Gửi lại {formatCurrency(total)} - Lợi nhuận cao hơn!
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'renew_full' && <div className="radio-checked" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={onClose} className="btn btn-secondary">Hủy</button>
                <button 
                  onClick={() => setStep(2)} 
                  className="btn btn-primary"
                  disabled={!selectedOption}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {step === 2 && selectedOption !== 'withdraw' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">⚙️ Cấu hình tái tục</h3>

              {/* Chọn kỳ hạn mới */}
              <div className="form-group">
                <label>Kỳ hạn mới</label>
                <select 
                  value={newTerm} 
                  onChange={(e) => setNewTerm(Number(e.target.value))}
                  className="form-control"
                >
                  <option value={1}>1 tháng - {newRates[1]}%/năm</option>
                  <option value={3}>3 tháng - {newRates[3]}%/năm</option>
                  <option value={6}>6 tháng - {newRates[6]}%/năm</option>
                  <option value={12}>12 tháng - {newRates[12]}%/năm</option>
                  <option value={24}>24 tháng - {newRates[24]}%/năm</option>
                </select>
              </div>

              {/* Nạp thêm tiền */}
              <div className="form-group">
                <label>💵 Nạp thêm tiền (tùy chọn)</label>
                <input
                  type="number"
                  placeholder="Nhập số tiền muốn nạp thêm..."
                  value={additionalAmount || ''}
                  onChange={(e) => setAdditionalAmount(Number(e.target.value))}
                  className="form-control"
                  min="0"
                />
                <div className="text-sm text-secondary mt-1">
                  Số tiền sẽ được trừ từ tài khoản thanh toán của bạn
                </div>
              </div>

              {/* Dự kiến lãi kỳ mới */}
              <div className="preview-card">
                <h4 className="font-semibold mb-3">📊 Dự kiến kỳ mới:</h4>
                <div className="preview-grid">
                  <div>
                    <div className="text-sm text-secondary">Số tiền gửi</div>
                    <div className="font-semibold text-lg">
                      {formatCurrency(
                        (selectedOption === 'renew_principal' ? principal : total) + additionalAmount
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary">Lãi suất</div>
                    <div className="font-semibold text-lg text-success">{newRate}%/năm</div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary">Lãi dự kiến</div>
                    <div className="font-semibold text-lg text-primary">
                      {formatCurrency(calculateNewInterest(
                        (selectedOption === 'renew_principal' ? principal : total) + additionalAmount,
                        newTerm,
                        newRate
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-secondary">Tổng nhận (đáo hạn)</div>
                    <div className="font-semibold text-lg text-warning">
                      {formatCurrency(
                        (selectedOption === 'renew_principal' ? principal : total) + additionalAmount +
                        calculateNewInterest(
                          (selectedOption === 'renew_principal' ? principal : total) + additionalAmount,
                          newTerm,
                          newRate
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tự động tái tục */}
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={autoRenew}
                    onChange={(e) => setAutoRenew(e.target.checked)}
                  />
                  <span>Tự động tái tục khi đáo hạn lần sau</span>
                </label>
                <div className="text-sm text-secondary mt-1">
                  Hệ thống sẽ tự động tái tục với cùng điều kiện khi sổ đáo hạn
                </div>
              </div>

              <div className="alert alert-info">
                <AlertCircle size={18} />
                <div className="text-sm">
                  <strong>Lưu ý:</strong> Lãi suất có thể thay đổi theo chính sách ngân hàng.
                  Lãi suất mới sẽ áp dụng theo thời điểm tái tục.
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(1)} className="btn btn-secondary">Quay lại</button>
                <button onClick={() => setStep(3)} className="btn btn-primary">Xác nhận</button>
              </div>
            </div>
          )}

          {step === 2 && selectedOption === 'withdraw' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">✅ Xác nhận rút tiền</h3>

              <div className="confirm-card">
                <CheckCircle size={48} className="text-success mx-auto mb-3" />
                <p className="text-center mb-4">
                  Bạn sẽ nhận <strong className="text-primary text-xl">{formatCurrency(total)}</strong><br />
                  vào tài khoản thanh toán của bạn
                </p>

                <div className="info-box">
                  <div className="info-row">
                    <span>Tiền gốc:</span>
                    <span>{formatCurrency(principal)}</span>
                  </div>
                  <div className="info-row">
                    <span>Tiền lãi:</span>
                    <span className="text-success">{formatCurrency(interest)}</span>
                  </div>
                  <div className="info-row total">
                    <span>Tổng cộng:</span>
                    <span className="font-bold">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="alert alert-warning">
                <AlertCircle size={18} />
                <span className="text-sm">
                  Sổ tiết kiệm sẽ được đóng sau khi rút tiền. Bạn có thể mở sổ mới bất kỳ lúc nào.
                </span>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(1)} className="btn btn-secondary">Quay lại</button>
                <button onClick={handleConfirm} className="btn btn-success">Xác nhận rút tiền</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">✅ Xác nhận tái tục</h3>

              <div className="confirm-summary">
                <div className="summary-section">
                  <h4 className="font-semibold mb-2">Thông tin tái tục:</h4>
                  <div className="summary-item">
                    <span>Loại tái tục:</span>
                    <span className="font-semibold">
                      {selectedOption === 'renew_principal' ? 'Tái tục chỉ gốc' : 'Tái tục gốc + lãi'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Số tiền gửi mới:</span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(selectedOption === 'renew_principal' ? principal : total)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Kỳ hạn:</span>
                    <span className="font-semibold">{newTerm} tháng</span>
                  </div>
                  <div className="summary-item">
                    <span>Lãi suất:</span>
                    <span className="font-semibold text-success">{newRate}%/năm</span>
                  </div>
                  <div className="summary-item">
                    <span>Tự động tái tục:</span>
                    <span className="font-semibold">{autoRenew ? 'Có' : 'Không'}</span>
                  </div>
                </div>

                {selectedOption === 'renew_principal' && (
                  <div className="alert alert-success mt-3">
                    <CheckCircle size={18} />
                    <span className="text-sm">
                      Bạn sẽ nhận {formatCurrency(interest)} lãi về tài khoản thanh toán
                    </span>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(2)} className="btn btn-secondary">Quay lại</button>
                <button onClick={handleConfirm} className="btn btn-primary">Xác nhận tái tục</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-container {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 2px solid #e5e7eb;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          color: white;
          border-radius: 16px 16px 0 0;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 0 0 16px 16px;
        }

        .info-card {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .amount-summary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
        }

        .amount-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .amount-row.total {
          border-bottom: none;
          font-size: 1.25rem;
          padding-top: 1rem;
        }

        .option-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-card:hover {
          border-color: var(--primary-color);
          background: var(--bg-secondary);
        }

        .option-card.selected {
          border-color: var(--primary-color);
          background: var(--primary-light);
        }

        .radio {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .option-card.selected .radio {
          border-color: var(--primary-color);
        }

        .radio-checked {
          width: 12px;
          height: 12px;
          background: var(--primary-color);
          border-radius: 50%;
        }

        .preview-card {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .confirm-card {
          text-align: center;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .info-box {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .info-row.total {
          border-bottom: none;
          padding-top: 1rem;
          font-size: 1.125rem;
        }

        .confirm-summary {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .alert {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .alert-info {
          background: #eff6ff;
          color: #1e40af;
        }

        .alert-warning {
          background: #fef3c7;
          color: #92400e;
        }

        .alert-success {
          background: #d1fae5;
          color: #065f46;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SavingsMaturityModal;

