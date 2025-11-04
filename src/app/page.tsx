"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Table } from "antd";
import type { TableProps } from "antd";

// ---- Mock chart data ----
const ordersByDay = [
  { day: "01/11", orders: 32, success: 24 },
  { day: "02/11", orders: 28, success: 20 },
  { day: "03/11", orders: 40, success: 34 },
  { day: "04/11", orders: 36, success: 30 },
  { day: "05/11", orders: 22, success: 18 },
  { day: "06/11", orders: 30, success: 25 },
  { day: "07/11", orders: 44, success: 38 },
];

const pieData = [
  { name: "Thành công", value: 320 },
  { name: "Đang vận chuyển", value: 90 },
  { name: "Đã hủy", value: 30 },
];

const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

const notifications = [
  {
    id: 1,
    type: "success",
    message: "Đơn hàng SLT25110482873 đã giao thành công",
    time: "5 phút trước",
  },
  {
    id: 2,
    type: "processing",
    message: "Đơn hàng SLT25110567221 đang được vận chuyển đến KCN VSIP 2",
    time: "12 phút trước",
  },
  {
    id: 3,
    type: "error",
    message: "Đơn hàng SLT25110567223 đã bị hủy bởi khách hàng",
    time: "10 phút trước",
  },
];

const STATUS_COLORS: Record<string, string> = {
  success: "bg-[#10B981]",
  processing: "bg-[#3B82F6]",
  warning: "bg-[#F59E0B]",
  error: "bg-[#EF4444]",
};

type OrderRow = {
  key: number;
  index: number;
  customer: string;
  phone: string;
  containers: number;
  orderCode: string;
  containerCode: string;
  date: string;
  note: string;
  from: string;
  to: string;
  size: string;
  weight: number;
  amount: number;
};

// ✅ FIX TYPE FOR ANT DESIGN v5
const columns: TableProps<OrderRow>["columns"] = [
  { title: "Mã đơn hàng", dataIndex: "orderCode", key: "orderCode", width: 150 },
  { title: "Số cont", dataIndex: "containerCode", key: "containerCode", width: 140 },
  { title: "Kích cỡ", dataIndex: "size", key: "size", width: 90 },
  { title: "Trọng lượng (tấn)", dataIndex: "weight", key: "weight", width: 140 },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
    width: 140,
    render: (v: number) => `${v.toLocaleString()}₫`,
  },
  { title: "Tên chủ hàng", dataIndex: "customer", key: "customer", width: 220 },
  { title: "ĐT chủ hàng", dataIndex: "phone", key: "phone", width: 130 },
  { title: "Ngày lấy hàng", dataIndex: "date", key: "date", width: 120 },
  { title: "Điểm đi", dataIndex: "from", key: "from", width: 220 },
  { title: "Điểm đến", dataIndex: "to", key: "to", width: 220 },
  { title: "Ghi chú", dataIndex: "note", key: "note", width: 160 },
  {
    title: "Nhận đơn",
    key: "action",
    width: 110,
    fixed: "right",
    render: () => (
      <button className="px-2 py-1 bg-[#10B981] text-white rounded">
        Nhận đơn
      </button>
    ),
  },
];

const data: OrderRow[] = [
  {
    key: 1,
    index: 1,
    customer: "CÔNG TY TNHH DV TM TÍN PHÁT",
    phone: "0918274654",
    containers: 1,
    orderCode: "SLT25110482873",
    containerCode: "WHYU0926482",
    date: "2025-11-04",
    note: "",
    from: "Cảng Tân cảng - Cái Mép Thị Vải",
    to: "Cảng Container Quốc Tế SP-ITC",
    size: "22G0",
    weight: 20,
    amount: 9800000,
  },
  {
    key: 2,
    index: 2,
    customer: "CÔNG TY TNHH XNK HOÀNG MINH",
    phone: "0905123456",
    containers: 2,
    orderCode: "SLT25110499312",
    containerCode: "TGHU3839201",
    date: "2025-11-05",
    note: "Hàng lạnh",
    from: "Cảng Cát Lái",
    to: "KCN VSIP 2 Bình Dương",
    size: "45R1",
    weight: 18,
    amount: 32000000,
  },
  {
    key: 3,
    index: 3,
    customer: "CTY CP LOGISTICS AN KHANG",
    phone: "0987654321",
    containers: 1,
    orderCode: "SLT25110512889",
    containerCode: "CAIU8293745",
    date: "2025-11-06",
    note: "",
    from: "Depot Trường Thọ",
    to: "KCN Hiệp Phước",
    size: "22G1",
    weight: 24,
    amount: 10500000,
  },
  {
    key: 4,
    index: 4,
    customer: "CTY TNHH THƯƠNG MẠI QUANG TÚ",
    phone: "0934567890",
    containers: 3,
    orderCode: "SLT25110567221",
    containerCode: "GESU3920184",
    date: "2025-11-06",
    note: "Ưu tiên giao buổi sáng",
    from: "Cảng SP-PSA",
    to: "Cảng ICD Long Bình",
    size: "40HC",
    weight: 28,
    amount: 36000000,
  },
  // ... giữ nguyên các item còn lại ...
];

export default function TransportDashboardMockup() {
  return (
    <div className="min-h-screen p-6">
      {/* ---- HEADER ---- */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-indigo-600 to-indigo-400 rounded-lg flex items-center justify-center text-white font-bold">
            TN
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              Dashboard Nhà xe — Vận Tải Nhanh
            </h1>
            <p className="text-sm text-gray-500">Tổng quan hoạt động & báo cáo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select className="border rounded px-3 py-2">
            <option>Hôm nay</option>
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>Quý</option>
            <option>Tùy chỉnh...</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded shadow">
            Xuất Excel
          </button>
        </div>
      </header>

      {/* ---- MAIN CONTENT ---- */}
      <main className="grid grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <section className="col-span-7 space-y-6">
          {/* --- Summary Cards --- */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Tổng số lượng đơn hàng</p>
              <p className="text-2xl font-semibold mt-2">4,520</p>
            </div>
            <div className="p-4 rounded-lg shadow border-l-4 border-[#10B981] bg-[#10B981]/10">
              <p className="text-sm text-gray-600">Đơn hàng vận chuyển thành công</p>
              <p className="text-2xl font-semibold mt-2 text-[#0E6244]">3,980</p>
            </div>
            <div className="p-4 rounded-lg shadow border-l-4 border-[#3B82F6] bg-[#3B82F6]/10">
              <p className="text-sm text-gray-600">Đơn hàng đang vận chuyển</p>
              <p className="text-2xl font-semibold mt-2 text-[#3B82F6]">420</p>
            </div>
            <div className="p-4 rounded-lg shadow border-l-4 border-[#EF4444] bg-[#EF4444]/10">
              <p className="text-sm text-gray-600">Đơn hàng đã hủy</p>
              <p className="text-2xl font-semibold mt-2 text-[#EF4444]">120</p>
            </div>
          </div>

          {/* --- Chart: Orders by Day --- */}
          <div className="p-4 rounded-lg shadow">
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

          {/* --- Stats Boxes --- */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Khách hàng</h4>
              <p className="text-sm text-gray-500">Tổng khách hàng</p>
              <p className="text-2xl font-semibold mt-1">1,254</p>
              <div className="mt-3 text-sm text-gray-600">
                Khách hàng mới hôm nay: <span className="font-medium">+12</span>
              </div>
            </div>
            <div className="p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Doanh thu</h4>
              <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
              <p className="text-2xl font-semibold mt-1">₫ 1,250,000,000</p>
              <div className="mt-3 text-sm text-gray-600">
                Tổng doanh thu tháng: ₫ 28,500,000,000
              </div>
            </div>
          </div>
        </section>

        {/* ---- RIGHT SIDE ---- */}
        <aside className="col-span-5 space-y-6">
          {/* ---- Company Info Card ---- */}
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Công ty TNHH VĨNH KHANG</h2>
                  <button className="text-gray-500 hover:text-gray-700 text-sm underline">🖊️</button>
                </div>

                <div className="mt-3 text-sm leading-relaxed space-y-1">
                  <p><span className="italic text-gray-600">Mã số thuế:</span> <span className="text-gray-800">MST081707</span></p>
                  <p><span className="italic text-gray-600">Địa chỉ:</span> Thành Phố Hồ Chí Minh</p>
                  <p>
                    <span className="italic text-gray-600">Email:</span>{" "}
                    <a href="mailto:trananhhtu1112003@gmail.com" className="text-gray-800 hover:underline">
                      trananhhtu1112003@gmail.com
                    </a>
                  </p>
                  <p><span className="italic text-gray-600">Điện thoại:</span> <span className="text-gray-800">0817070945</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Notifications ---- */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Thông báo</h3>
            <div className="space-y-3 max-h-32 overflow-y-auto pr-1">
              {notifications.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <span className={`mt-1 w-2.5 h-2.5 rounded-full ${STATUS_COLORS[item.type]}`} />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-700 leading-snug">{item.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Pie Chart ---- */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Tình trạng đơn hàng (tỉ lệ)</h3>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </aside>

        {/* ---- TABLE ---- */}
        <section className="col-span-12">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-3">Danh sách đơn hàng cần vận chuyển</h3>
            <Table<OrderRow>
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1500 }}
              size="middle"
            />
          </div>
        </section>
      </main>

      <footer className="mt-6 text-sm text-gray-500">
        Cập nhật lần cuối: 07/11/2025 — Dữ liệu demo
      </footer>
    </div>
  );
}
