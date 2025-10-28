import { useState } from 'react';
import { PiggyBank, Calculator } from 'lucide-react';
import Modal from '../common/Modal';
import { interestRates, formatCurrency, calculateInterest } from '../../data/mockData';

const NewSavingsModal = ({ isOpen, onClose, accounts }) => {
  const [formData, setFormData] = useState({
    accountId: accounts[0]?.account_id || '',
    amount: '',
    termMonths: 12,
    interestPaymentMethod: 'END_OF_TERM',
    autoRenew: false,
  });

  const [preview, setPreview] = useState(null);

  const selectedRate = interestRates.savings.find(r => r.termMonths === parseInt(formData.termMonths));
  const selectedAccount = accounts.find(acc => acc.account_id === parseInt(formData.accountId));

  const calculatePreview = () => {
    const amount = parseFloat(formData.amount);
    if (!amount || !selectedRate) return;

    const interest = calculateInterest(amount, selectedRate.rate, formData.termMonths);
    const total = amount + interest;

    setPreview({
      principal: amount,
      rate: selectedRate.rate,
      termName: selectedRate.termName,
      interest: interest,
      total: total,
      monthlyInterest: formData.interestPaymentMethod === 'MONTHLY' ? interest / formData.termMonths : 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate saving
    alert(
      `✅ Gửi tiết kiệm thành công!\n\n` +
      `Số tiền gốc: ${formatCurrency(parseFloat(formData.amount))}\n` +
      `Kỳ hạn: ${selectedRate?.termName}\n` +
      `Lãi suất: ${selectedRate?.rate}%/năm\n` +
      `Lãi dự kiến: ${formatCurrency(preview?.interest || 0)}\n` +
      `Tổng nhận về: ${formatCurrency(preview?.total || 0)}\n\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mở sổ tiết kiệm mới" size="lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-2 gap-3">
          <div className="form-group">
            <label>Tài khoản nguồn</label>
            <select
              className="input"
              value={formData.accountId}
              onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              required
            >
              {accounts.map((acc) => (
                <option key={acc.account_id} value={acc.account_id}>
                  {acc.account_number} - {acc.accountTypeName} - {formatCurrency(acc.balance)}
                </option>
              ))}
            </select>
            {selectedAccount && (
              <small className="text-secondary" style={{ display: 'block', marginTop: '0.5rem' }}>
                Số dư khả dụng: <strong>{formatCurrency(selectedAccount.available_balance)}</strong>
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Số tiền gửi (VND)</label>
            <input
              type="number"
              className="input"
              placeholder="10,000,000"
              min="1000000"
              step="100000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <small className="text-xs text-secondary mt-1">Tối thiểu: 1,000,000 VND</small>
          </div>

          <div className="form-group">
            <label>Kỳ hạn</label>
            <select
              className="input"
              value={formData.termMonths}
              onChange={(e) => setFormData({ ...formData, termMonths: parseInt(e.target.value) })}
              required
            >
              {interestRates.savings.filter(r => r.termMonths > 0).map((rate) => (
                <option key={rate.termMonths} value={rate.termMonths}>
                  {rate.termName} - {rate.rate}%/năm
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Phương thức nhận lãi</label>
            <select
              className="input"
              value={formData.interestPaymentMethod}
              onChange={(e) => setFormData({ ...formData, interestPaymentMethod: e.target.value })}
            >
              <option value="END_OF_TERM">Nhận lãi cuối kỳ</option>
              <option value="MONTHLY">Nhận lãi hàng tháng</option>
              <option value="COMPOUND">Lãi gộp vào gốc</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.autoRenew}
              onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
            />
            <span>Tự động tái tục khi đáo hạn</span>
          </label>
        </div>

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={calculatePreview}
          style={{ width: '100%' }}
        >
          <Calculator size={18} />
          Tính toán lãi dự kiến
        </button>

        {preview && (
          <div className="preview-box">
            <h4 className="font-semibold mb-3">📊 Dự kiến khi đáo hạn:</h4>
            <div className="preview-grid">
              <div>
                <div className="text-sm text-secondary">Số tiền gốc</div>
                <div className="font-semibold text-lg">{formatCurrency(preview.principal)}</div>
              </div>
              <div>
                <div className="text-sm text-secondary">Lãi suất</div>
                <div className="font-semibold text-lg text-primary">{preview.rate}%/năm</div>
              </div>
              <div>
                <div className="text-sm text-secondary">Kỳ hạn</div>
                <div className="font-semibold text-lg">{preview.termName}</div>
              </div>
              <div>
                <div className="text-sm text-secondary">Lãi nhận được</div>
                <div className="font-semibold text-lg text-success">{formatCurrency(preview.interest)}</div>
              </div>
            </div>
            <div className="total-preview">
              <div className="text-secondary">Tổng tiền nhận về</div>
              <div className="total-amount">{formatCurrency(preview.total)}</div>
            </div>
            {formData.interestPaymentMethod === 'MONTHLY' && (
              <div className="text-sm text-info mt-2">
                💰 Nhận lãi hàng tháng: ~{formatCurrency(preview.monthlyInterest)}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button type="button" className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
            Hủy
          </button>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            <PiggyBank size={18} />
            Mở sổ tiết kiệm
          </button>
        </div>
      </form>

      <style jsx>{`
        .preview-box {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #3b82f6;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1rem;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .total-preview {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          border: 2px dashed #3b82f6;
        }

        .total-amount {
          font-size: 2rem;
          font-weight: 700;
          color: #1e40af;
          margin-top: 0.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
      `}</style>
    </Modal>
  );
};

export default NewSavingsModal;

