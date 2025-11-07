import { useState } from 'react';
import { FileText, Upload, Calculator, Home, Car, Briefcase, Check, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { formatCurrency, calculateLTV, getVerifiedCollaterals, currentUser } from '../../data/mockData';

const LoanApplicationModal = ({ isOpen, onClose }) => {
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

  // Lấy chỉ tài sản đã được verify và sẵn sàng sử dụng
  const customerId = currentUser.id || 1;
  const verifiedCollaterals = getVerifiedCollaterals(customerId);
  const availableAssets = verifiedCollaterals.filter(asset => asset.status === 'AVAILABLE');

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
      collateralType: asset.collateral_type_id === 1 ? 'REAL_ESTATE' : asset.collateral_type_id === 2 ? 'VEHICLE' : 'OTHER',
      collateralName: asset.collateral_name,
      collateralLocation: asset.location || '',
      estimatedValue: asset.appraised_value.toString(),
      certificateNumber: asset.certificate_number || '',
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
    
    onClose();
    setStep(1);
    setLtvResult(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đăng ký khoản vay" size="lg">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Thông tin vay</div>
        {formData.hasCollateral && (
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Tài sản thế chấp</div>
        )}
        <div className={`step ${step >= 3 ? 'active' : ''}`}>{formData.hasCollateral ? '3' : '2'}. Xác nhận</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h4 className="step-title">Thông tin khoản vay</h4>
            
            <div className="form-group">
              <label>Loại hình vay</label>
              <select
                className="input"
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

            <div className="form-group">
              <label>Hình thức vay</label>
              <div className="collateral-choice">
                <div 
                  className={`choice-card ${formData.hasCollateral ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, hasCollateral: true })}
                >
                  <div className="choice-radio">
                    {formData.hasCollateral && <div className="radio-checked" />}
                  </div>
                  <div className="choice-content">
                    <div className="choice-title">🏠 Vay có thế chấp</div>
                    <div className="choice-desc">Lãi suất thấp hơn, số tiền cao hơn</div>
                    <div className="choice-benefit">
                      ✅ Lãi suất: 8.5% - 12%<br/>
                      ✅ Số tiền: Tùy theo giá trị tài sản<br/>
                      ✅ LTV tối đa: 50% - 70%
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`choice-card ${!formData.hasCollateral ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, hasCollateral: false })}
                >
                  <div className="choice-radio">
                    {!formData.hasCollateral && <div className="radio-checked" />}
                  </div>
                  <div className="choice-content">
                    <div className="choice-title">💳 Vay tín chấp (không thế chấp)</div>
                    <div className="choice-desc">Không cần tài sản, thủ tục nhanh</div>
                    <div className="choice-benefit">
                      ⚠️ Lãi suất: 12% - 20% (cao hơn)<br/>
                      ⚠️ Số tiền tối đa: 200 triệu<br/>
                      ⚠️ Yêu cầu điểm tín dụng cao (≥700)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-2 gap-3">
              <div className="form-group">
                <label>Số tiền vay (VND)</label>
                <input
                  type="number"
                  className="input"
                  placeholder="500,000,000"
                  min="10000000"
                  step="1000000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Thời hạn (tháng)</label>
                <select
                  className="input"
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

            <div className="form-group">
              <label>Mục đích vay</label>
              <textarea
                className="input"
                rows="3"
                placeholder="Mô tả mục đích sử dụng khoản vay..."
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              />
            </div>

            {/* Hiển thị yêu cầu cho vay không thế chấp */}
            {!formData.hasCollateral && (
              <div className="alert alert-warning">
                <AlertCircle size={20} />
                <div>
                  <strong>📋 Yêu cầu vay tín chấp (không thế chấp)</strong>
                  <div className="text-sm mt-2">
                    Cán bộ tín dụng sẽ thẩm định các tiêu chí sau:
                    <br/>• ✅ Số tiền vay ≤ 200 triệu VND
                    <br/>• ✅ Thu nhập ≥ 15 triệu/tháng (sẽ xác minh)
                    <br/>• ✅ Điểm tín dụng ≥ 700 (Hạng AA+)
                    <br/>• ✅ Lịch sử tín dụng tốt (không nợ xấu)
                    <br/>• ✅ Tỷ lệ nợ/thu nhập ≤ 40%
                    <br/>• ✅ Số tiền vay ≤ 10 lần thu nhập
                  </div>
                  {formData.amount && parseFloat(formData.amount) > 200000000 && (
                    <div className="alert alert-danger mt-2" style={{padding: '0.75rem', fontSize: '0.813rem'}}>
                      ❌ <strong>Số tiền vay vượt quá 200 triệu!</strong><br/>
                      Vay tín chấp chỉ được tối đa 200 triệu. Vui lòng giảm số tiền hoặc chọn "Vay có thế chấp".
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && formData.hasCollateral && (
          <div className="form-step">
            <h4 className="step-title">
              <Home size={20} /> Thông tin tài sản thế chấp
            </h4>

            <div className="alert alert-info mb-3">
              📋 LTV (Loan-to-Value) tối đa cho {selectedLoanType.label}: <strong>{selectedLoanType.maxLtv}%</strong>
            </div>

            {!useManualInput ? (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                  <h5 style={{margin: 0, fontSize: '1rem', fontWeight: 600}}>Chọn tài sản của bạn</h5>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setUseManualInput(true)}
                    style={{fontSize: '0.875rem'}}
                  >
                    Nhập thủ công
                  </button>
                </div>

                {availableAssets.length === 0 ? (
                  <div className="alert alert-warning" style={{
                    padding: '1.25rem',
                    background: '#fef3c7',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <AlertCircle size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
                    <div>
                      <h4 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        Chưa có tài sản đã được xét duyệt
                      </h4>
                      <p style={{ color: '#78350f', fontSize: '0.75rem', margin: 0 }}>
                        Bạn cần thêm tài sản và chờ cán bộ tín dụng xét duyệt trước khi có thể vay vốn.
                        <br/>
                        Vui lòng vào mục <strong>"Tài sản thế chấp"</strong> để thêm tài sản mới.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="asset-selection-grid">
                    {availableAssets.map((asset) => (
                      <div
                        key={asset.collateral_id}
                        className={`asset-card ${selectedAsset?.collateral_id === asset.collateral_id ? 'selected' : ''}`}
                        onClick={() => handleSelectAsset(asset)}
                      >
                        <div className="asset-icon">
                          {getAssetIcon(asset.collateral_type_id === 1 ? 'REAL_ESTATE' : asset.collateral_type_id === 2 ? 'VEHICLE' : 'OTHER')}
                        </div>
                        <div className="asset-info">
                          <div className="asset-name">{asset.collateral_name}</div>
                          <div className="asset-type">{asset.collateralTypeName}</div>
                          {asset.location && (
                            <div className="asset-detail">{asset.location}</div>
                          )}
                          <div className="asset-detail" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {asset.certificate_number}
                          </div>
                          <div className="asset-value">
                            Giá thẩm định: {formatCurrency(asset.appraised_value)}
                          </div>
                        </div>
                        {selectedAsset?.collateral_id === asset.collateral_id && (
                          <div className="asset-selected-badge">
                            <Check size={18} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {selectedAsset && (
                  <div className="selected-asset-info">
                    <h5>Tài sản đã chọn</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Tên tài sản:</span>
                        <span className="value">{selectedAsset.collateral_name}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Loại:</span>
                        <span className="value">{selectedAsset.collateralTypeName}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Giá trị thẩm định:</span>
                        <span className="value">{formatCurrency(selectedAsset.appraised_value)}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Giấy tờ:</span>
                        <span className="value">{selectedAsset.certificate_number}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                  <h5 style={{margin: 0, fontSize: '1rem', fontWeight: 600}}>Nhập thông tin tài sản thủ công</h5>
                  {availableAssets.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setUseManualInput(false);
                        setSelectedAsset(null);
                      }}
                      style={{fontSize: '0.875rem'}}
                    >
                      Chọn từ danh sách
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Loại tài sản</label>
                  <select
                    className="input"
                    value={formData.collateralType}
                    onChange={(e) => setFormData({ ...formData, collateralType: e.target.value })}
                  >
                    <option value="REAL_ESTATE">Bất động sản</option>
                    <option value="VEHICLE">Xe ô tô</option>
                    <option value="CERTIFICATE">Giấy tờ có giá</option>
                    <option value="GOLD">Vàng, kim loại quý</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tên/Mô tả tài sản</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="VD: Nhà phố 123 Nguyễn Huệ, Q.1, TP.HCM"
                    value={formData.collateralName}
                    onChange={(e) => setFormData({ ...formData, collateralName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Địa chỉ/Vị trí tài sản</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Địa chỉ chi tiết"
                    value={formData.collateralLocation}
                    onChange={(e) => setFormData({ ...formData, collateralLocation: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-2 gap-3">
                  <div className="form-group">
                    <label>Giá trị ước tính (VND)</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="1,000,000,000"
                      min="0"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      required
                    />
                    <small className="text-xs text-secondary">Giá trị thị trường hiện tại</small>
                  </div>

                  <div className="form-group">
                    <label>Số giấy chứng nhận</label>
                    <input
                      type="text"
                      className="input"
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
              className="btn btn-secondary mb-3"
              onClick={calculateLoanLTV}
              style={{ width: '100%' }}
            >
              <Calculator size={18} />
              Tính toán LTV (Loan-to-Value Ratio)
            </button>

            {ltvResult && (
              <div className={`ltv-result ${ltvResult.isValid ? 'valid' : 'invalid'}`}>
                <h4 className="font-semibold mb-3">
                  📊 Kết quả tính toán LTV
                </h4>
                <div className="ltv-formula">
                  <div>LTV = (Số tiền vay / Giá trị tài sản) × 100%</div>
                  <div className="formula-calc">
                    = ({formatCurrency(ltvResult.loanAmount)} / {formatCurrency(ltvResult.collateralValue)}) × 100%
                  </div>
                  <div className="ltv-value">
                    = <span className={ltvResult.isValid ? 'text-success' : 'text-danger'}>
                      {ltvResult.ltv}%
                    </span>
                  </div>
                </div>
                <div className="ltv-status">
                  {ltvResult.isValid ? (
                    <div className="status-valid">
                      ✅ LTV hợp lệ ({ltvResult.ltv}% ≤ {ltvResult.maxLtv}%)
                    </div>
                  ) : (
                    <div className="status-invalid">
                      ❌ LTV vượt quá ({ltvResult.ltv}% {'>'} {ltvResult.maxLtv}%)
                      <div className="text-sm mt-1">
                        Vui lòng giảm số tiền vay xuống tối đa {formatCurrency(ltvResult.collateralValue * ltvResult.maxLtv / 100)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h4 className="step-title">Xác nhận thông tin</h4>
            
            <div className="summary-box">
              <div className="summary-section">
                <h5>Thông tin khoản vay</h5>
                <div className="summary-item">
                  <span>Loại vay:</span>
                  <strong>{selectedLoanType?.label}</strong>
                </div>
                <div className="summary-item">
                  <span>Số tiền:</span>
                  <strong>{formatCurrency(parseFloat(formData.amount))}</strong>
                </div>
                <div className="summary-item">
                  <span>Thời hạn:</span>
                  <strong>{formData.termMonths} tháng</strong>
                </div>
                <div className="summary-item">
                  <span>Thu nhập:</span>
                  <strong>{formatCurrency(parseFloat(formData.monthlyIncome))}/tháng</strong>
                </div>
              </div>

              {selectedLoanType?.requireCollateral && (
                <div className="summary-section">
                  <h5>Tài sản thế chấp</h5>
                  <div className="summary-item">
                    <span>Loại tài sản:</span>
                    <strong>{formData.collateralType === 'REAL_ESTATE' ? 'Bất động sản' : formData.collateralType}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Tên tài sản:</span>
                    <strong>{formData.collateralName}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Giá trị:</span>
                    <strong>{formatCurrency(parseFloat(formData.estimatedValue))}</strong>
                  </div>
                  {ltvResult && (
                    <div className="summary-item">
                      <span>LTV:</span>
                      <strong className={ltvResult.isValid ? 'text-success' : 'text-danger'}>
                        {ltvResult.ltv}% {ltvResult.isValid ? '✓' : '✗'}
                      </strong>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="alert alert-warning mt-3">
              ⚠️ Sau khi gửi hồ sơ, nhân viên tín dụng sẽ tiến hành thẩm định. Quá trình này có thể mất 2-5 ngày làm việc.
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              Quay lại
            </button>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                // Step 1 → Step 2 hoặc Step 3
                if (step === 1) {
                  if (formData.hasCollateral) {
                    setStep(2); // Có thế chấp → đi đến step 2
                  } else {
                    setStep(3); // Không thế chấp → bỏ qua step 2, đi thẳng step 3
                  }
                  return;
                }
                
                // Step 2 → Step 3 (chỉ khi có thế chấp)
                if (step === 2) {
                  if (formData.hasCollateral && !ltvResult) {
                    alert('Vui lòng tính toán LTV trước khi tiếp tục!');
                    return;
                  }
                  setStep(3);
                  return;
                }
                
                setStep(step + 1);
              }}
              style={{ flex: 1 }}
            >
              Tiếp tục
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <FileText size={18} />
              Gửi hồ sơ vay
            </button>
          )}
        </div>
      </form>

      <style jsx>{`
        .steps-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border-color);
        }

        .step {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-secondary);
        }

        .step.active {
          background: var(--primary-color);
          color: white;
          font-weight: 600;
        }

        .form-step {
          min-height: 400px;
        }

        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .alert-info {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          color: #1e40af;
        }

        .alert-success {
          background: #d1fae5;
          border-left: 4px solid #10b981;
          color: #065f46;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .alert-success strong {
          color: #065f46;
        }

        .alert-danger {
          background: #fee2e2;
          border-left: 4px solid #ef4444;
          color: #991b1b;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .alert-danger strong {
          color: #991b1b;
        }

        .unsecured-loan-check {
          margin-top: 1.5rem;
        }

        .alert-warning {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          color: #92400e;
        }

        .ltv-result {
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid;
        }

        .ltv-result.valid {
          background: #d1fae5;
          border-color: #10b981;
        }

        .ltv-result.invalid {
          background: #fee2e2;
          border-color: #ef4444;
        }

        .ltv-formula {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          font-family: monospace;
        }

        .formula-calc {
          margin: 0.5rem 0;
          padding-left: 1rem;
        }

        .ltv-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .ltv-status {
          font-weight: 600;
          padding: 1rem;
          border-radius: 8px;
          background: white;
        }

        .status-valid {
          color: #065f46;
        }

        .status-invalid {
          color: #991b1b;
        }

        .summary-box {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .summary-section {
          margin-bottom: 1.5rem;
        }

        .summary-section:last-child {
          margin-bottom: 0;
        }

        .summary-section h5 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .asset-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .asset-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          background: white;
        }

        .asset-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }

        .asset-card.selected {
          border-color: var(--primary-color);
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .asset-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .asset-info {
          flex: 1;
        }

        .asset-name {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.375rem;
          color: #1f2937;
        }

        .asset-type {
          font-size: 0.813rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .asset-detail {
          font-size: 0.813rem;
          color: #9ca3af;
          margin-bottom: 0.375rem;
        }

        .asset-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: #10b981;
          margin-top: 0.75rem;
        }

        .asset-selected-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .selected-asset-info {
          background: #f0fdf4;
          border: 2px solid #86efac;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .selected-asset-info h5 {
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #166534;
        }

        .info-grid {
          display: grid;
          gap: 0.75rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #d1fae5;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item .label {
          font-size: 0.875rem;
          color: #16a34a;
          font-weight: 500;
        }

        .info-item .value {
          font-size: 0.875rem;
          color: #166534;
          font-weight: 600;
        }
      `}</style>
    </Modal>
  );
};

export default LoanApplicationModal;

