"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import SearchBar from "./SearchBar";
import { BlogMetaData } from "@/lib/blogs";

interface SearchToggleProps {
  blogs: BlogMetaData[];
}

const SearchToggle: React.FC<SearchToggleProps> = ({ blogs }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <button
  onClick={() => setOpen(true)}
  className="p-2 rounded-lg hover:rotate-12 hover:text-primary transition"
>
  <FiSearch size={18} />
  <span className="sr-only">Search</span>
</button>


      {open && <SearchBar onClose={() => setOpen(false)} blogs={blogs} />}
    </>
  );
};

export default SearchToggle;
