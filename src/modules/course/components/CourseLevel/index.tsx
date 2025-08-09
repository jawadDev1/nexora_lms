import { Signal } from "lucide-react";
import React from "react";

interface CourseLevelProps {
  level: "Beginner" | "Intermediate" | "Advance";
}

const CourseLevel = ({ level }: CourseLevelProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advance":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Beginner":
        return <Signal className="w-3 h-3 rotate-45" />;
      case "Intermediate":
        return <Signal className="w-3 h-3" />;
      case "Advance":
        return <Signal className="w-3 h-3 rotate-180" />;
      default:
        return <Signal className="w-3 h-3" />;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getLevelColor(
        level
      )}`}
    >
      {getLevelIcon(level)}
      {level}
    </div>
  );
};

export default CourseLevel;
