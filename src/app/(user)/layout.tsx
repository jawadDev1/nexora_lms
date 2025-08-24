import Footer from "@/components/ui/common/Footer";
import Header from "@/components/ui/common/Header";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  noStore();

  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default UserLayout;
