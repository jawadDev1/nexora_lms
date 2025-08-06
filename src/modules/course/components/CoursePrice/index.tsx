import Subtitle2 from "@/components/ui/typography/Subtitle2";
import Subtitle3 from "@/components/ui/typography/Subtitle3";
import { calculatePriceAfterDiscount } from "@/utils";
import React from "react";

interface CoursePriceProps {
  price: number;
  discount: number;
}

const CoursePrice = ({ price, discount }: CoursePriceProps) => {
  const finalPrice = discount
    ? calculatePriceAfterDiscount(price, discount)
    : price;

  return (
    <div className="relative flex gap-x-2">
      <Subtitle2 className="!font-semibold">{finalPrice}$</Subtitle2>
      {discount && (
        <>
          <Subtitle3 className="line-through text-tomato-red mb-2">{price}$</Subtitle3>
          <Subtitle2
          className="text-green-600"
          >{discount}% off</Subtitle2>
        </>
      )}
    </div>
  );
};

export default CoursePrice;
