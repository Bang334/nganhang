import { useState } from 'react';
import { CheckCircle, XCircle, FileText, Calculator, User, Home } from 'lucide-react';
import Modal from '../common/Modal';
import { formatCurrency, calculateLTV } from '../../data/mockData';

const LoanApprovalModal = ({ isOpen, onClose, loanData }) => {
  const [step, setStep] = useState(1);
  const [reviewData, setReviewData] = useState({
    creditScore: 0,
    monthlyIncome: 0,
    debtRatio: 0,
    employmentStatus: 'STABLE',
    appraisalValue: 0,
    ltvRatio: 0,
    approvedAmount: 0,
    interestRate: 0,
    termMonths: 0,
    decision: '',
    reason: '',
  });

  const [finalDecision, setFinalDecision] = useState(null);

  const creditGrades = [
    { score: 800, grade: 'AAA', rate: 8.5, maxLtv: 70 },
    { score: 700, grade: 'AA', rate: 9.0, maxLtv: 65 },
    { score: 600, grade: 'A', rate: 9.5, maxLtv: 60 },
    { score: 500, grade: 'BBB', rate: 10.5, maxLtv: 55 },
    { score: 400, grade: 'BB', rate: 12.0, maxLtv: 50 },
    { score: 300, grade: 'B', rate: 14.0, maxLtv: 45 },
    { score: 200, grade: 'CCC', rate: 16.0, maxLtv: 40 },
    { score: 100, grade: 'CC', rate: 18.0, maxLtv: 35 },
    { score: 0, grade: 'C', rate: 20.0, maxLtv: 30 },
  ];

  const handleCreditScoring = () => {
    // Simulate credit scoring
    const score = Math.floor(Math.random() * 400) + 400; // 400-800
    const grade = creditGrades.find(g => score >= g.score) || creditGrades[creditGrades.length - 1];

    setReviewData({
      ...reviewData,
      creditScore: score,
      creditGrade: grade.grade,
      interestRate: grade.rate,
      maxLtv: grade.maxLtv,
    });

    setStep(2);
  };

  const handleAppraisal = () => {
    // Simulate property appraisal
    const appraisalValue = Math.floor(loanData.loanAmount * 1.2 * (0.8 + Math.random() * 0.4)); // 0.8x to 1.2x
    const ltv = calculateLTV(loanData.loanAmount, appraisalValue);

    setReviewData({
      ...reviewData,
      appraisalValue,
      ltvRatio: parseFloat(ltv),
    });

    setStep(3);
  };

  const handleFinalDecision = (decision) => {
    setReviewData({ ...reviewData, decision });
    setFinalDecision({
      loanNumber: loanData.loanNumber,
      customerName: loanData.customerName,
      decision,
      approvedAmount: reviewData.approvedAmount || loanData.loanAmount,
      interestRate: reviewData.interestRate,
      termMonths: reviewData.termMonths || loanData.termMonths,
      reason: reviewData.reason,
      reviewedAt: new Date().toLocaleString('vi-VN'),
    });
    setStep(4);
  };

  const handleComplete = () => {
    alert(
      `✅ ${finalDecision.decision === 'APPROVED' ? 'Phê duyệt' : 'Từ chối'} khoản vay!\n\n` +
      `Hồ sơ: ${finalDecision.loanNumber}\n` +
      `Khách hàng: ${finalDecision.customerName}\n` +
      `Quyết định: ${finalDecision.decision === 'APPROVED' ? 'PHÊ DUYỆT' : 'TỪ CHỐI'}\n` +
      `${finalDecision.decision === 'APPROVED' ? `Số tiền duyệt: ${formatCurrency(finalDecision.approvedAmount)}\n` : ''}` +
      `${finalDecision.decision === 'APPROVED' ? `Lãi suất: ${finalDecision.interestRate}%/năm\n` : ''}` +
      `${finalDecision.reason ? `Lý do: ${finalDecision.reason}\n` : ''}` +
      `Thời gian: ${finalDecision.reviewedAt}\n\n` +
      `Trong ứng dụng thực tế, quyết định sẽ được lưu vào database.`
    );

    onClose();
    setStep(1);
    setFinalDecision(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Thẩm định hồ sơ ${loanData?.loanNumber}`} size="lg">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Thông tin hồ sơ</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Điểm tín dụng</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Thẩm định tài sản</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Quyết định</div>
      </div>

      {step === 1 && loanData && (
        <div className="form-step">
          <h4 className="step-title">
            <FileText size={20} />
            Thông tin hồ sơ vay
          </h4>

          <div className="loan-summary">
            <div className="summary-section">
              <h5>Thông tin khách hàng</h5>
              <div className="summary-item">
                <span>Họ tên:</span>
                <strong>{loanData.customerName}</strong>
              </div>
              <div className="summary-item">
                <span>Mã khách hàng:</span>
                <strong>{loanData.customerCode}</strong>
              </div>
              <div className="summary-item">
                <span>Điểm tín dụng hiện tại:</span>
                <strong>{loanData.creditScore} ({loanData.creditGrade})</strong>
              </div>
            </div>

            <div className="summary-section">
              <h5>Thông tin khoản vay</h5>
              <div className="summary-item">
                <span>Loại vay:</span>
                <strong>{loanData.loanType}</strong>
              </div>
              <div className="summary-item">
                <span>Số tiền yêu cầu:</span>
                <strong>{formatCurrency(loanData.loanAmount)}</strong>
              </div>
              <div className="summary-item">
                <span>Thời hạn:</span>
                <strong>{loanData.termMonths} tháng</strong>
              </div>
              <div className="summary-item">
                <span>LTV hiện tại:</span>
                <strong className={loanData.ltvRatio > 70 ? 'text-danger' : 'text-success'}>
                  {loanData.ltvRatio}%
                </strong>
              </div>
            </div>

            {loanData.collateralType && (
              <div className="summary-section">
                <h5>Tài sản thế chấp</h5>
                <div className="summary-item">
                  <span>Loại tài sản:</span>
                  <strong>{loanData.collateralType}</strong>
                </div>
                <div className="summary-item">
                  <span>Giá trị ước tính:</span>
                  <strong>{formatCurrency(loanData.collateralValue)}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="alert alert-info">
            📋 <strong>Hồ sơ được nộp ngày:</strong> {loanData.applicationDate}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h4 className="step-title">
            <Calculator size={20} />
            Đánh giá tín dụng
          </h4>

          <div className="form-group">
            <label>Thu nhập hàng tháng (VND)</label>
            <input
              type="number"
              className="input"
              placeholder="20000000"
              value={reviewData.monthlyIncome}
              onChange={(e) => setReviewData({ ...reviewData, monthlyIncome: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="form-group">
            <label>Tỷ lệ nợ/thu nhập (%)</label>
            <input
              type="number"
              className="input"
              placeholder="30"
              min="0"
              max="100"
              value={reviewData.debtRatio}
              onChange={(e) => setReviewData({ ...reviewData, debtRatio: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="form-group">
            <label>Tình trạng việc làm</label>
            <select
              className="input"
              value={reviewData.employmentStatus}
              onChange={(e) => setReviewData({ ...reviewData, employmentStatus: e.target.value })}
            >
              <option value="STABLE">Ổn định</option>
              <option value="UNSTABLE">Không ổn định</option>
              <option value="UNEMPLOYED">Thất nghiệp</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreditScoring}
            style={{ width: '100%' }}
          >
            Tính điểm tín dụng
          </button>
        </div>
      )}

      {step === 3 && loanData.collateralType && (
        <div className="form-step">
          <h4 className="step-title">
            <Home size={20} />
            Thẩm định tài sản thế chấp
          </h4>

          <div className="form-group">
            <label>Giá trị thẩm định thực tế (VND)</label>
            <input
              type="number"
              className="input"
              placeholder="1200000000"
              value={reviewData.appraisalValue}
              onChange={(e) => setReviewData({ ...reviewData, appraisalValue: parseInt(e.target.value) })}
              required
            />
            <small className="text-xs text-secondary">Giá trị sau khi thẩm định thực địa</small>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAppraisal}
            style={{ width: '100%' }}
          >
            Tính toán LTV
          </button>

          {reviewData.ltvRatio > 0 && (
            <div className={`ltv-result ${reviewData.ltvRatio <= reviewData.maxLtv ? 'valid' : 'invalid'}`}>
              <div className="ltv-formula">
                LTV = ({formatCurrency(loanData.loanAmount)} / {formatCurrency(reviewData.appraisalValue)}) × 100%
                = <strong>{reviewData.ltvRatio}%</strong>
              </div>
              <div className="ltv-status">
                {reviewData.ltvRatio <= reviewData.maxLtv ? (
                  <span className="status-valid">
                    ✅ LTV hợp lệ ({reviewData.ltvRatio}% ≤ {reviewData.maxLtv}%)
                  </span>
                ) : (
                  <span className="status-invalid">
                    ❌ LTV vượt quá ({reviewData.ltvRatio}% &gt; {reviewData.maxLtv}%)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          <h4 className="step-title">Quyết định cuối cùng</h4>

          <div className="decision-form">
            <div className="form-group">
              <label>Số tiền duyệt (VND)</label>
              <input
                type="number"
                className="input"
                placeholder={loanData.loanAmount.toString()}
                value={reviewData.approvedAmount}
                onChange={(e) => setReviewData({ ...reviewData, approvedAmount: parseInt(e.target.value) })}
              />
              <small className="text-xs text-secondary">Có thể điều chỉnh số tiền duyệt</small>
            </div>

            <div className="form-group">
              <label>Lãi suất áp dụng (%/năm)</label>
              <input
                type="number"
                className="input"
                step="0.1"
                value={reviewData.interestRate}
                onChange={(e) => setReviewData({ ...reviewData, interestRate: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label>Thời hạn vay (tháng)</label>
              <select
                className="input"
                value={reviewData.termMonths}
                onChange={(e) => setReviewData({ ...reviewData, termMonths: parseInt(e.target.value) })}
              >
                <option value={12}>12 tháng</option>
                <option value={24}>24 tháng</option>
                <option value={36}>36 tháng</option>
                <option value={60}>60 tháng</option>
                <option value={120}>120 tháng</option>
                <option value={180}>180 tháng</option>
                <option value={240}>240 tháng</option>
              </select>
            </div>

            <div className="form-group">
              <label>Lý do (bắt buộc nếu từ chối)</label>
              <textarea
                className="input"
                rows="3"
                placeholder="Lý do từ chối hoặc ghi chú..."
                value={reviewData.reason}
                onChange={(e) => setReviewData({ ...reviewData, reason: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleFinalDecision('REJECTED')}
              style={{ flex: 1 }}
            >
              <XCircle size={18} />
              Từ chối
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleFinalDecision('APPROVED')}
              style={{ flex: 1 }}
            >
              <CheckCircle size={18} />
              Phê duyệt
            </button>
          </div>
        </div>
      )}

      {step === 5 && finalDecision && (
        <div className="form-step">
          <h4 className="step-title">
            {finalDecision.decision === 'APPROVED' ?
              <CheckCircle size={20} className="text-success" /> :
              <XCircle size={20} className="text-danger" />
            }
            {finalDecision.decision === 'APPROVED' ? 'Phê duyệt' : 'Từ chối'} khoản vay
          </h4>

          <div className="final-decision">
            <div className="decision-header">
              <div className={`decision-status ${finalDecision.decision.toLowerCase()}`}>
                {finalDecision.decision === 'APPROVED' ? '✅ PHÊ DUYỆT' : '❌ TỪ CHỐI'}
              </div>
            </div>

            <div className="decision-details">
              <div className="detail-item">
                <span>Hồ sơ:</span>
                <strong>{finalDecision.loanNumber}</strong>
              </div>
              <div className="detail-item">
                <span>Khách hàng:</span>
                <strong>{finalDecision.customerName}</strong>
              </div>
              {finalDecision.decision === 'APPROVED' && (
                <>
                  <div className="detail-item">
                    <span>Số tiền duyệt:</span>
                    <strong className="text-success">{formatCurrency(finalDecision.approvedAmount)}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Lãi suất:</span>
                    <strong className="text-primary">{finalDecision.interestRate}%/năm</strong>
                  </div>
                  <div className="detail-item">
                    <span>Thời hạn:</span>
                    <strong>{finalDecision.termMonths} tháng</strong>
                  </div>
                </>
              )}
              {finalDecision.reason && (
                <div className="detail-item">
                  <span>Lý do:</span>
                  <strong>{finalDecision.reason}</strong>
                </div>
              )}
              <div className="detail-item">
                <span>Thời gian thẩm định:</span>
                <strong>{finalDecision.reviewedAt}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        {step > 1 && step < 5 && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setStep(step - 1)}
          >
            Quay lại
          </button>
        )}

        {step === 1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setStep(2)}
            style={{ flex: 1 }}
          >
            Bắt đầu thẩm định
          </button>
        )}

        {step === 2 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => loanData.collateralType ? setStep(3) : setStep(4)}
            style={{ flex: 1 }}
          >
            {loanData.collateralType ? 'Thẩm định tài sản' : 'Quyết định'}
          </button>
        )}

        {step === 3 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setStep(4)}
            style={{ flex: 1 }}
          >
            Đưa ra quyết định
          </button>
        )}

        {step === 5 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleComplete}
            style={{ flex: 1 }}
          >
            Hoàn thành
          </button>
        )}
      </div>

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

        .loan-summary {
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

        .ltv-result {
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .ltv-result.valid {
          background: #d1fae5;
          border: 1px solid #10b981;
        }

        .ltv-result.invalid {
          background: #fee2e2;
          border: 1px solid #ef4444;
        }

        .ltv-formula {
          font-family: monospace;
          margin-bottom: 0.5rem;
        }

        .ltv-status {
          font-weight: 600;
          text-align: center;
        }

        .status-valid {
          color: #065f46;
        }

        .status-invalid {
          color: #991b1b;
        }

        .decision-form {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .final-decision {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .decision-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .decision-status {
          font-size: 1.5rem;
          font-weight: 700;
          padding: 1rem 2rem;
          border-radius: 12px;
        }

        .decision-status.approved {
          background: #d1fae5;
          color: #065f46;
        }

        .decision-status.rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .decision-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }
      `}</style>
    </Modal>
  );
};

export default LoanApprovalModal;

