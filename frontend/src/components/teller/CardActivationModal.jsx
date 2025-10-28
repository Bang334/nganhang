import { useState } from 'react';
import { CreditCard, CheckCircle, Shield } from 'lucide-react';
import Modal from '../common/Modal';
import { cards, accounts, formatCurrency } from '../../data/mockData';

const CardActivationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountNumber: '',
    customerName: '',
    customerPhone: '',
    customerId: '',
    cardType: 'DEBIT',
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [activationCode, setActivationCode] = useState('');
  const [activationResult, setActivationResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      // Find account and cards
      const account = accounts.find(acc => acc.accountNumber === formData.accountNumber);
      if (!account) {
        alert('Không tìm thấy tài khoản!');
        return;
      }

      const accountCards = cards.filter(card => card.accountNumber === account.accountNumber);
      if (accountCards.length === 0) {
        alert('Tài khoản chưa có thẻ nào!');
        return;
      }

      setSelectedCard(accountCards[0]);
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!activationCode) {
        alert('Vui lòng nhập mã kích hoạt!');
        return;
      }

      // Simulate activation
      setActivationResult({
        cardNumber: selectedCard.cardNumber,
        cardType: selectedCard.cardType,
        accountNumber: selectedCard.accountNumber,
        activationCode: activationCode,
        activatedAt: new Date().toLocaleString('vi-VN'),
        status: 'SUCCESS',
      });

      setStep(3);
      return;
    }
  };

  const handleComplete = () => {
    alert(
      `✅ Kích hoạt thẻ thành công!\n\n` +
      `Số thẻ: ${activationResult.cardNumber}\n` +
      `Loại thẻ: ${activationResult.cardType === 'DEBIT' ? 'Thẻ ghi nợ' : 'Thẻ tín dụng'}\n` +
      `Tài khoản: ${activationResult.accountNumber}\n` +
      `Mã kích hoạt: ${activationResult.activationCode}\n` +
      `Thời gian: ${activationResult.activatedAt}\n\n` +
      `Trong ứng dụng thực tế, trạng thái thẻ sẽ được cập nhật trong database.`
    );

    onClose();
    setStep(1);
    setActivationResult(null);
    setSelectedCard(null);
    setFormData({
      accountNumber: '',
      customerName: '',
      customerPhone: '',
      customerId: '',
      cardType: 'DEBIT',
    });
    setActivationCode('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kích hoạt thẻ ngân hàng" size="md">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Thông tin khách</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Kích hoạt</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Hoàn thành</div>
      </div>

      {step === 1 && (
        <form onSubmit={handleSubmit} className="form-step">
          <h4 className="step-title">
            <CreditCard size={20} />
            Thông tin khách hàng
          </h4>

          <div className="form-group">
            <label>Số tài khoản</label>
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
            <label>Loại thẻ cần kích hoạt</label>
            <select
              className="input"
              value={formData.cardType}
              onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
            >
              <option value="DEBIT">Thẻ ghi nợ (ATM)</option>
              <option value="CREDIT">Thẻ tín dụng</option>
            </select>
          </div>

          <div className="alert alert-info">
            📋 <strong>Lưu ý:</strong> Khách hàng cần xuất trình CMND/CCCD và ký vào biên bản kích hoạt thẻ.
          </div>
        </form>
      )}

      {step === 2 && selectedCard && (
        <div className="form-step">
          <h4 className="step-title">
            <Shield size={20} />
            Kích hoạt thẻ
          </h4>

          <div className="card-info">
            <div className="card-preview">
              <div className="card-type">
                {selectedCard.cardBrand} {selectedCard.cardType === 'DEBIT' ? 'DEBIT' : 'CREDIT'}
              </div>
              <div className="card-number">
                {selectedCard.cardNumber}
              </div>
              <div className="card-details">
                <div>
                  <div className="text-xs text-secondary">Hết hạn</div>
                  <div className="font-medium">{selectedCard.expiryDate}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-secondary">Tài khoản</div>
                  <div className="font-medium">{selectedCard.accountNumber}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Mã kích hoạt từ hệ thống</label>
            <div className="activation-code-display">
              {Math.random().toString(36).substr(2, 8).toUpperCase()}
            </div>
            <small className="text-xs text-secondary">
              Mã này được gửi qua SMS/Email cho khách hàng
            </small>
          </div>

          <div className="form-group">
            <label>Mã kích hoạt từ khách hàng</label>
            <input
              type="text"
              className="input"
              placeholder="Nhập mã 8 ký tự"
              maxLength="8"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="alert alert-warning">
            ⚠️ Vui lòng so sánh mã kích hoạt từ khách hàng với mã hệ thống trước khi xác nhận!
          </div>
        </div>
      )}

      {step === 3 && activationResult && (
        <div className="form-step">
          <h4 className="step-title">
            <CheckCircle size={20} className="text-success" />
            Kích hoạt thành công
          </h4>

          <div className="activation-success">
            <div className="success-icon">
              <CheckCircle size={64} className="text-success" />
            </div>
            <div className="success-message">
              <h5>Thẻ đã được kích hoạt thành công!</h5>
              <p>Khách hàng có thể sử dụng thẻ ngay bây giờ.</p>
            </div>
          </div>

          <div className="activation-details">
            <div className="detail-item">
              <span>Số thẻ:</span>
              <strong>{activationResult.cardNumber}</strong>
            </div>
            <div className="detail-item">
              <span>Loại thẻ:</span>
              <strong>
                {activationResult.cardType === 'DEBIT' ? 'Thẻ ghi nợ' : 'Thẻ tín dụng'}
              </strong>
            </div>
            <div className="detail-item">
              <span>Tài khoản liên kết:</span>
              <strong>{activationResult.accountNumber}</strong>
            </div>
            <div className="detail-item">
              <span>Mã kích hoạt:</span>
              <strong>{activationResult.activationCode}</strong>
            </div>
            <div className="detail-item">
              <span>Thời gian kích hoạt:</span>
              <strong>{activationResult.activatedAt}</strong>
            </div>
            <div className="detail-item">
              <span>Trạng thái:</span>
              <strong className="text-success">HOẠT ĐỘNG</strong>
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
            Tìm thẻ
          </button>
        )}

        {step === 2 && (
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
            Kích hoạt thẻ
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

        .card-info {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .card-preview {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
        }

        .card-type {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .card-number {
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          font-family: 'Courier New', monospace;
        }

        .card-details {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .activation-code-display {
          background: #f8fafc;
          border: 2px dashed #3b82f6;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          font-family: monospace;
          font-size: 1.5rem;
          font-weight: bold;
          color: #1e40af;
          letter-spacing: 0.2em;
        }

        .activation-success {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          margin-bottom: 1rem;
        }

        .success-message h5 {
          color: var(--success-color);
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .activation-details {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .detail-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </Modal>
  );
};

export default CardActivationModal;

