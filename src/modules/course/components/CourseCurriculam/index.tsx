"use client";
import React, { useState } from "react";
import { ChevronDown, Play, Lock, Clock, ExternalLink } from "lucide-react";
import { ICourseData } from "../../types";

interface CourseCurriculumProps {
  courseData: ICourseData[];
  isEnrolled: boolean;
}

const CourseCurriculum = ({
  courseData,
  isEnrolled,
}: CourseCurriculumProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const formatDuration = (duration: number) => {
    if (!duration) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Group videos by section
  const groupedSections = courseData.reduce((acc, video) => {
    const sectionTitle = video.video_section!;
    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(video);
    return acc;
  }, {} as Record<string, ICourseData[]>);

  const sectionTitles = Object.keys(groupedSections);

  const isVideoAccessible = (sectionIndex: number, videoIndex: number) => {
    if (sectionIndex === 0 && videoIndex === 0) return true;
    return isEnrolled;
  };

  const getSectionDuration = (videos: ICourseData[]) => {
    return videos.reduce((total, video) => total + video.video_length!, 0);
  };

  const totalSections = sectionTitles.length;
  const totalVideos = courseData.length;
  const totalDuration = courseData.reduce(
    (total, video) => total + video.video_length!,
    0
  );

  return (
    <div className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Course Curriculum
          </h2>
          <div className="flex items-center space-x-6 text-light-gray">
            <span>{totalSections} sections</span>
            <span>{totalVideos} videos</span>
            <span>{Math.floor(totalDuration / 60)} minutes total</span>
          </div>
        </div>

        <div className="space-y-4">
          {sectionTitles.map((sectionTitle, sectionIndex) => {
            const videos = groupedSections[sectionTitle];
            const isExpanded = expandedSections.has(sectionTitle);
            const sectionDuration = getSectionDuration(videos);

            return (
              <div
                key={sectionTitle}
                className="bg-card rounded-lg overflow-hidden"
              >
                {/* Section Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => toggleSection(sectionTitle)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <button className="text-light-gray hover:text-white transition-colors">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isExpanded ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {sectionTitle}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-light-gray mt-1">
                        <span>{videos.length} videos</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDuration(sectionDuration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-light-gray">
                    Section {sectionIndex + 1}
                  </div>
                </div>

                {/* Videos List */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-3">
                    <div className="space-y-3">
                      {videos.map((video, videoIndex) => {
                        const accessible = isVideoAccessible(
                          sectionIndex,
                          videoIndex
                        );

                        return (
                          <div
                            key={`${sectionTitle}-${videoIndex}`}
                            className="flex items-center justify-between p-3 ml-8 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              {accessible ? (
                                <div className="p-2 rounded-full bg-primary">
                                  <Play className="w-4 h-4 text-black" />
                                </div>
                              ) : (
                                <div className="p-2 rounded-full bg-gray-600">
                                  <Lock className="w-4 h-4 text-light-gray" />
                                </div>
                              )}

                              <div className="flex-1">
                                <h4
                                  className={`font-medium ${
                                    accessible
                                      ? "text-white"
                                      : "text-light-gray"
                                  }`}
                                >
                                  {video.video_title}
                                </h4>
                                {video.video_description && (
                                  <p className="text-sm text-light-gray mt-1 line-clamp-2">
                                    {video.video_description}
                                  </p>
                                )}

                                {/* External Link */}
                                {video.video_link_url &&
                                  video.video_link_title && (
                                    <a
                                      href={video.video_link_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 text-primary hover:text-yellow-400 text-sm mt-2 transition-colors"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>{video.video_link_title}</span>
                                    </a>
                                  )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1 text-sm text-light-gray">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {formatDuration(video.video_length!)}
                                </span>
                              </div>

                              
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Section Lock Message */}
                    {!isEnrolled && sectionIndex > 0 && (
                      <div className="mt-4 ml-8 bg-dark-brown p-3 rounded-lg border border-gray-700">
                        <p className="text-light-gray text-sm flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>
                            Enroll in this course to access all videos in this
                            section.
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;
