import { useState } from 'react';
import { Search, CreditCard, User, CheckCircle, AlertTriangle, Clock, Shield } from 'lucide-react';
import '../../styles/TellerDashboard.css';

const CardActivation = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardInfo, setCardInfo] = useState(null);

  // Dữ liệu mẫu - Thẻ chờ kích hoạt
  const pendingCards = [
    {
      id: 1,
      cardNumber: '4532 1234 5678 9012',
      customerName: 'Nguyễn Văn A',
      customerCode: 'KH001234',
      cardType: 'Thẻ ghi nợ nội địa',
      issueDate: '22/10/2025',
      status: 'Chờ kích hoạt'
    },
    {
      id: 2,
      cardNumber: '5412 9876 5432 1098',
      customerName: 'Trần Thị B',
      customerCode: 'KH005678',
      cardType: 'Thẻ tín dụng',
      issueDate: '21/10/2025',
      status: 'Chờ kích hoạt'
    },
    {
      id: 3,
      cardNumber: '6011 1111 2222 3333',
      customerName: 'Lê Văn C',
      customerCode: 'KH009876',
      cardType: 'Thẻ ghi nợ quốc tế',
      issueDate: '20/10/2025',
      status: 'Chờ kích hoạt'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Giả lập tìm kiếm thẻ
    if (cardNumber) {
      setCardInfo({
        cardNumber: cardNumber,
        accountNumber: '1234567890',
        customerName: 'Lê Văn C',
        customerCode: 'KH009876',
        cardType: 'Thẻ ghi nợ nội địa',
        issueDate: '15/10/2025',
        expiryDate: '15/10/2030',
        status: 'INACTIVE',
      });
    }
  };

  const handleActivate = () => {
    if (!cardInfo) {
      alert('Vui lòng tìm kiếm thẻ trước!');
      return;
    }

    alert(
      `✅ Kích hoạt thẻ thành công!\n\n` +
      `Số thẻ: ${cardInfo.cardNumber}\n` +
      `Chủ thẻ: ${cardInfo.customerName}\n` +
      `Loại thẻ: ${cardInfo.cardType}\n` +
      `Ngày phát hành: ${cardInfo.issueDate}\n` +
      `Ngày hết hạn: ${cardInfo.expiryDate}\n\n` +
      `Thẻ đã được kích hoạt và sẵn sàng sử dụng.`
    );

    // Reset form
    setCardNumber('');
    setCardInfo(null);
  };

  const handleDeactivate = () => {
    if (!cardInfo) {
      alert('Vui lòng tìm kiếm thẻ trước!');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn vô hiệu hóa thẻ ${cardInfo.cardNumber}?`)) {
      alert(
        `🔒 Vô hiệu hóa thẻ thành công!\n\n` +
          `Số thẻ: ${cardInfo.cardNumber}\n` +
          `Chủ thẻ: ${cardInfo.customerName}\n\n` +
          `Thẻ đã được vô hiệu hóa.`
      );

      setCardNumber('');
      setCardInfo(null);
    }
  };

  return (
    <div className="fade-in">
      {/* Stats Cards */}
      <div className="teller-grid-3" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card" style={{background: 'linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%)', border: '1px solid #d6bcfa'}}>
          <div className="teller-card-body" style={{padding: '1.5rem', textAlign: 'center'}}>
            <Clock size={32} style={{color: '#9f7aea', margin: '0 auto 0.75rem'}} />
            <div style={{fontSize: '2rem', fontWeight: 700, color: '#553c9a'}}>{pendingCards.length}</div>
            <div style={{fontSize: '0.875rem', color: '#6b46c1', fontWeight: 500}}>Thẻ chờ kích hoạt</div>
          </div>
        </div>
        <div className="teller-card" style={{background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)', border: '1px solid #9ae6b4'}}>
          <div className="teller-card-body" style={{padding: '1.5rem', textAlign: 'center'}}>
            <CheckCircle size={32} style={{color: '#48bb78', margin: '0 auto 0.75rem'}} />
            <div style={{fontSize: '2rem', fontWeight: 700, color: '#22543d'}}>12</div>
            <div style={{fontSize: '0.875rem', color: '#2f855a', fontWeight: 500}}>Kích hoạt hôm nay</div>
          </div>
        </div>
        <div className="teller-card" style={{background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%)', border: '1px solid #90cdf4'}}>
          <div className="teller-card-body" style={{padding: '1.5rem', textAlign: 'center'}}>
            <Shield size={32} style={{color: '#4299e1', margin: '0 auto 0.75rem'}} />
            <div style={{fontSize: '2rem', fontWeight: 700, color: '#2c5282'}}>145</div>
            <div style={{fontSize: '0.875rem', color: '#2b6cb0', fontWeight: 500}}>Thẻ đang hoạt động</div>
          </div>
        </div>
      </div>

      <div className="teller-grid-2">
        {/* Search Card */}
        <div className="teller-card">
          <div className="teller-card-header purple">
            <h3>
              <Search size={20} />
              Tìm kiếm thẻ
            </h3>
          </div>
          <form onSubmit={handleSearch} className="teller-card-body">
            <div className="teller-form-group">
              <label className="teller-form-label">
                <CreditCard size={16} style={{color: '#9f7aea'}} />
                Số thẻ
              </label>
              <div style={{display: 'flex', gap: '0.75rem'}}>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="teller-form-input"
                  placeholder="Nhập số thẻ (16 số)"
                  maxLength="16"
                  required
                  style={{flex: 1}}
                />
                <button type="submit" className="teller-btn teller-btn-search">
                  <Search size={16} /> Tìm
                </button>
              </div>
              <div className="teller-form-helper">Nhập 16 chữ số trên mặt thẻ</div>
            </div>

            {cardInfo && (
              <div className="customer-info-display">
                <h4>
                  <User size={16} />
                  Thông tin thẻ
                </h4>
                <div className="customer-info-item">
                  <span className="label">Số thẻ:</span>
                  <span className="value">{cardInfo.cardNumber}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Số TK:</span>
                  <span className="value">{cardInfo.accountNumber}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Chủ thẻ:</span>
                  <span className="value">{cardInfo.customerName}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Mã KH:</span>
                  <span className="value">{cardInfo.customerCode}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Loại thẻ:</span>
                  <span className="value">{cardInfo.cardType}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Ngày phát hành:</span>
                  <span className="value">{cardInfo.issueDate}</span>
                </div>
                <div className="customer-info-item">
                  <span className="label">Ngày hết hạn:</span>
                  <span className="value">{cardInfo.expiryDate}</span>
                </div>
                <div className="customer-info-item" style={{paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0'}}>
                  <span className="label">Trạng thái:</span>
                  <span className={`badge ${cardInfo.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                    {cardInfo.status === 'ACTIVE' ? 'Đang hoạt động' : 'Chưa kích hoạt'}
                  </span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Actions Card */}
        <div className="teller-card">
          <div className="teller-card-header blue">
            <h3>
              <CheckCircle size={20} />
              Thao tác
            </h3>
          </div>
          <div className="teller-card-body">
            {!cardInfo ? (
              <div className="empty-state">
                <CreditCard size={64} className="empty-state-icon" />
                <p>Vui lòng tìm kiếm thẻ để thực hiện thao tác</p>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                <div className="teller-alert info">
                  <AlertTriangle size={18} />
                  <div>
                    <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>Hướng dẫn kích hoạt</div>
                    <ol style={{marginLeft: '1.25rem', fontSize: '0.875rem', lineHeight: '1.6'}}>
                      <li>Kiểm tra thông tin thẻ và khách hàng</li>
                      <li>Yêu cầu khách hàng xuất trình CMND/CCCD</li>
                      <li>Đối chiếu thông tin và xác nhận</li>
                      <li>Nhấn nút "Kích hoạt thẻ" để hoàn tất</li>
                    </ol>
                  </div>
                </div>

                {cardInfo.status === 'INACTIVE' ? (
                  <button onClick={handleActivate} className="teller-btn teller-btn-success" style={{width: '100%'}}>
                    <CheckCircle size={18} />
                    Kích hoạt thẻ
                  </button>
                ) : (
                  <div className="teller-alert success">
                    <CheckCircle size={20} />
                    <div style={{fontWeight: 600}}>Thẻ đã được kích hoạt</div>
                  </div>
                )}

                <button onClick={handleDeactivate} className="teller-btn teller-btn-danger" style={{width: '100%'}}>
                  Vô hiệu hóa thẻ
                </button>

                <div className="teller-alert warning">
                  <AlertTriangle size={18} />
                  <div>
                    <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>⚠️ Lưu ý</div>
                    <ul style={{marginLeft: '1.25rem', fontSize: '0.875rem', lineHeight: '1.6'}}>
                      <li>Thẻ chỉ có thể sử dụng sau khi được kích hoạt</li>
                      <li>Vô hiệu hóa thẻ sẽ ngăn mọi giao dịch</li>
                      <li>Khách hàng cần đặt mã PIN tại ATM sau khi kích hoạt</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pending Cards List */}
      <div className="teller-card" style={{marginTop: '1.5rem'}}>
        <div className="teller-card-header purple">
          <h3>
            <Clock size={20} />
            Thẻ chờ kích hoạt
          </h3>
        </div>
        <div className="teller-card-body" style={{padding: 0}}>
          <table className="teller-table">
            <thead>
              <tr>
                <th>Số thẻ</th>
                <th>Khách hàng</th>
                <th>Loại thẻ</th>
                <th>Ngày phát hành</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingCards.map((card) => (
                <tr key={card.id}>
                  <td className="font-medium">{card.cardNumber}</td>
                  <td>
                    <div>{card.customerName}</div>
                    <div style={{fontSize: '0.75rem', color: '#718096'}}>{card.customerCode}</div>
                  </td>
                  <td>{card.cardType}</td>
                  <td>{card.issueDate}</td>
                  <td><span className="badge badge-warning">{card.status}</span></td>
                  <td>
                    <button 
                      className="teller-btn teller-btn-success"
                      style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                      onClick={() => {
                        setCardNumber(card.cardNumber.replace(/\s/g, ''));
                        handleSearch({preventDefault: () => {}});
                      }}
                    >
                      <CheckCircle size={14} /> Kích hoạt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="teller-card" style={{marginTop: '1.5rem'}}>
        <div className="teller-card-header">
          <h3>
            <CheckCircle size={20} />
            Lịch sử kích hoạt thẻ hôm nay
          </h3>
        </div>
        <div className="teller-card-body" style={{padding: 0}}>
          <table className="teller-table">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Số thẻ</th>
                <th>Khách hàng</th>
                <th>Loại thẻ</th>
                <th>Thao tác</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:45</td>
                <td className="font-medium">4532 **** **** 1234</td>
                <td>Hoàng Văn E</td>
                <td>Thẻ ghi nợ nội địa</td>
                <td><span className="badge badge-success">Kích hoạt</span></td>
                <td><span className="badge badge-success">Thành công</span></td>
              </tr>
              <tr>
                <td>09:20</td>
                <td className="font-medium">5412 **** **** 5678</td>
                <td>Phạm Thị D</td>
                <td>Thẻ tín dụng</td>
                <td><span className="badge badge-success">Kích hoạt</span></td>
                <td><span className="badge badge-success">Thành công</span></td>
              </tr>
              <tr>
                <td>08:30</td>
                <td className="font-medium">6011 **** **** 9012</td>
                <td>Nguyễn Văn A</td>
                <td>Thẻ ghi nợ quốc tế</td>
                <td><span className="badge badge-danger">Vô hiệu hóa</span></td>
                <td><span className="badge badge-success">Thành công</span></td>
              </tr>
              <tr>
                <td>08:15</td>
                <td className="font-medium">3782 **** **** 4567</td>
                <td>Đỗ Thị F</td>
                <td>Thẻ tín dụng quốc tế</td>
                <td><span className="badge badge-success">Kích hoạt</span></td>
                <td><span className="badge badge-success">Thành công</span></td>
              </tr>
              <tr>
                <td>07:50</td>
                <td className="font-medium">5555 **** **** 8888</td>
                <td>Vũ Văn G</td>
                <td>Thẻ ghi nợ nội địa</td>
                <td><span className="badge badge-success">Kích hoạt</span></td>
                <td><span className="badge badge-success">Thành công</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardActivation;
