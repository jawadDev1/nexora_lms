"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value?.trim();

    setSearchTerm(val);
  };

  return (
    <div className="relative max-w-[622px] w-full border border-light-gray rounded px-2 py-1 grid grid-cols-[95%,5%]">
      <input
        className="w-full h-full px-1 py-1 text-sm bg-transparent rounded text-white focus:outline-none"
        placeholder="Search Courses"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />
      <BiSearch size={28} className="text-white" />
    </div>
  );
};

export default Search;
