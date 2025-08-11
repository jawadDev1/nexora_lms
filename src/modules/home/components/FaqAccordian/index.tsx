"use client";
import { useState } from "react";
import { FAQ } from "../../types";
import FAQItem from "@/components/ui/extra/FaqItem";

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [currentOpen, setCurrentOpen] = useState<number>(-1);

  const toggleItem = (index: number) => {
    if (index === currentOpen) {
      setCurrentOpen(-1);
      return;
    }

    setCurrentOpen(index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={index === currentOpen}
          onToggle={() => toggleItem(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
