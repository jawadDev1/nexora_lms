"use client";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { useUpdateSearchParams } from "@/hooks/useUpdateParams";
import cn from "@/utils/cn";
import React from "react";

interface CoursecategoriesProps {
  categories: { title: string; id: string }[];
  category?: string;
}

const Coursecategories = ({ categories, category }: CoursecategoriesProps) => {
  const { updateParams, clearParams } = useUpdateSearchParams();

  const handleCategoryFilter = (id: string) => {
    updateParams({ key: "category", value: id });
  };

  return (
    <div className="flex overflow-x-auto gap-3 items-center mb-10">
      <Subtitle2
        onClick={clearParams}
        className={cn(
          "py-1.5 px-3 rounded-xl border border-white hover:bg-primary hover:text-dark-brown hover:border-transparent transition-colors duration-300 cursor-pointer ",
          { "bg-primary text-dark-brown border-transparent ": !category }
        )}
      >
        All
      </Subtitle2>
      {categories &&
        categories.length > 0 &&
        categories.map(({ title, id }) => (
          <Subtitle2
            onClick={() => handleCategoryFilter(id)}
            key={id}
            className={cn(
              "py-1.5 px-3 rounded-xl border border-white hover:bg-primary hover:text-dark-brown hover:border-transparent transition-colors duration-300 cursor-pointer ",
              {
                "bg-primary text-dark-brown border-transparent ":
                  id === category,
              }
            )}
          >
            {title}
          </Subtitle2>
        ))}
    </div>
  );
};

export default Coursecategories;
