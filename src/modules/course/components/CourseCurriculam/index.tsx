'use client';
import React, { useState } from "react";
import { ChevronDown, Play, Lock, Clock } from "lucide-react";
import { ICourseData } from "../../types";

interface CourseCurriculumProps {
  courseData: ICourseData[];
  isEnrolled: boolean;
  userProgress?: number;
}

const CourseCurriculum = ({
  courseData,
  isEnrolled,
  userProgress = 0,
}: CourseCurriculumProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatDuration = (duration: number | undefined) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const isAccessible = (index: number) => {
    return isEnrolled || index === 0;
    // return isEnrolled || section.is_free || index === 0;
  };

  const completedSections = Math.floor(
    (userProgress / 100) * courseData.length
  );

  return (
    <div className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Course Curriculum
          </h2>
          <div className="flex items-center space-x-6 text-light-gray">
            <span>{courseData.length} sections</span>
            <span>
              {courseData.reduce(
                (total, section) => total + (section.video_length || 0),
                0
              )}{" "}
              minutes total
            </span>
            {isEnrolled && (
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${userProgress}%` }}
                  />
                </div>
                <span className="text-primary font-semibold">
                  {userProgress}% complete
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {courseData.map((section, index) => {
            const accessible = isAccessible(index);
            const isExpanded = expandedSections.has(section.id);
            const isCompleted = isEnrolled && index < completedSections;

            return (
              <div
                key={section.id}
                className="bg-card rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <button className="text-light-gray hover:text-white transition-colors">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div className="flex items-center space-x-3">
                      {accessible ? (
                        <div
                          className={`p-2 rounded-full ${
                            isCompleted ? "bg-green-600" : "bg-primary"
                          }`}
                        >
                          <Play
                            className={`w-4 h-4 ${
                              isCompleted ? "text-white" : "text-black"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-gray-600">
                          <Lock className="w-4 h-4 text-light-gray" />
                        </div>
                      )}

                      <div>
                        <h3
                          className={`font-semibold ${
                            accessible ? "text-white" : "text-light-gray"
                          }`}
                        >
                          {section.video_title}
                          {/* {section.is_free && ( */}
                            <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                              FREE
                            </span>
                          {/* )} */}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-light-gray">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(section.video_length)}</span>
                          {isCompleted && (
                            <span className="text-green-500 text-xs">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-light-gray">
                    Lesson {index + 1}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pl-16">
                    <div className="border-l-2 border-gray-700 pl-4">
                      {section.video_description && (
                        <p className="text-light-gray text-sm mb-3">
                          {section.video_description}
                        </p>
                      )}

                      {!accessible && (
                        <div className="bg-dark-brown p-3 rounded-lg border border-gray-700">
                          <p className="text-light-gray text-sm flex items-center space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>
                              Enroll in this course to access this lesson and
                              all other premium content.
                            </span>
                          </p>
                        </div>
                      )}

                      {accessible && section.video_url && (
                        <button className="text-primary hover:text-yellow-400 text-sm font-semibold transition-colors">
                          ▶ Start Lesson
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isEnrolled && (
          <div className="mt-8 bg-dark-brown p-6 rounded-lg border border-gray-700">
            <div className="text-center">
              <h3 className="text-white font-semibold text-lg mb-2">
                Unlock Full Course Access
              </h3>
              <p className="text-light-gray mb-4">
                Get access to all {courseData.length} lessons and premium
                features
              </p>
              <button className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCurriculum;
