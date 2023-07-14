import React, { useContext } from "react";
import { Board } from "./layout/Board";
import { css } from "@emotion/react";
import "../style/style.css";
import { Sidebar } from "./layout/Sidebar";
import { Profile } from "./layout/Profile";
export const Home = () => {
  return (
    <div
      className="p-home__display"
      css={css`
        width: 100%;
        background: red;
        display: block;
      `}
    >
      <div className="p-home__sidebar-area">
        <Sidebar />
      </div>
      <div className="p-home__board-area">
        <Board />
      </div>
      <div className="p-home__profile-area">
        <Profile />
      </div>
    </div>
  );
};
