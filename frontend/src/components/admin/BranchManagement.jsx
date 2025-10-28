import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Users } from 'lucide-react';
import { branches } from '../../data/mockData';
import BranchManagementModal from './BranchManagementModal';

const BranchManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleAddBranch = () => {
    setSelectedBranch(null);
    setShowModal(true);
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setShowModal(true);
  };

  const handleDeleteBranch = (branch) => {
    if (confirm(`Bạn có chắc chắn muốn xóa chi nhánh ${branch.branchName}?`)) {
      alert(
        `🗑️ Đã xóa chi nhánh ${branch.branchName}\n\n` +
        `Mã chi nhánh: ${branch.branchCode}\n` +
        `Quản lý: ${branch.manager}\n\n` +
        `Trong ứng dụng thực tế, dữ liệu sẽ được xóa khỏi database.`
      );
    }
  };

  return (
    <div className="fade-in">
      <div className="flex-between mb-4">
        <div></div>
        <button className="btn btn-primary" onClick={handleAddBranch}>
          <Plus size={18} />
          Thêm chi nhánh
        </button>
      </div>

      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng chi nhánh</div>
              <div className="stat-value">{branches.length}</div>
            </div>
            <MapPin size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-title">Chi nhánh hoạt động</div>
              <div className="stat-value">{branches.length}</div>
            </div>
            <MapPin size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng nhân viên</div>
              <div className="stat-value">
                {branches.reduce((sum, b) => sum + parseInt(b.employeeCount || 0), 0)}
              </div>
            </div>
            <Users size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card primary">
          <div className="stat-header">
            <div>
              <div className="stat-title">Tổng khách hàng</div>
              <div className="stat-value">
                {branches.reduce((sum, b) => sum + parseInt(b.customerCount || 0), 0).toLocaleString()}
              </div>
            </div>
            <Users size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-header">Danh sách chi nhánh</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Mã chi nhánh</th>
              <th>Tên chi nhánh</th>
              <th>Địa chỉ</th>
              <th>Quản lý</th>
              <th>Số NV</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td className="font-medium">{branch.branchCode}</td>
                <td className="font-semibold">{branch.branchName}</td>
                <td>
                  <div className="text-sm max-w-xs">{branch.address}</div>
                </td>
                <td>{branch.manager}</td>
                <td>{branch.employeeCount || 'N/A'}</td>
                <td>{branch.customerCount}</td>
                <td>
                  <span className="badge badge-success">Hoạt động</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEditBranch(branch)}
                    >
                      <Edit size={14} /> Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteBranch(branch)}
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-3 gap-4 mt-4">
        {branches.map((branch) => (
          <div key={branch.id} className="card">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold">{branch.branchName}</h4>
                <span className="badge badge-success">Hoạt động</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-secondary" />
                  <span className="text-secondary">{branch.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-secondary">Quản lý:</span>
                  <span className="font-medium">{branch.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Nhân viên:</span>
                  <span className="font-medium">{branch.employeeCount || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Khách hàng:</span>
                  <span className="font-medium">{branch.customerCount}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <button
                  className="btn btn-outline btn-sm flex-1"
                  onClick={() => handleEditBranch(branch)}
                >
                  <Edit size={14} /> Sửa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <BranchManagementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        branchData={selectedBranch}
      />

      <style jsx>{`
        .btn-sm {
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default BranchManagement;

