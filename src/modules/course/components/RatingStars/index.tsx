import { Star } from "lucide-react";

const RenderStars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star className="w-4 h-4 text-gray-600" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-600" />);
    }
  }
  //   return stars;

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default RenderStars;
