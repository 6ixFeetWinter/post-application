import React from "react";
import "../../../style/style.css";

export const Avatar = (props: number | any) => {
  const { index } = props;
  return <div className={`p-profile__avatar avatar${index}`}></div>;
};
