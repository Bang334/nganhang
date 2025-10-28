import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Overview = () => {
  return (
    <div className="fade-in">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Chờ duyệt</div>
              <div className="stat-value">8</div>
            </div>
            <FileText size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-header">
            <div>
              <div className="stat-title">Đã duyệt (tháng)</div>
              <div className="stat-value">15</div>
            </div>
            <CheckCircle size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card danger">
          <div className="stat-header">
            <div>
              <div className="stat-title">Từ chối (tháng)</div>
              <div className="stat-value">3</div>
            </div>
            <XCircle size={40} className="stat-icon" />
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-header">
            <div>
              <div className="stat-title">Nợ quá hạn</div>
              <div className="stat-value">5</div>
            </div>
            <AlertCircle size={40} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-4 mt-4">
        <div className="card">
          <h3 className="card-header">Thống kê theo loại vay</h3>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Vay mua nhà</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-semibold w-8">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vay tiêu dùng</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-semibold w-8">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Vay kinh doanh</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-semibold w-8">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Hoạt động gần đây</h3>
          <div className="p-4">
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 pb-2 border-b">
                <CheckCircle size={16} className="text-success mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Đã duyệt hồ sơ LN002345</div>
                  <div className="text-xs text-secondary">10:30 - 23/10/2025</div>
                </div>
              </div>
              <div className="flex gap-3 pb-2 border-b">
                <XCircle size={16} className="text-danger mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Từ chối hồ sơ LN002340</div>
                  <div className="text-xs text-secondary">09:45 - 23/10/2025</div>
                </div>
              </div>
              <div className="flex gap-3 pb-2 border-b">
                <FileText size={16} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Xem chi tiết hồ sơ LN002348</div>
                  <div className="text-xs text-secondary">09:15 - 23/10/2025</div>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={16} className="text-success mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Đã duyệt hồ sơ LN002338</div>
                  <div className="text-xs text-secondary">08:30 - 23/10/2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

