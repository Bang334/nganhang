import { useState } from 'react';
import { FileText, Calculator, Home, Car, Briefcase, Check, AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency, calculateLTV, customerAssets } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const LoanApplication = () => {
  const [step, setStep] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [useManualInput, setUseManualInput] = useState(false);
  const [formData, setFormData] = useState({
    loanType: 'CONSUMER',
    amount: '',
    termMonths: 120,
    purpose: '',
    // Collateral info
    hasCollateral: false, // Customer chọn có/không thế chấp
    collateralType: 'REAL_ESTATE',
    collateralName: '',
    collateralLocation: '',
    estimatedValue: '',
    certificateNumber: '',
  });

  const [ltvResult, setLtvResult] = useState(null);

  // Filter available assets (only free assets)
  const availableAssets = customerAssets.filter(asset => asset.status === 'FREE');

  const loanTypes = [
    { value: 'MORTGAGE', label: 'Vay mua nhà', icon: '🏠' },
    { value: 'AUTO', label: 'Vay mua xe', icon: '🚗' },
    { value: 'CONSUMER', label: 'Vay tiêu dùng', icon: '💳' },
    { value: 'BUSINESS', label: 'Vay kinh doanh', icon: '💼' },
  ];

  const selectedLoanType = loanTypes.find(t => t.value === formData.loanType);
  
  // Tính LTV max dựa trên loại vay
  const getMaxLtv = () => {
    if (!formData.hasCollateral) return 0;
    switch(formData.loanType) {
      case 'MORTGAGE': return 70;
      case 'AUTO': return 60;
      case 'BUSINESS': return 50;
      default: return 0;
    }
  };

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setFormData({
      ...formData,
      collateralType: asset.type,
      collateralName: asset.name,
      collateralLocation: asset.address || asset.model || asset.symbol || '',
      estimatedValue: asset.currentValue.toString(),
      certificateNumber: asset.certificate || '',
    });
  };

  const calculateLoanLTV = () => {
    const amount = parseFloat(formData.amount);
    const collateralValue = parseFloat(formData.estimatedValue);
    
    if (!amount || !collateralValue) {
      alert('Vui lòng nhập đầy đủ số tiền vay và giá trị tài sản!');
      return;
    }

    const ltv = calculateLTV(amount, collateralValue);
    const maxLtv = getMaxLtv();
    const isValid = parseFloat(ltv) <= maxLtv;

    setLtvResult({
      ltv: parseFloat(ltv),
      maxLtv: maxLtv,
      isValid: isValid,
      loanAmount: amount,
      collateralValue: collateralValue,
    });
  };

  const getAssetIcon = (type) => {
    switch(type) {
      case 'REAL_ESTATE': return <Home size={24} />;
      case 'VEHICLE': return <Car size={24} />;
      default: return <Briefcase size={24} />;
    }
  };

  const getAssetTypeLabel = (type) => {
    switch(type) {
      case 'REAL_ESTATE': return 'Bất động sản';
      case 'VEHICLE': return 'Phương tiện';
      default: return 'Tài sản khác';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.hasCollateral && !ltvResult) {
      alert('Vui lòng tính toán LTV trước khi gửi hồ sơ!');
      return;
    }

    if (ltvResult && !ltvResult.isValid) {
      alert('LTV vượt quá mức cho phép! Vui lòng giảm số tiền vay hoặc tăng giá trị tài sản thế chấp.');
      return;
    }

    alert(
      `✅ Đăng ký khoản vay thành công!\n\n` +
      `Loại vay: ${selectedLoanType?.label}\n` +
      `Số tiền: ${formatCurrency(parseFloat(formData.amount))}\n` +
      `Thời hạn: ${formData.termMonths} tháng\n` +
      (ltvResult ? `LTV: ${ltvResult.ltv}% (${ltvResult.isValid ? '✓ Hợp lệ' : '✗ Vượt quá'})\n` : '') +
      `\nHồ sơ đang chờ thẩm định từ nhân viên tín dụng.\n` +
      `Trong ứng dụng thực tế, dữ liệu sẽ được lưu vào database.`
    );
    
    // Reset form
    setStep(1);
    setSelectedAsset(null);
    setUseManualInput(false);
    setFormData({
      loanType: 'CONSUMER',
      amount: '',
      termMonths: 120,
      purpose: '',
      hasCollateral: false,
      collateralType: 'REAL_ESTATE',
      collateralName: '',
      collateralLocation: '',
      estimatedValue: '',
      certificateNumber: '',
    });
    setLtvResult(null);
  };

  return (
    <div className="fade-in">
      {/* Progress Steps */}
      <div className="teller-card" style={{marginBottom: '1.5rem'}}>
        <div className="teller-card-body" style={{padding: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
            <div 
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '10px',
                background: step >= 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: step >= 1 ? 'white' : '#6b7280',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: step > 1 ? 'pointer' : 'default',
                transition: 'all 0.3s ease'
              }}
              onClick={() => step > 1 && setStep(1)}
            >
              1. Thông tin vay
            </div>
            {formData.hasCollateral && (
              <div 
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: step >= 2 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                  color: step >= 2 ? 'white' : '#6b7280',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              >
                2. Tài sản thế chấp
              </div>
            )}
            <div 
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '10px',
                background: step >= 3 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: step >= 3 ? 'white' : '#6b7280',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
            >
              {formData.hasCollateral ? '3' : '2'}. Xác nhận
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Loan Information */}
        {step === 1 && (
          <div className="teller-card">
            <div className="teller-card-header blue">
              <h3>
                <FileText size={20} />
                Thông tin khoản vay
              </h3>
            </div>
            <div className="teller-card-body">
              <div className="teller-form-group">
                <label className="teller-form-label">
                  Loại hình vay
                  <span className="required">*</span>
                </label>
                <select
                  className="teller-form-select"
                  value={formData.loanType}
                  onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                  required
                >
                  {loanTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn hình thức vay */}
              <div className="teller-form-group">
                <label className="teller-form-label">
                  Hình thức vay
                  <span className="required">*</span>
                </label>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  {/* Vay có thế chấp */}
                  <div 
                    onClick={() => setFormData({ ...formData, hasCollateral: true })}
                    style={{
                      border: formData.hasCollateral ? '2px solid #667eea' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '1rem',
                      cursor: 'pointer',
                      background: formData.hasCollateral ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>🏠 Vay có thế chấp</div>
                    <div style={{fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.5rem'}}>
                      Lãi suất thấp hơn, số tiền cao hơn
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#4b5563'}}>
                      ✅ Lãi suất: 8.5% - 12%<br/>
                      ✅ LTV tối đa: 50% - 70%
                    </div>
                  </div>

                  {/* Vay tín chấp */}
                  <div 
                    onClick={() => setFormData({ ...formData, hasCollateral: false })}
                    style={{
                      border: !formData.hasCollateral ? '2px solid #667eea' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '1rem',
                      cursor: 'pointer',
                      background: !formData.hasCollateral ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>💳 Vay tín chấp</div>
                    <div style={{fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.5rem'}}>
                      Không cần tài sản, thủ tục nhanh
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#4b5563'}}>
                      ⚠️ Lãi suất: 12% - 20%<br/>
                      ⚠️ Tối đa: 200 triệu
                    </div>
                  </div>
                </div>
              </div>

              <div className="teller-grid-2">
                <div className="teller-form-group">
                  <label className="teller-form-label">
                    Số tiền vay (VND)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    className="teller-form-input"
                    placeholder="500,000,000"
                    min="10000000"
                    step="1000000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="teller-form-group">
                  <label className="teller-form-label">
                    Thời hạn (tháng)
                    <span className="required">*</span>
                  </label>
                  <select
                    className="teller-form-select"
                    value={formData.termMonths}
                    onChange={(e) => setFormData({ ...formData, termMonths: parseInt(e.target.value) })}
                  >
                    <option value={12}>12 tháng (1 năm)</option>
                    <option value={24}>24 tháng (2 năm)</option>
                    <option value={36}>36 tháng (3 năm)</option>
                    <option value={60}>60 tháng (5 năm)</option>
                    <option value={120}>120 tháng (10 năm)</option>
                    <option value={180}>180 tháng (15 năm)</option>
                    <option value={240}>240 tháng (20 năm)</option>
                  </select>
                </div>
              </div>

              <div className="teller-form-group">
                <label className="teller-form-label">
                  Mục đích vay
                  <span className="required">*</span>
                </label>
                <textarea
                  className="teller-form-textarea"
                  placeholder="Mô tả mục đích sử dụng khoản vay..."
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                />
              </div>

              {/* Cảnh báo điều kiện vay tín chấp */}
              {!formData.hasCollateral && (
                <div className="teller-alert warning">
                  <AlertCircle size={18} />
                  <div>
                    <strong>📋 Yêu cầu vay tín chấp (không thế chấp)</strong>
                    <div style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                      Cán bộ tín dụng sẽ thẩm định các tiêu chí sau:
                      <br/>• ✅ Số tiền vay ≤ 200 triệu VND
                      <br/>• ✅ Thu nhập ≥ 15 triệu/tháng (sẽ xác minh)
                      <br/>• ✅ Điểm tín dụng ≥ 700 (Hạng AA+)
                      <br/>• ✅ Lịch sử tín dụng tốt (không nợ xấu)
                      <br/>• ✅ Tỷ lệ nợ/thu nhập ≤ 40%
                      <br/>• ✅ Số tiền vay ≤ 10 lần thu nhập
                    </div>
                    {formData.amount && parseFloat(formData.amount) > 200000000 && (
                      <div className="teller-alert" style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        background: '#fee2e2',
                        borderLeft: '4px solid #ef4444',
                        color: '#991b1b'
                      }}>
                        ❌ <strong>Số tiền vay vượt quá 200 triệu!</strong><br/>
                        Vay tín chấp chỉ được tối đa 200 triệu. Vui lòng giảm số tiền hoặc chọn "Vay có thế chấp".
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="teller-actions">
                <button
                  type="button"
                  className="teller-btn teller-btn-primary"
                  onClick={() => {
                    if (formData.hasCollateral) {
                      setStep(2);
                    } else {
                      setStep(3);
                    }
                  }}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Collateral Information */}
        {step === 2 && selectedLoanType?.requireCollateral && (
          <div className="teller-card">
            <div className="teller-card-header purple">
              <h3>
                <Home size={20} />
                Thông tin tài sản thế chấp
              </h3>
            </div>
            <div className="teller-card-body">
              <div className="teller-alert info" style={{marginBottom: '1.5rem'}}>
                <TrendingUp size={18} />
                <div>
                  <strong>LTV (Loan-to-Value) tối đa cho {selectedLoanType.label}:</strong> {selectedLoanType.maxLtv}%
                </div>
              </div>

              {!useManualInput ? (
                <>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                    <h5 style={{margin: 0, fontSize: '1rem', fontWeight: 600}}>Chọn tài sản của bạn</h5>
                    <button
                      type="button"
                      className="teller-btn teller-btn-secondary"
                      style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                      onClick={() => setUseManualInput(true)}
                    >
                      Nhập thủ công
                    </button>
                  </div>

                  {availableAssets.length === 0 ? (
                    <div className="teller-alert warning">
                      <AlertCircle size={18} />
                      <div>
                        Bạn chưa có tài sản tự do nào để thế chấp. Vui lòng{' '}
                        <button
                          type="button"
                          onClick={() => setUseManualInput(true)}
                          style={{color: 'inherit', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600}}
                        >
                          nhập thông tin tài sản thủ công
                        </button>.
                      </div>
                    </div>
                  ) : (
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem'}}>
                      {availableAssets.map((asset) => (
                        <div
                          key={asset.id}
                          onClick={() => handleSelectAsset(asset)}
                          style={{
                            border: selectedAsset?.id === asset.id ? '2px solid #667eea' : '2px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            background: selectedAsset?.id === asset.id ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 'white'
                          }}
                        >
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                          }}>
                            {getAssetIcon(asset.type)}
                          </div>
                          <div style={{fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.375rem', color: '#1f2937'}}>
                            {asset.name}
                          </div>
                          <div style={{fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase'}}>
                            {getAssetTypeLabel(asset.type)}
                          </div>
                          {asset.address && (
                            <div style={{fontSize: '0.813rem', color: '#9ca3af', marginBottom: '0.375rem'}}>
                              {asset.address}
                            </div>
                          )}
                          {asset.licensePlate && (
                            <div style={{fontSize: '0.813rem', color: '#9ca3af', marginBottom: '0.375rem'}}>
                              Biển số: {asset.licensePlate}
                            </div>
                          )}
                          <div style={{fontSize: '1.125rem', fontWeight: 700, color: '#10b981', marginTop: '0.75rem'}}>
                            {formatCurrency(asset.currentValue)}
                          </div>
                          {selectedAsset?.id === asset.id && (
                            <div style={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: '#667eea',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Check size={18} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedAsset && (
                    <div className="teller-info-box success">
                      <h4>
                        <Check size={16} />
                        Tài sản đã chọn
                      </h4>
                      <div className="teller-info-row">
                        <span className="teller-info-label">Tên tài sản:</span>
                        <span className="teller-info-value">{selectedAsset.name}</span>
                      </div>
                      <div className="teller-info-row">
                        <span className="teller-info-label">Loại:</span>
                        <span className="teller-info-value">{getAssetTypeLabel(selectedAsset.type)}</span>
                      </div>
                      <div className="teller-info-row">
                        <span className="teller-info-label">Giá trị:</span>
                        <span className="teller-info-value">{formatCurrency(selectedAsset.currentValue)}</span>
                      </div>
                      <div className="teller-info-row">
                        <span className="teller-info-label">Giấy tờ:</span>
                        <span className="teller-info-value">{selectedAsset.certificate}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                    <h5 style={{margin: 0, fontSize: '1rem', fontWeight: 600}}>Nhập thông tin tài sản thủ công</h5>
                    {availableAssets.length > 0 && (
                      <button
                        type="button"
                        className="teller-btn teller-btn-secondary"
                        style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                        onClick={() => {
                          setUseManualInput(false);
                          setSelectedAsset(null);
                        }}
                      >
                        Chọn từ danh sách
                      </button>
                    )}
                  </div>

                  <div className="teller-form-group">
                    <label className="teller-form-label">Loại tài sản</label>
                    <select
                      className="teller-form-select"
                      value={formData.collateralType}
                      onChange={(e) => setFormData({ ...formData, collateralType: e.target.value })}
                    >
                      <option value="REAL_ESTATE">Bất động sản</option>
                      <option value="VEHICLE">Xe ô tô</option>
                      <option value="CERTIFICATE">Giấy tờ có giá</option>
                      <option value="GOLD">Vàng, kim loại quý</option>
                    </select>
                  </div>

                  <div className="teller-form-group">
                    <label className="teller-form-label">Tên/Mô tả tài sản</label>
                    <input
                      type="text"
                      className="teller-form-input"
                      placeholder="VD: Nhà phố 123 Nguyễn Huệ, Q.1, TP.HCM"
                      value={formData.collateralName}
                      onChange={(e) => setFormData({ ...formData, collateralName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="teller-form-group">
                    <label className="teller-form-label">Địa chỉ/Vị trí tài sản</label>
                    <input
                      type="text"
                      className="teller-form-input"
                      placeholder="Địa chỉ chi tiết"
                      value={formData.collateralLocation}
                      onChange={(e) => setFormData({ ...formData, collateralLocation: e.target.value })}
                      required
                    />
                  </div>

                  <div className="teller-grid-2">
                    <div className="teller-form-group">
                      <label className="teller-form-label">Giá trị ước tính (VND)</label>
                      <input
                        type="number"
                        className="teller-form-input"
                        placeholder="1,000,000,000"
                        min="0"
                        value={formData.estimatedValue}
                        onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                        required
                      />
                      <div className="teller-form-helper">Giá trị thị trường hiện tại</div>
                    </div>

                    <div className="teller-form-group">
                      <label className="teller-form-label">Số giấy chứng nhận</label>
                      <input
                        type="text"
                        className="teller-form-input"
                        placeholder="Số sổ đỏ/giấy tờ"
                        value={formData.certificateNumber}
                        onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="button"
                className="teller-btn teller-btn-secondary"
                onClick={calculateLoanLTV}
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                <Calculator size={18} />
                Tính toán LTV (Loan-to-Value Ratio)
              </button>

              {ltvResult && (
                <div className="teller-info-box" style={{
                  background: ltvResult.isValid ? '#d1fae5' : '#fee2e2',
                  borderLeft: `4px solid ${ltvResult.isValid ? '#10b981' : '#ef4444'}`
                }}>
                  <h4 style={{color: ltvResult.isValid ? '#065f46' : '#991b1b'}}>
                    <Calculator size={16} />
                    Kết quả tính toán LTV
                  </h4>
                  <div style={{background: 'white', padding: '1rem', borderRadius: '8px', margin: '1rem 0', fontFamily: 'monospace'}}>
                    <div>LTV = (Số tiền vay / Giá trị tài sản) × 100%</div>
                    <div style={{margin: '0.5rem 0', paddingLeft: '1rem'}}>
                      = ({formatCurrency(ltvResult.loanAmount)} / {formatCurrency(ltvResult.collateralValue)}) × 100%
                    </div>
                    <div style={{fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: ltvResult.isValid ? '#065f46' : '#991b1b'}}>
                      = {ltvResult.ltv}%
                    </div>
                  </div>
                  <div style={{fontWeight: 600, padding: '1rem', borderRadius: '8px', background: 'white', color: ltvResult.isValid ? '#065f46' : '#991b1b'}}>
                    {ltvResult.isValid ? (
                      <div>✅ LTV hợp lệ ({ltvResult.ltv}% ≤ {ltvResult.maxLtv}%)</div>
                    ) : (
                      <div>
                        <div>❌ LTV vượt quá ({ltvResult.ltv}% {'>'} {ltvResult.maxLtv}%)</div>
                        <div style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                          Vui lòng giảm số tiền vay xuống tối đa {formatCurrency(ltvResult.collateralValue * ltvResult.maxLtv / 100)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="teller-actions">
                <button
                  type="button"
                  className="teller-btn teller-btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  className="teller-btn teller-btn-primary"
                  onClick={() => {
                    if (!ltvResult) {
                      alert('Vui lòng tính toán LTV trước khi tiếp tục!');
                      return;
                    }
                    setStep(3);
                  }}
                  style={{flex: 1}}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="teller-card">
            <div className="teller-card-header green">
              <h3>
                <Check size={20} />
                Xác nhận thông tin
              </h3>
            </div>
            <div className="teller-card-body">
              <div className="teller-info-box">
                <h4>Thông tin khoản vay</h4>
                <div className="teller-info-row">
                  <span className="teller-info-label">Loại vay:</span>
                  <span className="teller-info-value">{selectedLoanType?.label}</span>
                </div>
                <div className="teller-info-row">
                  <span className="teller-info-label">Số tiền:</span>
                  <span className="teller-info-value">{formatCurrency(parseFloat(formData.amount))}</span>
                </div>
                <div className="teller-info-row">
                  <span className="teller-info-label">Thời hạn:</span>
                  <span className="teller-info-value">{formData.termMonths} tháng</span>
                </div>
                <div className="teller-info-row">
                  <span className="teller-info-label">Mục đích:</span>
                  <span className="teller-info-value">{formData.purpose}</span>
                </div>
                <div className="teller-info-row">
                  <span className="teller-info-label">Thu nhập:</span>
                  <span className="teller-info-value">{formatCurrency(parseFloat(formData.monthlyIncome))}/tháng</span>
                </div>
              </div>

              {selectedLoanType?.requireCollateral && (
                <div className="teller-info-box" style={{marginTop: '1rem'}}>
                  <h4>Tài sản thế chấp</h4>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Loại tài sản:</span>
                    <span className="teller-info-value">
                      {formData.collateralType === 'REAL_ESTATE' ? 'Bất động sản' : 
                       formData.collateralType === 'VEHICLE' ? 'Phương tiện' : 
                       formData.collateralType}
                    </span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Tên tài sản:</span>
                    <span className="teller-info-value">{formData.collateralName}</span>
                  </div>
                  <div className="teller-info-row">
                    <span className="teller-info-label">Giá trị:</span>
                    <span className="teller-info-value">{formatCurrency(parseFloat(formData.estimatedValue))}</span>
                  </div>
                  {ltvResult && (
                    <div className="teller-info-row">
                      <span className="teller-info-label">LTV:</span>
                      <span className="teller-info-value" style={{color: ltvResult.isValid ? '#10b981' : '#ef4444'}}>
                        {ltvResult.ltv}% {ltvResult.isValid ? '✓' : '✗'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="teller-alert warning" style={{marginTop: '1.5rem'}}>
                <AlertCircle size={18} />
                <div>
                  <strong>Lưu ý:</strong> Sau khi gửi hồ sơ, nhân viên tín dụng sẽ tiến hành thẩm định. 
                  Quá trình này có thể mất 2-5 ngày làm việc.
                </div>
              </div>

              <div className="teller-actions">
                <button
                  type="button"
                  className="teller-btn teller-btn-secondary"
                  onClick={() => setStep(selectedLoanType?.requireCollateral ? 2 : 1)}
                >
                  Quay lại
                </button>
                <button 
                  type="submit" 
                  className="teller-btn teller-btn-success" 
                  style={{flex: 1}}
                >
                  <FileText size={18} />
                  Gửi hồ sơ vay
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoanApplication;


