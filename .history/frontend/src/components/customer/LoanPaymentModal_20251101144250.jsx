import { useState } from 'react';
import { DollarSign, Calendar, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import Modal from '../common/Modal';
import { formatCurrency } from '../../data/mockData';

const LoanPaymentModal = ({ isOpen, onClose, loan }) => {
  const [paymentMethod, setPaymentMethod] = useState('MANUAL'); // MANUAL or AUTO
  const [paymentType, setPaymentType] = useState('FULL'); // FULL, MULTIPLE
  const [amount, setAmount] = useState(0);
  const [numberOfPeriods, setNumberOfPeriods] = useState(1);

  if (!loan) return null;

  // Mock data - thực tế sẽ query từ LoanPaymentSchedule
  const monthlyPayment = loan.monthly_payment || 5000000;
  const accountBalance = 50000000; // Mock số dư tài khoản
  const minimumPayment = monthlyPayment * 0.3; // 30% của kỳ trả

  const calculatePaymentAmount = () => {
    if (paymentType === 'FULL') {
      return monthlyPayment;
    } else if (paymentType === 'PARTIAL') {
      return amount;
    } else if (paymentType === 'MULTIPLE') {
      return monthlyPayment * numberOfPeriods;
    }
    return 0;
  };

  const totalPayment = calculatePaymentAmount();
  const canPayment = accountBalance >= totalPayment && totalPayment >= minimumPayment;

  const handleConfirmPayment = () => {
    if (!canPayment) {
      alert('❌ Không thể thực hiện thanh toán!\n\nSố dư không đủ hoặc số tiền không hợp lệ.');
      return;
    }

    const paymentInfo = {
      loanNumber: loan.loan_number,
      paymentMethod: paymentMethod === 'AUTO' ? 'Tự động' : 'Thủ công',
      paymentType: 
        paymentType === 'FULL' ? 'Trả đủ kỳ này' :
        paymentType === 'PARTIAL' ? 'Trả một phần' :
        `Trả trước ${numberOfPeriods} kỳ`,
      amount: totalPayment,
      remainingBalance: loan.outstanding_balance - (totalPayment * 0.7), // 70% là gốc (mock)
    };

    alert(
      `✅ Thanh toán thành công!\n\n` +
      `Khoản vay: ${paymentInfo.loanNumber}\n` +
      `Phương thức: ${paymentInfo.paymentMethod}\n` +
      `Loại thanh toán: ${paymentInfo.paymentType}\n` +
      `Số tiền: ${formatCurrency(paymentInfo.amount)}\n` +
      `Số dư nợ còn lại: ${formatCurrency(paymentInfo.remainingBalance)}\n\n` +
      `Trong ứng dụng thực tế:\n` +
      `- Trừ tiền từ tài khoản\n` +
      `- Ghi nhận giao dịch trả nợ\n` +
      `- Cập nhật lịch trả nợ\n` +
      `- Cập nhật số dư nợ còn lại`
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trả nợ khoản vay" size="md">
      <div className="payment-modal">
        {/* Loan Info */}
        <div className="loan-info-box">
          <h4 className="info-title">Thông tin khoản vay</h4>
          <div className="info-grid">
            <div className="info-item">
              <span>Số hồ sơ:</span>
              <strong>{loan.loan_number}</strong>
            </div>
            <div className="info-item">
              <span>Loại vay:</span>
              <strong>{loan.loanTypeName}</strong>
            </div>
            <div className="info-item">
              <span>Dư nợ gốc:</span>
              <strong className="text-warning">{formatCurrency(loan.outstanding_balance)}</strong>
            </div>
            <div className="info-item">
              <span>Trả hàng tháng:</span>
              <strong className="text-primary">{formatCurrency(monthlyPayment)}</strong>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="method-selection">
          <h4 className="section-title">
            <CreditCard size={18} />
            Chọn phương thức trả
          </h4>
          <div className="method-options">
            <div 
              className={`method-card ${paymentMethod === 'MANUAL' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('MANUAL')}
            >
              <div className="method-icon">👤</div>
              <div className="method-details">
                <div className="method-name">Trả thủ công</div>
                <div className="method-desc">Bạn chủ động thanh toán</div>
              </div>
              <div className="radio">
                {paymentMethod === 'MANUAL' && <div className="radio-checked" />}
              </div>
            </div>

            <div 
              className={`method-card ${paymentMethod === 'AUTO' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('AUTO')}
            >
              <div className="method-icon">🤖</div>
              <div className="method-details">
                <div className="method-name">Trả tự động</div>
                <div className="method-desc">Tự động trừ mỗi tháng</div>
              </div>
              <div className="radio">
                {paymentMethod === 'AUTO' && <div className="radio-checked" />}
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === 'MANUAL' && (
          <div className="payment-options">
            <h4 className="section-title">
              <DollarSign size={18} />
              Chọn số tiền trả
            </h4>

            {/* Full Payment */}
            <div 
              className={`payment-option ${paymentType === 'FULL' ? 'selected' : ''}`}
              onClick={() => setPaymentType('FULL')}
            >
              <div className="radio">
                {paymentType === 'FULL' && <div className="radio-checked" />}
              </div>
              <div className="option-content">
                <div className="option-name">Trả đủ kỳ này</div>
                <div className="option-amount">{formatCurrency(monthlyPayment)}</div>
              </div>
            </div>

            {/* Partial Payment */}
            <div 
              className={`payment-option ${paymentType === 'PARTIAL' ? 'selected' : ''}`}
              onClick={() => setPaymentType('PARTIAL')}
            >
              <div className="radio">
                {paymentType === 'PARTIAL' && <div className="radio-checked" />}
              </div>
              <div className="option-content">
                <div className="option-name">Trả một phần</div>
                {paymentType === 'PARTIAL' && (
                  <input
                    type="number"
                    className="amount-input"
                    placeholder="Nhập số tiền"
                    min={minimumPayment}
                    max={monthlyPayment}
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <div className="option-note">Tối thiểu: {formatCurrency(minimumPayment)}</div>
              </div>
            </div>

            {/* Multiple Periods */}
            <div 
              className={`payment-option ${paymentType === 'MULTIPLE' ? 'selected' : ''}`}
              onClick={() => setPaymentType('MULTIPLE')}
            >
              <div className="radio">
                {paymentType === 'MULTIPLE' && <div className="radio-checked" />}
              </div>
              <div className="option-content">
                <div className="option-name">Trả trước nhiều kỳ</div>
                {paymentType === 'MULTIPLE' && (
                  <div className="periods-selector">
                    <label>Số kỳ muốn trả:</label>
                    <select
                      className="periods-select"
                      value={numberOfPeriods}
                      onChange={(e) => setNumberOfPeriods(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[1, 2, 3, 4, 5, 6, 12].map(n => (
                        <option key={n} value={n}>{n} kỳ</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="option-amount">
                  {paymentType === 'MULTIPLE' ? formatCurrency(monthlyPayment * numberOfPeriods) : ''}
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'AUTO' && (
          <div className="auto-payment-info">
            <div className="alert alert-info">
              <AlertCircle size={18} />
              <div>
                <strong>Trả tự động:</strong> Hệ thống sẽ tự động trừ {formatCurrency(monthlyPayment)} từ 
                tài khoản của bạn vào ngày đáo hạn mỗi tháng. Vui lòng đảm bảo số dư đủ trước ngày trả.
              </div>
            </div>
          </div>
        )}

        {/* Account Balance Check */}
        <div className="balance-check">
          <div className="balance-row">
            <span>Số dư tài khoản:</span>
            <strong className="text-success">{formatCurrency(accountBalance)}</strong>
          </div>
          <div className="balance-row">
            <span>Số tiền cần trả:</span>
            <strong className="text-primary">{formatCurrency(totalPayment)}</strong>
          </div>
          <div className="balance-row total">
            <span>Còn lại sau khi trả:</span>
            <strong className={accountBalance >= totalPayment ? 'text-success' : 'text-danger'}>
              {formatCurrency(accountBalance - totalPayment)}
            </strong>
          </div>
        </div>

        {/* Warning */}
        {!canPayment && (
          <div className="alert alert-warning">
            <AlertCircle size={18} />
            <span>
              {accountBalance < totalPayment ? 
                'Số dư tài khoản không đủ để thực hiện thanh toán!' :
                `Số tiền trả phải >= ${formatCurrency(minimumPayment)}`
              }
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button 
            className="btn btn-outline"
            onClick={onClose}
          >
            Hủy
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleConfirmPayment}
            disabled={!canPayment}
            style={{ flex: 1 }}
          >
            <CheckCircle size={18} />
            Xác nhận thanh toán
          </button>
        </div>
      </div>

      <style jsx>{`
        .payment-modal {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .loan-info-box {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #93c5fd;
          border-radius: 12px;
          padding: 1.25rem;
        }

        .info-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1e40af;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .method-selection,
        .payment-options {
          margin-bottom: 0.5rem;
        }

        .method-options {
          display: flex;
          gap: 1rem;
        }

        .method-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid var(--border-color);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          background: white;
        }

        .method-card:hover {
          border-color: var(--primary-color);
          background: var(--bg-secondary);
        }

        .method-card.selected {
          border-color: var(--primary-color);
          background: var(--primary-light);
        }

        .method-icon {
          font-size: 2rem;
        }

        .method-details {
          flex: 1;
        }

        .method-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .method-desc {
          font-size: 0.813rem;
          color: var(--text-secondary);
        }

        .payment-option {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid var(--border-color);
          border-radius: 10px;
          margin-bottom: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .payment-option:hover {
          border-color: var(--primary-color);
          background: var(--bg-secondary);
        }

        .payment-option.selected {
          border-color: var(--primary-color);
          background: var(--primary-light);
        }

        .option-content {
          flex: 1;
        }

        .option-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .option-amount {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-top: 0.5rem;
        }

        .option-note {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .amount-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .amount-input:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .periods-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .periods-selector label {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .periods-select {
          padding: 0.375rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
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
          margin-top: 0.25rem;
        }

        .method-card.selected .radio,
        .payment-option.selected .radio {
          border-color: var(--primary-color);
        }

        .radio-checked {
          width: 12px;
          height: 12px;
          background: var(--primary-color);
          border-radius: 50%;
        }

        .auto-payment-info {
          margin-top: 1rem;
        }

        .balance-check {
          background: var(--bg-secondary);
          border-radius: 10px;
          padding: 1rem;
        }

        .balance-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .balance-row:last-child {
          border-bottom: none;
        }

        .balance-row.total {
          font-size: 1.125rem;
          padding-top: 0.75rem;
          margin-top: 0.25rem;
          border-top: 2px solid var(--border-color);
        }

        .alert {
          display: flex;
          align-items: start;
          gap: 0.75rem;
          padding: 0.875rem;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .alert-info {
          background: #eff6ff;
          border-left: 4px solid #3b82f6;
          color: #1e40af;
        }

        .alert-warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          color: #92400e;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </Modal>
  );
};

export default LoanPaymentModal;

