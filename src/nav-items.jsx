import { HomeIcon } from "lucide-react";
import ExpertFeedbackReport from "./pages/Index.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "专家考核反馈报告",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <ExpertFeedbackReport />,
  },
];
