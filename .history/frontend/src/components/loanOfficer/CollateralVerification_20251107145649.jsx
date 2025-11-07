import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Home, Car, FileText, AlertCircle, User, Calendar, DollarSign } from 'lucide-react';
import { getPendingCollaterals, formatCurrency, formatDate, formatDateTime } from '../../data/mockData';
import Modal from '../common/Modal';
import '../../styles/TellerDashboard.css';

const CollateralVerification = () => {
  const [selectedCollateral, setSelectedCollateral] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Lấy danh sách tài sản chờ xét duyệt
  const pendingCollaterals = getPendingCollaterals();

  const getAssetIcon = (typeId) => {
    if (typeId === 1) return <Home size={24} />;
    if (typeId === 2) return <Car size={24} />;
    return <FileText size={24} />;
  };

  const handleViewDetail = (collateral) => {
    setSelectedCollateral(collateral);
    setShowDetailModal(true);
  };

  const handleApprove = (collateral) => {
    setSelectedCollateral(collateral);
    setShowApprovalModal(true);
  };

  const handleReject = (collateral) => {
    setSelectedCollateral(collateral);
    setShowRejectModal(true);
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Xét duyệt tài sản thế chấp
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Kiểm tra và xác minh tài sản của khách hàng
        </p>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="teller-card" style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div className="teller-card-body">
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{pendingCollaterals.length}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Chờ xét duyệt</div>
          </div>
        </div>
      </div>

      {/* Pending Collaterals List */}
      {pendingCollaterals.length === 0 ? (
        <div className="teller-card text-center" style={{ padding: '3rem 1rem' }}>
          <CheckCircle size={64} style={{ margin: '0 auto', color: '#10b981' }} />
          <h3 style={{ color: '#6b7280', marginTop: '1rem' }}>Không có tài sản chờ xét duyệt</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Tất cả tài sản đã được xét duyệt
          </p>
        </div>
      ) : (
        <div className="teller-card">
          <div className="teller-card-header">
            <h3 style={{ margin: 0 }}>Danh sách tài sản chờ xét duyệt</h3>
          </div>
          <div className="teller-card-body" style={{ padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Tài sản</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Khách hàng</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Loại</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>Ngày gửi</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingCollaterals.map((collateral, index) => (
                    <tr 
                      key={collateral.collateral_id}
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        background: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                      onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : '#f9fafb'}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            {getAssetIcon(collateral.collateral_type_id)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1f2937' }}>
                              {collateral.collateral_name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {collateral.certificate_number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#1f2937' }}>{collateral.customerName}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{collateral.customerCode}</div>
                      </td>
                      <td style={{ padding: '1rem', color: '#374151' }}>{collateral.collateralTypeName}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                        {collateral.created_at ? formatDate(collateral.created_at.split(' ')[0]) : formatDate(collateral.issue_date || new Date().toISOString().split('T')[0])}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            className="teller-btn teller-btn-sm"
                            onClick={() => handleViewDetail(collateral)}
                            style={{
                              background: '#3b82f6',
                              color: 'white',
                              padding: '0.375rem 0.75rem',
                              fontSize: '0.75rem'
                            }}
                          >
                            <Eye size={14} />
                            Chi tiết
                          </button>
                          <button
                            className="teller-btn teller-btn-sm"
                            onClick={() => handleApprove(collateral)}
                            style={{
                              background: '#10b981',
                              color: 'white',
                              padding: '0.375rem 0.75rem',
                              fontSize: '0.75rem'
                            }}
                          >
                            <CheckCircle size={14} />
                            Duyệt
                          </button>
                          <button
                            className="teller-btn teller-btn-sm"
                            onClick={() => handleReject(collateral)}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              padding: '0.375rem 0.75rem',
                              fontSize: '0.75rem'
                            }}
                          >
                            <XCircle size={14} />
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedCollateral && (
        <>
          <CollateralDetailModal
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedCollateral(null);
            }}
            collateral={selectedCollateral}
            onApprove={() => {
              setShowDetailModal(false);
              setShowApprovalModal(true);
            }}
            onReject={() => {
              setShowDetailModal(false);
              setShowRejectModal(true);
            }}
          />

          <ApprovalModal
            isOpen={showApprovalModal}
            onClose={() => {
              setShowApprovalModal(false);
              setSelectedCollateral(null);
            }}
            collateral={selectedCollateral}
          />

          <RejectModal
            isOpen={showRejectModal}
            onClose={() => {
              setShowRejectModal(false);
              setSelectedCollateral(null);
            }}
            collateral={selectedCollateral}
          />
        </>
      )}
    </div>
  );
};

// Modal chi tiết tài sản
const CollateralDetailModal = ({ isOpen, onClose, collateral, onApprove, onReject }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết tài sản thế chấp">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {collateral.collateral_name}
          </h3>
          <p style={{ opacity: 0.9 }}>{collateral.collateralTypeName}</p>
        </div>

        {/* Customer Info */}
        <div style={{
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' }}>
            Thông tin khách hàng
          </h4>
          <div className="grid grid-2">
            <div>
              <div className="text-xs text-secondary">Họ và tên</div>
              <div className="font-semibold">{collateral.customerName}</div>
            </div>
            <div>
              <div className="text-xs text-secondary">Mã khách hàng</div>
              <div className="font-semibold">{collateral.customerCode}</div>
            </div>
            <div>
              <div className="text-xs text-secondary">Số điện thoại</div>
              <div className="font-semibold">{collateral.customerPhone}</div>
            </div>
          </div>
        </div>

        {/* Asset Info */}
        <div>
          <label className="form-label">Mô tả tài sản</label>
          <p className="text-secondary">{collateral.description}</p>
        </div>

        {collateral.location && (
          <div>
            <label className="form-label">Địa chỉ/Vị trí</label>
            <p className="text-secondary">{collateral.location}</p>
          </div>
        )}

        {/* Certificate Info */}
        <div className="grid grid-2">
          <div>
            <label className="form-label">Số giấy chứng nhận</label>
            <p className="font-semibold">{collateral.certificate_number}</p>
          </div>
          <div>
            <label className="form-label">Ngày cấp</label>
            <p className="font-semibold">{formatDate(collateral.issue_date)}</p>
          </div>
        </div>

        <div>
          <label className="form-label">Cơ quan cấp</label>
          <p className="font-semibold">{collateral.issue_authority}</p>
        </div>

        {/* Owner Info */}
        <div className="grid grid-2">
          <div>
            <label className="form-label">Tên chủ sở hữu</label>
            <p className="font-semibold">{collateral.owner_name}</p>
          </div>
          <div>
            <label className="form-label">Mối quan hệ</label>
            <p className="font-semibold">
              {collateral.owner_relationship === 'SELF' ? 'Chính chủ' : collateral.owner_relationship}
            </p>
          </div>
        </div>

        {/* Value */}
        <div>
          <label className="form-label">Giá trị ban đầu (khai báo)</label>
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            borderRadius: '10px',
            border: '1px solid #c7d2fe',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#4f46e5'
          }}>
            {collateral.original_value > 0 ? formatCurrency(collateral.original_value) : 'Chưa khai báo'}
          </div>
          <small className="text-secondary" style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.8125rem' }}>
            Giá trị này do khách hàng khai báo ban đầu
          </small>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-success flex-1"
            onClick={onApprove}
          >
            <CheckCircle size={18} />
            Duyệt tài sản
          </button>
          <button 
            className="btn btn-danger flex-1"
            onClick={onReject}
          >
            <XCircle size={18} />
            Từ chối
          </button>
        </div>

        <button className="btn btn-secondary w-full" onClick={onClose}>
          Đóng
        </button>
      </div>
    </Modal>
  );
};

// Modal duyệt tài sản
const ApprovalModal = ({ isOpen, onClose, collateral }) => {
  const [appraisedValue, setAppraisedValue] = useState('');
  const [notes, setNotes] = useState('');

  const handleApprove = (e) => {
    e.preventDefault();
    alert(
      '✅ Đã duyệt tài sản thế chấp!\n\n' +
      `Tài sản: ${collateral.collateral_name}\n` +
      `Khách hàng: ${collateral.customerName}\n` +
      `Giá trị thẩm định: ${formatCurrency(appraisedValue)}\n\n` +
      'Tài sản đã được chuyển sang trạng thái "Sẵn sàng sử dụng".\n' +
      'Khách hàng có thể dùng tài sản này để đăng ký vay vốn.'
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thẩm định & Duyệt tài sản">
      <form onSubmit={handleApprove}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            background: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <h4 style={{ color: '#166534', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Thẩm định tài sản: {collateral?.collateral_name}
            </h4>
            <p style={{ color: '#15803d', fontSize: '0.75rem' }}>
              Khách hàng: {collateral?.customerName} ({collateral?.customerCode})
            </p>
          </div>

          {/* Giá trị ban đầu */}
          <div>
            <label className="form-label">Giá trị ban đầu (khai báo)</label>
            <div style={{
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e40af'
            }}>
              {collateral.original_value > 0 ? formatCurrency(collateral.original_value) : 'Chưa khai báo'}
            </div>
            <small className="text-secondary" style={{ display: 'block', marginTop: '0.5rem' }}>
              Giá trị này do khách hàng khai báo ban đầu, có thể đã thay đổi theo thời gian
            </small>
          </div>

          {/* Giá trị sau định giá */}
          <div>
            <label className="form-label">Giá trị sau định giá (VND) *</label>
            <input
              type="number"
              className="form-control"
              value={appraisedValue}
              onChange={(e) => setAppraisedValue(e.target.value)}
              placeholder="Nhập giá trị thẩm định sau khi khảo sát thực tế"
              required
              min="0"
              step="1000000"
            />
            <small className="text-secondary">
              💡 Nhập giá trị sau khi khảo sát và đánh giá thực tế tài sản. Giá trị này có thể khác với giá trị ban đầu do khách hàng khai báo.
            </small>
          </div>

          <div>
            <label className="form-label">Ghi chú thẩm định & xét duyệt</label>
            <textarea
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Nhập ghi chú về việc thẩm định và xét duyệt tài sản..."
              rows={4}
            />
          </div>

          <div style={{
            padding: '1rem',
            background: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #fbbf24'
          }}>
            <h4 style={{ color: '#92400e', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Lưu ý:
            </h4>
            <ul style={{ color: '#78350f', fontSize: '0.75rem', paddingLeft: '1.25rem', margin: 0 }}>
              <li>Bạn (cán bộ tín dụng) vừa thẩm định vừa xét duyệt tài sản</li>
              <li>Giá trị thẩm định cần phải chính xác và có căn cứ rõ ràng</li>
              <li>Tài sản sau khi duyệt có thể được sử dụng để thế chấp vay vốn</li>
              <li>Giá trị thẩm định sẽ dùng để tính LTV ratio khi khách hàng vay</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button type="button" className="btn btn-secondary flex-1" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="btn btn-success flex-1">
            <CheckCircle size={18} />
            Xác nhận duyệt
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Modal từ chối tài sản
const RejectModal = ({ isOpen, onClose, collateral }) => {
  const [reason, setReason] = useState('');

  const handleReject = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Vui lòng nhập lý do từ chối!');
      return;
    }
    alert(
      '❌ Đã từ chối tài sản thế chấp!\n\n' +
      `Tài sản: ${collateral.collateral_name}\n` +
      `Khách hàng: ${collateral.customerName}\n` +
      `Lý do: ${reason}\n\n` +
      'Khách hàng sẽ nhận được thông báo về việc từ chối.'
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Từ chối tài sản thế chấp">
      <form onSubmit={handleReject}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            borderRadius: '8px',
            border: '1px solid #fca5a5'
          }}>
            <h4 style={{ color: '#991b1b', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Từ chối tài sản: {collateral?.collateral_name}
            </h4>
            <p style={{ color: '#7f1d1d', fontSize: '0.75rem' }}>
              Khách hàng: {collateral?.customerName} ({collateral?.customerCode})
            </p>
          </div>

          <div>
            <label className="form-label">Lý do từ chối *</label>
            <textarea
              className="form-control"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do từ chối tài sản thế chấp..."
              rows={4}
              required
            />
            <small className="text-secondary">
              Lý do này sẽ được gửi cho khách hàng
            </small>
          </div>

          <div style={{
            padding: '1rem',
            background: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #fbbf24'
          }}>
            <h4 style={{ color: '#92400e', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Lý do thường gặp:
            </h4>
            <ul style={{ color: '#78350f', fontSize: '0.75rem', paddingLeft: '1.25rem', margin: 0 }}>
              <li>Giấy tờ không hợp lệ hoặc không đầy đủ</li>
              <li>Tài sản không đủ giá trị để thế chấp</li>
              <li>Tài sản đang có tranh chấp hoặc thế chấp cho bên khác</li>
              <li>Tài sản không thuộc sở hữu hợp pháp của khách hàng</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button type="button" className="btn btn-secondary flex-1" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="btn btn-danger flex-1">
            <XCircle size={18} />
            Xác nhận từ chối
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CollateralVerification;

