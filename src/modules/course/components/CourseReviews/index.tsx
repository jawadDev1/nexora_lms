'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { IReview } from '../../types';

interface CourseReviewsProps {
  reviews: IReview[];
}

const CourseReviews: React.FC<CourseReviewsProps> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
      : 0
  }));

  const getCurrentPageReviews = () => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-primary fill-current' 
            : 'text-gray-600'
        }`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Reviews Yet</h3>
            <p className="text-light-gray">Be the first to share your experience with this course!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Student Reviews
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Rating Overview */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-light-gray">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Rating Bars */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-light-gray w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-light-gray w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {getCurrentPageReviews().map((review, index) => (
                <div key={index} className="bg-card rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {review.User.avatar ? (
                        <Image
                          src={review.User.avatar}
                          alt={review.User.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-black font-semibold text-lg">
                            {review.User.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-white font-semibold">
                            {review.User.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-light-gray text-sm">
                              {formatDate(review.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-light-gray leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Review Actions */}
                      <div className="flex items-center space-x-4 mt-4">
                        <button className="flex items-center space-x-1 text-light-gray hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Helpful</span>
                        </button>
                        <button className="text-light-gray hover:text-primary transition-colors text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-card rounded-lg text-light-gray hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        currentPage === i + 1
                          ? 'bg-primary text-black'
                          : 'bg-card text-light-gray hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-card rounded-lg text-light-gray hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Write Review Section */}
        <div className="bg-dark-brown rounded-lg p-6 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">Share Your Experience</h3>
          <div className="text-center">
            <p className="text-light-gray mb-4">
              Help other students by sharing your thoughts about this course.
            </p>
            <button className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;