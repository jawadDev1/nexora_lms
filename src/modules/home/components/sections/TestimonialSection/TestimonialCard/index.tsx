'use client';
import { Testimonial } from "@/modules/home/types";
import { Briefcase, MapPin, Play, Quote } from "lucide-react";
import { useState } from "react";
import StarRating from "../StarRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  variant = 'default',
  className = ''
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const cardVariants = {
    default: 'bg-[#242424] p-6',
    featured: 'bg-gradient-to-br from-[#242424] to-[#1D1D1F] p-8 border-2 border-[#FFDE00]/30',
    compact: 'bg-[#242424] p-4'
  };

  const textSizes = {
    default: 'text-base',
    featured: 'text-lg',
    compact: 'text-sm'
  };

  return (
    <div 
      className={`
        ${cardVariants[variant]} 
        rounded-xl border border-gray-800 hover:border-[#FFDE00]/50 
        transition-all duration-300 hover:shadow-lg hover:shadow-[#FFDE00]/10
        ${className}
      `}
    >
      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-4">
        <Quote className={`text-[#FFDE00] ${variant === 'featured' ? 'w-8 h-8' : 'w-6 h-6'}`} />
        <StarRating rating={testimonial.rating} size={variant === 'compact' ? 'sm' : 'md'} />
      </div>

      {/* Content */}
      <blockquote className={`text-white ${textSizes[variant]} leading-relaxed mb-6`}>
        "{testimonial.content}"
      </blockquote>

      {/* Course Tag */}
      <div className="mb-4">
        <span className="inline-block bg-[#FFDE00]/20 text-[#FFDE00] px-3 py-1 rounded-full text-sm font-medium">
          {testimonial.course}
        </span>
      </div>

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className={`${
                variant === 'featured' ? 'w-14 h-14' : 'w-12 h-12'
              } rounded-full object-cover border-2 border-[#FFDE00]/30`}
            />
            {testimonial.videoUrl && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          
          <div>
            <div className="font-semibold text-white text-sm">
              {testimonial.name}
            </div>
            <div className="text-[#797979] text-xs flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {testimonial.role}
            </div>
            <div className="text-[#797979] text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {testimonial.company}, {testimonial.location}
            </div>
          </div>
        </div>

        {testimonial.featured && (
          <div className="bg-[#FFDE00] text-black px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
    </div>
  );
};


export default TestimonialCard