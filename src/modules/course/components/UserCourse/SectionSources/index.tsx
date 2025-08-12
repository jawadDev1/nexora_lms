import CardTitle from "@/components/ui/typography/CardTitle";
import Content from "@/components/ui/typography/Content";
import React from "react";

export interface SectionSourcesProps {
  title: string;
  link: string;
}

const SectionSources = ({ title, link }: SectionSourcesProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <CardTitle>{title}:</CardTitle>
      <a className="text-blue-600 hover:underline " target="_blank" href={link}>
        <Content className="text-blue-600" >{link}</Content>
      </a>
    </div>
  );
};

export default SectionSources;
