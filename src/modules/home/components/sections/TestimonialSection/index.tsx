import { Briefcase, Quote, Star, User } from "lucide-react";
import TestimonialCarousel from "./TestimonialCarousel";
import { testimonials } from "@/constants/testimonials";
import StatsCounter from "@/components/ui/extra/State";

const TestimonialsSection: React.FC = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-primary">Students</span> Say
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto mb-12">
            Don't just take our word for it. Here's what our successful
            graduates have to say about their learning experience.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <StatsCounter
              value="98%"
              label="Satisfaction Rate"
              icon={<Star className="w-8 h-8 text-primary" />}
            />
            <StatsCounter
              value="15K+"
              label="Success Stories"
              icon={<User className="w-8 h-8 text-primary" />}
            />
            <StatsCounter
              value="4.9"
              label="Average Rating"
              icon={<Quote className="w-8 h-8 text-primary" />}
            />
            <StatsCounter
              value="92%"
              label="Job Placement"
              icon={<Briefcase className="w-8 h-8 text-primary" />}
            />
          </div>
        </div>

          <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
