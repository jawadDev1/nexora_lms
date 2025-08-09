import { Star } from "lucide-react";

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  rating, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating 
              ? 'fill-[#FFDE00] text-[#FFDE00]' 
              : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};


export default StarRating;