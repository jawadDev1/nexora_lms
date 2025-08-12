"use client";
import React, { useState } from "react";
import VideoPlayer from "../../VideoPlayer";
import Button from "@/components/ui/buttons/Button";
import SectionOverview, { SectionOverviewProps } from "../SectionOverview";
import SectionQA from "../SectionQA";
import SectionSources, { SectionSourcesProps } from "../SectionSources";
import { USER_COURSE_DETAIL_TABS } from "@/constants/menu";
import cn from "@/utils/cn";
import Subtitle2 from "@/components/ui/typography/Subtitle2";

interface SectionDetailProps {
  video_url: string;
  title: string;
  description: string;
  video_link_title: string;
  vidoe_link_url: string;
  sectionId: string;
}

export type ITabs = "Overview" | "Resources" | "Q&A";

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
  };

  return tabs[tab];
}

type IPropsPayload =
  | SectionOverviewProps
  | SectionSourcesProps
  | { sectionId: string };

const SectionDetail = ({
  video_url,
  title,
  description,
  video_link_title,
  vidoe_link_url,
  sectionId,
}: SectionDetailProps) => {
  const [currentTab, setCurrentTab] = useState<ITabs>("Overview");

  const payloads = {
    Overview: {
      title,
      description,
    },
    Resources: { title: video_link_title, link: vidoe_link_url },
    "Q&A": { sectionId },
    Reviews: { sectionId },
  };

  const propsPayload = payloads[currentTab];

  const { Tab, props } = getTab<IPropsPayload>(currentTab, propsPayload);

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

      <div className="w-full mt-10 flex overflow-x-auto justify-between items-center bg-card rounded-xl py-2 px-3">
        {USER_COURSE_DETAIL_TABS.map((tab) => (
          <Subtitle2
            key={tab}
            onClick={() => setCurrentTab(tab as ITabs)}
            className={cn(
              "border  flex justify-center items-center shrink-0 flex-[0.2] text-center rounded cursor-pointer py-1   border-transparent",
              {
                "bg-primary text-dark-brown": tab === currentTab,
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
