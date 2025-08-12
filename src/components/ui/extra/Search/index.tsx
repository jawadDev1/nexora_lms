"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateParams";
import React, { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { updateParams } = useUpdateSearchParams();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    updateParams({key: "search", value: searchTerm}, '/course')
  };

  return (
    <form className="w-full max-w-[622px]" onSubmit={handleSearch}>
      <div className="relative  w-full border border-light-gray rounded px-2 py-1 grid grid-cols-[95%,5%]">
        <input
          className="w-full h-full px-1 py-1 outline-none border-none text-sm bg-transparent rounded text-white focus:outline-none"
          placeholder="Search Courses"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiSearch onClick={handleSearch} size={28} className="text-white" />
      </div>
    </form>
  );
};

export default Search;
