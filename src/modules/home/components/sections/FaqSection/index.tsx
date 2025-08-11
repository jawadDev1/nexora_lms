import React from "react";
import { getHomeFaqs } from "@/modules/home/services";
import FAQAccordion from "../../FaqAccordian";

const FAQsSection: React.FC = async () => {
  const result = await getHomeFaqs();

  if (!result.success) return null;

  const faqs = result?.data;

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto mb-12">
            Got questions? We've got answers! Here are the most common questions
            our students ask about our courses and platform.
          </p>
        </div>

        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQsSection;
