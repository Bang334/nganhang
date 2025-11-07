import { User, FileText, Home, TrendingUp, Calendar, Phone, Mail, MapPin, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Modal from '../common/Modal';
import { formatCurrency, formatDate, formatDateTime } from '../../data/mockData';

const LoanDetailModal = ({ isOpen, onClose, loanData }) => {
  if (!loanData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chi tiết hồ sơ ${loanData.loanNumber}`} size="lg">
      <div className="loan-detail">
        
        {/* Customer Information */}
        <div className="detail-section">
          <h4 className="section-title">
            <User size={20} />
            Thông tin khách hàng
          </h4>
          <div className="info-grid">
            <div className="info-item">
              <label>Họ tên</label>
              <div className="value">{loanData.customerName}</div>
            </div>
            <div className="info-item">
              <label>Mã khách hàng</label>
              <div className="value">{loanData.customerCode}</div>
            </div>
            <div className="info-item">
              <label>Số điện thoại</label>
              <div className="value">
                <Phone size={14} className="inline mr-1" />
                {loanData.customerPhone}
              </div>
            </div>
            <div className="info-item">
              <label>Email</label>
              <div className="value">
                <Mail size={14} className="inline mr-1" />
                {loanData.customerEmail}
              </div>
            </div>
            <div className="info-item">
              <label>Địa chỉ</label>
              <div className="value">
                <MapPin size={14} className="inline mr-1" />
                {loanData.customerAddress}
              </div>
            </div>
            <div className="info-item">
              <label>Nghề nghiệp</label>
              <div className="value">{loanData.customerOccupation}</div>
            </div>
            <div className="info-item">
              <label>Thu nhập/tháng</label>
              <div className="value text-success font-semibold">
                {formatCurrency(loanData.customerMonthlyIncome)}
              </div>
            </div>
            <div className="info-item">
              <label>Tỷ lệ nợ/thu nhập</label>
              <div className="value">
                <span className={loanData.debtRatio > 50 ? 'text-danger' : 'text-success'}>
                  {loanData.debtRatio}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Score */}
        <div className="detail-section">
          <h4 className="section-title">
            <TrendingUp size={20} />
            Điểm tín dụng & Xếp hạng
          </h4>
          <div className="credit-score-box">
            <div className="score-display">
              <div className="score-label">Điểm tín dụng</div>
              <div className="score-value">{loanData.creditScore}</div>
              <div className="score-grade">Hạng {loanData.creditGrade}</div>
            </div>
            <div className="score-details">
              <div className="score-item">
                <span>Lãi suất đề xuất:</span>
                <strong className="text-primary">{estimatedInterestRate}% /năm</strong>
              </div>
              <div className="score-item">
                <span>Trả hàng tháng dự kiến:</span>
                <strong>{formatCurrency(estimatedMonthlyPayment)}</strong>
              </div>
              <div className="score-item">
                <span>Tình trạng việc làm:</span>
                <strong className={loanData.employmentStatus === 'STABLE' ? 'text-success' : 'text-danger'}>
                  {loanData.employmentStatus === 'STABLE' ? 'Ổn định' : 'Không ổn định'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Information */}
        <div className="detail-section">
          <h4 className="section-title">
            <FileText size={20} />
            Thông tin khoản vay
          </h4>
          <div className="info-grid">
            <div className="info-item">
              <label>Loại hình vay</label>
              <div className="value font-semibold">{loanData.loanType}</div>
            </div>
            <div className="info-item">
              <label>Số tiền yêu cầu</label>
              <div className="value text-primary font-bold text-lg">
                {formatCurrency(loanData.loanAmount)}
              </div>
            </div>
            <div className="info-item">
              <label>Thời hạn vay</label>
              <div className="value">{loanData.termMonths} tháng ({Math.floor(loanData.termMonths / 12)} năm)</div>
            </div>
            <div className="info-item">
              <label>Mục đích vay</label>
              <div className="value">{loanData.purpose}</div>
            </div>
            <div className="info-item">
              <label>Ngày nộp hồ sơ</label>
              <div className="value">
                <Calendar size={14} className="inline mr-1" />
                {formatDateTime(loanData.submissionDate)}
              </div>
            </div>
            <div className="info-item">
              <label>Trạng thái</label>
              <span className={`badge badge-${loanData.status === 'PENDING' ? 'warning' : 'info'}`}>
                {loanData.status === 'PENDING' ? 'Chờ duyệt' : loanData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Collateral Information */}
        {loanData.collateralType && (
          <div className="detail-section">
            <h4 className="section-title">
              <Home size={20} />
              Thông tin tài sản thế chấp
            </h4>
            <div className="collateral-box">
              <div className="collateral-header">
                <div className="collateral-type">
                  {loanData.collateralType}
                </div>
                <div className="collateral-name">
                  {loanData.collateralName}
                </div>
              </div>

              <div className="info-grid mt-3">
                <div className="info-item">
                  <label>Địa chỉ/Vị trí</label>
                  <div className="value">{loanData.collateralAddress}</div>
                </div>
                <div className="info-item">
                  <label>Số giấy chứng nhận</label>
                  <div className="value font-mono">{loanData.collateralCertificate}</div>
                </div>
                <div className="info-item">
                  <label>Giá trị ước tính</label>
                  <div className="value">{formatCurrency(loanData.collateralValue)}</div>
                </div>
                <div className="info-item">
                  <label>Giá trị thẩm định</label>
                  <div className="value text-primary font-bold">
                    {formatCurrency(loanData.appraisedValue)}
                  </div>
                </div>
                <div className="info-item">
                  <label>Đơn vị thẩm định</label>
                  <div className="value">{loanData.appraisedBy}</div>
                </div>
                <div className="info-item">
                  <label>Ngày thẩm định</label>
                  <div className="value">{formatDate(loanData.appraisedDate)}</div>
                </div>
              </div>

              {/* LTV Calculation */}
              <div className={`ltv-display ${loanData.ltvRatio > 70 ? 'danger' : 'success'}`}>
                <div className="ltv-header">
                  📊 Loan-to-Value (LTV) Ratio
                </div>
                <div className="ltv-formula">
                  <div>LTV = (Số tiền vay / Giá trị thẩm định) × 100%</div>
                  <div className="formula-calc">
                    = ({formatCurrency(loanData.loanAmount)} / {formatCurrency(loanData.appraisedValue)}) × 100%
                  </div>
                  <div className="ltv-result">
                    = <span className={loanData.ltvRatio > 70 ? 'text-danger' : 'text-success'}>
                      {loanData.ltvRatio}%
                    </span>
                  </div>
                </div>
                <div className="ltv-status">
                  {loanData.ltvRatio <= 70 ? (
                    <div className="status-valid">
                      <CheckCircle size={18} />
                      LTV hợp lệ ({loanData.ltvRatio}% ≤ 70%)
                    </div>
                  ) : (
                    <div className="status-invalid">
                      <XCircle size={18} />
                      LTV vượt quá ({loanData.ltvRatio}% &gt; 70%)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        {loanData.documents && loanData.documents.length > 0 && (
          <div className="detail-section">
            <h4 className="section-title">
        <div className="detail-section">
          <h4 className="section-title">
            <FileText size={20} />
            Hồ sơ đính kèm
          </h4>
          <div className="documents-list">
            {loanData.documents.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="doc-name">
                  {doc.status === 'VERIFIED' && <CheckCircle size={16} className="text-success" />}
                  {doc.status === 'PENDING' && <AlertCircle size={16} className="text-warning" />}
                  {doc.status === 'COMPLETED' && <CheckCircle size={16} className="text-primary" />}
                  <span>{doc.name}</span>
                </div>
                <span className={`badge badge-${doc.status === 'VERIFIED' || doc.status === 'COMPLETED' ? 'success' : 'warning'}`}>
                  {doc.status === 'VERIFIED' ? 'Đã xác thực' : doc.status === 'COMPLETED' ? 'Hoàn thành' : 'Chưa có'}
                </span>
              </div>
            ))}
          </div>
        </div>oanData.notes && (
          <div className="detail-section">
            <h4 className="section-title">Ghi chú</h4>
            <div className="notes-box">
              {loanData.notes}
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .loan-detail {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .detail-section {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .info-item label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }

        .info-item .value {
          font-weight: 500;
          color: var(--text-primary);
        }

        .credit-score-box {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          gap: 2rem;
        }

        .score-display {
          text-align: center;
          padding: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          border-radius: 12px;
          min-width: 150px;
        }

        .score-label {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .score-value {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .score-grade {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .score-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
        }

        .score-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .collateral-box {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .collateral-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .collateral-type {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.25rem;
        }

        .collateral-name {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .ltv-display {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 12px;
          border: 2px solid;
        }

        .ltv-display.success {
          background: #d1fae5;
          border-color: #10b981;
        }

        .ltv-display.danger {
          background: #fee2e2;
          border-color: #ef4444;
        }

        .ltv-header {
          font-weight: 700;
          font-size: 1.125rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .ltv-formula {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          font-family: monospace;
          margin-bottom: 1rem;
        }

        .formula-calc {
          margin: 0.5rem 0;
          padding-left: 1rem;
          font-size: 0.875rem;
        }

        .ltv-result {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .ltv-status {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
        }

        .status-valid {
          color: #065f46;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .status-invalid {
          color: #991b1b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .documents-list {
          background: white;
          border-radius: 8px;
          padding: 1rem;
        }

        .document-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .document-item:last-child {
          border-bottom: none;
        }

        .doc-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .notes-box {
          background: white;
          border-left: 4px solid var(--primary-color);
          padding: 1rem;
          border-radius: 8px;
          font-style: italic;
          color: var(--text-secondary);
        }

        .font-mono {
          font-family: 'Courier New', monospace;
        }

        .inline {
          display: inline;
        }

        .mr-1 {
          margin-right: 0.25rem;
        }
      `}</style>
    </Modal>
  );
};

export default LoanDetailModal;

