import { useState } from 'react';
import { CreditCard, User, Phone, Mail, Calendar } from 'lucide-react';
import Modal from '../common/Modal';

const NewAccountModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    idCardNumber: '',
    dateOfBirth: '',
    address: '',
    occupation: '',
    monthlyIncome: '',
    // Account info
    accountType: 'CHECKING',
    initialDeposit: '',
    agreeToTerms: false,
  });

  const accountTypes = [
    { value: 'CHECKING', label: 'Tài khoản thanh toán', description: 'Không có lãi suất, rút bất kỳ lúc nào' },
    { value: 'SAVINGS', label: 'Tài khoản tiết kiệm', description: 'Có lãi suất, có kỳ hạn' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert('Vui lòng đồng ý với các điều khoản và điều kiện!');
      return;
    }

    alert(
      `✅ Mở tài khoản thành công!\n\n` +
      `Khách hàng: ${formData.fullName}\n` +
      `Số CMND: ${formData.idCardNumber}\n` +
      `Loại tài khoản: ${accountTypes.find(t => t.value === formData.accountType)?.label}\n` +
      `Số tiền nạp ban đầu: ${new Intl.NumberFormat('vi-VN').format(parseFloat(formData.initialDeposit))} VND\n\n` +
      `Số tài khoản: ${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}\n\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );

    onClose();
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      idCardNumber: '',
      dateOfBirth: '',
      address: '',
      occupation: '',
      monthlyIncome: '',
      accountType: 'CHECKING',
      initialDeposit: '',
      agreeToTerms: false,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mở tài khoản mới cho khách hàng" size="lg">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Thông tin cá nhân</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Thông tin tài khoản</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Xác nhận</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h4 className="step-title">Thông tin cá nhân khách hàng</h4>

            <div className="grid grid-2 gap-3">
              <div className="form-group">
                <label>Họ và tên đầy đủ</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Số CMND/CCCD</label>
                <input
                  type="text"
                  className="input"
                  placeholder="001234567890"
                  value={formData.idCardNumber}
                  onChange={(e) => setFormData({ ...formData, idCardNumber: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  className="input"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="0901234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="nguyenvana@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nghề nghiệp</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Kỹ sư, Bác sĩ, Kinh doanh..."
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="input"
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Thu nhập hàng tháng (VND)</label>
              <input
                type="number"
                className="input"
                placeholder="20000000"
                min="0"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h4 className="step-title">Thông tin tài khoản</h4>

            <div className="form-group">
              <label>Loại tài khoản</label>
              <select
                className="input"
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                required
              >
                {accountTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Số tiền nạp ban đầu (VND)</label>
              <input
                type="number"
                className="input"
                placeholder="1000000"
                min="100000"
                step="100000"
                value={formData.initialDeposit}
                onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
                required
              />
              <small className="text-xs text-secondary mt-1">Tối thiểu: 100,000 VND</small>
            </div>

            <div className="alert alert-info">
              📋 <strong>Lưu ý:</strong> Khách hàng cần xuất trình CMND/CCCD bản gốc và ký vào mẫu đơn mở tài khoản.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h4 className="step-title">Xác nhận thông tin</h4>

            <div className="summary-box">
              <div className="summary-section">
                <h5>Thông tin cá nhân</h5>
                <div className="summary-item">
                  <span>Họ tên:</span>
                  <strong>{formData.fullName}</strong>
                </div>
                <div className="summary-item">
                  <span>CMND/CCCD:</span>
                  <strong>{formData.idCardNumber}</strong>
                </div>
                <div className="summary-item">
                  <span>Ngày sinh:</span>
                  <strong>{formData.dateOfBirth}</strong>
                </div>
                <div className="summary-item">
                  <span>SĐT:</span>
                  <strong>{formData.phone}</strong>
                </div>
                <div className="summary-item">
                  <span>Email:</span>
                  <strong>{formData.email}</strong>
                </div>
                <div className="summary-item">
                  <span>Thu nhập:</span>
                  <strong>{new Intl.NumberFormat('vi-VN').format(parseFloat(formData.monthlyIncome))}/tháng</strong>
                </div>
              </div>

              <div className="summary-section">
                <h5>Thông tin tài khoản</h5>
                <div className="summary-item">
                  <span>Loại tài khoản:</span>
                  <strong>{accountTypes.find(t => t.value === formData.accountType)?.label}</strong>
                </div>
                <div className="summary-item">
                  <span>Số tiền nạp ban đầu:</span>
                  <strong>{new Intl.NumberFormat('vi-VN').format(parseFloat(formData.initialDeposit))} VND</strong>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  required
                />
                <span>
                  Tôi xác nhận đã kiểm tra thông tin và giấy tờ của khách hàng.
                  Khách hàng đã đồng ý với các điều khoản và điều kiện mở tài khoản.
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              Quay lại
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
              style={{ flex: 1 }}
            >
              Tiếp tục
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <CreditCard size={18} />
              Mở tài khoản
            </button>
          )}
        </div>
      </form>

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
          min-height: 400px;
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

        .summary-box {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .summary-section {
          margin-bottom: 1.5rem;
        }

        .summary-section:last-child {
          margin-bottom: 0;
        }

        .summary-section h5 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--primary-color);
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
      `}</style>
    </Modal>
  );
};

export default NewAccountModal;

