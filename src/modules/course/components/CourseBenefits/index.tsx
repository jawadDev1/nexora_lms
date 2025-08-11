import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CourseBenefitsPrerequisitesProps {
  benefits: string[];
  prerequisites: string[];
}

const CourseBenefitsPrerequisites = ({
  benefits,
  prerequisites,
}: CourseBenefitsPrerequisitesProps) => {
  return (
    <div className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* What You'll Learn */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-600 rounded-full">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                What You'll Learn
              </h3>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-light-gray leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {benefits.length === 0 && (
              <p className="text-light-gray italic">
                Course benefits will be updated soon.
              </p>
            )}
          </div>

          {/* Prerequisites */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary rounded-full">
                <AlertCircle className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Prerequisites</h3>
            </div>

            {prerequisites.length > 0 ? (
              <ul className="space-y-3">
                {prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-light-gray leading-relaxed">
                      {prerequisite}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-600 p-3 rounded-full inline-block mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">
                  No Prerequisites Required!
                </h4>
                <p className="text-light-gray">
                  This course is designed for beginners. You can start learning
                  right away without any prior experience.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-dark-brown rounded-lg p-6 border border-gray-700">
          <div className="text-center">
            <h3 className="text-white font-bold text-lg mb-3">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-light-gray mb-4">
              Join thousands of students who have already transformed their
              skills with this course.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Enroll Now
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBenefitsPrerequisites;
