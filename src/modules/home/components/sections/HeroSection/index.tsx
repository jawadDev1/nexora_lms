import LinkButton from "@/components/ui/buttons/LinkButton";
import NextImage from "@/components/ui/common/NextImage";
import Content from "@/components/ui/typography/Content";
import Subheading from "@/components/ui/typography/Subheading";
import React from "react";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-[45%,3%,52%] justify-between items-center py-8">
      <div>
        <Subheading>Unlock Your Potential with Nexora</Subheading>
        <Content className="mt-2 mb-3">
          Welcome to Nexora, where learning knows no bounds. We believe that
          education is the key to personal and professional growth, and we&apos;re
          here to guide you on your journey to success.{" "}
        </Content>
        <LinkButton className="max-w-[300px]" href="/courses">
          Start your journey
        </LinkButton>
      </div>
      <div></div>
      <div className="min-w-[341px] min-h-[430px]   ">
        <NextImage src={"/images/graduate.png"} />
      </div>
    </div>
  );
};

export default HeroSection;
