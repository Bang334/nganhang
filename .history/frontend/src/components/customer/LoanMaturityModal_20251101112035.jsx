import { useState } from 'react';
import { X, Calendar, DollarSign, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../data/mockData';

const LoanMaturityModal = ({ isOpen, onClose, loan }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [extensionMonths, setExtensionMonths] = useState(12);
  const [newInterestRate, setNewInterestRate] = useState(loan?.interest_rate || 8);

  if (!isOpen || !loan) return null;

  // Tính toán
  const outstandingBalance = loan.outstanding_balance || 0;
  const unpaidInterest = 0; // Mock - trong thực tế query từ LoanPaymentSchedule

  // Calculate new monthly payment for extension
  const calculateMonthlyPayment = (principal, rate, months) => {
    const monthlyRate = rate / 12 / 100;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(payment);
  };

  const newMonthlyPayment = calculateMonthlyPayment(outstandingBalance, newInterestRate, extensionMonths);

  const handleConfirm = () => {
    // TODO: Call API
    console.log('Processing loan maturity:', {
      option: selectedOption,
      extensionMonths: selectedOption === 'extend' ? extensionMonths : null,
      newRate: selectedOption === 'extend' ? newInterestRate : null
    });
    
    alert(`Đã xử lý đáo hạn khoản vay thành công!\nLựa chọn: ${
      selectedOption === 'payoff' ? 'Trả hết nợ' :
      selectedOption === 'extend' ? 'Gia hạn khoản vay' :
      'Tái cấu trúc'
    }`);
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Calendar size={24} />
            Đáo hạn Khoản Vay
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div className="fade-in">
              {/* Thông tin khoản vay */}
              <div className="loan-info-card mb-4">
                <h3 className="font-semibold mb-3">📋 Thông tin khoản vay</h3>
                <div className="info-grid">
                  <div>
                    <span className="text-secondary">Số hợp đồng:</span>
                    <span className="font-semibold ml-2">{loan.loan_number}</span>
                  </div>
                  <div>
                    <span className="text-secondary">Ngày giải ngân:</span>
                    <span className="font-semibold ml-2">{loan.disbursement_date}</span>
                  </div>
                  <div>
                    <span className="text-secondary">Ngày đáo hạn:</span>
                    <span className="font-semibold ml-2 text-warning">{loan.maturity_date}</span>
                  </div>
                  <div>
                    <span className="text-secondary">Lãi suất:</span>
                    <span className="font-semibold ml-2 text-danger">{loan.interest_rate}%/năm</span>
                  </div>
                </div>
              </div>

              {/* Số tiền cần trả */}
              <div className="balance-card">
                <div className="balance-row">
                  <span>Dư nợ gốc:</span>
                  <span className="font-semibold">{formatCurrency(outstandingBalance)}</span>
                </div>
                <div className="balance-row">
                  <span>Lãi chưa trả:</span>
                  <span className="font-semibold">{formatCurrency(unpaidInterest)}</span>
                </div>
                <div className="balance-row total">
                  <span>Tổng cần trả:</span>
                  <span className="font-bold text-danger">{formatCurrency(outstandingBalance + unpaidInterest)}</span>
                </div>
              </div>

              {/* Cảnh báo đáo hạn */}
              <div className="alert alert-warning">
                <AlertCircle size={20} />
                <div className="text-sm">
                  <strong>Khoản vay của bạn sắp đáo hạn!</strong><br />
                  Vui lòng chọn một trong các phương án xử lý dưới đây trước ngày {loan.maturity_date}
                </div>
              </div>

              {/* Lựa chọn xử lý */}
              <div className="mt-4">
                <h3 className="font-semibold mb-3">💡 Chọn phương án xử lý:</h3>
                
                <div className="option-cards">
                  {/* Option 1: Trả hết nợ */}
                  <div 
                    className={`option-card ${selectedOption === 'payoff' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('payoff')}
                  >
                    <CheckCircle size={24} className="text-success" />
                    <div className="flex-1">
                      <div className="font-semibold">Trả hết nợ và kết thúc</div>
                      <div className="text-sm text-secondary">
                        Thanh toán {formatCurrency(outstandingBalance + unpaidInterest)} để hoàn tất khoản vay
                      </div>
                      <div className="text-sm text-success mt-1">
                        ✓ Giải phóng tài sản thế chấp (nếu có)<br />
                        ✓ Cải thiện điểm tín dụng
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'payoff' && <div className="radio-checked" />}
                    </div>
                  </div>

                  {/* Option 2: Gia hạn */}
                  <div 
                    className={`option-card ${selectedOption === 'extend' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('extend')}
                  >
                    <TrendingUp size={24} className="text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold">Gia hạn khoản vay</div>
                      <div className="text-sm text-secondary">
                        Kéo dài thời gian trả nợ, giảm áp lực hàng tháng
                      </div>
                      <div className="text-sm text-warning mt-1">
                        ⚠ Cần phê duyệt từ nhân viên tín dụng
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'extend' && <div className="radio-checked" />}
                    </div>
                  </div>

                  {/* Option 3: Tái cấu trúc */}
                  <div 
                    className={`option-card ${selectedOption === 'restructure' ? 'selected' : ''}`}
                    onClick={() => setSelectedOption('restructure')}
                  >
                    <DollarSign size={24} className="text-warning" />
                    <div className="flex-1">
                      <div className="font-semibold">Tái cấu trúc khoản vay</div>
                      <div className="text-sm text-secondary">
                        Điều chỉnh lãi suất và kỳ hạn (nếu điểm tín dụng tốt)
                      </div>
                      <div className="text-sm text-warning mt-1">
                        ⚠ Cần thẩm định lại hồ sơ
                      </div>
                    </div>
                    <div className="radio">
                      {selectedOption === 'restructure' && <div className="radio-checked" />}
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

          {step === 2 && selectedOption === 'payoff' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">✅ Xác nhận trả hết nợ</h3>

              <div className="payoff-summary">
                <CheckCircle size={64} className="text-success mx-auto mb-4" />
                
                <p className="text-center mb-4 text-lg">
                  Bạn sẽ thanh toán toàn bộ số nợ còn lại và kết thúc khoản vay
                </p>

                <div className="summary-box">
                  <div className="summary-row">
                    <span>Dư nợ gốc:</span>
                    <span>{formatCurrency(outstandingBalance)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Lãi chưa trả:</span>
                    <span>{formatCurrency(unpaidInterest)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng thanh toán:</span>
                    <span className="text-2xl font-bold text-danger">
                      {formatCurrency(outstandingBalance + unpaidInterest)}
                    </span>
                  </div>
                </div>

                <div className="benefits-card mt-4">
                  <h4 className="font-semibold mb-2 text-success">✓ Lợi ích:</h4>
                  <ul className="benefits-list">
                    <li>Giải phóng tài sản thế chấp (nếu có)</li>
                    <li>Cải thiện điểm tín dụng (+10 điểm)</li>
                    <li>Không còn lãi suất tích lũy</li>
                    <li>Có thể đăng ký khoản vay mới với lãi suất tốt hơn</li>
                  </ul>
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(1)} className="btn btn-secondary">Quay lại</button>
                <button onClick={handleConfirm} className="btn btn-success btn-lg">
                  Xác nhận thanh toán {formatCurrency(outstandingBalance + unpaidInterest)}
                </button>
              </div>
            </div>
          )}

          {step === 2 && selectedOption === 'extend' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">⚙️ Cấu hình gia hạn</h3>

              {/* Chọn thời gian gia hạn */}
              <div className="form-group">
                <label>Thời gian gia hạn</label>
                <select 
                  value={extensionMonths} 
                  onChange={(e) => setExtensionMonths(Number(e.target.value))}
                  className="form-control"
                >
                  <option value={6}>6 tháng</option>
                  <option value={12}>12 tháng</option>
                  <option value={18}>18 tháng</option>
                  <option value={24}>24 tháng</option>
                  <option value={36}>36 tháng</option>
                </select>
              </div>

              {/* Lãi suất (có thể điều chỉnh nếu credit score tốt) */}
              <div className="form-group">
                <label>Lãi suất (%/năm)</label>
                <div className="input-with-note">
                  <input 
                    type="number" 
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                    className="form-control"
                    step="0.1"
                    min={loan.interest_rate}
                    max={loan.interest_rate + 2}
                  />
                  <div className="text-sm text-secondary mt-1">
                    Lãi suất cũ: {loan.interest_rate}% - Có thể thay đổi tùy điểm tín dụng
                  </div>
                </div>
              </div>

              {/* Preview gia hạn */}
              <div className="extension-preview">
                <h4 className="font-semibold mb-3">📊 Thông tin sau gia hạn:</h4>
                
                <div className="preview-grid">
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Số dư nợ</div>
                    <div className="font-semibold text-lg">{formatCurrency(outstandingBalance)}</div>
                  </div>
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Thời gian còn lại</div>
                    <div className="font-semibold text-lg">{extensionMonths} tháng</div>
                  </div>
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Lãi suất mới</div>
                    <div className="font-semibold text-lg text-danger">{newInterestRate}%/năm</div>
                  </div>
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Trả hàng tháng</div>
                    <div className="font-semibold text-lg text-primary">{formatCurrency(newMonthlyPayment)}</div>
                  </div>
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Ngày đáo hạn mới</div>
                    <div className="font-semibold text-lg">
                      {new Date(new Date(loan.maturity_date).setMonth(new Date(loan.maturity_date).getMonth() + extensionMonths))
                        .toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div className="preview-item">
                    <div className="text-sm text-secondary">Tổng lãi thêm</div>
                    <div className="font-semibold text-lg text-warning">
                      {formatCurrency((newMonthlyPayment * extensionMonths) - outstandingBalance)}
                    </div>
                  </div>
                </div>

                <div className="comparison mt-3">
                  <div className="comparison-row">
                    <span>So với trả hết nợ ngay:</span>
                    <span className="text-warning">
                      +{formatCurrency((newMonthlyPayment * extensionMonths) - outstandingBalance)} lãi phải trả thêm
                    </span>
                  </div>
                  <div className="comparison-row">
                    <span>Giảm áp lực hàng tháng:</span>
                    <span className="text-success">
                      Trả {formatCurrency(newMonthlyPayment)}/tháng thay vì trả hết {formatCurrency(outstandingBalance)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="alert alert-warning">
                <AlertCircle size={18} />
                <div className="text-sm">
                  <strong>Lưu ý:</strong> Yêu cầu gia hạn cần được phê duyệt bởi nhân viên tín dụng.
                  Thời gian xử lý: 2-3 ngày làm việc.
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(1)} className="btn btn-secondary">Quay lại</button>
                <button onClick={() => setStep(3)} className="btn btn-primary">Gửi yêu cầu gia hạn</button>
              </div>
            </div>
          )}

          {step === 2 && selectedOption === 'restructure' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">🔄 Tái cấu trúc khoản vay</h3>

              <div className="alert alert-info">
                <AlertCircle size={20} />
                <div>
                  <strong>Tái cấu trúc khoản vay</strong> cho phép bạn thay đổi các điều khoản của khoản vay
                  dựa trên tình hình tài chính và điểm tín dụng hiện tại.
                </div>
              </div>

              <div className="restructure-options">
                <h4 className="font-semibold mb-2">Bạn có thể điều chỉnh:</h4>
                <ul className="options-list">
                  <li>✓ Lãi suất (nếu điểm tín dụng cải thiện)</li>
                  <li>✓ Kỳ hạn (kéo dài hoặc rút ngắn)</li>
                  <li>✓ Số tiền trả hàng tháng</li>
                  <li>✓ Phương thức trả nợ</li>
                </ul>
              </div>

              <div className="requirements-card mt-3">
                <h4 className="font-semibold mb-2">📋 Yêu cầu:</h4>
                <ul className="requirements-list">
                  <li>Điểm tín dụng tối thiểu: 600</li>
                  <li>Đã trả ít nhất 30% tổng khoản vay</li>
                  <li>Không có kỳ nào quá hạn trong 6 tháng gần đây</li>
                  <li>Thu nhập ổn định</li>
                </ul>
              </div>

              <div className="alert alert-warning mt-3">
                <AlertCircle size={18} />
                <span className="text-sm">
                  Quy trình tái cấu trúc phức tạp hơn gia hạn và cần thẩm định lại toàn bộ hồ sơ.
                  Thời gian xử lý: 5-7 ngày làm việc.
                </span>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(1)} className="btn btn-secondary">Quay lại</button>
                <button onClick={() => setStep(3)} className="btn btn-primary">Gửi yêu cầu tái cấu trúc</button>
              </div>
            </div>
          )}

          {step === 3 && selectedOption !== 'payoff' && (
            <div className="fade-in">
              <h3 className="font-semibold mb-3">✅ Xác nhận gửi yêu cầu</h3>

              <div className="success-card">
                <CheckCircle size={64} className="text-success mx-auto mb-4" />
                <p className="text-center text-lg">
                  Yêu cầu {selectedOption === 'extend' ? 'gia hạn' : 'tái cấu trúc'} sẽ được gửi
                  đến nhân viên tín dụng để xét duyệt
                </p>
              </div>

              <div className="timeline mt-4">
                <h4 className="font-semibold mb-3">⏱ Quy trình xử lý:</h4>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>Bước 1:</strong> Gửi yêu cầu (Ngay)
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>Bước 2:</strong> Nhân viên xem xét hồ sơ (1-2 ngày)
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>Bước 3:</strong> Thông báo kết quả ({selectedOption === 'extend' ? '2-3' : '5-7'} ngày)
                  </div>
                </div>
              </div>

              <div className="alert alert-info mt-4">
                <AlertCircle size={18} />
                <span className="text-sm">
                  Bạn sẽ nhận thông báo qua SMS và Email khi có kết quả phê duyệt.
                </span>
              </div>

              <div className="modal-footer">
                <button onClick={() => setStep(2)} className="btn btn-secondary">Quay lại</button>
                <button onClick={handleConfirm} className="btn btn-success btn-lg">
                  Xác nhận gửi yêu cầu
                </button>
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        .loan-info-card {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .balance-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .balance-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .balance-row.total {
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
          align-items: start;
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
          flex-shrink: 0;
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

        .payoff-summary {
          text-align: center;
        }

        .summary-box {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1rem auto;
          max-width: 400px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .summary-row.total {
          border-bottom: none;
          padding-top: 1.5rem;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .benefits-card {
          background: #d1fae5;
          padding: 1rem;
          border-radius: 8px;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .benefits-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #059669;
          font-weight: bold;
        }

        .extension-preview {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .preview-item {
          text-align: center;
          padding: 1rem;
          background: white;
          border-radius: 8px;
        }

        .comparison {
          background: white;
          padding: 1rem;
          border-radius: 8px;
        }

        .comparison-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          gap: 1rem;
        }

        .restructure-options, .requirements-card {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 8px;
        }

        .options-list, .requirements-list {
          list-style: none;
          padding: 0;
        }

        .options-list li, .requirements-list li {
          padding: 0.5rem 0;
        }

        .success-card {
          text-align: center;
          padding: 2rem;
        }

        .timeline {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .timeline-item {
          display: flex;
          align-items: start;
          gap: 1rem;
          padding: 0.75rem 0;
          position: relative;
        }

        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 9px;
          top: 30px;
          width: 2px;
          height: 100%;
          background: var(--border-color);
        }

        .timeline-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          flex-shrink: 0;
          margin-top: 2px;
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

        .btn-lg {
          padding: 0.875rem 2rem;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
};

export default LoanMaturityModal;

