"use client";
import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Dummy data
const ordersByDay = [
  { day: "01/11", orders: 32, success: 24, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "02/11", orders: 28, success: 20, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "03/11", orders: 40, success: 34, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "04/11", orders: 36, success: 30, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "05/11", orders: 22, success: 18, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "06/11", orders: 30, success: 25, name : 'đơn hàng', successName: 'đơn hàng thành công' },
  { day: "07/11", orders: 44, success: 38, name : 'đơn hàng', successName: 'đơn hàng thành công' },
];

const vehiclesStats = [
  { name: "Nhà xe A", active: 25, transporting: 8, cancelled: 2 },
  { name: "Nhà xe B", active: 18, transporting: 5, cancelled: 1 },
  { name: "Nhà xe C", active: 22, transporting: 6, cancelled: 3 },
];

const pieData = [
  { name: "Thành công", value: 320 },
  { name: "Đang vận tải", value: 90 },
  { name: "Đã hủy", value: 30 },
];
const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

export default function TransportDashboardMockup() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-lg flex items-center justify-center text-white font-bold">TN</div>
          <div>
            <h1 className="text-2xl font-semibold">Dashboard Nhà xe — Vận Tải Nhanh</h1>
            <p className="text-sm text-gray-500">Tổng quan hoạt động & báo cáo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select className="border rounded px-3 py-2 bg-white">
            <option>Hôm nay</option>
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>Quý</option>
            <option>Tùy chọn...</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Xuất Excel</button>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Left column: Chủ hàng overview */}
        <section className="col-span-7 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-semibold mt-2">4,520</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Thành công</p>
              <p className="text-2xl font-semibold mt-2">3,980</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Đang vận tải</p>
              <p className="text-2xl font-semibold mt-2">420</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Đã hủy</p>
              <p className="text-2xl font-semibold mt-2">120</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Đơn hàng theo ngày</h3>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={ordersByDay}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" name="Đơn hàng" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" name="Đơn hàng thành công" dataKey="success" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Khách hàng</h4>
              <p className="text-sm text-gray-500">Tổng khách hàng</p>
              <p className="text-2xl font-semibold mt-1">1,254</p>
              <div className="mt-3 text-sm text-gray-600">Khách hàng mới hôm nay: <span className="font-medium">+12</span></div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Doanh thu (Kế toán)</h4>
              <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
              <p className="text-2xl font-semibold mt-1">₫ 1,250,000,000</p>
              <div className="mt-3 text-sm text-gray-600">Tổng doanh thu tháng: ₫ 28,500,000,000</div>
            </div>  
          </div>
        </section>

        {/* Right column: Nhà xe overview */}
        <aside className="col-span-5 space-y-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Tình trạng đơn hàng (tỉ lệ)</h3>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Top 3 Nhà xe mới</h3>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="pb-2">Nhà xe</th>
                  <th className="pb-2">Ngày</th>
                  <th className="pb-2">Tài xế</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">Nhà xe A</td>
                  <td className="py-2">30/10/2025</td>
                  <td className="py-2">12</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Nhà xe B</td>
                  <td className="py-2">31/10/2025</td>
                  <td className="py-2">8</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Nhà xe C</td>
                  <td className="py-2">01/11/2025</td>
                  <td className="py-2">10</td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Cập nhật & cảnh báo</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>🔔 Xe A1234 hết hạn đăng kiểm ngày 05/11/2025</li>
              <li>🔔 Nhà xe B có 3 tài xế chưa hoàn thành xác thực</li>
              <li>🔔 Có 4 đơn hàng chưa được phân tài xế</li>
            </ul>
          </div>
        </aside>

        {/* Full width: Detailed table or controls */}
        <section className="col-span-12">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Bảng tóm tắt nhà xe - đơn hàng</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr>
                    <th className="pb-2">Mã đơn</th>
                    <th className="pb-2">Nhà xe</th>
                    <th className="pb-2">Trạng thái</th>
                    <th className="pb-2">Tài xế</th>
                    <th className="pb-2">Ngày</th>
                    <th className="pb-2">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2">DH-000123</td>
                    <td className="py-2">Nhà xe A</td>
                    <td className="py-2">Đang vận tải</td>
                    <td className="py-2">Nguyễn Văn A</td>
                    <td className="py-2">07/11/2025</td>
                    <td className="py-2">₫ 12,000,000</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">DH-000124</td>
                    <td className="py-2">Nhà xe B</td>
                    <td className="py-2">Thành công</td>
                    <td className="py-2">Trần Thị B</td>
                    <td className="py-2">06/11/2025</td>
                    <td className="py-2">₫ 8,500,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-6 text-sm text-gray-500">Cập nhật lần cuối: 07/11/2025 — Dữ liệu demo</footer>
    </div>
  );
}