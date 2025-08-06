"use client";
import React from "react";
import HokageBadge from "../HokageBadge";
import SidebarItem from "../SidebarItem";
import { BiHome } from "react-icons/bi";
import Subtitle2 from "@/components/ui/typography/Subtitle2";
import { HOKAGE_SIBAR_MENU } from "@/constants/menu";
import { usePathname } from "next/navigation";

const HokageSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-card py-5 md:py-10 px-5 h-screen overflow-y-auto">
      <HokageBadge />

      <div className="mt-5 flex flex-col gap-y-2">
        <SidebarItem
          isActive={pathname === '/hokage'}
          href="/hokage"
          className="flex items-center gap-x-2"
        >
          <BiHome size={20} />
          <Subtitle2>Dashboard</Subtitle2>
        </SidebarItem>

        {HOKAGE_SIBAR_MENU.map((item) => (
          <React.Fragment key={item.group}>
            <Subtitle2 className="!font-medium px-3 rounded bg-primary/5 mt-3">
              {item.group}
            </Subtitle2>
            {item.children.map(({ href, title, Icon }) => (
              <SidebarItem
                key={href}
                isActive={pathname === href}
                href={href}
                className="flex items-center gap-x-2"
              >
                <Icon size={20} />
                <Subtitle2>{title}</Subtitle2>
              </SidebarItem>
            ))}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
};

export default HokageSidebar;
