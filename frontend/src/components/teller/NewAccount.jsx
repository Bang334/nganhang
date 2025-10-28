import { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, DollarSign, Building2, Calendar, UserCircle2 } from 'lucide-react';
import '../../styles/TellerDashboard.css';

const NewAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    gender: 'MALE',
    email: '',
    phone: '',
    address: '',
    accountType: 'SAVINGS',
    initialDeposit: '',
    branch: 'HN001',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    const customerCode = 'KH' + Date.now().toString().slice(-6);

    alert(
      `✅ Mở tài khoản thành công!\n\n` +
        `Mã khách hàng: ${customerCode}\n` +
        `Số tài khoản: ${accountNumber}\n` +
        `Khách hàng: ${formData.fullName}\n` +
        `Loại tài khoản: ${formData.accountType === 'SAVINGS' ? 'Tiết kiệm' : 'Thanh toán'}\n` +
        `Số dư ban đầu: ${parseInt(formData.initialDeposit).toLocaleString()} VND\n\n` +
        `Thông tin đã được lưu vào hệ thống.`
    );

    // Reset form
    setFormData({
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
      gender: 'MALE',
      email: '',
      phone: '',
      address: '',
      accountType: 'SAVINGS',
      initialDeposit: '',
      branch: 'HN001',
    });
  };

  return (
    <div className="fade-in">
      {/* Form Card */}
      <div className="teller-card">
        <div className="teller-card-header blue">
          <h3>
            <User size={22} />
            Thông tin khách hàng
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="teller-card-body">
          {/* Personal Information Section */}
          <div className="teller-section">
            <div className="teller-section-title">
              Thông tin cá nhân
            </div>
            <div className="teller-grid-2">
              <div className="teller-form-group">
                <label className="teller-form-label">
                  <User size={16} style={{color: '#4299e1'}} />
                  Họ và tên
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="teller-form-input"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <CreditCard size={16} style={{color: '#4299e1'}} />
                  Số CMND/CCCD
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="teller-form-input"
                  placeholder="Nhập số CMND/CCCD"
                  required
                />
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <Calendar size={16} style={{color: '#4299e1'}} />
                  Ngày sinh
                  <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="teller-form-input"
                  required
                />
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <UserCircle2 size={16} style={{color: '#4299e1'}} />
                  Giới tính
                  <span className="required">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="teller-form-select"
                  required
                >
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                  <option value="OTHER">Khác</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="teller-section">
            <div className="teller-section-title">
              Thông tin liên hệ
            </div>
            <div className="teller-grid-2">
              <div className="teller-form-group">
                <label className="teller-form-label">
                  <Mail size={16} style={{color: '#48bb78'}} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="teller-form-input"
                  placeholder="example@email.com"
                />
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <Phone size={16} style={{color: '#48bb78'}} />
                  Số điện thoại
                  <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="teller-form-input"
                  placeholder="0912345678"
                  required
                />
              </div>
            </div>

            <div className="teller-form-group">
              <label className="teller-form-label">
                <MapPin size={16} style={{color: '#48bb78'}} />
                Địa chỉ
                <span className="required">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="teller-form-textarea"
                placeholder="Nhập địa chỉ đầy đủ"
                required
              />
            </div>
          </div>

          {/* Account Information Section */}
          <div className="teller-section">
            <div className="teller-section-title">
              Thông tin tài khoản
            </div>
            <div className="teller-grid-3">
              <div className="teller-form-group">
                <label className="teller-form-label">
                  <Building2 size={16} style={{color: '#9f7aea'}} />
                  Chi nhánh
                  <span className="required">*</span>
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="teller-form-select"
                  required
                >
                  <option value="HN001">Hà Nội - Hoàn Kiếm</option>
                  <option value="HCM001">TP.HCM - Quận 1</option>
                  <option value="DN001">Đà Nẵng - Hải Châu</option>
                </select>
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <CreditCard size={16} style={{color: '#9f7aea'}} />
                  Loại tài khoản
                  <span className="required">*</span>
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="teller-form-select"
                  required
                >
                  <option value="SAVINGS">Tiết kiệm</option>
                  <option value="CHECKING">Thanh toán</option>
                </select>
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <DollarSign size={16} style={{color: '#9f7aea'}} />
                  Số tiền gửi ban đầu (VND)
                  <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="initialDeposit"
                  value={formData.initialDeposit}
                  onChange={handleChange}
                  className="teller-form-input"
                  placeholder="5,000,000"
                  min="100000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="teller-actions">
            <button type="submit" className="teller-btn teller-btn-primary">
              <CreditCard size={18} />
              Tạo tài khoản
            </button>
            <button
              type="button"
              className="teller-btn teller-btn-secondary"
              onClick={() =>
                setFormData({
                  fullName: '',
                  idNumber: '',
                  dateOfBirth: '',
                  gender: 'MALE',
                  email: '',
                  phone: '',
                  address: '',
                  accountType: 'SAVINGS',
                  initialDeposit: '',
                  branch: 'HN001',
                })
              }
            >
              Làm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAccount;
