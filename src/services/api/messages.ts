import api from "./config";
import type { Message, CreateMessageData, UpdateMessageData } from "@/types";

export const messagesApi = {
  // Get all messages
  getAll: async (): Promise<Message[]> => {
    try {
      const response = await api.get("/messages");
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
    }
  },

  // Get message by ID
  getById: async (id: string): Promise<Message> => {
    try {
      const response = await api.get(`/messages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw new Error("Failed to fetch message");
    }
  },

  // Create new message
  create: async (messageData: CreateMessageData): Promise<Message> => {
    try {
      const response = await api.post("/messages", {
        ...messageData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        isRead: messageData.isRead || false,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
      throw new Error("Failed to create message");
    }
  },

  // Update message
  update: async (
    id: string,
    messageData: UpdateMessageData
  ): Promise<Message> => {
    try {
      const response = await api.patch(`/messages/${id}`, messageData);
      return response.data;
    } catch (error) {
      console.error("Error updating message:", error);
      throw new Error("Failed to update message");
    }
  },

  // Toggle read status
  toggleReadStatus: async (
    id: string,
    currentStatus: boolean
  ): Promise<Message> => {
    try {
      const response = await api.patch(`/messages/${id}`, {
        isRead: !currentStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling read status:", error);
      throw new Error("Failed to toggle read status");
    }
  },

  // Mark as read
  markAsRead: async (id: string): Promise<Message> => {
    try {
      const response = await api.patch(`/messages/${id}`, {
        isRead: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error marking message as read:", error);
      throw new Error("Failed to mark message as read");
    }
  },

  // Mark as unread
  markAsUnread: async (id: string): Promise<Message> => {
    try {
      const response = await api.patch(`/messages/${id}`, {
        isRead: false,
      });
      return response.data;
    } catch (error) {
      console.error("Error marking message as unread:", error);
      throw new Error("Failed to mark message as unread");
    }
  },

  // Delete message
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/messages/${id}`);
    } catch (error) {
      console.error("Error deleting message:", error);
      throw new Error("Failed to delete message");
    }
  },

  // Delete multiple messages
  deleteMultiple: async (ids: string[]): Promise<void> => {
    try {
      await Promise.all(ids.map((id) => api.delete(`/messages/${id}`)));
    } catch (error) {
      console.error("Error deleting multiple messages:", error);
      throw new Error("Failed to delete multiple messages");
    }
  },

  // Delete all messages
  deleteAll: async (): Promise<void> => {
    try {
      const messages = await messagesApi.getAll();
      await messagesApi.deleteMultiple(messages.map((msg) => msg.id));
    } catch (error) {
      console.error("Error deleting all messages:", error);
      throw new Error("Failed to delete all messages");
    }
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    try {
      const messages = await messagesApi.getAll();
      const unreadMessages = messages.filter((msg) => !msg.isRead);

      await Promise.all(
        unreadMessages.map((msg) =>
          api.patch(`/messages/${msg.id}`, { isRead: true })
        )
      );
    } catch (error) {
      console.error("Error marking all messages as read:", error);
      throw new Error("Failed to mark all messages as read");
    }
  },

  // Get unread messages
  getUnread: async (): Promise<Message[]> => {
    try {
      const response = await api.get("/messages", {
        params: { isRead: false },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching unread messages:", error);
      throw new Error("Failed to fetch unread messages");
    }
  },

  // Get read messages
  getRead: async (): Promise<Message[]> => {
    try {
      const response = await api.get("/messages", {
        params: { isRead: true },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching read messages:", error);
      throw new Error("Failed to fetch read messages");
    }
  },

  // Search messages
  search: async (query: string): Promise<Message[]> => {
    try {
      if (!query.trim()) {
        return await messagesApi.getAll();
      }

      const response = await api.get("/messages", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching messages:", error);
      throw new Error("Failed to search messages");
    }
  },

  // Filter by status
  filterByStatus: async (
    status: "read" | "unread" | "all"
  ): Promise<Message[]> => {
    try {
      if (status === "all") {
        return await messagesApi.getAll();
      } else if (status === "read") {
        return await messagesApi.getRead();
      } else {
        return await messagesApi.getUnread();
      }
    } catch (error) {
      console.error("Error filtering messages by status:", error);
      throw new Error("Failed to filter messages by status");
    }
  },

  // Sort messages
  sortMessages: async (sortBy: "newest" | "oldest"): Promise<Message[]> => {
    try {
      const messages = await messagesApi.getAll();

      return messages.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
    } catch (error) {
      console.error("Error sorting messages:", error);
      throw new Error("Failed to sort messages");
    }
  },
};
