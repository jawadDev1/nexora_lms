import { FAQ } from "@/modules/home/types";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ faq, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <div className="bg-dark-brown rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-dark-brown/80 transition-colors duration-200 group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-white font-semibold text-lg leading-relaxed group-hover:text-primary transition-colors duration-200">
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-primary transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 text-light-gray group-hover:text-primary transition-colors duration-200" />
          )}
        </div>
      </button>

      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="ml-9 pt-2 border-l-2 border-primary/20 pl-4">
            <p className="text-primary leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
