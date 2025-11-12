import { useState } from 'react';
import { Plus, Edit, Trash2, User, Mail, Phone } from 'lucide-react';
import { employees, branches, roles } from '../../data/mockData';

const EmployeeManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddEmployee = () => {
    alert(
      `➕ Thêm nhân viên mới\n\n` +
      `Chức năng này sẽ mở form để thêm nhân viên mới vào hệ thống.\n` +
      `Trong ứng dụng thực tế, form sẽ thu thập các thông tin:\n` +
      `- Họ tên\n` +
      `- CMND/CCCD\n` +
      `- Ngày sinh\n` +
      `- Địa chỉ\n` +
      `- Email, SĐT\n` +
      `- Chức vụ\n` +
      `- Chi nhánh làm việc`
    );
  };

  const handleEditEmployee = (employee) => {
    alert(
      `✏️ Sửa thông tin nhân viên\n\n` +
      `Mã NV: ${employee.employee_code}\n` +
      `Họ tên: ${employee.full_name}\n` +
      `Chức vụ: ${employee.role_id === 2 ? 'Giao dịch viên' : employee.role_id === 3 ? 'Nhân viên Tín dụng' : 'Quản trị viên'}\n\n` +
      `Trong ứng dụng thực tế, form sẽ cho phép cập nhật thông tin.`
    );
  };

  const handleDeleteEmployee = (employee) => {
    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên ${employee.full_name}?`)) {
      alert(
        `🗑️ Đã xóa nhân viên ${employee.full_name}\n\n` +
        `Mã NV: ${employee.employee_code}\n` +
        `Trong ứng dụng thực tế, dữ liệu sẽ được xóa khỏi database.`
      );
    }
  };

  const handleResetPassword = (employee) => {
    if (confirm(`Bạn có muốn reset mật khẩu cho nhân viên ${employee.full_name}?`)) {
      const newPassword = 'ABC' + Math.floor(100000 + Math.random() * 900000);
      alert(
        `🔑 Đã reset mật khẩu\n\n` +
        `Nhân viên: ${employee.full_name}\n` +
        `Mật khẩu mới: ${newPassword}\n\n` +
        `Vui lòng thông báo cho nhân viên và yêu cầu đổi mật khẩu sau lần đăng nhập đầu tiên.`
      );
    }
  };

  return (
    <div className="fade-in">
      <div className="flex-between mb-4">
        <div></div>
        <button className="btn btn-primary" onClick={handleAddEmployee}>
          <Plus size={18} />
          Thêm nhân viên
        </button>
      </div>

      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng nhân viên</div>
              <div className="stat-value">{employees.length}</div>
            </div>
            <User size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card primary">
          <div className="stat-header">
            <div>
              <div className="stat-title">Giao dịch viên</div>
              <div className="stat-value">
                {employees.filter(e => {
                  const role = roles.find(r => r.role_id === e.role_id);
                  return role?.role_name === 'TELLER';
                }).length}
              </div>
            </div>
            <User size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-title">Nhân viên Tín dụng</div>
              <div className="stat-value">
                {employees.filter(e => {
                  const role = roles.find(r => r.role_id === e.role_id);
                  return role?.role_name === 'LOAN_OFFICER';
                }).length}
              </div>
            </div>
            <User size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-title">Đang hoạt động</div>
              <div className="stat-value">{employees.length}</div>
            </div>
            <User size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-header">Danh sách nhân viên</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Chi nhánh</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              // Find branch code
              const branch = branches.find(b => b.branch_id === emp.branch_id);
              const branchCode = branch?.branch_code || 'HN001';
              
              // Get role name
              const role = roles.find(r => r.role_id === emp.role_id);
              const roleName = role?.role_name || '';
              
              return (
                <tr key={emp.employee_id}>
                  <td className="font-medium">{emp.employee_code}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="user-avatar-sm">
                        {emp.full_name?.charAt(0) || 'N'}
                      </div>
                      <span className="font-semibold">{emp.full_name || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail size={12} className="text-secondary" />
                      {emp.email || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone size={12} className="text-secondary" />
                      {emp.phone || 'N/A'}
                    </div>
                  </td>
                  <td>{branchCode}</td>
                  <td>
                    <span className={`badge ${roleName === 'TELLER' ? 'badge-info' : roleName === 'LOAN_OFFICER' ? 'badge-warning' : 'badge-primary'}`}>
                      {roleName === 'TELLER' ? 'Giao dịch viên' : roleName === 'LOAN_OFFICER' ? 'Nhân viên Tín dụng' : 'Quản trị viên'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Hoạt động</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleEditEmployee(emp)}
                      >
                        <Edit size={14} /> Sửa
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleResetPassword(emp)}
                        title="Reset mật khẩu"
                      >
                        🔑
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEmployee(emp)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-2 gap-4 mt-4">
        <div className="card">
          <h3 className="card-header">Phân bổ nhân viên theo chi nhánh</h3>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hà Nội - Hoàn Kiếm</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">45 NV</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TP.HCM - Quận 1</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '52%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">52 NV</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Đà Nẵng - Hải Châu</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">28 NV</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Hiệu suất làm việc (tháng này)</h3>
          <div className="p-4">
            <div className="space-y-3 text-sm">
              <div className="bg-success-light p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Xuất sắc</span>
                  <span className="badge badge-success">12 NV</span>
                </div>
                <div className="text-xs text-secondary">
                  Hoàn thành vượt chỉ tiêu 120%+
                </div>
              </div>
              <div className="bg-info-light p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Tốt</span>
                  <span className="badge badge-info">28 NV</span>
                </div>
                <div className="text-xs text-secondary">
                  Hoàn thành chỉ tiêu 100-120%
                </div>
              </div>
              <div className="bg-warning-light p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">Trung bình</span>
                  <span className="badge badge-warning">8 NV</span>
                </div>
                <div className="text-xs text-secondary">
                  Hoàn thành chỉ tiêu 80-100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-sm {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
        }
        .user-avatar-sm {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default EmployeeManagement;

