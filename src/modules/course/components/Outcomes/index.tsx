import Content from "@/components/ui/typography/Content";
import Title from "@/components/ui/typography/Title";
import cn from "@/utils/cn";
import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

interface OutcomesProps {
  title: string;
  outcomes: string[];
  className?: string
}

const Outcomes = ({ title, outcomes, className }: OutcomesProps) => {
  return (
    <div className={cn(className)}>
      <Title>{title}</Title>

      <div className="mt-2 flex flex-col gap-y-1">
        {outcomes &&
          outcomes.length > 0 &&
          outcomes.map((outcom, i) => (
            <Content key={i} className="flex items-center gap-x-2">
              <IoCheckmarkDoneOutline size={20} />
              <span>{outcom}</span>
            </Content>
          ))}
      </div>
    </div>
  );
};

export default Outcomes;
