// SubjectDetail.tsx
import { Divider } from "antd";
import Chat from "pages/Tickets/Chat";
import React from "react";

interface SubjectDetailProps {
  record: any;
  onClose: () => void;
}

const SubjectDetail: React.FC<SubjectDetailProps> = ({ record, onClose }) => {
  return (
    <div className="w-[calc(100%)] rounded-lg bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[16px] font-semibold">
            {record.subject} (ID: {record.id})
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
      <Divider className="my-3" />
      <Chat id={record.id} messages={record.ticket_messages} />
    </div>
  );
};

export default SubjectDetail;
