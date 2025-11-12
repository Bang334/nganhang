// Mock Data cho Hệ Thống Ngân Hàng
// Cấu trúc theo schema_recommended.sql

// ============================================
// 1. QUẢN LÝ TỔ CHỨC
// ============================================

// Vai trò
export const roles = [
  { role_id: 1, role_name: 'ADMIN', description: 'Quản trị hệ thống' },
  { role_id: 2, role_name: 'TELLER', description: 'Giao dịch viên' },
  { role_id: 3, role_name: 'LOAN_OFFICER', description: 'Cán bộ tín dụng' },
];

// Helper: get account details (including owner) by account number
export const getAccountDetailsByNumber = (accountNumber) => {
  if (!accountNumber) return null;

  const account = accounts.find(
    (acc) => acc.account_number === accountNumber.trim()
  );

  if (!account) return null;

  const customer = customers.find((cust) => cust.customer_id === account.customer_id);
  const accountType = accountTypes.find(
    (type) => type.account_type_id === account.account_type_id
  );
  const branch = branches.find((b) => b.branch_id === account.branch_id);

  return {
    accountId: account.account_id,
    accountNumber: account.account_number,
    accountTypeId: account.account_type_id,
    accountTypeName: accountType?.type_name || 'Tài khoản',
    branchId: account.branch_id,
    branchName: branch?.branch_name || 'Chi nhánh',
    balance: account.balance,
    status: account.status,
    ownerId: customer?.customer_id || null,
    ownerCode: customer?.customer_code || '',
    ownerName: customer?.full_name || 'Khách hàng',
    ownerPhone: customer?.phone || '',
    ownerIdCard: customer?.id_card_number || '',
  };
};

// Chi nhánh
export const branches = [
  {
    branch_id: 1,
    branch_code: 'HN001',
    branch_name: 'Chi nhánh Hà Nội',
    address: '123 Hoàn Kiếm, Hà Nội',
    phone: '024-3825-1234',
    email: 'hanoi@bank.com',
    manager_id: 1,
    status: 'ACTIVE',
  },
  {
    branch_id: 2,
    branch_code: 'HCM001',
    branch_name: 'Chi nhánh TP.HCM',
    address: '456 Nguyễn Huệ, Q.1, TP.HCM',
    phone: '028-3822-5678',
    email: 'hcm@bank.com',
    manager_id: 2,
    status: 'ACTIVE',
  },
];

// Nhân viên
export const employees = [
  {
    employee_id: 1,
    employee_code: 'EMP001',
    branch_id: 1,
    role_id: 1, // ADMIN
    full_name: 'Nguyễn Văn Admin',
    email: 'admin@bank.com',
  phone: '0901234567',
    username: 'admin',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
  {
    employee_id: 2,
    employee_code: 'EMP002',
    branch_id: 2,
    role_id: 1, // ADMIN
    full_name: 'Trần Thị Quản lý',
    email: 'admin2@bank.com',
    phone: '0901234568',
    username: 'admin2',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
  {
    employee_id: 3,
    employee_code: 'EMP003',
    branch_id: 1,
    role_id: 2, // TELLER
    full_name: 'Lê Văn Teller',
    email: 'teller@bank.com',
    phone: '0901234569',
    username: 'teller',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
  {
    employee_id: 4,
    employee_code: 'EMP004',
    branch_id: 1,
    role_id: 3, // LOAN_OFFICER
    full_name: 'Phạm Thị Tín Dụng',
    email: 'loanofficer@bank.com',
    phone: '0901234570',
    username: 'loanofficer',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
];

// ============================================
// 2. QUẢN LÝ KHÁCH HÀNG
// ============================================

// Khách hàng
export const customers = [
  {
    customer_id: 1,
    customer_code: 'CUS001',
    full_name: 'Nguyễn Văn A',
    email: 'customer@example.com',
    phone: '0987654321',
    id_card_number: '001234567890',
    date_of_birth: '1990-01-15',
    gender: 'M',
    address: '123 Nguyễn Trãi, Hà Nội',
    occupation: 'Kỹ sư phần mềm',
    monthly_income: 30000000,
    registered_branch_id: 1,
    username: 'customer',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
  {
    customer_id: 2,
    customer_code: 'CUS002',
    full_name: 'Trần Thị B',
    email: 'customer2@example.com',
    phone: '0987654322',
    id_card_number: '001234567891',
    date_of_birth: '1985-05-20',
    gender: 'F',
    address: '456 Lê Lợi, TP.HCM',
    occupation: 'Giáo viên',
    monthly_income: 15000000,
    registered_branch_id: 2,
    username: 'customer2',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
  {
    customer_id: 3,
    customer_code: 'CUS003',
    full_name: 'Lê Văn C',
    email: 'customer3@example.com',
    phone: '0987654323',
    id_card_number: '001234567892',
    date_of_birth: '1992-08-10',
    gender: 'M',
    address: '789 Trần Phú, Đà Nẵng',
    occupation: 'Bác sĩ',
    monthly_income: 40000000,
    registered_branch_id: 1,
    username: 'customer3',
    password_hash: 'hashed_password',
    status: 'ACTIVE',
  },
];

// Điểm tín dụng - MOVED TO BOTTOM (after login function) for better organization

// ============================================
// 3. QUẢN LÝ TÀI KHOẢN
// ============================================

// Loại tài khoản
export const accountTypes = [
  {
    account_type_id: 1,
    type_code: 'CHECKING',
    type_name: 'Tài khoản thanh toán',
    description: 'Tài khoản giao dịch hàng ngày',
    min_balance: 50000,
    interest_rate: 0.1,
    status: 'ACTIVE',
  },
  {
    account_type_id: 2,
    type_code: 'SAVINGS',
    type_name: 'Tài khoản tiết kiệm',
    description: 'Tài khoản tiết kiệm có lãi suất',
    min_balance: 1000000,
    interest_rate: 0.5,
    status: 'ACTIVE',
  },
];

// Tài khoản
export const accounts = [
  {
    account_id: 1,
    account_number: '1001234567',
    customer_id: 1,
    account_type_id: 1,
    branch_id: 1,
    balance: 50000000,
    interest_rate: 0.1,
    opened_date: '2023-01-15',
    status: 'ACTIVE',
  },
  {
    account_id: 2,
    account_number: '1001234568',
    customer_id: 1,
    account_type_id: 2,
    branch_id: 1,
    balance: 100000000,
    interest_rate: 0.5,
    opened_date: '2023-01-15',
    status: 'ACTIVE',
  },
  {
    account_id: 3,
    account_number: '2001234569',
    customer_id: 2,
    account_type_id: 1,
    branch_id: 2,
    balance: 30000000,
    interest_rate: 0.1,
    opened_date: '2023-02-20',
    status: 'ACTIVE',
  },
  {
    account_id: 4,
    account_number: '1001234570',
    customer_id: 3,
    account_type_id: 1,
    branch_id: 1,
    balance: 75000000,
    interest_rate: 0.1,
    opened_date: '2023-03-10',
    status: 'ACTIVE',
  },
];

// Thẻ ngân hàng (SIMPLIFIED)
export const cards = [
  {
    card_id: 1,
    cardNumber: '4111 1111 1111 1111',
    account_id: 1,
    cardType: 'DEBIT',
    cardBrand: 'VISA',
    issuedDate: '01/2023',
    expiryDate: '01/28',
    status: 'ACTIVE',
  },
  {
    card_id: 2,
    cardNumber: '5111 1111 1111 1112',
    account_id: 3,
    cardType: 'CREDIT',
    cardBrand: 'MASTERCARD',
    issuedDate: '02/2023',
    expiryDate: '02/28',
    creditLimit: 50000000,
    availableCredit: 45000000,
    status: 'ACTIVE',
  },
];

// ============================================
// 4. GIAO DỊCH
// ============================================

// Danh sách ngân hàng (đơn giản)
export const banks = [
  'ABC',
  'Vietcombank',
  'Techcombank',
  'ACB',
  'VIB',
  'TPBank',
  'MBBank',
  'VPBank',
];

// Loại giao dịch
export const transactionTypes = [
  {
    transaction_type_id: 1,
    type_code: 'DEPOSIT',
    type_name: 'Nộp tiền',
    description: 'Gửi tiền vào tài khoản',
  },
  {
    transaction_type_id: 2,
    type_code: 'WITHDRAWAL',
    type_name: 'Rút tiền',
    description: 'Rút tiền từ tài khoản',
  },
  {
    transaction_type_id: 3,
    type_code: 'TRANSFER',
    type_name: 'Chuyển khoản',
    description: 'Chuyển tiền giữa các tài khoản',
  },
  {
    transaction_type_id: 4,
    type_code: 'PAYMENT',
    type_name: 'Thanh toán',
    description: 'Thanh toán hóa đơn',
  },
];

// Giao dịch (SIMPLIFIED)
export const transactions = [
  {
    transaction_id: 1,
    transaction_code: 'TXN001',
    transaction_type_id: 1, // DEPOSIT
    from_account_id: null,
    to_account_id: 1,
    from_bank_name: null,
    to_bank_name: 'ABC',
    amount: 10000000,
    fee: 0,
    description: 'Nộp tiền mặt',
    balance_after: 50000000, // Số dư TK 1 sau giao dịch
    status: 'SUCCESS',
    transaction_date: '2024-10-01 09:00:00',
  },
  {
    transaction_id: 2,
    transaction_code: 'TXN002',
    transaction_type_id: 3, // TRANSFER
    from_account_id: 1,
    to_account_id: 3,
    from_bank_name: 'ABC',
    to_bank_name: 'ABC',
    amount: 5000000,
    fee: 5000,
    description: 'Chuyển khoản cho bạn',
    balance_after: 44995000, // Số dư TK 1 sau giao dịch
    status: 'SUCCESS',
    transaction_date: '2024-10-05 14:30:00',
  },
  {
    transaction_id: 3,
    transaction_code: 'TXN003',
    transaction_type_id: 2, // WITHDRAWAL
    from_account_id: 1,
    to_account_id: null,
    from_bank_name: 'ABC',
    to_bank_name: null,
    amount: 3000000,
    fee: 0,
    description: 'Rút tiền mặt tại ATM',
    balance_after: 41995000, // Số dư TK 1 sau giao dịch
    status: 'SUCCESS',
    transaction_date: '2024-10-10 16:00:00',
  },
  {
    transaction_id: 4,
    transaction_code: 'TXN004',
    transaction_type_id: 3, // TRANSFER
    from_account_id: 3,
    to_account_id: 1,
    from_bank_name: 'ABC',
    to_bank_name: 'ABC',
    amount: 2000000,
    fee: 5000,
    description: 'Hoàn tiền',
    balance_after: 43995000, // Số dư TK 1 sau giao dịch (nhận tiền)
    status: 'SUCCESS',
    transaction_date: '2024-10-15 11:20:00',
  },
  {
    transaction_id: 5,
    transaction_code: 'TXN005',
    transaction_type_id: 1, // DEPOSIT
    from_account_id: null,
    to_account_id: 1,
    from_bank_name: null,
    to_bank_name: 'ABC',
    amount: 6000000,
    fee: 0,
    description: 'Nộp tiền mặt',
    balance_after: 49995000, // Số dư TK 1 hiện tại (gần bằng 50tr)
    status: 'SUCCESS',
    transaction_date: '2024-10-20 10:00:00',
  },
  {
    transaction_id: 6,
    transaction_code: 'TXN006',
    transaction_type_id: 3, // TRANSFER
    from_account_id: 1,
    to_account_id: null,
    from_bank_name: 'ABC',
    to_bank_name: 'Vietcombank',
    amount: 10000000,
    fee: 5000,
    description: 'Chuyển khoản liên ngân hàng',
    balance_after: 39995000,
    status: 'SUCCESS',
    transaction_date: '2024-10-25 15:30:00',
  },
];

// ============================================
// 5. TIẾT KIỆM
// ============================================

// Lãi suất tiết kiệm
export const savingsInterestRates = [
  {
    rate_id: 1,
    term_months: 1,
    min_amount: 1000000,
    max_amount: null,
    interest_rate: 2.5,
    status: 'ACTIVE',
    effective_from: '2024-01-01',
    effective_to: null,
  },
  {
    rate_id: 2,
    term_months: 3,
    min_amount: 1000000,
    max_amount: null,
    interest_rate: 3.5,
    status: 'ACTIVE',
    effective_from: '2024-01-01',
    effective_to: null,
  },
  {
    rate_id: 3,
    term_months: 6,
    min_amount: 1000000,
    max_amount: null,
    interest_rate: 4.5,
    status: 'ACTIVE',
    effective_from: '2024-01-01',
    effective_to: null,
  },
  {
    rate_id: 4,
    term_months: 12,
    min_amount: 1000000,
    max_amount: null,
    interest_rate: 5.5,
    status: 'ACTIVE',
    effective_from: '2024-01-01',
    effective_to: null,
  },
  {
    rate_id: 5,
    term_months: 24,
    min_amount: 10000000,
    max_amount: null,
    interest_rate: 6.5,
    status: 'ACTIVE',
    effective_from: '2024-01-01',
    effective_to: null,
  },
];

// Sổ tiết kiệm
export const savingsDeposits = [
  {
    deposit_id: 1,
    deposit_number: 'STK001',
    customer_id: 1,
    account_id: 2,
    branch_id: 1,
    principal_amount: 50000000,
    interest_rate_id: 4,
    interest_rate: 5.5,
    term_months: 12,
    start_date: '2024-01-15',
    maturity_date: '2025-01-15',
    auto_renew: 'NO',
    total_interest_earned: 2750000,
    status: 'ACTIVE',
  },
  {
    deposit_id: 2,
    deposit_number: 'STK002',
    customer_id: 2,
    account_id: 3,
    branch_id: 2,
    principal_amount: 20000000,
    interest_rate_id: 3,
    interest_rate: 4.5,
    term_months: 6,
    start_date: '2024-06-01',
    maturity_date: '2024-12-01',
    auto_renew: 'YES',
    total_interest_earned: 450000,
    status: 'ACTIVE',
  },
  // *** SỔ SẮP ĐÁO HẠN - ĐỂ TEST ***
  {
    deposit_id: 3,
    deposit_number: 'STK003',
    customer_id: 1,
    account_id: 2,
    branch_id: 1,
    principal_amount: 100000000,
    interest_rate_id: 4,
    interest_rate: 5.5,
    term_months: 6,
    start_date: '2024-05-05',
    maturity_date: '2025-11-05', // Đáo hạn trong 4 ngày
    auto_renew: 'NO',
    total_interest_earned: 2750000,
    status: 'ACTIVE',
  },
  {
    deposit_id: 4,
    deposit_number: 'STK004',
    customer_id: 1,
    account_id: 2,
    branch_id: 1,
    principal_amount: 200000000,
    interest_rate_id: 5,
    interest_rate: 6.0,
    term_months: 12,
    start_date: '2024-11-01',
    maturity_date: '2025-11-01', // Đã đáo hạn hôm nay!
    auto_renew: 'YES', // Có tự động tái tục
    total_interest_earned: 12000000,
    status: 'ACTIVE',
  },
];

// Giao dịch tiết kiệm
export const savingsTransactions = [
  {
    savings_transaction_id: 1,
    deposit_id: 1,
    transaction_type: 'INITIAL_DEPOSIT',
    amount: 50000000,
    interest_amount: 0,
    description: 'Gửi tiết kiệm lần đầu',
    transaction_date: '2024-01-15 10:00:00',
  },
  {
    savings_transaction_id: 2,
    deposit_id: 1,
    transaction_type: 'INTEREST_PAYMENT',
    amount: 229166.67,
    interest_amount: 229166.67,
    description: 'Trả lãi tháng 1',
    transaction_date: '2024-02-15 00:00:00',
  },
  {
    savings_transaction_id: 3,
    deposit_id: 2,
    transaction_type: 'INITIAL_DEPOSIT',
    amount: 20000000,
    interest_amount: 0,
    description: 'Gửi tiết kiệm lần đầu',
    transaction_date: '2024-06-01 14:30:00',
  },
];

// ============================================
// 6. VAY VỐN
// ============================================

// Loại tài sản thế chấp
export const collateralTypes = [
  {
    collateral_type_id: 1,
    type_code: 'REAL_ESTATE',
    type_name: 'Bất động sản',
    max_ltv: 80.00,
  },
  {
    collateral_type_id: 2,
    type_code: 'VEHICLE',
    type_name: 'Phương tiện',
    max_ltv: 70.00,
  },
  {
    collateral_type_id: 3,
    type_code: 'OTHER',
    type_name: 'Tài sản khác',
    max_ltv: 60.00,
  },
];

// Tài sản thế chấp
export const collaterals = [
  {
    collateral_id: 1,
    customer_id: 1,
    collateral_type_id: 1,
    collateral_name: 'Nhà phố 123 Nguyễn Huệ, Q.1, TP.HCM',
    description: 'Nhà phố 4 tầng, diện tích 120m2',
    location: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    certificate_number: 'SH987654321',
    issue_date: '2015-05-20',
    issue_authority: 'UBND TP.HCM',
    original_value: 800000000,
    appraised_value: 1000000000,
    appraised_by: 4,
    appraised_date: '2024-08-15',
    status: 'IN_USE',
    verification_notes: 'Tài sản hợp lệ, giá trị thẩm định chính xác',
  },
  {
    collateral_id: 2,
    customer_id: 1,
    collateral_type_id: 1,
    collateral_name: 'Căn hộ chung cư Vinhomes',
    description: 'Căn hộ 2PN, 80m2',
    location: '789 Nguyễn Văn Linh, Q.7, TP.HCM',
    certificate_number: 'CC123456',
    issue_date: '2020-03-10',
    issue_authority: 'Sở Xây dựng TP.HCM',
    original_value: 3000000000,
    appraised_value: 3200000000,
    appraised_by: 4,
    appraised_date: '2024-09-20',
    status: 'IN_USE', // Đang thế chấp cho LOAN003
    verification_notes: 'Tài sản đủ điều kiện',
  },
  {
    collateral_id: 3,
    customer_id: 1,
    collateral_type_id: 2,
    collateral_name: 'Xe ô tô Mercedes C200',
    description: 'Xe sedan 2022, màu đen',
    location: null,
    certificate_number: 'DKX456789',
    issue_date: '2022-06-15',
    issue_authority: 'Cục CSGT',
    original_value: 1500000000,
    appraised_value: 0,
    appraised_by: null,
    appraised_date: null,
    status: 'PENDING',
    verification_notes: null,
  },
  // *** TÀI SẢN MỚI - AVAILABLE ***
  {
    collateral_id: 4,
    customer_id: 1,
    collateral_type_id: 1,
    collateral_name: 'Nhà phố 2 mặt tiền đường Lê Văn Việt, Q.9',
    description: 'Nhà phố 3 tầng, diện tích 150m2, có sân vườn',
    location: '456 Lê Văn Việt, Quận 9, TP.HCM',
    certificate_number: 'SH888999777',
    issue_date: '2018-08-15',
    issue_authority: 'UBND TP.HCM',
    original_value: 4500000000,
    appraised_value: 5000000000,
    appraised_by: 4,
    appraised_date: '2024-10-15',
    status: 'AVAILABLE',
    verification_notes: 'Tài sản có vị trí đẹp, giá trị cao, đủ điều kiện thế chấp',
  },
  {
    collateral_id: 5,
    customer_id: 1,
    collateral_type_id: 2,
    collateral_name: 'Xe ô tô BMW X5 2023',
    description: 'SUV 7 chỗ, màu trắng, full option',
    location: null,
    certificate_number: 'DKX789012',
    issue_date: '2023-03-20',
    issue_authority: 'Cục CSGT',
    original_value: 2800000000,
    appraised_value: 2700000000,
    appraised_by: 4,
    appraised_date: '2024-10-20',
    status: 'AVAILABLE',
    verification_notes: 'Xe mới, tình trạng tốt, đủ điều kiện thế chấp',
  },
];

// Alias for backward compatibility
export const customerAssets = collaterals;

// Loại hình vay
export const loanTypes = [
  {
    loan_type_id: 1,
    type_code: 'PERSONAL',
    type_name: 'Vay tiêu dùng',
    description: 'Vay phục vụ nhu cầu cá nhân',
    max_amount: 500000000,
    max_term_months: 60,
    require_collateral: 'NO',
  },
  {
    loan_type_id: 2,
    type_code: 'MORTGAGE',
    type_name: 'Vay mua nhà',
    description: 'Vay mua bất động sản',
    max_amount: 5000000000,
    max_term_months: 300,
    require_collateral: 'YES',
  },
  {
    loan_type_id: 3,
    type_code: 'AUTO',
    type_name: 'Vay mua xe',
    description: 'Vay mua phương tiện',
    max_amount: 2000000000,
    max_term_months: 84,
    require_collateral: 'YES',
  },
];

// Lãi suất cho vay
export const loanInterestRates = [
  {
    rate_id: 1,
    loan_type_id: 1, // PERSONAL
    min_amount: 0,
    max_amount: 100000000,
    term_months_from: 0,
    term_months_to: 12,
    credit_grade: 'A',
    base_rate: 12.0,
    effective_from: '2024-01-01',
    effective_to: null,
    status: 'ACTIVE',
  },
  {
    rate_id: 2,
    loan_type_id: 1, // PERSONAL
    min_amount: 100000001,
    max_amount: 500000000,
    term_months_from: 13,
    term_months_to: 60,
    credit_grade: 'A',
    base_rate: 10.5,
    effective_from: '2024-01-01',
    effective_to: null,
    status: 'ACTIVE',
  },
  {
    rate_id: 3,
    loan_type_id: 2, // MORTGAGE
    min_amount: 0,
    max_amount: null,
    term_months_from: 0,
    term_months_to: 300,
    credit_grade: 'AA',
    base_rate: 8.0,
    effective_from: '2024-01-01',
    effective_to: null,
    status: 'ACTIVE',
  },
  {
    rate_id: 4,
    loan_type_id: 2, // MORTGAGE
    min_amount: 0,
    max_amount: null,
    term_months_from: 0,
    term_months_to: 300,
    credit_grade: 'A',
    base_rate: 8.5,
    effective_from: '2024-01-01',
    effective_to: null,
    status: 'ACTIVE',
  },
  {
    rate_id: 5,
    loan_type_id: 3, // AUTO
    min_amount: 0,
    max_amount: null,
    term_months_from: 0,
    term_months_to: 84,
    credit_grade: 'A',
    base_rate: 9.5,
    effective_from: '2024-01-01',
    effective_to: null,
    status: 'ACTIVE',
  },
];

// Khoản vay
export const loans = [
  {
    loan_id: 1,
    loan_number: 'LOAN001',
    customer_id: 1,
    account_id: 1,
    loan_type_id: 2, // MORTGAGE
    branch_id: 1,
    loan_officer_id: 4,
    loan_amount: 800000000,
    approved_amount: 800000000,
    interest_rate_id: 4,
    interest_rate: 8.5,
    term_months: 240,
    monthly_payment: 6980000,
    purpose: 'Mua nhà ở',
    collateral_id: 1,
    collateral_value: 1000000000,
    ltv_ratio: 80.0,
    outstanding_balance: 750000000,
    application_date: '2024-08-01',
    approved_date: '2024-08-20',
    approved_by: 4,
    rejection_reason: null,
    disbursement_date: '2024-08-25',
    first_payment_date: '2024-09-25',
    maturity_date: '2044-08-25',
    status: 'ACTIVE',
  },
  {
    loan_id: 2,
    loan_number: 'LOAN002',
    customer_id: 1,
    account_id: 3,
    loan_type_id: 1, // PERSONAL
    branch_id: 2,
    loan_officer_id: 4,
    loan_amount: 50000000,
    approved_amount: null,
    interest_rate_id: null,
    interest_rate: 12.0,
    term_months: 24,
    monthly_payment: null,
    purpose: 'Nhu cầu cá nhân',
    collateral_id: null,
    collateral_value: null,
    ltv_ratio: null,
    outstanding_balance: 0,
    application_date: '2024-10-20',
    approved_date: null,
    approved_by: null,
    rejection_reason: null,
    disbursement_date: null,
    first_payment_date: null,
    maturity_date: null,
    status: 'PENDING',
  },
  // *** KHOẢN VAY SẮP ĐÁO HẠN - ĐỂ TEST ***
  {
    loan_id: 3,
    loan_number: 'LOAN003',
    customer_id: 1,
    account_id: 1,
    loan_type_id: 3, // AUTO
    branch_id: 1,
    loan_officer_id: 4,
    loan_amount: 300000000,
    approved_amount: 300000000,
    interest_rate_id: 5,
    interest_rate: 9.5,
    term_months: 60,
    monthly_payment: 6250000,
    purpose: 'Mua xe ô tô',
    collateral_id: 2,
    collateral_value: 400000000,
    ltv_ratio: 75.0,
    outstanding_balance: 25000000, // Còn 25 triệu nợ gốc
    application_date: '2020-11-01',
    approved_date: '2020-11-05',
    approved_by: 4,
    rejection_reason: null,
    disbursement_date: '2020-11-10',
    first_payment_date: '2020-12-10',
    maturity_date: '2025-11-10', // Đáo hạn trong 9 ngày
    status: 'ACTIVE',
  },
  {
    loan_id: 4,
    loan_number: 'LOAN004',
    customer_id: 1,
    account_id: 1,
    loan_type_id: 1, // PERSONAL
    branch_id: 1,
    loan_officer_id: 4,
    loan_amount: 100000000,
    approved_amount: 100000000,
    interest_rate_id: 2,
    interest_rate: 12.0,
    term_months: 36,
    monthly_payment: 3320000,
    purpose: 'Du học',
    collateral_id: null,
    collateral_value: null,
    ltv_ratio: null,
    outstanding_balance: 15000000, // Còn 15 triệu nợ gốc
    application_date: '2022-12-01',
    approved_date: '2022-12-05',
    approved_by: 4,
    rejection_reason: null,
    disbursement_date: '2022-12-10',
    first_payment_date: '2023-01-10',
    maturity_date: '2025-12-10', // Đáo hạn trong 39 ngày (sắp tới 30 ngày)
    status: 'ACTIVE',
  },
];

// Lịch trả nợ
export const loanPaymentSchedule = [
  {
    schedule_id: 1,
    loan_id: 1,
    payment_number: 1,
    due_date: '2024-09-25',
    principal_amount: 1313333,
    interest_amount: 5666667,
    total_payment: 6980000,
    outstanding_balance: 798686667,
    status: 'PAID',
    paid_amount: 6980000,
    paid_date: '2024-09-25',
  },
  {
    schedule_id: 2,
    loan_id: 1,
    payment_number: 2,
    due_date: '2024-10-25',
    principal_amount: 1322656,
    interest_amount: 5657344,
    total_payment: 6980000,
    outstanding_balance: 797364011,
    status: 'PAID',
    paid_amount: 6980000,
    paid_date: '2024-10-23',
  },
  {
    schedule_id: 3,
    loan_id: 1,
    payment_number: 3,
    due_date: '2024-11-25',
    principal_amount: 1332045,
    interest_amount: 5647955,
    total_payment: 6980000,
    outstanding_balance: 796031966,
    status: 'PENDING',
    paid_amount: 0,
    paid_date: null,
  },
];

// Thanh toán khoản vay
export const loanPayments = [
  {
    payment_id: 1,
    loan_id: 1,
    schedule_id: 1,
    transaction_id: null,
    payment_date: '2024-09-25 10:00:00',
    principal_paid: 1313333,
    interest_paid: 5666667,
    late_fee_paid: 0,
    total_paid: 6980000,
    payment_method: 'AUTO_DEBIT',
    reference_number: 'PAY001',
    notes: 'Thanh toán đúng hạn',
  },
  {
    payment_id: 2,
    loan_id: 1,
    schedule_id: 2,
    transaction_id: null,
    payment_date: '2024-10-23 14:30:00',
    principal_paid: 1322656,
    interest_paid: 5657344,
    late_fee_paid: 0,
    total_paid: 6980000,
    payment_method: 'TRANSFER',
    reference_number: 'PAY002',
    notes: 'Thanh toán trước hạn 2 ngày',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Format currency
export const formatCurrency = (amount) => {
  const value = parseFloat(amount);
  if (isNaN(value)) return '0₫';
  
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

// Format datetime
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Interest rates object for compatibility
export const interestRates = {
  savings: savingsInterestRates.map(rate => ({
    ...rate,
    termMonths: rate.term_months,
    rate: rate.interest_rate,
  })),
  loans: loanInterestRates,
};

// Calculate interest
export const calculateInterest = (principal, rate, termMonths, method = 'END_OF_TERM') => {
  const monthlyRate = rate / 100 / 12;
  
  if (method === 'END_OF_TERM') {
    // Lãi đơn - trả cuối kỳ
    return principal * (rate / 100) * (termMonths / 12);
  } else if (method === 'COMPOUND') {
    // Lãi kép
    return principal * (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else {
    // Lãi định kỳ (monthly/quarterly)
    return principal * (rate / 100) * (termMonths / 12);
  }
};

// Calculate LTV (Loan-to-Value) ratio
export const calculateLTV = (loanAmount, collateralValue) => {
  if (!collateralValue || collateralValue === 0) return 0;
  return ((loanAmount / collateralValue) * 100).toFixed(2);
};

// Calculate monthly payment (Annuity method)
export const calculateMonthlyPayment = (loanAmount, annualRate, termMonths) => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return loanAmount / termMonths;
  
  const payment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return payment;
};

// Get account with details
export const getAccountWithDetails = (accountId) => {
  const account = accounts.find(a => a.account_id === accountId);
  if (!account) return null;

  const customer = customers.find(c => c.customer_id === account.customer_id);
  const accountType = accountTypes.find(at => at.account_type_id === account.account_type_id);
  const branch = branches.find(b => b.branch_id === account.branch_id);

  return {
    ...account,
    customerName: customer?.full_name,
    customerCode: customer?.customer_code,
    accountTypeName: accountType?.type_name,
    branchName: branch?.branch_name,
  };
};

// Get customer accounts
export const getCustomerAccounts = (customerId) => {
  return accounts
    .filter(a => a.customer_id === customerId)
    .map(account => {
      const accountType = accountTypes.find(at => at.account_type_id === account.account_type_id);
      const branch = branches.find(b => b.branch_id === account.branch_id);
      return {
        ...account,
        accountTypeName: accountType?.type_name,
        branchName: branch?.branch_name,
        available_balance: account.balance, // Simplified
      };
    });
};

// Get customer transactions
export const getCustomerTransactions = (customerId) => {
  const customerAccountIds = accounts
    .filter(a => a.customer_id === customerId)
    .map(a => a.account_id);

  return transactions
    .filter(t => 
      customerAccountIds.includes(t.from_account_id) || 
      customerAccountIds.includes(t.to_account_id)
    )
    .map(txn => {
      const transactionType = transactionTypes.find(tt => tt.transaction_type_id === txn.transaction_type_id);
      const fromAccount = txn.from_account_id ? getAccountWithDetails(txn.from_account_id) : null;
      const toAccount = txn.to_account_id ? getAccountWithDetails(txn.to_account_id) : null;

      return {
        ...txn,
        typeName: transactionType?.type_name,
        fromAccountNumber: fromAccount?.account_number,
        toAccountNumber: toAccount?.account_number,
      };
    })
    .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
};

// Get customer savings
export const getCustomerSavings = (customerId) => {
  const today = new Date();
  
  return savingsDeposits
    .filter(s => s.customer_id === customerId)
    .map(deposit => {
      const rate = savingsInterestRates.find(r => r.rate_id === deposit.interest_rate_id);
      const account = accounts.find(a => a.account_id === deposit.account_id);
      
      // Tính lãi dự kiến (lãi đơn)
      const expectedInterest = calculateInterest(
        deposit.principal_amount,
        deposit.interest_rate,
        deposit.term_months,
        'SIMPLE'
      );
      
      // Tính current_value = principal + interest earned
      const current_value = deposit.principal_amount + (deposit.total_interest_earned || 0);
      
      // Tính số ngày đến hạn
      const maturityDate = new Date(deposit.maturity_date);
      const daysUntilMaturity = Math.floor((maturityDate - today) / (1000 * 60 * 60 * 24));
      
      // Tính số ngày đã gửi
      const startDate = new Date(deposit.start_date);
      const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const totalDays = deposit.term_months * 30; // Estimate
      
      return {
        ...deposit,
        current_value,
        expectedInterest,
        daysUntilMaturity,
        daysSinceStart,
        totalDays,
        rateName: `${rate?.term_months} tháng - ${rate?.interest_rate}%/năm`,
        accountNumber: account?.account_number,
      };
    });
};

// Get customer loans
export const getCustomerLoans = (customerId) => {
  return loans
    .filter(l => l.customer_id === customerId)
    .map(loan => {
      const loanType = loanTypes.find(lt => lt.loan_type_id === loan.loan_type_id);
      const collateral = loan.collateral_id ? collaterals.find(c => c.collateral_id === loan.collateral_id) : null;
      const collateralType = collateral ? collateralTypes.find(ct => ct.collateral_type_id === collateral.collateral_type_id) : null;

      return {
        ...loan,
        loanTypeName: loanType?.type_name,
        collateralInfo: collateral ? {
          collateral_name: collateral.collateral_name,
          collateralTypeName: collateralType?.type_name,
        } : null,
      };
    });
};

// Get customer collaterals
export const getCustomerCollaterals = (customerId) => {
  return collaterals
    .filter(c => c.customer_id === customerId)
    .map(collateral => {
      const collateralType = collateralTypes.find(ct => ct.collateral_type_id === collateral.collateral_type_id);
      const appraisedByEmployee = collateral.appraised_by ? employees.find(e => e.employee_id === collateral.appraised_by) : null;

      return {
        ...collateral,
        collateralTypeName: collateralType?.type_name,
        appraisedByName: appraisedByEmployee?.full_name,
      };
    });
};

// Get pending collaterals (for loan officer)
export const getPendingCollaterals = () => {
  return collaterals
    .filter(c => c.status === 'PENDING')
    .map(collateral => {
      const customer = customers.find(cust => cust.customer_id === collateral.customer_id);
      const collateralType = collateralTypes.find(ct => ct.collateral_type_id === collateral.collateral_type_id);

      return {
        ...collateral,
        customerName: customer?.full_name,
        customerCode: customer?.customer_code,
        customerPhone: customer?.phone,
        collateralTypeName: collateralType?.type_name,
      };
    });
};

// Note: getVerifiedCollaterals function moved to bottom of file (after credit score functions)

const mapLoanToDetailedRecord = (loan) => {
  const customer = customers.find(c => c.customer_id === loan.customer_id);
  const loanType = loanTypes.find(lt => lt.loan_type_id === loan.loan_type_id);
  const creditScore = creditScores.find(cs => cs.customer_id === loan.customer_id);
  const collateral = loan.collateral_id ? collaterals.find(c => c.collateral_id === loan.collateral_id) : null;
  const collateralType = collateral ? collateralTypes.find(ct => ct.collateral_type_id === collateral.collateral_type_id) : null;
  const appraisedByEmployee = collateral?.appraised_by ? employees.find(e => e.employee_id === collateral.appraised_by) : null;

  const statusDisplay = (() => {
    if (loan.status === 'PENDING') return 'Chờ duyệt';
    if (loan.status === 'REJECTED') return 'Đã từ chối';
    if (loan.disbursement_date) return 'Đã giải ngân';
    if (loan.approved_date) return 'Chờ giải ngân';
    if (loan.status === 'ACTIVE') return 'Đang hoạt động';
    return loan.status || 'Không xác định';
  })();

  return {
    // Loan base fields
    loan_id: loan.loan_id,
    loan_number: loan.loan_number,
    customer_id: loan.customer_id,
    account_id: loan.account_id,
    loan_type_id: loan.loan_type_id,
    branch_id: loan.branch_id,
    loan_officer_id: loan.loan_officer_id,
    loan_amount: loan.loan_amount,
    approved_amount: loan.approved_amount,
    interest_rate_id: loan.interest_rate_id,
    interest_rate: loan.interest_rate,
    interestRate: loan.interest_rate,
    term_months: loan.term_months,
    termMonths: loan.term_months || 0,
    term: loan.term_months || 0,
    monthly_payment: loan.monthly_payment,
    monthlyPayment: loan.monthly_payment,
    purpose: loan.purpose,
    collateral_id: loan.collateral_id,
    collateral_value: loan.collateral_value,
    ltv_ratio: loan.ltv_ratio,
    ltvRatio: loan.ltv_ratio || null,
    outstanding_balance: loan.outstanding_balance,
    application_date: loan.application_date,
    submissionDate: loan.application_date ? `${loan.application_date}T10:00:00` : null,
    approved_date: loan.approved_date,
    approvedDate: loan.approved_date,
    approved_by: loan.approved_by,
    rejection_reason: loan.rejection_reason,
    disbursement_date: loan.disbursement_date,
    disbursementDate: loan.disbursement_date,
    first_payment_date: loan.first_payment_date,
    firstPaymentDate: loan.first_payment_date,
    maturity_date: loan.maturity_date,
    maturityDate: loan.maturity_date,
    status: loan.status,
    statusDisplay,
    // Customer info - explicitly set from customer object
    customerName: customer?.full_name || '',
    customerCode: customer?.customer_code || '',
    customerPhone: customer?.phone || '',
    customerEmail: customer?.email || '',
    customerAddress: customer?.address || '',
    customerOccupation: customer?.occupation || '',
    customerMonthlyIncome: customer?.monthly_income || 0,
    // Loan info
    loanType: loanType?.type_name || '',
    loanTypeName: loanType?.type_name || '',
    loanAmount: loan.loan_amount || 0,
    loanNumber: loan.loan_number || '',
    // Credit score info
    creditGrade: creditScore?.grade || '',
    creditScore: creditScore?.score || 0,
    debtRatio: creditScore?.debt_to_income_ratio || 0,
    employmentStatus: creditScore?.on_time_payment_rate >= 95 ? 'STABLE' : 'UNSTABLE',
    // Collateral info
    collateralName: collateral?.collateral_name || null,
    collateralValue: collateral?.appraised_value || collateral?.original_value || null,
    collateralType: collateralType?.type_name || null,
    collateralAddress: collateral?.location || null,
    collateralCertificate: collateral?.certificate_number || null,
    appraisedValue: collateral?.appraised_value || null,
    appraisedBy: appraisedByEmployee?.full_name || (collateral?.appraised_by ? 'Công ty Thẩm định giá ABC' : null),
    appraisedDate: collateral?.appraised_date || null,
  };
};

// Get pending loans (for loan officer)
export const getPendingLoansWithDetails = () => {
  return loans
    .filter(l => l.status === 'PENDING')
    .map(mapLoanToDetailedRecord);
};

// Get approved loans (for loan officer)
export const getApprovedLoansWithDetails = () => {
  return loans
    .filter(l => l.status !== 'PENDING' && l.status !== 'REJECTED' && l.approved_date)
    .map(mapLoanToDetailedRecord);
};

// Get branches with full details (for admin)
export const getBranchesWithDetails = () => {
  return branches.map(branch => {
    // Find manager
    const manager = employees.find(e => e.employee_id === branch.manager_id);
    
    // Count employees in this branch
    const employeeCount = employees.filter(e => e.branch_id === branch.branch_id).length;
    
    // Count customers registered in this branch
    const customerCount = customers.filter(c => c.registered_branch_id === branch.branch_id).length;
    
    return {
      id: branch.branch_id,
      branch_id: branch.branch_id,
      branchCode: branch.branch_code,
      branchName: branch.branch_name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      managerId: branch.manager_id,
      manager: manager?.full_name || 'N/A',
      status: branch.status,
      employeeCount: employeeCount,
      customerCount: customerCount,
    };
  });
};

// Current user (mock - trong thực tế sẽ lấy từ session/localStorage)
export const currentUser = {
  id: 1, // customer_id
  type: 'CUSTOMER',
};

// System statistics for admin dashboard
export const systemStats = {
  totalCustomers: customers.length,
  totalAccounts: accounts.length,
  totalDeposits: accounts.reduce((sum, acc) => sum + acc.balance, 0),
  totalLoans: loans.reduce((sum, loan) => sum + (loan.outstanding_balance || 0), 0),
  totalSavings: savingsDeposits.reduce((sum, dep) => sum + dep.principal_amount, 0),
  activeLoans: loans.filter(l => l.status === 'ACTIVE').length,
  pendingLoans: loans.filter(l => l.status === 'PENDING').length,
  activeSavings: savingsDeposits.filter(s => s.status === 'ACTIVE').length,
  totalBranches: branches.length,
  totalEmployees: employees.length,
};

// Login function
export const login = (username, password) => {
  // Check employees
  const employee = employees.find(e => e.username === username && e.password_hash === password);
  if (employee) {
    const role = roles.find(r => r.role_id === employee.role_id);
    return {
      success: true,
      user: { ...employee, role: role?.role_name },
      userType: 'EMPLOYEE',
    };
  }

  // Check customers
  const customer = customers.find(c => c.username === username && c.password_hash === password);
  if (customer) {
    return {
      success: true,
      user: customer,
      userType: 'CUSTOMER',
    };
  }

  return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
};

// ============================================
// CREDIT SCORE DATA & FUNCTIONS
// ============================================

// Credit Scores (Điểm tín dụng hiện tại của mỗi khách hàng)
export const creditScores = [
  {
    score_id: 1,
    customer_id: 1,
    score: 750,
    grade: 'AA+',
    interest_rate: 8.8,
    max_ltv: 68,
    on_time_payment_rate: 100,
    debt_to_income_ratio: 25.5,
    account_age_months: 48,
    total_outstanding_debt: 775000000,
    late_payments: 0,
    monthly_income: 25000000,
    last_updated: '2025-10-31',
  },
  {
    score_id: 2,
    customer_id: 2,
    score: 680,
    grade: 'A+',
    interest_rate: 9.5,
    max_ltv: 62,
    on_time_payment_rate: 95,
    debt_to_income_ratio: 30.0,
    account_age_months: 36,
    total_outstanding_debt: 450000000,
    late_payments: 1,
    monthly_income: 30000000,
    last_updated: '2025-10-31',
  },
  {
    score_id: 3,
    customer_id: 3,
    score: 620,
    grade: 'A',
    interest_rate: 10.0,
    max_ltv: 60,
    on_time_payment_rate: 90,
    debt_to_income_ratio: 35.0,
    account_age_months: 24,
    total_outstanding_debt: 200000000,
    late_payments: 2,
    monthly_income: 20000000,
    last_updated: '2025-10-31',
  },
  {
    score_id: 4,
    customer_id: 4,
    score: 550,
    grade: 'BBB',
    interest_rate: 10.5,
    max_ltv: 55,
    on_time_payment_rate: 85,
    debt_to_income_ratio: 40.0,
    account_age_months: 18,
    total_outstanding_debt: 150000000,
    late_payments: 3,
    monthly_income: 18000000,
    last_updated: '2025-10-31',
  },
];

// Credit Score History (Lịch sử thay đổi điểm tín dụng)
export const creditScoreHistory = [
  // Customer 1 - Lịch sử 6 tháng
  {
    history_id: 1,
    customer_id: 1,
    old_score: null,
    new_score: 700,
    score_change: 0,
    old_grade: null,
    new_grade: 'AA',
    reason: 'Điểm tín dụng khởi tạo',
    event_type: 'INITIAL_SCORE',
    event_reference: null,
    created_by: null,
    created_at: '2025-05-01',
  },
  {
    history_id: 2,
    customer_id: 1,
    old_score: 700,
    new_score: 710,
    score_change: 10,
    old_grade: 'AA',
    new_grade: 'AA',
    reason: 'Trả nợ đúng hạn kỳ tháng 6',
    event_type: 'PAYMENT_ON_TIME',
    event_reference: 'LOAN001',
    created_by: null,
    created_at: '2025-06-25',
  },
  {
    history_id: 3,
    customer_id: 1,
    old_score: 710,
    new_score: 720,
    score_change: 10,
    old_grade: 'AA',
    new_grade: 'AA',
    reason: 'Trả nợ đúng hạn kỳ tháng 7',
    event_type: 'PAYMENT_ON_TIME',
    event_reference: 'LOAN001',
    created_by: null,
    created_at: '2025-07-25',
  },
  {
    history_id: 4,
    customer_id: 1,
    old_score: 720,
    new_score: 730,
    score_change: 10,
    old_grade: 'AA',
    new_grade: 'AA',
    reason: 'Trả nợ đúng hạn kỳ tháng 8',
    event_type: 'PAYMENT_ON_TIME',
    event_reference: 'LOAN001',
    created_by: null,
    created_at: '2025-08-25',
  },
  {
    history_id: 5,
    customer_id: 1,
    old_score: 730,
    new_score: 740,
    score_change: 10,
    old_grade: 'AA',
    new_grade: 'AA+',
    reason: 'Trả nợ đúng hạn kỳ tháng 9',
    event_type: 'PAYMENT_ON_TIME',
    event_reference: 'LOAN001',
    created_by: null,
    created_at: '2025-09-25',
  },
  {
    history_id: 6,
    customer_id: 1,
    old_score: 740,
    new_score: 750,
    score_change: 10,
    old_grade: 'AA+',
    new_grade: 'AA+',
    reason: 'Trả nợ đúng hạn kỳ tháng 10',
    event_type: 'PAYMENT_ON_TIME',
    event_reference: 'LOAN001',
    created_by: null,
    created_at: '2025-10-25',
  },
  // Customer 2 - Có 1 lần trễ hạn
  {
    history_id: 7,
    customer_id: 2,
    old_score: null,
    new_score: 700,
    score_change: 0,
    old_grade: null,
    new_grade: 'AA',
    reason: 'Điểm tín dụng khởi tạo',
    event_type: 'INITIAL_SCORE',
    event_reference: null,
    created_by: null,
    created_at: '2025-04-01',
  },
  {
    history_id: 8,
    customer_id: 2,
    old_score: 700,
    new_score: 695,
    score_change: -5,
    old_grade: 'AA',
    new_grade: 'A+',
    reason: 'Trả nợ trễ 10 ngày',
    event_type: 'OVERDUE_7_DAYS',
    event_reference: 'LOAN002',
    created_by: null,
    created_at: '2025-08-15',
  },
  {
    history_id: 9,
    customer_id: 2,
    old_score: 695,
    new_score: 680,
    score_change: -15,
    old_grade: 'A+',
    new_grade: 'A+',
    reason: 'Điều chỉnh sau khi xem xét lịch sử',
    event_type: 'MANUAL_ADJUSTMENT',
    event_reference: null,
    created_by: 4,
    created_at: '2025-09-01',
  },
];

// Credit Grade thresholds
const creditGrades = [
  { score: 800, grade: 'AAA', rate: 8.5, maxLtv: 70 },
  { score: 750, grade: 'AA+', rate: 8.8, maxLtv: 68 },
  { score: 700, grade: 'AA', rate: 9.0, maxLtv: 65 },
  { score: 650, grade: 'A+', rate: 9.5, maxLtv: 62 },
  { score: 600, grade: 'A', rate: 10.0, maxLtv: 60 },
  { score: 550, grade: 'BBB', rate: 10.5, maxLtv: 55 },
  { score: 500, grade: 'BB', rate: 12.0, maxLtv: 50 },
  { score: 450, grade: 'B', rate: 14.0, maxLtv: 45 },
  { score: 400, grade: 'CCC', rate: 16.0, maxLtv: 40 },
  { score: 350, grade: 'CC', rate: 18.0, maxLtv: 35 },
  { score: 0, grade: 'C', rate: 20.0, maxLtv: 30 },
];

// Calculate credit score for a customer
const calculateCreditScore = (customerId) => {
  // Get customer data
  const customer = customers.find(c => c.customer_id === customerId);
  if (!customer) return null;

  // Get customer's loans
  const customerLoans = loans.filter(l => l.customer_id === customerId);
  const activeLoans = customerLoans.filter(l => l.status === 'ACTIVE');

  // Get payment history
  const customerPayments = loanPayments.filter(lp => {
    const loan = loans.find(l => l.loan_id === lp.loan_id);
    return loan && loan.customer_id === customerId;
  });

  // Calculate factors

  // 1. On-time payment rate (35% weight)
  const totalPayments = customerPayments.length || 1;
  const onTimePayments = customerPayments.filter(p => p.payment_status === 'PAID_ON_TIME').length;
  const onTimePaymentRate = Math.round((onTimePayments / totalPayments) * 100);

  // 2. Debt-to-income ratio (30% weight)
  // Mock monthly income based on customer_id
  const monthlyIncomes = {
    1: 25000000, // 25M
    2: 30000000, // 30M
    3: 20000000, // 20M
    4: 18000000, // 18M
  };
  const monthlyIncome = monthlyIncomes[customerId] || 20000000;
  
  const totalOutstandingDebt = activeLoans.reduce((sum, loan) => sum + (loan.outstanding_balance || 0), 0);
  const monthlyDebtPayment = activeLoans.reduce((sum, loan) => sum + (loan.monthly_payment || 0), 0);
  const debtToIncomeRatio = monthlyIncome > 0 ? Math.round((monthlyDebtPayment / monthlyIncome) * 100) : 0;

  // 3. Account age (15% weight)
  const accountCreatedDate = new Date(customer.created_at);
  const now = new Date();
  const accountAgeMonths = Math.floor((now - accountCreatedDate) / (1000 * 60 * 60 * 24 * 30));

  // 4. Total outstanding debt (10% weight)
  // Lower is better

  // 5. Late payments in last 12 months (10% weight)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const latePayments = customerPayments.filter(p => 
    p.payment_status === 'PAID_LATE' && new Date(p.payment_date) >= oneYearAgo
  ).length;

  // Calculate score (300-850 range)
  let score = 300; // Base score

  // Factor 1: On-time payment (max 245 points, 35%)
  score += Math.round((onTimePaymentRate / 100) * 245);

  // Factor 2: Debt-to-income (max 210 points, 30%)
  const debtRatioScore = debtToIncomeRatio <= 30 ? 210 : 
                         debtToIncomeRatio <= 50 ? 150 : 
                         debtToIncomeRatio <= 70 ? 80 : 20;
  score += debtRatioScore;

  // Factor 3: Account age (max 105 points, 15%)
  const ageScore = Math.min(accountAgeMonths * 3, 105);
  score += ageScore;

  // Factor 4: Outstanding debt (max 70 points, 10%)
  const debtScore = totalOutstandingDebt === 0 ? 70 :
                    totalOutstandingDebt <= 50000000 ? 60 :
                    totalOutstandingDebt <= 100000000 ? 45 :
                    totalOutstandingDebt <= 200000000 ? 25 : 10;
  score += debtScore;

  // Factor 5: Late payments (max 70 points, 10%)
  const latePaymentScore = latePayments === 0 ? 70 :
                           latePayments <= 2 ? 40 :
                           latePayments <= 5 ? 20 : 5;
  score += latePaymentScore;

  // Cap at 850
  score = Math.min(score, 850);

  // Get grade
  const gradeInfo = creditGrades.find(g => score >= g.score) || creditGrades[creditGrades.length - 1];

  return {
    creditScore: score,
    creditGrade: gradeInfo.grade,
    interestRate: gradeInfo.rate,
    maxLtv: gradeInfo.maxLtv,
    onTimePaymentRate,
    debtToIncomeRatio,
    accountAgeMonths,
    totalOutstandingDebt,
    latePayments,
    monthlyIncome,
    activeLoans: activeLoans.length,
  };
};

// Get credit score data for a specific customer (for customer view)
export const getCreditScoreData = (customerId) => {
  // Get current credit score from creditScores table
  const creditScore = creditScores.find(cs => cs.customer_id === customerId);
  if (!creditScore) {
    // Fallback to calculated score if not found
    return calculateCreditScore(customerId);
  }

  // Get history for this customer
  const history = creditScoreHistory.filter(h => h.customer_id === customerId);
  
  // Calculate score change (compare with previous record)
  let scoreChange = 0;
  if (history.length >= 2) {
    const sortedHistory = [...history].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    scoreChange = sortedHistory[0].score_change || 0;
  }

  // Build score history for chart (last 6 months)
  const scoreHistory = [];
  const sortedHistory = [...history].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const last6 = sortedHistory.slice(-6);
  
  last6.forEach((record) => {
    const date = new Date(record.created_at);
    const monthLabel = `T${date.getMonth() + 1}`;
    scoreHistory.push({
      month: monthLabel,
      score: record.new_score,
    });
  });

  return {
    creditScore: creditScore.score,
    creditGrade: creditScore.grade,
    interestRate: creditScore.interest_rate,
    maxLtv: creditScore.max_ltv,
    onTimePaymentRate: creditScore.on_time_payment_rate,
    debtToIncomeRatio: creditScore.debt_to_income_ratio,
    accountAgeMonths: creditScore.account_age_months,
    totalOutstandingDebt: creditScore.total_outstanding_debt,
    latePayments: creditScore.late_payments,
    monthlyIncome: creditScore.monthly_income,
    activeLoans: loans.filter(l => l.customer_id === customerId && l.status === 'ACTIVE').length,
    scoreChange,
    scoreHistory,
  };
};

// Get all customers' credit scores (for loan officer view)
export const getAllCustomersCreditScores = () => {
  return creditScores.map(cs => {
    const customer = customers.find(c => c.customer_id === cs.customer_id);
    if (!customer) return null;

    // Get latest score change from history
    const history = creditScoreHistory.filter(h => h.customer_id === cs.customer_id);
    let scoreChange = 0;
    if (history.length > 0) {
      const latestHistory = history.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
      scoreChange = latestHistory.score_change || 0;
    }

    return {
      customerId: cs.customer_id,
      customerCode: customer.customer_code,
      customerName: customer.full_name,
      creditScore: cs.score,
      creditGrade: cs.grade,
      interestRate: cs.interest_rate,
      maxLtv: cs.max_ltv,
      onTimePaymentRate: cs.on_time_payment_rate,
      debtToIncomeRatio: cs.debt_to_income_ratio,
      accountAgeMonths: cs.account_age_months,
      totalOutstandingDebt: cs.total_outstanding_debt,
      latePayments: cs.late_payments,
      monthlyIncome: cs.monthly_income,
      activeLoans: loans.filter(l => l.customer_id === cs.customer_id && l.status === 'ACTIVE').length,
      scoreChange,
    };
  }).filter(Boolean); // Remove null values
};

// Get verified collaterals for a customer (with status filter)
export const getVerifiedCollaterals = (customerId) => {
  const customerCollaterals = collaterals.filter(c => c.customer_id === customerId);
  
  return customerCollaterals.map(collateral => {
    const collateralType = collateralTypes.find(ct => ct.collateral_type_id === collateral.collateral_type_id);
    
    // Determine dynamic status based on current usage
    let dynamicStatus = collateral.status; // Use original status from data
    
    // Check if being used in any pending or active loan
    const isUsed = loans.some(loan => 
      loan.collateral_id === collateral.collateral_id && 
      (loan.status === 'PENDING' || loan.status === 'ACTIVE')
    );
    
    // If collateral is marked as AVAILABLE but is being used, update to IN_USE
    if (isUsed && collateral.status === 'AVAILABLE') {
      dynamicStatus = 'IN_USE';
    }
    
    return {
      ...collateral,
      collateralTypeName: collateralType?.type_name || 'Unknown',
      status: dynamicStatus,
      max_ltv: collateralType?.max_ltv,
    };
  });
};
