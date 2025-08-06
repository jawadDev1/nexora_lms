"use client";
import Content from "@/components/ui/typography/Content";
import Subtitle3 from "@/components/ui/typography/Subtitle3";
import { formatNotificationTime } from "@/utils";

import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer"
      >
        <IoIosNotificationsOutline size={30} />
        <span className="absolute right-0 top-0 text-xs  rounded-full size-4 text-center  bg-primary text-bg">
          1
        </span>
      </span>
      {isOpen && (
        <div className="absolute top-full right-[80%]  w-56 md:w-72 bg-bg/50 rounded-xl border border-primary space-y-2 h-[40vh] overflow-y-auto py-5 px-4">
          <Subtitle3 className="">Urgent call from Uchiha Itachi</Subtitle3>
          <Content
          className="!text-sm"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            itaque incidunt quidem sed qui quod neque repudiandae. Repellat,
            beatae possimus.
          </Content>
          <p className="text-xs">
            {formatNotificationTime("2025-08-02T09:10:47.777Z")}
          </p>
        </div>
      )}
    </div>
  );
};

export default HeaderNotifications;
