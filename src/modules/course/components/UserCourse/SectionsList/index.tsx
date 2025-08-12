"use client";
import CardTitle from "@/components/ui/typography/CardTitle";
import Content from "@/components/ui/typography/Content";
import Title from "@/components/ui/typography/Title";
import { ICourseData } from "@/modules/course/types";
import { formatVideoLength } from "@/utils";
import cn from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { CgScreen } from "react-icons/cg";

interface SectionsListProps {
  sections: ICourseData[];
  handleActiveSection: (index: number) => void;
}

const SectionsList = ({ sections, handleActiveSection }: SectionsListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="bg-card py-2 px-3 rounded-xl max-h-fit sticky top-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Title>Content</Title>

        <ChevronDown
          size={22}
          className={cn("rotate-180", { "rotate-0": !isOpen })}
        />
      </div>
      <div
        className={cn("h-0 overflow-hidden mt-3", {
          "h-fit": isOpen,
        })}
      >
        <div className="my-3 h-px w-full bg-light-gray/20" />
        {sections &&
          sections.length > 0 &&
          sections.map((section, index) => (
            <div
              key={index}
              onClick={() => handleActiveSection(index)}
              className="flex gap-x-2 cursor-pointer "
            >
              <CgScreen size={20} className="text-primary" />
              <div>
                <CardTitle className="hover:text-primary">
                  {section.video_title}
                </CardTitle>
                <Content>
                  {formatVideoLength(section.video_length as number)}
                </Content>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SectionsList;
