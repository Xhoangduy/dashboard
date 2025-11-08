"use client";

import { Badge, Popover, List, Typography, Button, Space } from "antd";
import {
  BellOutlined,
  CheckCircleFilled,
  CarFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useState } from "react";

const notifications: Notification[] = [
  {
    id: 1,
    status: "success",
    message: "Đơn hàng SLT25110482873 đã giao thành công",
    time: "5 phút trước",
  },
  {
    id: 2,
    status: "shipping",
    message: "Đơn hàng SLT25110567221 đang được vận chuyển",
    time: "12 phút trước",
  },
  {
    id: 3,
    status: "error",
    message: "Đơn hàng SLT25110567223 đã bị hủy",
    time: "10 phút trước",
  },
];

type NotificationStatus = 'success' | 'shipping' | 'error';

interface Notification {
  id: number;
  status: NotificationStatus;
  message: string;
  time: string;
}


const statusIcon: Record<NotificationStatus, React.ReactElement> = {
  success: <CheckCircleFilled style={{ color: "#52c41a", fontSize: 22 }} />,
  shipping: <CarFilled style={{ color: "#1890ff", fontSize: 22 }} />,
  error: <CloseCircleFilled style={{ color: "#ff4d4f", fontSize: 22 }} />,
};



export function NotificationBell() {
  const [open, setOpen] = useState(false);

  const NotificationPanel = (
    <div
      style={{
        width: 320,
        maxHeight: 350,
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafcff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Text strong style={{ fontSize: 16 }}>
          Thông báo
        </Typography.Text>
        <Button
          type="link"
          size="small"
          style={{ padding: 0, fontSize: 13 }}
        >
          Đánh dấu đã đọc
        </Button>
      </div>
      {/* Items */}
      <List
        dataSource={notifications}
        style={{
          background: "#fff",
          padding: "0 0 6px 0",
          border: "none",
          maxHeight: 290,
          overflowY: "auto",
        }}
        renderItem={item => (
          <List.Item
            style={{
              padding: "15px 18px",
              gap: 14,
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              transition: "background 0.20s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#f7f7f8"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <Space align="start" size={14}>
              {statusIcon[item.status]}
              <div>
                <Typography.Text style={{ fontSize: 14 }}>
                  {item.message}
                </Typography.Text>
                <br />
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {item.time}
                </Typography.Text>
              </div>
            </Space>
          </List.Item>
        )}
        locale={{ emptyText: <Typography.Text type="secondary">Không có thông báo</Typography.Text> }}
      />
    </div>
  );

  return (
    <Popover
      content={NotificationPanel}
      placement="bottomRight"
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      overlayStyle={{ zIndex: 1050 }}
    >
      <Badge count={notifications.length} color="red" size="default">
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 24}} />}
          style={{
            padding: 0,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Badge>
    </Popover>
  );
}
