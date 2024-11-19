import React from "react";
import { Wallet2, Pickaxe, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // 导入 useLocation

export default function BottomNavigation() {
  const location = useLocation(); // 获取当前路径

  const navList = [
    { icon: <Wallet2 className="w-6 h-6" />, label: "Earn", path: "/earn" },
    { icon: <Pickaxe className="w-6 h-6" />, label: "Mine", path: "/mint" },
    { icon: <Users className="w-6 h-6" />, label: "Friends", path: "/friends" },
    { icon: <User className="w-6 h-6" />, label: "Me", path: "/me" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="flex justify-around py-4">
        {navList.map((item) => (
          <Link to={item.path} key={item.label}>
            <div
              className={`flex flex-col items-center ${
                location.pathname === item.path
                  ? "text-[#FF6B6B]" // 高亮颜色
                  : "text-gray-500" // 非高亮颜色
              }`}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
