import React from "react";
import {
  BookOpen,
  GraduationCap,
  Brain,
  MessageSquare,
  Settings,
  PlusCircle,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white text-gray-900 h-[calc(100vh-64px)] fixed top-16 left-0 flex flex-col shadow-lg border-r border-gray-200">
      
      {/* Create New Button */}
      <div className="p-4 border-b border-gray-200">
        <button className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-900 cursor-pointer text-white px-3 py-2 rounded-md transition">
          <PlusCircle size={18} />
          <span>Create New</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <SidebarLink icon={<BookOpen size={20} />} label="My Courses" />
        <SidebarLink icon={<GraduationCap size={20} />} label="Learning Path" />
        <SidebarLink icon={<Brain size={20} />} label="AI Tutor" />
        <SidebarLink icon={<MessageSquare size={20} />} label="Discussions" />
        <SidebarLink icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* Credits Section */}
      <div className="p-4 border-t border-gray-200 text-sm text-gray-700">
        <p className="font-medium">Credits Left</p>
        <div className="mt-1 flex items-center gap-2">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "65%" }} // Example percentage
            ></div>
          </div>
          <span className="text-xs">65%</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">13 credits remaining</p>
      </div>
    </aside>
  );
};

const SidebarLink = ({ icon, label }) => {
  return (
    <button className="flex items-center w-full gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Sidebar;
