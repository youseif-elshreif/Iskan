import React from "react";
import Card from "@/components/ui/Card";
import MessageCard from "@/components/MessageCard";
import { FaEnvelope } from "react-icons/fa";

interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface MessagesListProps {
  messages: Message[];
  onToggleRead: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  onToggleRead,
  onDelete,
  loading,
}) => {
  if (messages.length === 0) {
    return (
      <Card className="text-center py-12">
        <FaEnvelope
          className="mx-auto mb-4 text-6xl"
          style={{ color: "var(--color-text-muted)" }}
        />
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          لا توجد رسائل
        </h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          لم يتم العثور على رسائل تطابق معايير البحث والفلترة
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onToggleRead={onToggleRead}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default MessagesList;
