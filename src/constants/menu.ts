import { BiVideoPlus } from "react-icons/bi";
import { RiBarChart2Fill } from "react-icons/ri";
import { IoMdStats } from "react-icons/io";
import { AiFillSetting, AiOutlineTeam } from "react-icons/ai";
import { GiChart } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import { CgPathExclude, CgScreen } from "react-icons/cg";
import { FaFileInvoice, FaShapes, FaUsers } from "react-icons/fa";

export const PROFILE_SIDEBAR_MENU = [
  {
    title: "Profile",
    slug: "/profile/info",
  },
  {
    title: "Change Password",
    slug: "/profile/change-password",
  },
  {
    title: "Courses",
    slug: "/profile/courses",
  },
];

export const HOKAGE_SIBAR_MENU = [
  {
    group: "Data",
    children: [
      {
        title: "Users",
        href: "/hokage/users",
        Icon: FaUsers,
      },
      {
        title: "Invoices",
        href: "/hokage/invoices",
        Icon: FaFileInvoice,
      },
    ],
  },
  {
    group: "Content",
    children: [
      {
        title: "Create Course",
        href: "/hokage/course/create",
        Icon: BiVideoPlus,
      },
      {
        title: "Live Courses",
        href: "/hokage/course",
        Icon: CgScreen,
      },
    ],
  },
  {
    group: "Customization",
    children: [
      {
        title: "Hero",
        href: "/hokage/hero",
        Icon: FaShapes,
      },
      {
        title: "Faq",
        href: "/hokage/faq",
        Icon: BsQuestionCircle,
      },
      {
        title: "Categories",
        href: "/hokage/category",
        Icon: CgPathExclude,
      },
    ],
  },
  {
    group: "Controllers",
    children: [
      {
        title: "Manage Team",
        href: "/hokage/manage-team",
        Icon: AiOutlineTeam,
      },
    ],
  },
  {
    group: "Analytics",
    children: [
      {
        title: "Courses Analytics",
        href: "/hokage/course-analytics",
        Icon: RiBarChart2Fill,
      },
      {
        title: "Orders Analytics",
        href: "/hokage/orders-analytics",
        Icon: GiChart,
      },
      {
        title: "Users Analytics",
        href: "/hokage/users-analytics",
        Icon: IoMdStats,
      },
    ],
  },
  {
    group: "Extras",
    children: [
      {
        title: "Settings",
        href: "/hokage/settings",
        Icon: AiFillSetting,
      },
    ],
  },
];

export const USER_COURSE_DETAIL_TABS = [
  "Overview",
  "Q&A",
  "Resources",
  "Reviews",
];
