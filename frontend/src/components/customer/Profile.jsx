const Profile = ({ user }) => {
  return (
    <div className="fade-in">
      <div className="card">
        <h3 className="card-header">Thông tin cá nhân</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <label>Mã khách hàng</label>
            <div className="value">{user.customerCode}</div>
          </div>
          <div className="profile-item">
            <label>Họ và tên</label>
            <div className="value">{user.fullName}</div>
          </div>
          <div className="profile-item">
            <label>Email</label>
            <div className="value">{user.email}</div>
          </div>
          <div className="profile-item">
            <label>Số điện thoại</label>
            <div className="value">0901234567</div>
          </div>
          <div className="profile-item">
            <label>CMND/CCCD</label>
            <div className="value">001234567890</div>
          </div>
          <div className="profile-item">
            <label>Trạng thái KYC</label>
            <span className="badge badge-success">Đã xác thực</span>
          </div>
        </div>
        <button className="btn btn-primary mt-3">Cập nhật thông tin</button>
      </div>

      <style jsx>{`
        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .profile-item label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .profile-item .value {
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default Profile;

