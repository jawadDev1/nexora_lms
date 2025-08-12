"use client";
import React, { ReactElement, useState } from "react";
import VideoPlayer from "../../VideoPlayer";
import Button from "@/components/ui/buttons/Button";
import Content from "@/components/ui/typography/Content";
import SectionOverview, { SectionOverviewProps } from "../SectionOverview";
import SectionReviews from "../SectionReviews";
import SectionQA from "../SectionQA";
import SectionSources, { SectionSourcesProps } from "../SectionSources";
import { USER_COURSE_DETAIL_TABS } from "@/constants/menu";
import Title from "@/components/ui/typography/Title";
import cn from "@/utils/cn";
import Subtitle from "@/components/ui/typography/Subtitle";
import Subtitle2 from "@/components/ui/typography/Subtitle2";

interface SectionDetailProps {
  video_url: string;
  title: string;
  description: string;
  video_link_title: string;
  vidoe_link_url: string;
}

export type ITabs = "Overview" | "Resources" | "Q&A" | "Reviews";

function getTab<T>(tab: ITabs, props: T) {
  const tabs: Record<ITabs, { Tab: React.ComponentType<any>; props: T }> = {
    Overview: {
      Tab: SectionOverview,
      props,
    },
    "Q&A": {
      Tab: SectionQA,
      props,
    },
    Resources: {
      Tab: SectionSources,
      props,
    },
    Reviews: {
      Tab: SectionReviews,
      props,
    },
  };

  return tabs[tab];
}

const SectionDetail = ({
  video_url,
  title,
  description,
  video_link_title,
  vidoe_link_url,
}: SectionDetailProps) => {
  const [currentTab, setCurrentTab] = useState<ITabs>("Overview");

  const propsPayload =
    currentTab == "Overview"
      ? {
          title,
          description,
        }
      : { title: video_link_title, link: vidoe_link_url };
  const { Tab, props } = getTab<SectionOverviewProps | SectionSourcesProps>(
    currentTab,
    propsPayload
  );

  return (
    <section className="w-full ">
      <div className="w-full">
        <div>
          <VideoPlayer className="h-[50vh]" videoUrl={video_url} />
        </div>
        <div className="flex justify-between mt-8 items-center">
          <Button className="max-w-[200px]">Previous</Button>
          <Button className="max-w-[200px]">Next</Button>
        </div>
      </div>

      <div className="w-full mt-10 flex justify-between items-center">
        {USER_COURSE_DETAIL_TABS.map((tab) => (
          <Subtitle2
            key={tab}
            onClick={() => setCurrentTab(tab as ITabs)}
            className={cn(
              "border-b-4 hover:text-primary flex-[0.2] text-center rounded cursor-pointer pb-1 border-transparent",
              {
                "text-primary border-primary": tab === currentTab,
              }
            )}
          >
            {tab}
          </Subtitle2>
        ))}
      </div>

      <div className="h-px bg-light-gray/30 mt-5 mb-10" />

      <Tab {...props} />
    </section>
  );
};

export default SectionDetail;
