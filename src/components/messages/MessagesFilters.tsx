import React from "react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/index";
import { FaSearch, FaFilter } from "react-icons/fa";

interface MessagesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: "all" | "read" | "unread";
  onFilterStatusChange: (value: "all" | "read" | "unread") => void;
  sortBy: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
}

const MessagesFilters: React.FC<MessagesFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            بحث
          </label>
          <div className="relative">
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
              }}
              placeholder="ابحث في الرسائل..."
            />
          </div>
        </div>

        {/* Filter by Status */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            حالة القراءة
          </label>
          <select
            value={filterStatus}
            onChange={(e) =>
              onFilterStatusChange(e.target.value as "all" | "read" | "unread")
            }
            className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
          >
            <option value="all">جميع الرسائل</option>
            <option value="unread">غير مقروءة</option>
            <option value="read">مقروءة</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            ترتيب حسب
          </label>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "oldest")
            }
            className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="oldest">الأقدم أولاً</option>
          </select>
        </div>

        {/* Filter Button */}
        <div className="flex items-end">
          <Button
            variant="outlined"
            className="w-full flex items-center justify-center space-x-2 space-x"
          >
            <FaFilter />
            <span>فلترة</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MessagesFilters;
