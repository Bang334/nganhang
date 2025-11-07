import { TrendingUp, TrendingDown, AlertCircle, Award, Calendar, DollarSign, Clock } from 'lucide-react';
import { currentUser, getCreditScoreData, formatCurrency } from '../../data/mockData';
import '../../styles/TellerDashboard.css';

const CreditScore = () => {
  const customerId = currentUser.id || 1;
  const creditData = getCreditScoreData(customerId);

  const getScoreColor = (score) => {
    if (score >= 800) return '#10b981'; // Green
    if (score >= 700) return '#3b82f6'; // Blue
    if (score >= 600) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('AAA') || grade.startsWith('AA')) return '#10b981';
    if (grade.startsWith('A') || grade.startsWith('BBB')) return '#3b82f6';
    if (grade.startsWith('BB') || grade.startsWith('B')) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreDescription = (score) => {
    if (score >= 800) return 'Xuất sắc - Đủ điều kiện vay tín chấp với lãi suất thấp nhất';
    if (score >= 700) return 'Tốt - Đủ điều kiện vay tín chấp';
    if (score >= 600) return 'Trung bình - Cần thế chấp để vay với lãi suất tốt';
    if (score >= 500) return 'Khá yếu - Cần cải thiện lịch sử tín dụng';
    return 'Yếu - Khó vay được, cần cải thiện nhiều';
  };

  const factors = [
    {
      icon: <Clock size={20} />,
      title: 'Lịch sử thanh toán',
      description: 'Tỷ lệ trả nợ đúng hạn',
      value: `${creditData.onTimePaymentRate}%`,
      impact: creditData.onTimePaymentRate >= 95 ? 'positive' : creditData.onTimePaymentRate >= 80 ? 'neutral' : 'negative',
      weight: '35%',
    },
    {
      icon: <DollarSign size={20} />,
      title: 'Tỷ lệ nợ/Thu nhập',
      description: 'Khả năng trả nợ',
      value: `${creditData.debtToIncomeRatio}%`,
      impact: creditData.debtToIncomeRatio <= 30 ? 'positive' : creditData.debtToIncomeRatio <= 50 ? 'neutral' : 'negative',
      weight: '30%',
    },
    {
      icon: <Calendar size={20} />,
      title: 'Thời gian sử dụng',
      description: 'Lịch sử với ngân hàng',
      value: `${creditData.accountAgeMonths} tháng`,
      impact: creditData.accountAgeMonths >= 24 ? 'positive' : creditData.accountAgeMonths >= 12 ? 'neutral' : 'negative',
      weight: '15%',
    },
    {
      icon: <TrendingUp size={20} />,
      title: 'Tổng dư nợ hiện tại',
      description: 'Số tiền đang vay',
      value: formatCurrency(creditData.totalOutstandingDebt),
      impact: creditData.totalOutstandingDebt === 0 ? 'positive' : creditData.totalOutstandingDebt <= 100000000 ? 'neutral' : 'negative',
      weight: '10%',
    },
    {
      icon: <AlertCircle size={20} />,
      title: 'Số kỳ quá hạn',
      description: 'Trong 12 tháng qua',
      value: `${creditData.latePayments} lần`,
      impact: creditData.latePayments === 0 ? 'positive' : creditData.latePayments <= 2 ? 'neutral' : 'negative',
      weight: '10%',
    },
  ];

  const scoreChange = creditData.scoreChange || 0;
  const isScoreUp = scoreChange >= 0;

  return (
    <div className="fade-in">
      {/* Credit Score Overview */}
      <div className="card mb-4" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
              Điểm tín dụng của bạn
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1, marginBottom: '0.5rem' }}>
              {creditData.creditScore}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '1rem',
                fontWeight: '600',
              }}>
                Hạng {creditData.creditGrade}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
                {isScoreUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {isScoreUp ? '+' : ''}{scoreChange} điểm (30 ngày qua)
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              {getScoreDescription(creditData.creditScore)}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            minWidth: '200px',
          }}>
            <Award size={48} style={{ margin: '0 auto 0.75rem' }} />
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
              Lãi suất vay áp dụng
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {creditData.interestRate}%
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem' }}>
              /năm (có thế chấp)
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.9 }}>
            <span>300 (Thấp nhất)</span>
            <span>850 (Cao nhất)</span>
          </div>
          <div style={{
            height: '12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '6px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${((creditData.creditScore - 300) / (850 - 300)) * 100}%`,
              background: 'white',
              borderRadius: '6px',
              transition: 'width 1s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Factors Affecting Score */}
      <div className="card mb-4">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          Các yếu tố ảnh hưởng điểm tín dụng
        </h3>

        <div style={{ display: 'grid', gap: '1rem' }}>
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
                width: '48px',
                height: '48px',
                borderRadius: '12px',
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
                  <span style={{ fontWeight: 600, fontSize: '0.938rem' }}>{factor.title}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    background: '#f3f4f6',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '4px',
                  }}>
                    Tỷ trọng {factor.weight}
                  </span>
                </div>
                <div style={{ fontSize: '0.813rem', color: '#6b7280' }}>
                  {factor.description}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: factor.impact === 'positive' ? '#10b981' :
                         factor.impact === 'negative' ? '#ef4444' : '#f59e0b',
                }}>
                  {factor.value}
                </div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {factor.impact === 'positive' ? '✅ Tốt' :
                   factor.impact === 'negative' ? '❌ Cần cải thiện' : '⚠️ Trung bình'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips to Improve */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
          💡 Cách cải thiện điểm tín dụng
        </h3>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {creditData.creditScore < 700 && (
            <div className="alert alert-info">
              <strong>📋 Để đủ điều kiện vay tín chấp (không thế chấp)</strong>
              <div style={{ fontSize: '0.813rem', marginTop: '0.5rem' }}>
                Bạn cần đạt điểm tín dụng tối thiểu <strong>700 điểm (Hạng AA)</strong> cùng với:
                <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', marginBottom: 0 }}>
                  <li>Thu nhập ≥ 15 triệu/tháng</li>
                  <li>Lịch sử tín dụng tốt (không nợ xấu)</li>
                  <li>Tỷ lệ nợ/thu nhập ≤ 40%</li>
                </ul>
              </div>
            </div>
          )}

          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <strong style={{ fontSize: '0.938rem' }}>✅ Trả nợ đúng hạn</strong>
            <p style={{ fontSize: '0.813rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
              Đây là yếu tố quan trọng nhất (35%). Luôn thanh toán khoản vay trước hoặc đúng ngày đáo hạn.
            </p>
          </div>

          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <strong style={{ fontSize: '0.938rem' }}>💰 Giảm tỷ lệ nợ</strong>
            <p style={{ fontSize: '0.813rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
              Cố gắng giữ tỷ lệ nợ/thu nhập dưới 30% để có điểm cao hơn.
            </p>
          </div>

          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <strong style={{ fontSize: '0.938rem' }}>⏰ Duy trì tài khoản lâu dài</strong>
            <p style={{ fontSize: '0.813rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
              Thời gian sử dụng dịch vụ càng lâu, điểm tín dụng càng cao.
            </p>
          </div>

          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <strong style={{ fontSize: '0.938rem' }}>🔄 Trả trước khoản vay</strong>
            <p style={{ fontSize: '0.813rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
              Trả trước nhiều kỳ hoặc trả hết nợ sớm giúp giảm dư nợ và cải thiện điểm.
            </p>
          </div>
        </div>
      </div>

      {/* History Chart (placeholder) */}
      {creditData.scoreHistory && creditData.scoreHistory.length > 0 && (
        <div className="card mt-4">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            📊 Lịch sử điểm tín dụng (6 tháng gần nhất)
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '200px', padding: '1rem 0' }}>
            {creditData.scoreHistory.map((item, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280' }}>
                  {item.score}
                </div>
                <div style={{
                  width: '100%',
                  height: `${(item.score / 850) * 150}px`,
                  background: getScoreColor(item.score),
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.5s ease',
                }} />
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  {item.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .alert {
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid;
        }
        
        .alert-info {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1e40af;
        }
      `}</style>
    </div>
  );
};

export default CreditScore;
