import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Filter, TrendingUp, TrendingDown, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { getCustomerTransactions, formatCurrency, formatDateTime, currentUser } from '../../data/mockData';

const Transactions = () => {
  const [filterType, setFilterType] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  
  // Lấy transactions của customer hiện tại
  const customerId = currentUser.id || 1;
  const allTransactions = getCustomerTransactions(customerId);
  
  // Filter transactions
  const transactions = filterType === 'all' 
    ? allTransactions 
    : allTransactions.filter(txn => {
        const isIncome = txn.to_account_id && !txn.from_account_id;
        return filterType === 'income' ? isIncome : !isIncome;
      });
  
  // Calculate statistics
  const totalIncome = allTransactions
    .filter(txn => txn.to_account_id && !txn.from_account_id)
    .reduce((sum, txn) => sum + txn.amount, 0);
    
  const totalExpense = allTransactions
    .filter(txn => txn.from_account_id && !txn.to_account_id)
    .reduce((sum, txn) => sum + txn.amount, 0);
  
  return (
    <div className="fade-in">
      <style>{`
        .transaction-card {
          padding: 1.25rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 0.75rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .transaction-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #c7d2fe;
        }
        
        .transaction-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .income-icon {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          color: #059669;
        }
        
        .expense-icon {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #dc2626;
        }
        
        .stat-card {
          padding: 1.5rem;
          border-radius: 16px;
          border: none;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          opacity: 0.1;
          border-radius: 50%;
        }
        
        .filter-btn {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          background: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }
        
        .filter-btn:not(.active):hover {
          border-color: #c7d2fe;
          background: #f9fafb;
        }
      `}</style>

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-1">Lịch sử giao dịch</h2>
        <p className="text-sm text-secondary">Theo dõi toàn bộ giao dịch của bạn</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-3 mb-4">
        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}>
              <Calendar size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
              Tổng giao dịch
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700' }}>
              {allTransactions.length}
            </div>
          </div>
        </div>

        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}>
              <TrendingUp size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
              Tổng tiền vào
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {formatCurrency(totalIncome)}
            </div>
          </div>
        </div>

        <div className="stat-card" style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}>
              <TrendingDown size={20} />
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
              Tổng tiền ra
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              {formatCurrency(totalExpense)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Filter size={18} color="#6b7280" />
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Lọc theo:</span>
          
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Tất cả ({allTransactions.length})
          </button>
          
          <button 
            className={`filter-btn ${filterType === 'income' ? 'active' : ''}`}
            onClick={() => setFilterType('income')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowDownRight size={16} style={{ color: filterType === 'income' ? 'white' : '#059669' }} />
              Tiền vào
            </span>
          </button>
          
          <button 
            className={`filter-btn ${filterType === 'expense' ? 'active' : ''}`}
            onClick={() => setFilterType('expense')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ArrowUpRight size={16} style={{ color: filterType === 'expense' ? 'white' : '#dc2626' }} />
              Tiền ra
            </span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem 1rem' }}>
          <DollarSign size={64} style={{ margin: '0 auto', color: '#9ca3af' }} />
          <h3 style={{ color: '#6b7280', marginTop: '1rem' }}>Không có giao dịch</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Chưa có giao dịch nào trong bộ lọc này
          </p>
        </div>
      ) : (
        <div>
          {transactions.map((txn) => {
            const isIncome = txn.to_account_id && !txn.from_account_id;
            const amount = isIncome ? txn.amount : -txn.amount;
            
            return (
              <div key={txn.transaction_id} className="transaction-card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {/* Icon */}
                  <div className={`transaction-icon-box ${isIncome ? 'income-icon' : 'expense-icon'}`}>
                    {isIncome ? (
                      <ArrowDownRight size={24} />
                    ) : (
                      <ArrowUpRight size={24} />
                    )}
                  </div>

                  {/* Transaction Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#1f2937',
                          marginBottom: '0.25rem'
                        }}>
                          {txn.typeName}
                        </h4>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          {txn.description}
                        </p>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#9ca3af',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem'
                        }}>
                          <Calendar size={12} />
                          {formatDateTime(txn.transaction_date)}
                        </div>
                      </div>

                      {/* Amount */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: '700',
                          color: isIncome ? '#059669' : '#dc2626',
                          marginBottom: '0.25rem'
                        }}>
                          {isIncome ? '+' : ''}{formatCurrency(Math.abs(amount))}
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#6b7280'
                        }}>
                          Số dư: {formatCurrency(txn.balance_after)}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem'
                      }}>
                        <span style={{ 
                          padding: '0.25rem 0.5rem',
                          background: '#f3f4f6',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}>
                          {txn.transaction_code}
                        </span>
                        {txn.fee > 0 && (
                          <span style={{ color: '#ef4444' }}>
                            • Phí: {formatCurrency(txn.fee)}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        {txn.status === 'SUCCESS' ? (
                          <>
                            <CheckCircle size={14} color="#059669" />
                            <span style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: '600',
                              color: '#059669'
                            }}>
                              Thành công
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle size={14} color="#dc2626" />
                            <span style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: '600',
                              color: '#dc2626'
                            }}>
                              Thất bại
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transactions;
