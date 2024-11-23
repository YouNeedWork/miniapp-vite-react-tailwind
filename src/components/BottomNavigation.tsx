import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import { Wallet2, Pickaxe, Users, User } from "lucide-react"; // Import icons

export default function BottomNavigation() {
  const location = useLocation(); // Get the current pathname
  const navigate = useNavigate(); // Get the navigate function

  const navList = [
    { icon: '/imgs/earn.png', label: "Earn", path: "/" },
    { icon: '/imgs/mint.png', label: "Mine", path: "/mint" },
    { icon: '/imgs/friends.png', label: "Friends", path: "/friends" },
    { icon: '/imgs/me.png', label: "Me", path: "/me" },
  ];

  // Function to handle navigation on tab click
  const handleTabClick = (path) => {
    navigate(path); // Navigate to the corresponding path
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[75px] w-full bg-[#6db3e1] rounded-tl-[10px] rounded-tr-[10px] border border-black">
      <div className="flex gap-1 justify-around py-4">
        {
          navList.map((item) => (
            <div
              key={item.path} // Add a unique key for each item
              onClick={() => handleTabClick(item.path)} // Handle tab click
              className={`
                flex flex-col justify-center items-center h-[45px] border-t rounded-[5px] shadow border-[3px] border-black
                ${location.pathname === item.path
                  ? "w-1/4 bg-[#e2a9d7]" // Highlight color for the selected tab
                  : "bg-[#ade2f8] w-1/5" // Non-highlight color
                }
                transition-all duration-300 ease-in-out
              `}
            >
              <img
                alt=""
                className={`
                  origin-top-left mt-[-10px]
                  ${location.pathname === item.path ? 'w-[49.22px] h-[50.02px] mt-[-22px]' : "mt-[-10px] w-[29.11px] h-[30.18px]"}
                `}
                src={item.icon}
              />
              <div className="text-[13px] font-black font-['Poppins'] text-white">{item.label}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
