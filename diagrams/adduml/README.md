# Sơ đồ UML bổ sung cho Báo cáo Tổng hợp

Thư mục này chứa các sơ đồ UML bổ sung được tạo để hoàn thiện tài liệu báo cáo.

## Danh sách sơ đồ

### 1. Context Diagram (`01-context-diagram.puml`)
**Vị trí trong báo cáo:** Phần 1 - Tổng quan về đề tài

**Mô tả:** 
- Mô tả hệ thống và các bên liên quan (actors)
- Hiển thị mối quan hệ giữa hệ thống với các external entities
- Bao gồm: Khách hàng, Nhân viên, Ngân hàng Nhà nước, Payment Gateway, CIC, SMS Gateway, Email Service

### 2. Component Diagram (`02-component-diagram.puml`)
**Vị trí trong báo cáo:** Phần 4 - Thiết kế kiến trúc

**Mô tả:**
- Mô tả các component chính của hệ thống
- Phân tầng: Presentation Layer, Application Layer, Business Logic Layer, Data Access Layer
- Hiển thị mối quan hệ và dependencies giữa các component

### 3. Deployment Diagram (`03-deployment-diagram.puml`)
**Vị trí trong báo cáo:** Phần 4 - Thiết kế kiến trúc (mục 4.6.2 - Deployment Architecture)

**Mô tả:**
- Mô tả kiến trúc triển khai hệ thống
- Bao gồm: Load Balancer, Web Servers, Application Servers, Database Cluster
- Hiển thị các external services và monitoring tools
- Mô tả replication và high availability

### 4. Database Schema Diagram (`04-database-schema-diagram.puml`)
**Vị trí trong báo cáo:** Phần 5 - Thiết kế cơ sở dữ liệu

**Mô tả:**
- Mô tả chi tiết cấu trúc database với 19 bảng chính
- Hiển thị các khóa chính (PK), khóa ngoại (FK), và các ràng buộc
- Mô tả quan hệ giữa các bảng (one-to-many, many-to-one)
- Bao gồm các indexes và constraints quan trọng

### 5. Architecture Overview (`05-architecture-overview.puml`)
**Vị trí trong báo cáo:** Phần 4 - Thiết kế kiến trúc (mục 4.2 - Kiến trúc hệ thống)

**Mô tả:**
- Tổng quan kiến trúc 3-Tier
- Phân tầng rõ ràng: Presentation, Business Logic, Data
- Mô tả luồng dữ liệu và tương tác giữa các tầng

### 6. Data Flow Diagram (`06-data-flow-diagram.puml`)
**Vị trí trong báo cáo:** Phần 4 - Thiết kế kiến trúc (mục 4.6.3 - Data Flow Architecture)

**Mô tả:**
- Mô tả luồng dữ liệu trong hệ thống
- Hiển thị cách dữ liệu di chuyển từ Frontend → API Gateway → Services → Database
- Bao gồm các luồng chính: Account Query, Transaction Processing, Loan Application
- Mô tả cache layer và database operations

## Cách sử dụng

### Xem sơ đồ
1. Sử dụng PlantUML để render các file `.puml`
2. Có thể sử dụng online editor: http://www.plantuml.com/plantuml/
3. Hoặc cài đặt PlantUML extension trong VS Code/IntelliJ

### Chèn vào báo cáo
1. Export sơ đồ thành hình ảnh (PNG/SVG)
2. Chèn hình ảnh vào file Markdown với cú pháp:
   ```markdown
   ![Tên sơ đồ](path/to/image.png)
   ```

### Công cụ đề xuất
- **VS Code:** Extension "PlantUML" của jebbs
- **IntelliJ IDEA:** Plugin "PlantUML integration"
- **Online:** http://www.plantuml.com/plantuml/
- **Command line:** PlantUML jar file

## Lưu ý

- Tất cả các sơ đồ sử dụng PlantUML syntax
- Có thể chỉnh sửa màu sắc, style trong từng file
- Đảm bảo các dependencies và relationships được mô tả chính xác
- Cập nhật sơ đồ khi có thay đổi trong kiến trúc hệ thống

## Liên kết với các sơ đồ khác

Các sơ đồ trong thư mục này bổ sung cho:
- `../usecase.puml` - Use Case Diagram
- `../class.puml` - Class Diagram  
- `../er.puml` - ER Diagram
- `../activity/*.puml` - Activity Diagrams
- `../sequence/*.puml` - Sequence Diagrams

