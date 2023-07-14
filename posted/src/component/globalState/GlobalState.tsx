import { atom } from "recoil";

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const selectState = atom<number>({
  key: "selectState",
  default: 0,
});

export const profileState = atom<boolean>({
  key: "profileState",
  default: false,
});

type userData = {
  created_at: any;
  username: string;
  imageIndex: number | null;
  uid: string;
  email: string;
};
export const userState = atom<userData | any>({
  key: "userState",
  default: {
    created_at: null,
    username: "",
    imageIndex: null,
    uid: "",
    email: "",
  },
});
