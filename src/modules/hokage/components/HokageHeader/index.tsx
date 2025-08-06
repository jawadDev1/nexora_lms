import Subtitle3 from "@/components/ui/typography/Subtitle3";
import Title from "@/components/ui/typography/Title";
import { getToday } from "@/utils";
import React from "react";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import HeaderNotifications from "../HeaderNotifications";

const HokageHeader = () => {
  return (
    <header className="bg-card flex justify-between px-5 py-2 rounded-xl ">
      <div />
      <Title>{getToday()}</Title>

     <HeaderNotifications /> 
    </header>
  );
};

export default HokageHeader;
