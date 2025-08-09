import PageWrapper from "@/components/ui/common/PageWrapper";
import React from "react";
import HeroSection from "./components/sections/HeroSection";
import CourseCard from "../course/components/CourseCard";
import CoursesSection from "./components/sections/CoursesSection";
import TestimonialsSection from "./components/sections/TestimonialSection";
import CallToAction from "@/components/ui/common/CallToAction";

const HomePage = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <div className="mt-10 lg:mt-24 flex flex-col gap-y-10 lg:gap-y-20">
        <CoursesSection />

        <TestimonialsSection />

        <CallToAction />
      </div>
    </PageWrapper>
  );
};

export default HomePage;
