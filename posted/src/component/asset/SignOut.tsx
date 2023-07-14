import React, { useContext } from "react";
import "../../style/style.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { loginState } from "../globalState/GlobalState";
import { useSetRecoilState } from "recoil";

export const SignOut = () => {
  const auth = getAuth();
  const setLogin = useSetRecoilState(loginState);
  const { setUser } = useContext(AuthContext);
  const Logout = () => {
    auth.signOut();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    setLogin(false);
    alert("ログアウトしました");
  };
  return (
    <div className="o-home__button">
      <Button sx={{ color: "white" }} variant="text" onClick={() => Logout()}>
        Sign out
      </Button>
    </div>
  );
};
