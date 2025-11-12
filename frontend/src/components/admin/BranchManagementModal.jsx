import { useState } from 'react';
import { Building2, Users, MapPin, Phone, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';
import { getBranchesWithDetails, employees, formatCurrency, roles } from '../../data/mockData';

const BranchManagementModal = ({ isOpen, onClose, type = 'LIST' }) => {
  const [currentBranch, setCurrentBranch] = useState(null);
  const branches = getBranchesWithDetails() || [];
  const [formData, setFormData] = useState({
    branchCode: '',
    branchName: '',
    address: '',
    phone: '',
    email: '',
    managerId: '',
  });

  const resetForm = () => {
    setFormData({
      branchCode: '',
      branchName: '',
      address: '',
      phone: '',
      email: '',
      managerId: '',
    });
  };

  const handleCreate = () => {
    alert(
      `✅ Tạo chi nhánh mới thành công!\n\n` +
      `Mã chi nhánh: ${formData.branchCode}\n` +
      `Tên chi nhánh: ${formData.branchName}\n` +
      `Địa chỉ: ${formData.address}\n` +
      `Điện thoại: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );
    resetForm();
  };

  const handleEdit = (branch) => {
    setCurrentBranch(branch);
    setFormData({
      branchCode: branch.branchCode,
      branchName: branch.branchName,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      managerId: branch.managerId || '',
    });
  };

  const handleUpdate = () => {
    alert(
      `✅ Cập nhật chi nhánh thành công!\n\n` +
      `Chi nhánh: ${formData.branchName}\n` +
      `Đã cập nhật thông tin mới.\n\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );
    setCurrentBranch(null);
    resetForm();
  };

  const handleDelete = (branch) => {
    if (confirm(`Bạn có chắc chắn muốn xóa chi nhánh "${branch.branchName}"?`)) {
      alert(
        `🗑️ Đã xóa chi nhánh ${branch.branchName}\n\n` +
        `Trong ứng dụng thực tế, chi nhánh sẽ được xóa khỏi database.`
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quản lý chi nhánh" size="lg">
      {type === 'LIST' && (
        <div>
          <div className="flex-between mb-4">
            <h4 className="text-lg font-semibold">Danh sách chi nhánh</h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setCurrentBranch(null);
              }}
            >
              <Plus size={18} />
              Thêm chi nhánh
            </button>
          </div>

          <div className="branches-grid">
            {branches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-header">
                  <div>
                    <h5 className="font-semibold">{branch.branchName}</h5>
                    <div className="text-sm text-secondary">{branch.branchCode}</div>
                  </div>
                  <div className="branch-actions">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEdit(branch)}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(branch)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="branch-info">
                  <div className="info-item">
                    <MapPin size={16} className="text-primary" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="info-item">
                    <Phone size={16} className="text-primary" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="info-item">
                    <Mail size={16} className="text-primary" />
                    <span>{branch.email}</span>
                  </div>
                </div>

                <div className="branch-stats">
                  <div className="stat">
                    <Users size={16} />
                    <span>{branch.customerCount || 0} KH</span>
                  </div>
                  <div className="stat">
                    <span className="text-success font-semibold">
                      {branch.employeeCount || 0} NV
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'CREATE' && (
        <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
          <h4 className="step-title">Thêm chi nhánh mới</h4>

          <div className="grid grid-2 gap-3">
            <div className="form-group">
              <label>Mã chi nhánh</label>
              <input
                type="text"
                className="input"
                placeholder="HN001"
                value={formData.branchCode}
                onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Tên chi nhánh</label>
              <input
                type="text"
                className="input"
                placeholder="Chi nhánh Hà Nội 1"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="input"
                placeholder="123 Hoàn Kiếm, Hà Nội"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                className="input"
                placeholder="02412345678"
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
                placeholder="hanoi1@bank.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Giám đốc chi nhánh</label>
              <select
                className="input"
                value={formData.managerId}
                onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
              >
                <option value="">Chọn giám đốc</option>
                {employees.filter(emp => {
                  const role = roles.find(r => r.role_id === emp.role_id);
                  return role?.role_name === 'ADMIN';
                }).map((emp) => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Building2 size={18} />
              Tạo chi nhánh
            </button>
          </div>
        </form>
      )}

      {type === 'EDIT' && currentBranch && (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <h4 className="step-title">Chỉnh sửa chi nhánh</h4>

          <div className="grid grid-2 gap-3">
            <div className="form-group">
              <label>Mã chi nhánh</label>
              <input
                type="text"
                className="input"
                value={formData.branchCode}
                onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                required
                disabled
              />
            </div>

            <div className="form-group">
              <label>Tên chi nhánh</label>
              <input
                type="text"
                className="input"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                className="input"
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Giám đốc chi nhánh</label>
              <select
                className="input"
                value={formData.managerId}
                onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
              >
                <option value="">Chọn giám đốc</option>
                {employees.filter(emp => {
                  const role = roles.find(r => r.role_id === emp.role_id);
                  return role?.role_name === 'ADMIN';
                }).map((emp) => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button type="button" className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Edit size={18} />
              Cập nhật
            </button>
          </div>
        </form>
      )}

      <style jsx>{`
        .branches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .branch-card {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .branch-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .branch-actions {
          display: flex;
          gap: 0.5rem;
        }

        .branch-info {
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .branch-stats {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .btn-sm {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </Modal>
  );
};

export default BranchManagementModal;

