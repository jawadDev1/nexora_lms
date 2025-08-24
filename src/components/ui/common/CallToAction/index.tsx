import React from "react";
import LinkButton from "../../buttons/LinkButton";

const CallToAction = () => {
  return (
    <div className="text-center ">
      <div className="bg-gradient-to-r from-[#242424] to-[#1D1D1F] rounded-xl p-8 border border-gray-800">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Start Your Success Story?
        </h3>
        <p className="text-[#797979] mb-6 mt-4 max-w-2xl mx-auto">
          Join thousands of students who have transformed their careers with our
          expert-led courses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton
            href="/course"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-dark-brown px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Browse Courses
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
