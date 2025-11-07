import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info, Award, Calendar } from 'lucide-react';
import { formatDate, currentUser } from '../../data/mockData';

const CreditScore = () => {
  // Mock credit data - trong thực tế sẽ fetch từ database
  const creditData = {
    score: 720,
    grade: 'AA',
    lastUpdated: '2024-01-15',
    trend: 'up', // up, down, stable
    previousScore: 680,
    factors: [
      {
        name: 'Lịch sử thanh toán',
        weight: 35,
        score: 85,
        status: 'good',
        description: 'Thanh toán đúng hạn, không có nợ quá hạn'
      },
      {
        name: 'Tỷ lệ nợ/thu nhập',
        weight: 30,
        score: 75,
        status: 'good',
        description: 'Tỷ lệ nợ 25% - trong giới hạn tốt'
      },
      {
        name: 'Thời gian có tín dụng',
        weight: 15,
        score: 60,
        status: 'average',
        description: '3 năm - trung bình'
      },
      {
        name: 'Loại tín dụng sử dụng',
        weight: 10,
        score: 70,
        status: 'good',
        description: 'Đa dạng: Thẻ tín dụng, vay mua nhà'
      },
      {
        name: 'Tín dụng mới',
        weight: 10,
        score: 80,
        status: 'good',
        description: 'Không có nhiều khoản vay mới'
      }
    ],
    history: [
      { date: '2024-01-15', score: 720, grade: 'AA', event: 'Trả nợ đúng hạn' },
      { date: '2023-12-15', score: 710, grade: 'AA', event: 'Đánh giá định kỳ' },
      { date: '2023-11-15', score: 700, grade: 'AA', event: 'Thanh toán khoản vay' },
      { date: '2023-10-15', score: 690, grade: 'A', event: 'Trả nợ đúng hạn' },
      { date: '2023-09-15', score: 680, grade: 'A', event: 'Đăng ký khoản vay mới' }
    ],
    recommendations: [
      {
        title: 'Tiếp tục thanh toán đúng hạn',
        description: 'Bạn đang làm rất tốt! Hãy duy trì việc thanh toán đúng hạn để cải thiện điểm.',
        impact: 'high',
        icon: CheckCircle
      },
      {
        title: 'Giảm tỷ lệ nợ xuống dưới 20%',
        description: 'Tỷ lệ nợ hiện tại 25%. Giảm xuống < 20% sẽ cải thiện đáng kể điểm tín dụng.',
        impact: 'medium',
        icon: TrendingUp
      },
      {
        title: 'Tránh mở nhiều khoản vay mới',
        description: 'Mỗi khoản vay mới có thể giảm điểm tạm thời. Chỉ vay khi thực sự cần thiết.',
        impact: 'low',
        icon: AlertCircle
      }
    ]
  };

  const getGradeColor = (grade) => {
    const colors = {
      'AAA': '#10b981', 'AA': '#10b981', 'A': '#3b82f6',
      'BBB': '#f59e0b', 'BB': '#f59e0b', 'B': '#f97316',
      'CCC': '#ef4444', 'CC': '#ef4444', 'C': '#dc2626'
    };
    return colors[grade] || '#6b7280';
  };

  const getScoreLabel = (score) => {
    if (score >= 800) return 'Xuất sắc';
    if (score >= 700) return 'Tốt';
    if (score >= 600) return 'Trung bình';
    if (score >= 500) return 'Khá';
    return 'Kém';
  };

  const getStatusColor = (status) => {
    const colors = {
      'good': '#10b981',
      'average': '#f59e0b',
      'poor': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getImpactBadge = (impact) => {
    const badges = {
      'high': { color: '#dc2626', label: 'Quan trọng' },
      'medium': { color: '#f59e0b', label: 'Trung bình' },
      'low': { color: '#3b82f6', label: 'Thấp' }
    };
    return badges[impact];
  };

  return (
    <div className="fade-in">
      {/* Credit Score Overview */}
      <div className="card mb-4">
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px 12px 0 0'
        }}>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontSize: '1rem', opacity: 0.9, marginBottom: '1rem'}}>Điểm Tín Dụng Của Bạn</h2>
            <div style={{fontSize: '4rem', fontWeight: 700, marginBottom: '0.5rem'}}>
              {creditData.score}
            </div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '1.25rem',
              fontWeight: 600
            }}>
              Hạng {creditData.grade} - {getScoreLabel(creditData.score)}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              fontSize: '0.875rem',
              opacity: 0.9
            }}>
              {creditData.trend === 'up' ? (
                <>
                  <TrendingUp size={16} />
                  <span>Tăng {creditData.score - creditData.previousScore} điểm từ lần trước</span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} />
                  <span>Giảm {creditData.previousScore - creditData.score} điểm từ lần trước</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
              Cập nhật lần cuối: {formatDate(creditData.lastUpdated)}
            </div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
              Thang điểm: 300 - 850
            </div>
          </div>

          {/* Score Range Indicator */}
          <div style={{marginTop: '1.5rem'}}>
            <div style={{
              height: '12px',
              background: 'linear-gradient(90deg, #dc2626 0%, #f97316 20%, #f59e0b 40%, #3b82f6 60%, #10b981 80%, #059669 100%)',
              borderRadius: '6px',
              position: 'relative',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                position: 'absolute',
                left: `${((creditData.score - 300) / 550) * 100}%`,
                top: '-8px',
                width: '28px',
                height: '28px',
                background: 'white',
                border: '3px solid ' + getGradeColor(creditData.grade),
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }} />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af'}}>
              <span>300 (Kém)</span>
              <span>850 (Xuất sắc)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Factors Affecting Score */}
      <div className="card mb-4">
        <div className="card-header">
          <h3>Các yếu tố ảnh hưởng</h3>
        </div>
        <div className="card-body" style={{padding: '1.5rem'}}>
          {creditData.factors.map((factor, index) => (
            <div key={index} style={{marginBottom: index < creditData.factors.length - 1 ? '1.5rem' : 0}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div>
                  <span style={{fontWeight: 600}}>{factor.name}</span>
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    background: '#f3f4f6',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '10px'
                  }}>
                    {factor.weight}% ảnh hưởng
                  </span>
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: getStatusColor(factor.status)
                }}>
                  {factor.score}/100
                </div>
              </div>
              <div style={{
                height: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  width: `${factor.score}%`,
                  height: '100%',
                  background: getStatusColor(factor.status),
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{fontSize: '0.813rem', color: '#6b7280'}}>
                {factor.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
        {/* Recommendations */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Award size={20} />
              Gợi ý cải thiện
            </h3>
          </div>
          <div className="card-body">
            {creditData.recommendations.map((rec, index) => {
              const Icon = rec.icon;
              const impactBadge = getImpactBadge(rec.impact);
              return (
                <div key={index} style={{
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  marginBottom: index < creditData.recommendations.length - 1 ? '1rem' : 0
                }}>
                  <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start'}}>
                    <Icon size={20} color={impactBadge.color} style={{flexShrink: 0, marginTop: '0.125rem'}} />
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                        <span style={{fontWeight: 600}}>{rec.title}</span>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '10px',
                          background: impactBadge.color + '20',
                          color: impactBadge.color,
                          fontWeight: 600
                        }}>
                          {impactBadge.label}
                        </span>
                      </div>
                      <div style={{fontSize: '0.813rem', color: '#6b7280', lineHeight: 1.5}}>
                        {rec.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credit History */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Calendar size={20} />
              Lịch sử thay đổi
            </h3>
          </div>
          <div className="card-body">
            {creditData.history.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: index < creditData.history.length - 1 ? '1.25rem' : 0,
                paddingBottom: index < creditData.history.length - 1 ? '1.25rem' : 0,
                borderBottom: index < creditData.history.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}>
                <div style={{flexShrink: 0, textAlign: 'center'}}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: getGradeColor(item.grade) + '20',
                    color: getGradeColor(item.grade),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem'
                  }}>
                    {item.score}
                  </div>
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                    <span style={{fontWeight: 600}}>Hạng {item.grade}</span>
                    <span style={{fontSize: '0.813rem', color: '#6b7280'}}>
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <div style={{fontSize: '0.813rem', color: '#6b7280'}}>
                    {item.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#dbeafe',
        border: '1px solid #93c5fd',
        borderRadius: '8px',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <Info size={20} color="#3b82f6" style={{flexShrink: 0}} />
        <div style={{fontSize: '0.875rem', color: '#1e40af'}}>
          <strong>Lưu ý:</strong> Điểm tín dụng được cập nhật tự động sau mỗi lần thanh toán hoặc khi có thay đổi về nợ vay. 
          Điểm tín dụng cao sẽ giúp bạn được phê duyệt vay dễ dàng hơn với lãi suất thấp hơn.
        </div>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .card-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .card-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-body {
          padding: 1.5rem;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default CreditScore;

