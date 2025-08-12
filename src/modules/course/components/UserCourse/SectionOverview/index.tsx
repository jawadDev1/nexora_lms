import Content from "@/components/ui/typography/Content";
import React from "react";

export interface SectionOverviewProps {
  title: string;
  description: string;
}

const SectionOverview = ({ title, description }: SectionOverviewProps) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
      <Content className="mt-3">{description}</Content>
    </div>
  );
};

export default SectionOverview;
