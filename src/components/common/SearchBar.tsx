"use client";

import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SearchBarProps } from "@/types";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "ابحث عن السكن المناسب...",
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Real-time search
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className} mb-2`}>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <IoSearchOutline
            className="h-5 w-5"
            style={{ color: "var(--color-secondary)" }}
          />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={placeholder}
          className="block w-full pr-10 pl-3 py-3 rounded-lg focus:outline-none focus:ring-2 text-right transition-all duration-200"
          style={{
            backgroundColor: "var(--color-white)",
            borderColor: "var(--color-accent)",
            borderWidth: "2px",
            borderStyle: "solid",
            color: "var(--color-primary)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-secondary)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px var(--color-focus-ring)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
