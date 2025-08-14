import LinkButton from "@/components/ui/buttons/LinkButton";
import NextImage from "@/components/ui/common/NextImage";
import Content from "@/components/ui/typography/Content";
import Subheading from "@/components/ui/typography/Subheading";
import { getUserHomeHero } from "@/modules/home/services";
import React from "react";

const HeroSection = async () => {
    const result = await getUserHomeHero();
    if (!result.success || !result.data) return null;

    const { title, subtitle, image } = result?.data;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[45%,3%,52%] justify-between items-center py-8">
            <div>
                <Subheading>{title}</Subheading>
                <Content className="mt-2 mb-3">{subtitle}</Content>
                <LinkButton className="max-w-[300px]" href="/course">
                    Start your journey
                </LinkButton>
            </div>
            <div></div>
            <div className="w-[341px] hidden lg:block h-[430px] md:w-[650px] md:h-auto   ">
                <NextImage src={image ?? "/images/graduate.png"} />
            </div>
        </div>
    );
};

export default HeroSection;
