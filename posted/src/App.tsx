import React from "react";
import { SignUp } from "./component/SignUp";
import { Home } from "./component/Home";
import { useRecoilValue } from "recoil";
import { loginState } from "./component/globalState/GlobalState";

function App() {
  const isLogin = useRecoilValue(loginState);
  return <div>{isLogin ? <Home /> : <SignUp />}</div>;
}

export default App;
