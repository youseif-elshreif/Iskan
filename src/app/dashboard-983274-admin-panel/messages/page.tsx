"use client";

import React, { useState, useEffect } from "react";
import {
  MessagesHeader,
  MessagesFilters,
  MessagesList,
  MessageNotification,
} from "@/components/messages";
import { useMessages } from "@/services/hooks/useMessages";
import { Message } from "@/types";

export default function MessagesPage() {
  // استخدام الـ custom hooks
  const {
    messages,
    loading,
    toggleReadStatus,
    deleteMessage: deleteMessageAPI,
    deleteAllMessages: deleteAllMessagesAPI,
    markAllAsRead: markAllAsReadAPI,
    unreadCount,
  } = useMessages();

  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Show message for 3 seconds
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Mark message as read/unread
  const handleToggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleReadStatus(id, currentStatus);
      showMessage(
        !currentStatus
          ? "تم تعليم الرسالة كمقروءة"
          : "تم تعليم الرسالة كغير مقروءة",
        "success"
      );
    } catch {
      showMessage("فشل في تحديث الرسالة", "error");
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;

    try {
      await deleteMessageAPI(id);
      showMessage("تم حذف الرسالة بنجاح", "success");
    } catch {
      showMessage("فشل في حذف الرسالة", "error");
    }
  };

  // Delete all messages
  const handleDeleteAllMessages = async () => {
    if (messages.length === 0) {
      showMessage("لا توجد رسائل للحذف", "error");
      return;
    }

    if (
      !confirm(
        "هل أنت متأكد من حذف جميع الرسائل؟ لا يمكن التراجع عن هذا الإجراء."
      )
    )
      return;

    try {
      await deleteAllMessagesAPI();
      showMessage("تم حذف جميع الرسائل بنجاح", "success");
    } catch {
      showMessage("فشل في حذف الرسائل", "error");
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    const unreadMessages = messages.filter((msg) => !msg.isRead);
    if (unreadMessages.length === 0) {
      showMessage("جميع الرسائل مقروءة بالفعل", "error");
      return;
    }

    try {
      await markAllAsReadAPI();
      showMessage("تم تعليم جميع الرسائل كمقروءة", "success");
    } catch {
      showMessage("فشل في تحديث الرسائل", "error");
    }
  };

  // Filter and search messages
  useEffect(() => {
    let filtered = messages;

    // Filter by status
    if (filterStatus === "read") {
      filtered = filtered.filter((msg) => msg.isRead);
    } else if (filterStatus === "unread") {
      filtered = filtered.filter((msg) => !msg.isRead);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (msg.email &&
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort messages
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMessages(filtered);
  }, [messages, filterStatus, searchTerm, sortBy]);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        <MessagesHeader
          totalMessages={messages.length}
          unreadCount={unreadCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDeleteAll={handleDeleteAllMessages}
          loading={loading}
        />

        <MessageNotification message={message} />

        <MessagesFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <MessagesList
          messages={filteredMessages}
          onToggleRead={handleToggleReadStatus}
          onDelete={handleDeleteMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}
