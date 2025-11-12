-- ============================================
-- HỆ THỐNG QUẢN LÝ NGÂN HÀNG - SCHEMA TỐI ƯU
-- Database Schema (Phiên bản học tập)
-- Created: 2025-10-27
-- ============================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS BankManagementSystem
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE BankManagementSystem;

-- ============================================
-- 1. QUẢN LÝ TỔ CHỨC
-- ============================================

-- Bảng Chi nhánh
CREATE TABLE Branches (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_code VARCHAR(20) UNIQUE NOT NULL,
    branch_name VARCHAR(200) NOT NULL,
    address VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(100),
    manager_id INT,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Vai trò
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Nhân viên
CREATE TABLE Employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    branch_id INT,
    role_id INT NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    INDEX idx_employee_code (employee_code),
    INDEX idx_employee_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Foreign key manager_id
ALTER TABLE Branches ADD FOREIGN KEY (manager_id) REFERENCES Employees(employee_id);

-- ============================================
-- 2. QUẢN LÝ KHÁCH HÀNG
-- ============================================

-- Bảng Khách hàng
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    id_card_number VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('M', 'F', 'OTHER'),
    address VARCHAR(500),
    occupation VARCHAR(100),
    monthly_income DECIMAL(18,2),
    registered_branch_id INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registered_branch_id) REFERENCES Branches(branch_id),
    INDEX idx_customer_code (customer_code),
    INDEX idx_customer_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Điểm tín dụng (Lưu điểm hiện tại)
CREATE TABLE CreditScores (
    score_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT UNIQUE NOT NULL,
    score INT NOT NULL CHECK (score >= 300 AND score <= 850),
    grade ENUM('AAA', 'AA+', 'AA', 'A+', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C') DEFAULT 'C',
    interest_rate DECIMAL(5,2) NOT NULL COMMENT 'Lãi suất áp dụng (%/năm)',
    max_ltv DECIMAL(5,2) NOT NULL COMMENT 'LTV tối đa (%)',
    on_time_payment_rate INT DEFAULT 100 COMMENT 'Tỷ lệ trả đúng hạn (%)',
    debt_to_income_ratio DECIMAL(5,2) DEFAULT 0 COMMENT 'Tỷ lệ nợ/thu nhập (%)',
    account_age_months INT DEFAULT 0 COMMENT 'Số tháng sử dụng dịch vụ',
    total_outstanding_debt DECIMAL(18,2) DEFAULT 0 COMMENT 'Tổng dư nợ hiện tại',
    late_payments INT DEFAULT 0 COMMENT 'Số kỳ quá hạn (12 tháng gần nhất)',
    monthly_income DECIMAL(18,2) COMMENT 'Thu nhập hàng tháng',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    INDEX idx_customer_score (customer_id),
    INDEX idx_score (score),
    INDEX idx_grade (grade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Lịch sử thay đổi điểm tín dụng
CREATE TABLE CreditScoreHistory (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    old_score INT COMMENT 'Điểm cũ',
    new_score INT NOT NULL COMMENT 'Điểm mới',
    score_change INT NOT NULL COMMENT 'Thay đổi (+/-)',
    old_grade VARCHAR(10) COMMENT 'Hạng cũ',
    new_grade VARCHAR(10) NOT NULL COMMENT 'Hạng mới',
    reason VARCHAR(500) NOT NULL COMMENT 'Lý do thay đổi',
    event_type ENUM('PAYMENT_ON_TIME', 'PAYMENT_LATE', 'LOAN_APPROVED', 'LOAN_PAID_OFF', 'OVERDUE_7_DAYS', 'OVERDUE_30_DAYS', 'OVERDUE_90_DAYS', 'MANUAL_ADJUSTMENT', 'INITIAL_SCORE') DEFAULT 'MANUAL_ADJUSTMENT',
    event_reference VARCHAR(100) COMMENT 'Tham chiếu đến sự kiện (loan_number, payment_id, etc)',
    created_by INT COMMENT 'Nhân viên thực hiện (nếu manual)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Employees(employee_id) ON DELETE SET NULL,
    INDEX idx_customer_history (customer_id, created_at DESC),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. QUẢN LÝ TÀI KHOẢN
-- ============================================

-- Bảng Loại tài khoản
CREATE TABLE AccountTypes (
    account_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(20) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    min_balance DECIMAL(18,2) DEFAULT 0,
    interest_rate DECIMAL(5,2) DEFAULT 0,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Tài khoản
CREATE TABLE Accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    account_type_id INT NOT NULL,
    branch_id INT NOT NULL,
    balance DECIMAL(18,2) DEFAULT 0,
    interest_rate DECIMAL(5,2) DEFAULT 0,
    opened_date DATE NOT NULL,
    status ENUM('ACTIVE', 'CLOSED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (account_type_id) REFERENCES AccountTypes(account_type_id),
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id),
    INDEX idx_account_number (account_number),
    INDEX idx_account_customer (customer_id),
    INDEX idx_account_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Thẻ ngân hàng (SIMPLIFIED)
CREATE TABLE Cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    card_number VARCHAR(255) UNIQUE NOT NULL, -- Encrypted
    account_id INT NOT NULL,
    card_type ENUM('DEBIT', 'CREDIT') DEFAULT 'DEBIT',
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status ENUM('ACTIVE', 'LOCKED', 'EXPIRED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    INDEX idx_card_account (account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. GIAO DỊCH
-- ============================================

-- Bảng Loại giao dịch
CREATE TABLE TransactionTypes (
    transaction_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(20) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Giao dịch (SIMPLIFIED)
CREATE TABLE Transactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    transaction_code VARCHAR(50) UNIQUE NOT NULL,
    transaction_type_id INT NOT NULL,
    from_account_id INT,
    to_account_id INT,
    from_bank_name VARCHAR(200), -- Ngân hàng gửi
    to_bank_name VARCHAR(200), -- Ngân hàng nhận (nếu chuyển khoản liên ngân hàng)
    amount DECIMAL(18,2) NOT NULL CHECK (amount > 0),
    fee DECIMAL(10,2) DEFAULT 0,
    description VARCHAR(500),
    balance_after DECIMAL(18,2), -- Số dư sau giao dịch
    status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_type_id) REFERENCES TransactionTypes(transaction_type_id),
    FOREIGN KEY (from_account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (to_account_id) REFERENCES Accounts(account_id),
    INDEX idx_transaction_code (transaction_code),
    INDEX idx_transaction_from (from_account_id),
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_transaction_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. TIẾT KIỆM
-- ============================================

-- Bảng Lãi suất tiết kiệm
CREATE TABLE SavingsInterestRates (
    rate_id INT PRIMARY KEY AUTO_INCREMENT,
    term_months INT NOT NULL,
    min_amount DECIMAL(18,2) NOT NULL,
    max_amount DECIMAL(18,2),
    interest_rate DECIMAL(5,2) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL,
    effective_to DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Sổ tiết kiệm
CREATE TABLE SavingsDeposits (
    deposit_id INT PRIMARY KEY AUTO_INCREMENT,
    deposit_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    account_id INT NOT NULL,
    branch_id INT NOT NULL,
    principal_amount DECIMAL(18,2) NOT NULL CHECK (principal_amount > 0),
    interest_rate_id INT NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    term_months INT NOT NULL,
    start_date DATE NOT NULL,
    maturity_date DATE NOT NULL,
    auto_renew ENUM('YES', 'NO') DEFAULT 'NO',
    total_interest_earned DECIMAL(18,2) DEFAULT 0,
    status ENUM('ACTIVE', 'MATURED', 'CLOSED', 'WITHDRAWN_EARLY') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id),
    FOREIGN KEY (interest_rate_id) REFERENCES SavingsInterestRates(rate_id),
    INDEX idx_savings_customer (customer_id),
    INDEX idx_savings_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Giao dịch tiết kiệm
CREATE TABLE SavingsTransactions (
    savings_transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    deposit_id INT NOT NULL,
    transaction_type ENUM('INITIAL_DEPOSIT', 'INTEREST_PAYMENT', 'EARLY_WITHDRAWAL', 'MATURITY_WITHDRAWAL', 'RENEWAL'),
    amount DECIMAL(18,2) NOT NULL,
    interest_amount DECIMAL(18,2) DEFAULT 0,
    description VARCHAR(500),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deposit_id) REFERENCES SavingsDeposits(deposit_id) ON DELETE CASCADE,
    INDEX idx_savings_trans_deposit (deposit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. VAY VỐN
-- ============================================

-- Bảng Loại tài sản thế chấp
CREATE TABLE CollateralTypes (
    collateral_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(20) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    max_ltv DECIMAL(5,2) DEFAULT 70.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Tài sản thế chấp
CREATE TABLE Collaterals (
    collateral_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    collateral_type_id INT NOT NULL,
    collateral_name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(500),
    certificate_number VARCHAR(100),
    issue_date DATE,
    issue_authority VARCHAR(200),
    original_value DECIMAL(18,2),
    appraised_value DECIMAL(18,2) DEFAULT 0,
    appraised_by INT, -- Nhân viên thẩm định
    appraised_date DATE,
    status ENUM('PENDING', 'AVAILABLE', 'IN_USE', 'REJECTED') DEFAULT 'PENDING',
    verification_notes VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (collateral_type_id) REFERENCES CollateralTypes(collateral_type_id),
    FOREIGN KEY (appraised_by) REFERENCES Employees(employee_id),
    INDEX idx_collateral_customer (customer_id),
    INDEX idx_collateral_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Loại hình vay
CREATE TABLE LoanTypes (
    loan_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(20) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    max_amount DECIMAL(18,2),
    max_term_months INT,
    require_collateral ENUM('YES', 'NO') DEFAULT 'NO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Lãi suất cho vay
CREATE TABLE LoanInterestRates (
    rate_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_type_id INT NOT NULL,
    min_amount DECIMAL(18,2),
    max_amount DECIMAL(18,2),
    term_months_from INT,
    term_months_to INT,
    credit_grade ENUM('AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'),
    base_rate DECIMAL(5,2) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    FOREIGN KEY (loan_type_id) REFERENCES LoanTypes(loan_type_id),
    INDEX idx_loan_rate_type (loan_type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Khoản vay
CREATE TABLE Loans (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    account_id INT NOT NULL,
    loan_type_id INT NOT NULL,
    branch_id INT NOT NULL,
    loan_officer_id INT NOT NULL,
    loan_amount DECIMAL(18,2) NOT NULL,
    approved_amount DECIMAL(18,2),
    interest_rate_id INT,
    interest_rate DECIMAL(5,2) NOT NULL,
    term_months INT NOT NULL,
    monthly_payment DECIMAL(18,2),
    purpose VARCHAR(500),
    collateral_id INT,
    collateral_value DECIMAL(18,2),
    ltv_ratio DECIMAL(5,2),
    outstanding_balance DECIMAL(18,2) DEFAULT 0,
    application_date DATE NOT NULL,
    approved_date DATE,
    approved_by INT,
    rejection_reason VARCHAR(500),
    disbursement_date DATE,
    first_payment_date DATE,
    maturity_date DATE,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'PAID_OFF', 'OVERDUE') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (loan_type_id) REFERENCES LoanTypes(loan_type_id),
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id),
    FOREIGN KEY (loan_officer_id) REFERENCES Employees(employee_id),
    FOREIGN KEY (interest_rate_id) REFERENCES LoanInterestRates(rate_id),
    FOREIGN KEY (collateral_id) REFERENCES Collaterals(collateral_id),
    FOREIGN KEY (approved_by) REFERENCES Employees(employee_id),
    INDEX idx_loan_number (loan_number),
    INDEX idx_loan_customer (customer_id),
    INDEX idx_loan_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Lịch trả nợ
CREATE TABLE LoanPaymentSchedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT NOT NULL,
    payment_number INT NOT NULL,
    due_date DATE NOT NULL,
    principal_amount DECIMAL(18,2) NOT NULL,
    interest_amount DECIMAL(18,2) NOT NULL,
    total_payment DECIMAL(18,2) NOT NULL,
    outstanding_balance DECIMAL(18,2),
    status ENUM('PENDING', 'PAID', 'OVERDUE', 'PARTIAL_PAID') DEFAULT 'PENDING',
    paid_amount DECIMAL(18,2) DEFAULT 0,
    paid_date DATE,
    FOREIGN KEY (loan_id) REFERENCES Loans(loan_id) ON DELETE CASCADE,
    INDEX idx_schedule_loan (loan_id),
    INDEX idx_schedule_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng Thanh toán khoản vay
CREATE TABLE LoanPayments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT NOT NULL,
    schedule_id INT,
    transaction_id BIGINT,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    principal_paid DECIMAL(18,2) NOT NULL,
    interest_paid DECIMAL(18,2) NOT NULL,
    late_fee_paid DECIMAL(10,2) DEFAULT 0,
    total_paid DECIMAL(18,2) NOT NULL,
    payment_method ENUM('AUTO_DEBIT', 'CASH', 'TRANSFER', 'ONLINE'),
    reference_number VARCHAR(100),
    notes VARCHAR(500),
    FOREIGN KEY (loan_id) REFERENCES Loans(loan_id),
    FOREIGN KEY (schedule_id) REFERENCES LoanPaymentSchedule(schedule_id),
    FOREIGN KEY (transaction_id) REFERENCES Transactions(transaction_id),
    INDEX idx_payment_loan (loan_id),
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- END OF SCHEMA
-- ============================================

