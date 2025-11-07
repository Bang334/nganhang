import { useState } from 'react';
import { Send } from 'lucide-react';
import { getCustomerAccounts, formatCurrency, currentUser, banks } from '../../data/mockData';

const Transfer = ({ user }) => {
  // Lấy accounts của customer hiện tại
  const customerId = currentUser.id || 1;
  const accounts = getCustomerAccounts(customerId);
  
  const [formData, setFormData] = useState({
    fromAccount: accounts[0]?.account_number || '',
    toBank: 'ABC',
    toAccount: '',
    amount: '',
    description: '',
  });

  const isInternalTransfer = formData.toBank === 'ABC';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Chức năng demo: Chuyển khoản thành công!\nTrong ứng dụng thực tế, sẽ có xác thực OTP và gọi API.');
  };

  // Lấy thông tin tài khoản đang chọn
  const selectedAccount = accounts.find(acc => acc.account_number === formData.fromAccount);

  return (
    <div className="fade-in">

      <div className="grid grid-2">
        <div className="card">
          <h3 className="card-header">Thông tin chuyển khoản</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Từ tài khoản</label>
              <select
                className="input"
                value={formData.fromAccount}
                onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
              >
                {accounts.map((acc) => (
                  <option key={acc.account_id} value={acc.account_number}>
                    {acc.account_number} - {acc.accountTypeName} - {formatCurrency(acc.balance)}
                  </option>
                ))}
              </select>
            </div>

            {selectedAccount && (
              <div style={{
                padding: '1rem',
                background: '#f0f9ff',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#1e40af', marginBottom: '0.25rem' }}>Số dư khả dụng</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e3a8a' }}>
                  {formatCurrency(selectedAccount.available_balance)}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Ngân hàng nhận</label>
              <select
                className="input"
                value={formData.toBank}
                onChange={(e) => setFormData({ ...formData, toBank: e.target.value })}
                required
              >
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <small className="text-secondary" style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                {isInternalTransfer ? '✅ Chuyển khoản nội bộ - Miễn phí' : '⚠️ Chuyển khoản liên ngân hàng - Có phí 5,000 VND'}
              </small>
            </div>

            <div className="form-group">
              <label>Số tài khoản nhận</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập số tài khoản người nhận"
                value={formData.toAccount}
                onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Số tiền</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Nội dung chuyển khoản</label>
              <textarea
                className="input"
                rows="3"
                placeholder="Nhập nội dung..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={18} />
              Chuyển khoản
            </button>
          </form>
        </div>

        <div>
          <div className="card mb-3">
            <h3 className="card-header">Lưu ý</h3>
            <ul className="note-list">
              <li>Kiểm tra kỹ số tài khoản người nhận</li>
              <li>Hạn mức chuyển khoản: 500,000,000 VND/ngày</li>
              <li>Phí giao dịch: Miễn phí (chuyển nội bộ)</li>
              <li>Xác thực bằng OTP khi chuyển khoản</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-header">Người nhận thường xuyên</h3>
            <div className="beneficiary-list">
              <div className="beneficiary-item">
                <div>
                  <div className="font-medium">Trần Thị B</div>
                  <div className="text-sm text-secondary">9876543210987654</div>
                </div>
                <button className="btn btn-outline btn-sm">Chọn</button>
              </div>
              <div className="beneficiary-item">
                <div>
                  <div className="font-medium">Lê Văn C</div>
                  <div className="text-sm text-secondary">1111222233334444</div>
                </div>
                <button className="btn btn-outline btn-sm">Chọn</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
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

        .note-list {
          list-style: none;
          padding: 0;
        }

        .note-list li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .note-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }

        .beneficiary-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .beneficiary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border-radius: 8px;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default Transfer;

