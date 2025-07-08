// config.ts
import { ColumnsType } from "antd/es/table";

type TicketStatusOption = {
  text: string;
  value: number;
};

export const TICKET_STATUS_OPTIONS: TicketStatusOption[] = [
  { text: "Pending", value: 0 },
  { text: "Answered", value: 1 },
  { text: "Closed", value: 2 },
  { text: "Welcome", value: 3 },
];

export const TICKET_SEARCH_OPTIONS = [
  { label: "Subject", value: 0 },
  { label: "Message", value: 1 },
];

export const ticketColumns: ColumnsType<any> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    width: 60,
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    width: 200,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    filters: TICKET_STATUS_OPTIONS,
    onFilter: (value, record) => record.status === value,
    render: (status: number) => {
      const statusItem = TICKET_STATUS_OPTIONS.find(
        (item) => item.value === status,
      );
      return statusItem ? statusItem.text : "Unknown";
    },
  },
  {
    title: "Last update",
    dataIndex: "lastUpdate",
    key: "lastUpdate",
    width: 160,
  },
];
