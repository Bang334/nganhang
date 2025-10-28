import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, DollarSign, Receipt } from 'lucide-react';
import Modal from '../common/Modal';
import { accounts, formatCurrency } from '../../data/mockData';

const DepositWithdrawModal = ({ isOpen, onClose, type = 'DEPOSIT' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    description: '',
    customerName: '',
    customerPhone: '',
    customerId: '',
  });

  const [transactionResult, setTransactionResult] = useState(null);

  const isDeposit = type === 'DEPOSIT';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    // Simulate transaction
    const transactionCode = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentBalance = accounts.find(acc => acc.accountNumber === formData.accountNumber)?.balance || 0;
    const newBalance = isDeposit
      ? currentBalance + parseFloat(formData.amount)
      : currentBalance - parseFloat(formData.amount);

    setTransactionResult({
      transactionCode,
      type: isDeposit ? 'NẠP TIỀN' : 'RÚT TIỀN',
      accountNumber: formData.accountNumber,
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      fee: 0,
      oldBalance: currentBalance,
      newBalance,
      description: formData.description || (isDeposit ? 'Nạp tiền tại quầy' : 'Rút tiền tại quầy'),
      date: new Date().toLocaleString('vi-VN'),
    });

    setStep(3);
  };

  const handleComplete = () => {
    alert(
      `✅ Giao dịch ${isDeposit ? 'nạp' : 'rút'} tiền thành công!\n\n` +
      `Mã giao dịch: ${transactionResult.transactionCode}\n` +
      `Khách hàng: ${transactionResult.customerName}\n` +
      `Số tài khoản: ${transactionResult.accountNumber}\n` +
      `Số tiền: ${formatCurrency(transactionResult.amount)}\n` +
      `Số dư sau giao dịch: ${formatCurrency(transactionResult.newBalance)}\n\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );

    onClose();
    setStep(1);
    setTransactionResult(null);
    setFormData({
      accountNumber: '',
      amount: '',
      description: '',
      customerName: '',
      customerPhone: '',
      customerId: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${isDeposit ? 'Nạp tiền' : 'Rút tiền'} tại quầy`} size="md">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Thông tin khách</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Xác nhận</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Hoàn thành</div>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmit} className="form-step">
          <h4 className="step-title">
            {isDeposit ? <ArrowDownRight size={20} className="text-success" /> : <ArrowUpRight size={20} className="text-danger" />}
            Thông tin {isDeposit ? 'nạp' : 'rút'} tiền
          </h4>

          <div className="form-group">
            <label>Số tài khoản {isDeposit ? 'nhận' : 'rút'}</label>
            <input
              type="text"
              className="input"
              placeholder="1234567890123456"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Họ tên khách hàng</label>
            <input
              type="text"
              className="input"
              placeholder="Nguyễn Văn A"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              className="input"
              placeholder="0901234567"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Số tiền {isDeposit ? 'nạp' : 'rút'} (VND)</label>
            <input
              type="number"
              className="input"
              placeholder={isDeposit ? "1000000" : "500000"}
              min={isDeposit ? "10000" : "50000"}
              max={isDeposit ? "100000000" : "5000000"}
              step="10000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <small className="text-xs text-secondary mt-1">
              {isDeposit
                ? 'Tối thiểu: 10,000 VND, Tối đa: 100,000,000 VND'
                : 'Tối thiểu: 50,000 VND, Tối đa: 5,000,000 VND'
              }
            </small>
          </div>

          <div className="form-group">
            <label>Nội dung giao dịch</label>
            <input
              type="text"
              className="input"
              placeholder={isDeposit ? "Nạp tiền mặt tại quầy" : "Rút tiền mặt tại quầy"}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="alert alert-info">
            📋 <strong>Lưu ý:</strong> {isDeposit
              ? 'Khách hàng cần nộp tiền mặt tại quầy. Kiểm tra kỹ số tiền trước khi xác nhận.'
              : 'Khách hàng cần xuất trình CMND/CCCD và ký vào phiếu rút tiền.'
            }
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="form-step">
          <h4 className="step-title">Xác nhận giao dịch</h4>

          <div className="confirmation-box">
            <div className="confirmation-item">
              <span>Loại giao dịch:</span>
              <strong className={isDeposit ? 'text-success' : 'text-danger'}>
                {isDeposit ? 'NẠP TIỀN' : 'RÚT TIỀN'}
              </strong>
            </div>
            <div className="confirmation-item">
              <span>Số tài khoản:</span>
              <strong>{formData.accountNumber}</strong>
            </div>
            <div className="confirmation-item">
              <span>Khách hàng:</span>
              <strong>{formData.customerName}</strong>
            </div>
            <div className="confirmation-item">
              <span>Số tiền:</span>
              <strong className="text-lg">
                {isDeposit ? '+' : '-'}{formatCurrency(parseFloat(formData.amount))}
              </strong>
            </div>
            <div className="confirmation-item">
              <span>Phí giao dịch:</span>
              <strong className="text-success">Miễn phí</strong>
            </div>
            <div className="confirmation-item">
              <span>Số dư sau giao dịch:</span>
              <strong>
                {formatCurrency(
                  (accounts.find(acc => acc.accountNumber === formData.accountNumber)?.balance || 0)
                  + (isDeposit ? 1 : -1) * parseFloat(formData.amount)
                )}
              </strong>
            </div>
          </div>

          <div className="alert alert-warning">
            ⚠️ Vui lòng kiểm tra lại thông tin trước khi xác nhận!
          </div>
        </div>
      )}

      {step === 3 && transactionResult && (
        <div className="form-step">
          <h4 className="step-title">
            <Receipt size={20} className="text-success" />
            Giao dịch hoàn thành
          </h4>

          <div className="receipt-box">
            <div className="receipt-header">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">ABC BANK</div>
                <div className="text-sm text-secondary">NGÂN HÀNG TMCP ABC</div>
                <div className="text-xs text-secondary mt-1">
                  {transactionResult.date}
                </div>
              </div>
            </div>

            <div className="receipt-body">
              <div className="receipt-item">
                <span>Mã giao dịch:</span>
                <strong>{transactionResult.transactionCode}</strong>
              </div>
              <div className="receipt-item">
                <span>Loại giao dịch:</span>
                <strong>{transactionResult.type}</strong>
              </div>
              <div className="receipt-item">
                <span>Số tài khoản:</span>
                <strong>{transactionResult.accountNumber}</strong>
              </div>
              <div className="receipt-item">
                <span>Khách hàng:</span>
                <strong>{transactionResult.customerName}</strong>
              </div>
              <div className="receipt-item">
                <span>Số tiền:</span>
                <strong className={isDeposit ? 'text-success' : 'text-danger'}>
                  {isDeposit ? '+' : '-'}{formatCurrency(transactionResult.amount)}
                </strong>
              </div>
              <div className="receipt-item">
                <span>Phí:</span>
                <strong className="text-success">{formatCurrency(transactionResult.fee)}</strong>
              </div>
              <div className="receipt-item">
                <span>Số dư trước:</span>
                <strong>{formatCurrency(transactionResult.oldBalance)}</strong>
              </div>
              <div className="receipt-item">
                <span>Số dư sau:</span>
                <strong className="text-primary">{formatCurrency(transactionResult.newBalance)}</strong>
              </div>
            </div>

            <div className="receipt-footer">
              <div className="text-center text-xs text-secondary">
                Cảm ơn quý khách đã sử dụng dịch vụ!<br/>
                Giữ biên lai này để đối chiếu khi cần thiết.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {step > 1 && step < 3 && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setStep(step - 1)}
          >
            Quay lại
          </button>
        )}

        {step === 1 && (
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
            <DollarSign size={18} />
            Tiếp tục
          </button>
        )}

        {step === 2 && (
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
            Xác nhận {isDeposit ? 'nạp' : 'rút'} tiền
          </button>
        )}

        {step === 3 && (
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleComplete}>
            Hoàn thành
          </button>
        )}
      </div>

      <style jsx>{`
        .steps-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border-color);
        }

        .step {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-secondary);
        }

        .step.active {
          background: var(--primary-color);
          color: white;
          font-weight: 600;
        }

        .form-step {
          min-height: 300px;
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .alert-info {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          color: #1e40af;
        }

        .alert-warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          color: #92400e;
        }

        .confirmation-box {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .confirmation-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .confirmation-item:last-child {
          border-bottom: none;
        }

        .receipt-box {
          background: white;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          font-family: monospace;
        }

        .receipt-header {
          text-align: center;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .receipt-body {
          margin-bottom: 1rem;
        }

        .receipt-item {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0;
        }

        .receipt-footer {
          border-top: 1px dashed var(--border-color);
          padding-top: 1rem;
          text-align: center;
        }
      `}</style>
    </Modal>
  );
};

export default DepositWithdrawModal;

