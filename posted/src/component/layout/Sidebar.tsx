import React from "react";
import "../../style/style.css";
import { SignOut } from "../asset/SignOut";
import { SidebarData } from "./sidebarData/SidebarData";
import { useRecoilState } from "recoil";
import { selectState } from "../globalState/GlobalState";

export const Sidebar = () => {
  const [select, setSelect] = useRecoilState(selectState);
  return (
    <div className="p-sidebar">
      <ul className="p-sidebar__list">
        {SidebarData.map(({ title, icon }, index) => (
          <li
            key={title}
            className={`p-sidebar__list-item ${
              select === index && "p-sidebar__list-item-selected"
            }`}
            onClick={() => setSelect(index)}
          >
            {icon}
            <p className="p-sidebar__list-title">{title}</p>
          </li>
        ))}
      </ul>
      <SignOut />
    </div>
  );
};
