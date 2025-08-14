import HokageHeader from "@/modules/hokage/components/HokageHeader";
import HokageSidebar from "@/modules/hokage/components/sidebar/HokageSidebar";
import React, { ReactNode } from "react";
import { unstable_noStore as noStore } from "next/cache";

const HokageLayout = ({ children }: { children: ReactNode }) => {
  noStore();

  return (
    <main className="grid px-3 lg:px-1 grid-cols-[15%,2%,1fr]">
      <HokageSidebar />
      <div />
      <div className="p-5 max-h-screen overflow-y-auto">
        <HokageHeader />
        <div className="mt-5">{children}</div>
      </div>
    </main>
  );
};

export default HokageLayout;
