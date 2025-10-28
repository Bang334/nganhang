import { CreditCard, Eye, EyeOff, Info, Lock, Calendar, Hash } from 'lucide-react';
import { useState } from 'react';
import { getCustomerAccounts, cards, formatCurrency, formatDate, currentUser } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const Accounts = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Lấy accounts của customer hiện tại (với JOIN)
  const customerId = currentUser.id || 1;
  const accounts = getCustomerAccounts(customerId);

  return (
    <div className="fade-in">
      <div className="flex-between mb-4">
        <div></div>
        <button
          className="btn btn-outline"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          {showBalance ? 'Ẩn số dư' : 'Hiện số dư'}
        </button>
      </div>

      {/* Account Cards */}
      <div className="grid grid-2 mb-4">
        {accounts.map((account, index) => (
          <div key={account.account_id} className="account-card" data-type={index % 2 === 0 ? 'primary' : 'secondary'}>
            <div className="account-header">
              <div>
                <div className="account-type">
                  {account.accountTypeName}
                </div>
                <div className="account-number">
                  {account.account_number}
                </div>
              </div>
              <CreditCard size={40} style={{opacity: 0.9}} />
            </div>
            <div className="account-balance">
              <div className="balance-label">Số dư khả dụng</div>
              <div className="balance-amount">
                {showBalance ? formatCurrency(account.balance) : '••••••••'}
              </div>
            </div>
            <div className="account-footer">
              <div className="account-date">
                Mở ngày: {formatDate(account.opened_date)}
              </div>
              <span className={`badge ${account.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                {account.status === 'ACTIVE' ? 'Hoạt động' : 'Đóng băng'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bank Cards */}
      <h3 className="text-xl font-semibold mb-3">Thẻ ngân hàng</h3>
      <div className="grid grid-2">
        {cards.map((card, index) => (
          <div key={card.id} className="bank-card" data-brand={index % 2 === 0 ? 'visa' : 'master'}>
            <div className="card-header">
              <div className="card-brand-name">
                {card.cardBrand} {card.cardType === 'DEBIT' ? 'Ghi nợ' : 'Tín dụng'}
              </div>
              <span className={`badge ${card.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                {card.status}
              </span>
            </div>
            <div className="card-number">
              {showBalance ? card.cardNumber : '**** **** **** ****'}
            </div>
            <div className="card-footer">
              <div>
                <div className="card-label">Hết hạn</div>
                <div className="card-value">{card.expiryDate}</div>
              </div>
              {card.cardType === 'CREDIT' && (
                <div className="text-right">
                  <div className="card-label">Hạn mức</div>
                  <div className="card-value">
                    {showBalance ? formatCurrency(card.availableCredit) : '••••••••'}
                  </div>
                </div>
              )}
            </div>
            <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)'}}>
              <button 
                className="teller-btn teller-btn-secondary" 
                style={{width: '100%', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none'}}
                onClick={() => setSelectedCard(card)}
              >
                <Info size={16} />
                Xem chi tiết thẻ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '500px'}}>
            <div className="modal-header">
              <h3>Chi tiết thẻ</h3>
              <button className="modal-close" onClick={() => setSelectedCard(null)}>×</button>
            </div>
            <div className="modal-body">
              {/* Card Visual */}
              <div className="bank-card" data-brand={selectedCard.cardBrand === 'VISA' ? 'visa' : 'master'} style={{marginBottom: '1.5rem'}}>
                <div className="card-header">
                  <div className="card-brand-name">
                    {selectedCard.cardBrand} {selectedCard.cardType === 'DEBIT' ? 'Ghi nợ' : 'Tín dụng'}
                  </div>
                  <span className={`badge ${selectedCard.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                    {selectedCard.status}
                  </span>
                </div>
                <div className="card-number">
                  {selectedCard.cardNumber}
                </div>
                <div className="card-footer">
                  <div>
                    <div className="card-label">Hết hạn</div>
                    <div className="card-value">{selectedCard.expiryDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="card-label">CVV</div>
                    <div className="card-value">***</div>
                  </div>
                </div>
              </div>

              {/* Card Information */}
              <div style={{background: '#f9fafb', padding: '1.25rem', borderRadius: '10px', marginBottom: '1rem'}}>
                <h5 style={{margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <CreditCard size={16} />
                  Thông tin thẻ
                </h5>
                <div className="customer-info-item">
                  <span className="label">Số thẻ:</span>
                  <span className="value">{selectedCard.cardNumber}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Loại thẻ:</span>
                  <span className="value">
                    {selectedCard.cardBrand} {selectedCard.cardType === 'DEBIT' ? 'Ghi nợ' : 'Tín dụng'}
                  </span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Trạng thái:</span>
                  <span className={`badge ${selectedCard.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                    {selectedCard.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Ngày phát hành:</span>
                  <span className="value">{selectedCard.issuedDate}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Ngày hết hạn:</span>
                  <span className="value">{selectedCard.expiryDate}</span>
                </div>
              </div>

              {/* Credit Limit (for Credit Cards) */}
              {selectedCard.cardType === 'CREDIT' && (
                <div style={{background: '#f0fdf4', padding: '1.25rem', borderRadius: '10px', border: '1px solid #86efac', marginBottom: '1rem'}}>
                  <h5 style={{margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#166534'}}>
                    Hạn mức tín dụng
                  </h5>
                  <div className="customer-info-item">
                    <span className="label">Hạn mức:</span>
                    <span className="value">{formatCurrency(selectedCard.creditLimit)}</span>
                  </div>
                  <div className="customer-info-item">
                    <span className="label">Đã sử dụng:</span>
                    <span className="value" style={{color: '#f59e0b'}}>
                      {formatCurrency(selectedCard.creditLimit - selectedCard.availableCredit)}
                    </span>
                  </div>
                  <div className="customer-info-item" style={{borderTop: '1px solid #86efac', paddingTop: '0.75rem'}}>
                    <span className="label">Còn lại:</span>
                    <span className="value" style={{color: '#22c55e', fontWeight: 700, fontSize: '1.1rem'}}>
                      {formatCurrency(selectedCard.availableCredit)}
                    </span>
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div style={{background: '#eff6ff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #93c5fd'}}>
                <h5 style={{margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Lock size={16} />
                  Bảo mật
                </h5>
                <div className="teller-alert info" style={{marginBottom: 0}}>
                  <Info size={16} />
                  <div style={{fontSize: '0.875rem'}}>
                    Không chia sẻ số CVV và mật khẩu thẻ với bất kỳ ai. Ngân hàng không bao giờ yêu cầu thông tin này qua điện thoại hoặc email.
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="teller-btn teller-btn-danger">
                <Lock size={16} />
                Khóa thẻ
              </button>
              <button className="teller-btn teller-btn-secondary" onClick={() => setSelectedCard(null)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .account-card {
          color: white;
          padding: 1.75rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .account-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .account-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .account-card[data-type="primary"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .account-card[data-type="secondary"] {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .account-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .account-type {
          font-size: 0.875rem;
          opacity: 0.9;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .account-number {
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          margin-top: 0.5rem;
          font-weight: 600;
        }

        .account-balance {
          margin-bottom: 1.5rem;
        }

        .balance-label {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .balance-amount {
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .account-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
        }

        .account-date {
          font-size: 0.813rem;
          opacity: 0.9;
        }

        .bank-card {
          color: white;
          padding: 1.75rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .bank-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .bank-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .bank-card[data-brand="visa"] {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        }

        .bank-card[data-brand="master"] {
          background: linear-gradient(135deg, #dc2626 0%, #f97316 100%);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .card-brand-name {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-number {
          font-size: 1.625rem;
          letter-spacing: 0.15em;
          margin-bottom: 2rem;
          font-family: 'Courier New', monospace;
          font-weight: 600;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
        }

        .card-label {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-value {
          font-size: 1rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Accounts;
