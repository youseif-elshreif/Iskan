import { useState, useEffect, useCallback, useMemo } from 'react';
import { messagesApi } from '../api/messages';
import type { 
  UseMessagesReturn, 
  Message, 
  CreateMessageData, 
  UpdateMessageData 
} from '@/types';

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get filtered messages
  const unreadMessages = useMemo(
    () => messages.filter(msg => !msg.isRead),
    [messages]
  );

  const readMessages = useMemo(
    () => messages.filter(msg => msg.isRead),
    [messages]
  );

  const unreadCount = useMemo(
    () => unreadMessages.length,
    [unreadMessages]
  );

  // Fetch all messages
  const fetchMessages = useCallback(async (): Promise<Message[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await messagesApi.getAll();
      setMessages(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create message
  const createMessage = useCallback(
    async (data: CreateMessageData): Promise<Message> => {
      setLoading(true);
      setError(null);
      try {
        const newMessage = await messagesApi.create(data);
        setMessages(prev => [newMessage, ...prev]);
        return newMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create message';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update message
  const updateMessage = useCallback(
    async (id: string, data: UpdateMessageData): Promise<Message> => {
      setLoading(true);
      setError(null);
      try {
        const updatedMessage = await messagesApi.update(id, data);
        setMessages(prev =>
          prev.map(msg => msg.id === id ? updatedMessage : msg)
        );
        return updatedMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update message';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Toggle read status
  const toggleReadStatus = useCallback(
    async (id: string, currentStatus: boolean): Promise<Message> => {
      setLoading(true);
      setError(null);
      try {
        const updatedMessage = await messagesApi.toggleReadStatus(id, currentStatus);
        setMessages(prev =>
          prev.map(msg => msg.id === id ? updatedMessage : msg)
        );
        return updatedMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to toggle read status';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Mark as read
  const markAsRead = useCallback(
    async (id: string): Promise<Message> => {
      setLoading(true);
      setError(null);
      try {
        const updatedMessage = await messagesApi.markAsRead(id);
        setMessages(prev =>
          prev.map(msg => msg.id === id ? updatedMessage : msg)
        );
        return updatedMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to mark as read';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Mark as unread
  const markAsUnread = useCallback(
    async (id: string): Promise<Message> => {
      setLoading(true);
      setError(null);
      try {
        const updatedMessage = await messagesApi.markAsUnread(id);
        setMessages(prev =>
          prev.map(msg => msg.id === id ? updatedMessage : msg)
        );
        return updatedMessage;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to mark as unread';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete message
  const deleteMessage = useCallback(
    async (id: string): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await messagesApi.delete(id);
        setMessages(prev => prev.filter(msg => msg.id !== id));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete message';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete multiple messages
  const deleteMultipleMessages = useCallback(
    async (ids: string[]): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await messagesApi.deleteMultiple(ids);
        setMessages(prev => prev.filter(msg => !ids.includes(msg.id)));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete multiple messages';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete all messages
  const deleteAllMessages = useCallback(
    async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await messagesApi.deleteAll();
        setMessages([]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete all messages';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Mark all as read
  const markAllAsRead = useCallback(
    async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await messagesApi.markAllAsRead();
        setMessages(prev =>
          prev.map(msg => ({ ...msg, isRead: true }))
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to mark all as read';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Search messages
  const searchMessages = useCallback(
    async (query: string): Promise<Message[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await messagesApi.search(query);
        setMessages(data);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to search messages';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Filter by status
  const filterByStatus = useCallback(
    async (status: "read" | "unread" | "all"): Promise<Message[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await messagesApi.filterByStatus(status);
        setMessages(data);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to filter messages';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Sort messages
  const sortMessages = useCallback(
    async (sortBy: "newest" | "oldest"): Promise<Message[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await messagesApi.sortMessages(sortBy);
        setMessages(data);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to sort messages';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load messages on mount
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    unreadMessages,
    readMessages,
    unreadCount,
    fetchMessages,
    createMessage,
    updateMessage,
    toggleReadStatus,
    markAsRead,
    markAsUnread,
    deleteMessage,
    deleteMultipleMessages,
    deleteAllMessages,
    markAllAsRead,
    searchMessages,
    filterByStatus,
    sortMessages,
    clearError,
  };
};
