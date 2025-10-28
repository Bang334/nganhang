import { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Camera } from 'lucide-react';
import Modal from './Modal';
import '../../styles/TellerDashboard.css';

const ProfileEditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activeTab, setActiveTab] = useState('info'); // info, security

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'security') {
      if (formData.newPassword !== formData.confirmPassword) {
        alert('❌ Mật khẩu mới không khớp!');
        return;
      }
      if (formData.newPassword && formData.newPassword.length < 6) {
        alert('❌ Mật khẩu mới phải có ít nhất 6 ký tự!');
        return;
      }
    }

    alert(
      `✅ Cập nhật thông tin thành công!\n\n` +
      `Họ tên: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Số điện thoại: ${formData.phone}\n` +
      `Địa chỉ: ${formData.address}\n\n` +
      `Trong ứng dụng thực tế, thông tin sẽ được lưu vào database.`
    );

    if (onSave) {
      onSave(formData);
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chỉnh sửa thông tin cá nhân" size="lg">
      <div>
        {/* Tabs */}
        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem'}}>
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: 'none',
              background: activeTab === 'info' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              color: activeTab === 'info' ? 'white' : '#6b7280',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <User size={18} />
            Thông tin cá nhân
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: 'none',
              background: activeTab === 'security' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              color: activeTab === 'security' ? 'white' : '#6b7280',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Lock size={18} />
            Bảo mật
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Info Tab */}
          {activeTab === 'info' && (
            <div>
              {/* Avatar */}
              <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontWeight: 700,
                  margin: '0 auto 1rem',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                  border: '4px solid white'
                }}>
                  {user?.fullName?.charAt(0)}
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'white',
                      border: '3px solid #667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => alert('📸 Chức năng đổi ảnh đại diện sẽ được phát triển trong phiên bản tiếp theo')}
                  >
                    <Camera size={20} color="#667eea" />
                  </button>
                </div>
                <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                  {user?.role === 'admin' ? 'Quản trị viên' : 
                   user?.role === 'teller' ? 'Giao dịch viên' :
                   user?.role === 'loan_officer' ? 'Nhân viên Tín dụng' : 'Khách hàng'}
                </div>
                {user?.employeeCode && (
                  <div style={{fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600, marginTop: '0.25rem', fontFamily: 'monospace'}}>
                    {user.employeeCode}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="teller-form-group">
                <label className="teller-form-label">
                  <User size={16} />
                  Họ và tên
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="teller-form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ và tên đầy đủ"
                />
              </div>

              <div className="teller-grid-2">
                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Mail size={16} />
                    Email
                    <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="teller-form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                  />
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Phone size={16} />
                    Số điện thoại
                    <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="teller-form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="0987654321"
                  />
                </div>
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <MapPin size={16} />
                  Địa chỉ
                </label>
                <textarea
                  name="address"
                  className="teller-form-textarea"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ chi tiết"
                  rows={3}
                />
              </div>

              <div className="teller-alert info" style={{marginTop: '1rem'}}>
                <User size={18} />
                <div>
                  <strong>Lưu ý:</strong> Thông tin này sẽ được sử dụng để liên hệ và xác thực tài khoản của bạn. 
                  Vui lòng cung cấp thông tin chính xác.
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <div className="teller-alert warning" style={{marginBottom: '1.5rem'}}>
                <Lock size={18} />
                <div>
                  <strong>Bảo mật tài khoản:</strong> Nếu bạn không muốn thay đổi mật khẩu, 
                  hãy để trống các trường bên dưới.
                </div>
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  <Lock size={16} />
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="teller-form-input"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div className="teller-grid-2">
                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Lock size={16} />
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className="teller-form-input"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu mới"
                    minLength={6}
                  />
                  <div className="teller-form-helper">Tối thiểu 6 ký tự</div>
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    <Lock size={16} />
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="teller-form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu mới"
                    minLength={6}
                  />
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #86efac',
                marginTop: '1.5rem'
              }}>
                <div style={{fontWeight: 600, color: '#166534', marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                  💡 Gợi ý mật khẩu mạnh:
                </div>
                <ul style={{margin: 0, paddingLeft: '1.5rem', fontSize: '0.813rem', color: '#15803d'}}>
                  <li>Sử dụng ít nhất 8 ký tự</li>
                  <li>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                  <li>Không sử dụng thông tin cá nhân dễ đoán</li>
                  <li>Thay đổi mật khẩu định kỳ mỗi 3-6 tháng</li>
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="teller-actions" style={{marginTop: '2rem'}}>
            <button
              type="button"
              className="teller-btn teller-btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="teller-btn teller-btn-success"
              style={{flex: 1}}
            >
              💾 Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;

