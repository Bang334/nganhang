import { useState } from 'react';
import { Home, Car, Plus, FileText, CheckCircle, Clock, XCircle, Eye, AlertCircle, Briefcase } from 'lucide-react';
import { getCustomerCollaterals, collateralTypes, formatCurrency, formatDate, currentUser } from '../../data/mockData';
import Modal from '../common/Modal';

const Assets = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Lấy danh sách tài sản của customer hiện tại
  const customerId = currentUser.id || 1;
  const assets = getCustomerCollaterals(customerId);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { label: 'Chờ xét duyệt', color: '#f59e0b', bg: '#fef3c7' },
      AVAILABLE: { label: 'Đã duyệt - Sẵn sàng', color: '#10b981', bg: '#d1fae5' },
      IN_USE: { label: 'Đang thế chấp', color: '#3b82f6', bg: '#dbeafe' },
      REJECTED: { label: 'Từ chối', color: '#ef4444', bg: '#fee2e2' },
      RELEASED: { label: 'Đã giải chấp', color: '#6b7280', bg: '#f3f4f6' },
      LIQUIDATED: { label: 'Đã thanh lý', color: '#dc2626', bg: '#fecaca' },
    };
    const config = statusConfig[status] || { label: status, color: '#6b7280', bg: '#f3f4f6' };
    return (
      <span style={{
        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: config.color,
        background: config.bg,
      }}>
        {config.label}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    if (status === 'PENDING') return <Clock size={20} color="#f59e0b" />;
    if (status === 'AVAILABLE') return <CheckCircle size={20} color="#10b981" />;
    if (status === 'IN_USE') return <FileText size={20} color="#3b82f6" />;
    if (status === 'REJECTED') return <XCircle size={20} color="#ef4444" />;
    return <AlertCircle size={20} color="#6b7280" />;
  };

  const getAssetIcon = (typeId) => {
    if (typeId === 1) return <Home size={32} />;
    if (typeId === 2) return <Car size={32} />;
    return <FileText size={32} />;
  };

  return (
    <div className="fade-in">
      <style>{`
        .form-control::placeholder {
          color: #9ca3af;
          opacity: 1;
        }
        
        .form-control:hover:not(:focus) {
          border-color: #c7d2fe !important;
        }
        
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <div className="flex-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Tài sản thế chấp</h2>
          <p className="text-sm text-secondary mt-1">Quản lý tài sản dùng để thế chấp vay vốn</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          Thêm tài sản mới
        </button>
      </div>

      {/* Info Alert */}
      <div className="card mb-4" style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
        border: '1px solid #93c5fd'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem' }}>
          <AlertCircle size={24} color="#2563eb" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#1e40af', fontWeight: '600', marginBottom: '0.5rem' }}>
              Quy trình thêm tài sản thế chấp
            </h4>
            <ul style={{ color: '#1e3a8a', fontSize: '0.875rem', paddingLeft: '1.25rem', margin: 0 }}>
              <li>Bước 1: Bạn khai báo thông tin tài sản và tải lên giấy tờ chứng minh quyền sở hữu</li>
              <li>Bước 2: Tài sản sẽ ở trạng thái "Chờ xét duyệt"</li>
              <li>Bước 3: Cán bộ tín dụng sẽ xem xét và định giá tài sản</li>
              <li>Bước 4: Sau khi được duyệt, tài sản có thể dùng để đăng ký vay vốn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      {assets.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem 1rem' }}>
          <FileText size={64} style={{ margin: '0 auto', color: '#9ca3af' }} />
          <h3 style={{ color: '#6b7280', marginTop: '1rem' }}>Chưa có tài sản nào</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Thêm tài sản thế chấp để có thể đăng ký vay vốn
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ marginTop: '1rem' }}
          >
            <Plus size={18} />
            Thêm tài sản đầu tiên
          </button>
        </div>
      ) : (
        <div className="grid grid-2">
          {assets.map((asset) => (
            <div 
              key={asset.collateral_id} 
              className="card"
              style={{
                transition: 'all 0.2s',
                cursor: 'pointer',
                border: asset.status === 'PENDING' ? '2px solid #fbbf24' : '1px solid #e5e7eb'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                setSelectedAsset(asset);
                setShowDetailModal(true);
              }}
            >
              <div className="flex-between mb-3">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {getAssetIcon(asset.collateral_type_id)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{asset.collateralTypeName}</h4>
                    <p className="text-sm text-secondary">{asset.certificate_number}</p>
                  </div>
                </div>
                {getStatusIcon(asset.status)}
              </div>

              <h3 className="font-semibold mb-2" style={{ fontSize: '1rem' }}>
                {asset.collateral_name}
              </h3>

              {asset.location && (
                <p className="text-sm text-secondary mb-2">{asset.location}</p>
              )}

              {/* Value Display */}
              <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Original Value */}
                {asset.original_value > 0 && (
                  <div style={{ 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                    borderRadius: '10px',
                    border: '1px solid #c7d2fe',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '0.8125rem', color: '#4338ca', fontWeight: '600' }}>
                      Giá trị ban đầu:
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#4f46e5' }}>
                      {formatCurrency(asset.original_value)}
                    </div>
                  </div>
                )}

                {/* Appraised Value */}
                {asset.appraised_value > 0 ? (
                  <div style={{ 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                    borderRadius: '10px',
                    border: '2px solid #a7f3d0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '0.8125rem', color: '#065f46', fontWeight: '600' }}>
                      💰 Giá trị thẩm định:
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#047857' }}>
                      {formatCurrency(asset.appraised_value)}
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    padding: '0.875rem',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    borderRadius: '10px',
                    border: '2px solid #fbbf24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    <Clock size={16} color="#f59e0b" />
                    <div style={{ fontSize: '0.8125rem', color: '#92400e', fontWeight: '600' }}>
                      Đang đợi thẩm định
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-between" style={{ marginTop: '1rem' }}>
                {getStatusBadge(asset.status)}
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAsset(asset);
                    setShowDetailModal(true);
                  }}
                >
                  <Eye size={16} />
                  Chi tiết
                </button>
              </div>

              {asset.status === 'PENDING' && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  background: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #fbbf24',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}>
                  <Clock size={16} color="#f59e0b" />
                  <span style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '500' }}>
                    Đang chờ cán bộ tín dụng xét duyệt
                  </span>
                </div>
              )}

              {asset.status === 'REJECTED' && asset.verification_notes && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  background: '#fee2e2',
                  borderRadius: '8px',
                  border: '1px solid #fca5a5'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Lý do từ chối:
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>
                    {asset.verification_notes}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Asset Modal */}
      <AddAssetModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <AssetDetailModal 
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedAsset(null);
          }}
          asset={selectedAsset}
        />
      )}
    </div>
  );
};

// Modal thêm tài sản mới
const AddAssetModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    collateral_type_id: '',
    collateral_name: '',
    description: '',
    owner_name: currentUser.fullName || 'Nguyễn Văn A',
    owner_relationship: 'SELF',
    location: '',
    certificate_number: '',
    issue_date: '',
    issue_authority: '',
    original_value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(formData.original_value) || 0;
    alert(
      '✅ Đã gửi thông tin tài sản thành công!\n\n' +
      `🏠 Tài sản: ${formData.collateral_name}\n` +
      `📋 Loại: ${selectedType?.type_name}\n` +
      `💰 Giá trị khai báo: ${formatCurrency(value)}\n` +
      `📄 Số giấy tờ: ${formData.certificate_number}\n` +
      `🏢 Cơ quan cấp: ${formData.issue_authority}\n\n` +
      '⏳ Tài sản đang ở trạng thái "Chờ xét duyệt"\n' +
      '👨‍💼 Cán bộ tín dụng sẽ khảo sát và thẩm định giá trị thực tế\n' +
      '⏱️ Thời gian xét duyệt: 1-2 ngày làm việc\n' +
      '🔔 Bạn sẽ nhận được thông báo khi có kết quả'
    );
    onClose();
    setCurrentStep(1);
    setFormData({
      collateral_type_id: '',
      collateral_name: '',
      description: '',
      owner_name: currentUser.fullName || 'Nguyễn Văn A',
      owner_relationship: 'SELF',
      location: '',
      certificate_number: '',
      issue_date: '',
      issue_authority: '',
      original_value: '',
    });
  };

  const selectedType = collateralTypes.find(t => t.collateral_type_id === parseInt(formData.collateral_type_id));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Plus size={20} />
        </div>
        <span>Thêm tài sản thế chấp mới</span>
      </div>
    }>
      <form onSubmit={handleSubmit}>
        {/* Step Indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '2rem',
          position: 'relative',
          padding: '0 1rem'
        }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: 'calc(25% + 1rem)',
            right: 'calc(25% + 1rem)',
            height: '3px',
            background: '#e5e7eb',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              width: currentStep === 2 ? '100%' : '0%',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: currentStep === 2 ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none'
            }}></div>
          </div>

          {[1, 2].map((step) => (
            <div key={step} style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: currentStep >= step ? 
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                color: currentStep >= step ? 'white' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.125rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: currentStep >= step ? 'none' : '3px solid #e5e7eb',
                boxShadow: currentStep >= step ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                transform: currentStep === step ? 'scale(1.1)' : 'scale(1)'
              }}>
                {currentStep > step ? <CheckCircle size={24} /> : step}
              </div>
              <div style={{ 
                fontSize: '0.8125rem', 
                fontWeight: currentStep >= step ? '600' : '500',
                color: currentStep >= step ? '#667eea' : '#9ca3af',
                marginTop: '0.625rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                {step === 1 ? 'Chọn loại' : 'Nhập thông tin'}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Asset Type Selection */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <AlertCircle size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                Chọn loại tài sản bạn muốn đăng ký thế chấp
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {collateralTypes.map((type) => (
                <div
                  key={type.collateral_type_id}
                  onClick={() => setFormData({ ...formData, collateral_type_id: type.collateral_type_id.toString() })}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: formData.collateral_type_id === type.collateral_type_id.toString() ? 
                      '2px solid #667eea' : '2px solid #e5e7eb',
                    background: formData.collateral_type_id === type.collateral_type_id.toString() ? 
                      'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (formData.collateral_type_id !== type.collateral_type_id.toString()) {
                      e.currentTarget.style.borderColor = '#c7d2fe';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.collateral_type_id !== type.collateral_type_id.toString()) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: formData.collateral_type_id === type.collateral_type_id.toString() ?
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: formData.collateral_type_id === type.collateral_type_id.toString() ? 'white' : '#6b7280'
                  }}>
                    {type.collateral_type_id === 1 && <Home size={28} />}
                    {type.collateral_type_id === 2 && <Car size={28} />}
                    {type.collateral_type_id === 3 && <Briefcase size={28} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: formData.collateral_type_id === type.collateral_type_id.toString() ? 
                        '#4338ca' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}>
                      {type.type_name}
                    </h4>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280', 
                      margin: 0 
                    }}>
                      {type.description}
                    </p>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af', 
                      marginTop: '0.5rem' 
                    }}>
                      LTV tối đa: {type.max_ltv}%
                    </div>
                  </div>
                  {formData.collateral_type_id === type.collateral_type_id.toString() && (
                    <CheckCircle size={24} color="#667eea" />
                  )}
                </div>
              ))}
            </div>

            <button 
              type="button"
              className="btn btn-primary w-full"
              onClick={() => setCurrentStep(2)}
              disabled={!formData.collateral_type_id}
              style={{ 
                marginTop: '1rem',
                fontSize: '0.9375rem',
                padding: '0.875rem 1.5rem',
                fontWeight: '600',
                background: formData.collateral_type_id ? 
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e5e7eb',
                border: 'none',
                boxShadow: formData.collateral_type_id ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
                cursor: formData.collateral_type_id ? 'pointer' : 'not-allowed',
                opacity: formData.collateral_type_id ? 1 : 0.5
              }}
            >
              Tiếp tục →
            </button>
          </div>
        )}

        {/* Step 2: Asset Details */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {selectedType && (
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                borderRadius: '8px',
                border: '1px solid #c7d2fe',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
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
                  {selectedType.collateral_type_id === 1 && <Home size={20} />}
                  {selectedType.collateral_type_id === 2 && <Car size={20} />}
                  {selectedType.collateral_type_id === 3 && <Briefcase size={20} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6366f1' }}>Loại tài sản</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4338ca' }}>
                    {selectedType.type_name}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="form-label" style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '0.5rem',
                display: 'block'
              }}>
                Tên tài sản *
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.collateral_name}
                onChange={(e) => setFormData({ ...formData, collateral_name: e.target.value })}
                placeholder={selectedType?.collateral_type_id === 1 ? 
                  "VD: Nhà phố 123 Nguyễn Huệ, Q.1, TP.HCM" :
                  selectedType?.collateral_type_id === 2 ?
                  "VD: Xe Honda CR-V 2024" :
                  "VD: Cổ phiếu VNM"
                }
                required
                style={{ 
                  fontSize: '0.9375rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="form-label" style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '0.5rem',
                display: 'block'
              }}>
                Mô tả chi tiết
              </label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chi tiết về tài sản (diện tích, màu sắc, tình trạng...)"
                rows={3}
                style={{ 
                  fontSize: '0.9375rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="grid grid-2">
              <div>
                <label className="form-label" style={{ 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Số giấy chứng nhận *
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.certificate_number}
                  onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })}
                  placeholder="VD: SH123456789"
                  required
                  style={{ 
                    fontSize: '0.9375rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    width: '100%'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className="form-label" style={{ 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Ngày cấp *
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  required
                  style={{ 
                    fontSize: '0.9375rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    width: '100%',
                    colorScheme: 'light'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div>
              <label className="form-label" style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '0.5rem',
                display: 'block'
              }}>
                Cơ quan cấp *
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.issue_authority}
                onChange={(e) => setFormData({ ...formData, issue_authority: e.target.value })}
                placeholder="VD: UBND TP.HCM, Cục CSGT..."
                required
                style={{ 
                  fontSize: '0.9375rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  width: '100%'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {selectedType?.collateral_type_id === 1 && (
              <div>
                <label className="form-label" style={{ 
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Địa chỉ tài sản
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Địa chỉ đầy đủ của bất động sản"
                  style={{ 
                    fontSize: '0.9375rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    width: '100%'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            )}

            <div>
              <label className="form-label" style={{ 
                fontWeight: '600',
                fontSize: '0.875rem',
                color: '#374151',
                marginBottom: '0.5rem',
                display: 'block'
              }}>
                Giá trị hiện tại (tham khảo)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  className="form-control"
                  value={formData.original_value}
                  onChange={(e) => setFormData({ ...formData, original_value: e.target.value })}
                  placeholder="Ước tính giá trị hiện tại của tài sản"
                  min="0"
                  step="1000000"
                  style={{ 
                    fontSize: '1rem',
                    fontWeight: '600',
                    padding: '0.875rem 4rem 0.875rem 1rem',
                    borderRadius: '10px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    width: '100%',
                    color: '#1f2937'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  pointerEvents: 'none'
                }}>
                  VND
                </span>
              </div>
              {formData.original_value && parseFloat(formData.original_value) > 0 && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                  borderRadius: '8px',
                  border: '1px solid #c7d2fe'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#4338ca', marginBottom: '0.25rem' }}>
                    📋 Giá trị tham khảo:
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#4f46e5' }}>
                    {formatCurrency(parseFloat(formData.original_value))}
                  </div>
                </div>
              )}
              <small className="text-secondary" style={{ fontSize: '0.8125rem', display: 'block', marginTop: '0.5rem' }}>
                💡 Cán bộ tín dụng sẽ khảo sát và thẩm định lại giá trị thực tế
              </small>
            </div>

            <div style={{
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
              borderRadius: '12px',
              border: '2px solid #c7d2fe'
            }}>
              <h4 style={{ color: '#4338ca', fontSize: '0.9375rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                Quy trình thẩm định
              </h4>
              <ul style={{ color: '#4f46e5', fontSize: '0.8125rem', paddingLeft: '1.25rem', margin: 0, lineHeight: '1.75' }}>
                <li>Cán bộ tín dụng sẽ kiểm tra giấy tờ của bạn</li>
                <li>Chuyên viên thẩm định sẽ đánh giá và định giá tài sản</li>
                <li>Sau khi duyệt, bạn có thể dùng tài sản để vay vốn</li>
              </ul>
            </div>

            <div style={{
              padding: '1rem',
              background: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #fbbf24'
            }}>
              <h4 style={{ color: '#92400e', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                ⚠️ Lưu ý quan trọng:
              </h4>
              <ul style={{ color: '#78350f', fontSize: '0.75rem', paddingLeft: '1.25rem', margin: 0 }}>
                <li>Chuẩn bị đầy đủ giấy tờ chứng minh quyền sở hữu hợp pháp</li>
                <li>Tài sản cần có giấy tờ rõ ràng, không tranh chấp</li>
                <li>Thời gian xét duyệt: 1-2 ngày làm việc</li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {currentStep === 2 && (
            <button 
              type="button" 
              className="btn btn-secondary flex-1" 
              onClick={() => setCurrentStep(1)}
              style={{
                fontSize: '0.9375rem',
                padding: '0.75rem 1.5rem',
                fontWeight: '600'
              }}
            >
              ← Quay lại
            </button>
          )}
          {currentStep === 1 ? (
            <button 
              type="button" 
              className="btn btn-secondary flex-1" 
              onClick={onClose}
              style={{
                fontSize: '0.9375rem',
                padding: '0.75rem 1.5rem',
                fontWeight: '600'
              }}
            >
              Hủy
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn btn-primary flex-1"
              style={{
                fontSize: '0.9375rem',
                padding: '0.75rem 1.5rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
            >
              <CheckCircle size={18} />
              Gửi đăng ký
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

// Modal chi tiết tài sản
const AssetDetailModal = ({ isOpen, onClose, asset }) => {
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
            {asset.collateral_name}
          </h3>
          <p style={{ opacity: 0.9 }}>{asset.collateralTypeName}</p>
        </div>

        {/* Status, Location, Description - 3 cột */}
        <div className="grid grid-3">
          <div>
            <label className="form-label">Trạng thái</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {asset.status === 'PENDING' && <Clock size={20} color="#f59e0b" />}
              {asset.status === 'AVAILABLE' && <CheckCircle size={20} color="#10b981" />}
              {asset.status === 'IN_USE' && <FileText size={20} color="#3b82f6" />}
              {asset.status === 'REJECTED' && <XCircle size={20} color="#ef4444" />}
              <span style={{ fontWeight: '600' }}>
                {asset.status === 'PENDING' && 'Chờ xét duyệt'}
                {asset.status === 'AVAILABLE' && 'Đã duyệt - Sẵn sàng sử dụng'}
                {asset.status === 'IN_USE' && 'Đang được thế chấp'}
                {asset.status === 'REJECTED' && 'Đã từ chối'}
              </span>
            </div>
          </div>
          {asset.location && (
            <div>
              <label className="form-label">Địa chỉ/Vị trí</label>
              <p className="text-secondary">{asset.location}</p>
            </div>
          )}
          {asset.description && (
            <div>
              <label className="form-label">Mô tả</label>
              <p className="text-secondary">{asset.description}</p>
            </div>
          )}
        </div>

        {/* Certificate Info - 3 cột */}
        <div className="grid grid-3">
          <div>
            <label className="form-label">Số giấy chứng nhận</label>
            <p className="font-semibold">{asset.certificate_number}</p>
          </div>
          <div>
            <label className="form-label">Ngày cấp</label>
            <p className="font-semibold">{formatDate(asset.issue_date)}</p>
          </div>
          <div>
            <label className="form-label">Cơ quan cấp</label>
            <p className="font-semibold">{asset.issue_authority}</p>
          </div>
        </div>

        {/* Values */}
        {/* Value Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Original Value */}
          {asset.original_value > 0 && (
            <div>
              <label className="form-label">Giá trị ban đầu</label>
              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                borderRadius: '10px',
                border: '1px solid #c7d2fe'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#4338ca', marginBottom: '0.25rem' }}>
                  📋 Giá trị khai báo
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5' }}>
                  {formatCurrency(asset.original_value)}
                </div>
              </div>
            </div>
          )}

          {/* Appraised Value */}
          <div>
            <label className="form-label">Giá trị thẩm định</label>
            {asset.appraised_value > 0 ? (
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                borderRadius: '12px',
                border: '2px solid #a7f3d0'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#065f46', marginBottom: '0.5rem', fontWeight: '600' }}>
                  💰 Giá trị chính thức
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#047857' }}>
                  {formatCurrency(asset.appraised_value)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.5rem' }}>
                  ✓ Được thẩm định bởi {asset.appraisedByName || 'cán bộ ngân hàng'}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '12px',
                border: '2px solid #fbbf24',
                textAlign: 'center'
              }}>
                <Clock size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: '600' }}>
                  Đang đợi thẩm định
                </div>
                <div style={{ fontSize: '0.75rem', color: '#78350f', marginTop: '0.25rem' }}>
                  Cán bộ tín dụng sẽ khảo sát và định giá tài sản
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Appraisal/Verification Info */}
        {asset.appraised_date && (
          <div>
            <label className="form-label">Thông tin thẩm định & xét duyệt</label>
            <div style={{
              padding: '1rem',
              background: asset.status === 'REJECTED' ? '#fee2e2' : '#f0fdf4',
              borderRadius: '8px',
              border: `1px solid ${asset.status === 'REJECTED' ? '#fca5a5' : '#bbf7d0'}`
            }}>
              <div className="text-sm mb-1">
                <strong>Nhân viên thẩm định:</strong> {asset.appraisedByName}
              </div>
              <div className="text-sm mb-1">
                <strong>Ngày thẩm định:</strong> {formatDate(asset.appraised_date)}
              </div>
              {asset.verification_notes && (
                <div className="text-sm mt-2">
                  <strong>Ghi chú:</strong> {asset.verification_notes}
                </div>
              )}
            </div>
          </div>
        )}

        <button className="btn btn-secondary w-full" onClick={onClose}>
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default Assets;
