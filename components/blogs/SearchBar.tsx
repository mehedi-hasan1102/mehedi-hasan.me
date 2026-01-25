"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { FiX, FiSearch } from "react-icons/fi";

import { BlogMetaData } from "@/lib/blogs";
import SimpleBar from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

interface SearchBarProps {
  onClose: () => void;
  blogs: BlogMetaData[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, blogs }) => {
  const [query, setQuery] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);

  // 🔹 Handle outside clicks only once
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // 🔹 Debounced query to reduce filter calculations
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 150); // 150ms debounce
    return () => clearTimeout(timer);
  }, [query]);

  // 🔹 Memoized filtered results
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const lowerQuery = debouncedQuery.toLowerCase();
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.description.toLowerCase().includes(lowerQuery)
    );
  }, [debouncedQuery, blogs]);

  return createPortal(
    <div className="fixed inset-0 z-[50] bg-dark/50 backdrop-blur-sm flex justify-center items-start pt-24 p-4">
      <div ref={searchBarRef} className="bg-base-200 rounded-xl w-full max-w-lg p-6 shadow-lg border border-(--border)">
        {/* Search Input */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 w-full rounded-lg transition">
            <FiSearch className=" w-5 h-5" />
           <div className="border-b border-(--border)">
  <input
    autoFocus
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search blogs..."
    className="
      w-full bg-transparent outline-none
      text-sm text-base-content
      placeholder:text-base-content/50
      py-2
    "
  />
</div>

          </div>
          <button
            onClick={onClose}
            className="cursor-pointer hover:text-primary ml-3 p-1 rounded-lg transition hover:scale-120"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Results */}
        <SimpleBar className="max-h-100 space-y-3 pr-2">
          {results.length === 0 && debouncedQuery && (
            <p className="text-base-content/60 text-sm">No results found.</p>
          )}

          {results.map(blog => (
            <a
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              onClick={onClose}
              className="group block p-3 rounded-lg hover:bg-base-300/50 transition-all duration-200"
            >
              <div className="group-hover:underline underline-offset-4 inline-flex items-center">
                <h3 className="text-[15px] font-medium leading-snug tracking-tight text-base-content">
                  {blog.title} ↗
                </h3>
              </div>
              <p className="text-xs text-base-content/45 mt-1">
                {blog.date} • {blog.readTime} • {blog.category}
              </p>
              {/* <p className="text-sm text-base-content/80 mt-2">
                {blog.description.slice(0, 100)}…
              </p> */}
            </a>
          ))}
        </SimpleBar>
      </div>
    </div>,
    document.body
  );
};

export default SearchBar;
