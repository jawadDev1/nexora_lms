"use client";
import Content from "@/components/ui/typography/Content";
import Subtitle3 from "@/components/ui/typography/Subtitle3";
import pusherClient from "@/lib/pusher";
import { formatNotificationTime } from "@/utils";

import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GET_NOTIFICATIONS, UPDATE_NOTIFICATION_STATUS } from "../../actions";
import { INotification } from "../../types";

const HeaderNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const unread_notifys = notifications.reduce(
    (total, curr) => (curr.is_read ? total : total + 1),
    0
  );

  const getNotifications = async () => {
    const result = await GET_NOTIFICATIONS();
    if (!result.success || !result.data) {
      return;
    }

    setNotifications(result.data);
  };

  const updateStatus = async (id: string) => {
    const result = await UPDATE_NOTIFICATION_STATUS({id});
    if(!result.success) return;

    getNotifications();
  }

  useEffect(() => {
    getNotifications();
    const channel = pusherClient.subscribe("notification-channel");
    channel.bind("new-notification", () => {
      getNotifications();
    });

    return () => {
      pusherClient.unsubscribe("notification-channel");
    };
  }, []);

  return (
    <div className="relative">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer"
      >
        <IoIosNotificationsOutline size={30} />
        <span className="absolute right-0 top-0 text-xs  rounded-full size-4 text-center  bg-primary text-bg">
          {unread_notifys}
        </span>
      </span>
      {isOpen && notifications && notifications.length > 0 && (
        <div className="absolute top-full right-[80%]  w-56 md:w-72 bg-bg/50 rounded-xl border border-primary space-y-2 h-[40vh] overflow-y-auto py-5 px-4">
          {notifications.map(
            ({ title, description, is_read, created_at, id }, index) => (
              <>
                <div key={index}>
                  <div className="flex justify-between">
                    <Subtitle3 className="flex-1">{title}</Subtitle3>

                    <span onClick={() => updateStatus(id)} className="text-xs border border-primary rounded p-px text-primary hover:bg-primary hover:text-white cursor-pointer">
                      Mark as read
                    </span>
                  </div>
                  <Content className="!text-sm">{description}</Content>
                  <p className="text-xs">
                    {formatNotificationTime(`${created_at}`)}
                  </p>
                </div>
                <div className="bg-light-gray/20 h-px w-full" />
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderNotifications;
