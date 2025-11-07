import { TrendingUp, TrendingDown, Clock, DollarSign, Calendar, AlertCircle, Award } from 'lucide-react';
import Modal from '../common/Modal';
import { formatCurrency } from '../../data/mockData';

const CreditScoreDetailModal = ({ isOpen, onClose, customer }) => {
  if (!customer) return null;

  const getScoreColor = (score) => {
    if (score >= 800) return '#10b981';
    if (score >= 700) return '#3b82f6';
    if (score >= 600) return '#f59e0b';
    return '#ef4444';
  };

  const factors = [
    {
      icon: <Clock size={20} />,
      title: 'Lịch sử thanh toán',
      value: `${customer.onTimePaymentRate}%`,
      impact: customer.onTimePaymentRate >= 95 ? 'positive' : customer.onTimePaymentRate >= 80 ? 'neutral' : 'negative',
      weight: '35%',
    },
    {
      icon: <DollarSign size={20} />,
      title: 'Tỷ lệ nợ/Thu nhập',
      value: `${customer.debtToIncomeRatio}%`,
      impact: customer.debtToIncomeRatio <= 30 ? 'positive' : customer.debtToIncomeRatio <= 50 ? 'neutral' : 'negative',
      weight: '30%',
    },
    {
      icon: <Calendar size={20} />,
      title: 'Thời gian sử dụng',
      value: `${customer.accountAgeMonths} tháng`,
      impact: customer.accountAgeMonths >= 24 ? 'positive' : customer.accountAgeMonths >= 12 ? 'neutral' : 'negative',
      weight: '15%',
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Tổng dư nợ',
      value: formatCurrency(customer.totalOutstandingDebt),
      impact: customer.totalOutstandingDebt === 0 ? 'positive' : customer.totalOutstandingDebt <= 100000000 ? 'neutral' : 'negative',
      weight: '10%',
    },
    {
      icon: <AlertCircle size={20} />,
      title: 'Số kỳ quá hạn (12 tháng)',
      value: `${customer.latePayments} lần`,
      impact: customer.latePayments === 0 ? 'positive' : customer.latePayments <= 2 ? 'neutral' : 'negative',
      weight: '10%',
    },
  ];

  const scoreChange = customer.scoreChange || 0;
  const isScoreUp = scoreChange >= 0;

  // Check eligibility for unsecured loans
  const isEligibleForUnsecured = customer.creditScore >= 700 && 
                                  customer.debtToIncomeRatio <= 40 &&
                                  customer.onTimePaymentRate >= 95 &&
                                  customer.latePayments === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết điểm tín dụng" size="lg">
      {/* Customer Info */}
      <div style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {customer.customerName}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              Mã KH: {customer.customerCode}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
              Điểm tín dụng
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>
              {customer.creditScore}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '16px',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}>
                Hạng {customer.creditGrade}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.813rem' }}>
                {isScoreUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isScoreUp ? '+' : ''}{scoreChange}
              </span>
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.9 }}>
            <span>300</span>
            <span>850</span>
          </div>
          <div style={{
            height: '10px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${((customer.creditScore - 300) / (850 - 300)) * 100}%`,
              height: '100%',
              background: 'white',
              borderRadius: '5px',
            }} />
          </div>
        </div>
      </div>

      {/* Eligibility Status */}
      <div className={`alert ${isEligibleForUnsecured ? 'alert-success' : 'alert-warning'}`} style={{ marginBottom: '1.5rem' }}>
        <Award size={20} />
        <div>
          <strong>
            {isEligibleForUnsecured ? '✅ Đủ điều kiện vay tín chấp (không thế chấp)' : '⚠️ Chưa đủ điều kiện vay tín chấp'}
          </strong>
          <div style={{ fontSize: '0.813rem', marginTop: '0.5rem' }}>
            {isEligibleForUnsecured ? (
              <>
                Khách hàng đủ điều kiện vay không thế chấp với số tiền tối đa <strong>200 triệu VND</strong>.
                <br/>Lãi suất áp dụng: <strong>{customer.interestRate}%/năm</strong> (cao hơn vay có thế chấp).
              </>
            ) : (
              <>
                Yêu cầu: Credit Score ≥ 700, Tỷ lệ nợ ≤ 40%, Không quá hạn, Lịch sử tốt.
                <br/>Khách hàng có thể vay <strong>có thế chấp</strong> với lãi suất tốt hơn.
              </>
            )}
          </div>
        </div>
      </div>

      {/* Factors */}
      <h4 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
        Các yếu tố ảnh hưởng
      </h4>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
        {factors.map((factor, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: factor.impact === 'positive' ? '#d1fae5' :
                         factor.impact === 'negative' ? '#fee2e2' : '#fef3c7',
              color: factor.impact === 'positive' ? '#10b981' :
                     factor.impact === 'negative' ? '#ef4444' : '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {factor.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{factor.title}</span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                }}>
                  {factor.weight}
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: factor.impact === 'positive' ? '#10b981' :
                       factor.impact === 'negative' ? '#ef4444' : '#f59e0b',
              }}>
                {factor.value}
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {factor.impact === 'positive' ? '✅ Tốt' :
                 factor.impact === 'negative' ? '❌ Yếu' : '⚠️ TB'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loan Details */}
      <h4 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
        Thông tin khoản vay
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        padding: '1rem',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      }}>
        <div>
          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Lãi suất hiện tại
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#667eea' }}>
            {customer.interestRate}%/năm
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Dư nợ hiện tại
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {customer.totalOutstandingDebt > 0 ? formatCurrency(customer.totalOutstandingDebt) : 'Không có'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Số khoản vay đang có
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {customer.activeLoans || 0} khoản
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.25rem' }}>
            Thu nhập hàng tháng
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {customer.monthlyIncome ? formatCurrency(customer.monthlyIncome) : 'Chưa cập nhật'}
          </div>
        </div>
      </div>

      <style jsx>{`
        .alert {
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        
        .alert-success {
          background: #d1fae5;
          border-color: #10b981;
          color: #065f46;
        }
        
        .alert-warning {
          background: #fef3c7;
          border-color: #f59e0b;
          color: #78350f;
        }
      `}</style>
    </Modal>
  );
};

export default CreditScoreDetailModal;

