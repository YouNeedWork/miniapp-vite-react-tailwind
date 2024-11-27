import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../components";
import Inviter from "../components/Inveter";

export default function Root() {

  return (
    <div >
      {/* 主要内容区域 */}
      <Inviter />
      <Outlet />
      {/* 底部导航 */}
      <BottomNavigation />
    </div>
  );
}