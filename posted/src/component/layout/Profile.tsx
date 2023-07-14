import React, { useContext, useState, useEffect } from "react";
import "../../style/style.css";
import { AuthContext } from "../providers/AuthProvider";
import { Avatar } from "./profileData/Avatar";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { MyTextField } from "./profileData/MyTextField";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Profile = () => {
  const { userData } = useContext(AuthContext);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [profileText, setProfileText] = useState<string>("");
  const [profileValue, setProfileValue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  /* useEffect更新用の変数 */
  const [update, setUpdate] = useState<boolean>(false);
  const pushProfile = () => {
    if (profileText.length > 80) {
      return setError(true);
    }
    setDoc(doc(db, "user", userData.email, "profile", "data"), {
      profile: profileText,
    });
    setProfileText("");
    setIsProfile(false);
    setUpdate(!update);
    setError(false);
  };
  useEffect(() => {
    if (userData) {
      const getProfile = async () => {
        const getData = await getDoc(
          doc(db, "user", userData.email, "profile", "data")
        );
        const data = getData.data();
        if (data) {
          setProfileValue(data.profile);
          setProfileText(data.profile);
        }
      };
      getProfile();
    }
  }, [update, userData]);
  useEffect(() => {
    if (userData && userData.created_at) {
      return setDate(dayjs(userData.created_at.toDate()).format("YYYY/MM/DD"));
    }
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    setDate(`${year}/${month}/${day}`);
  }, [userData]);
  return (
    <div className="p-profile">
      {userData && (
        <div>
          <Avatar index={userData.imageIndex} />
          <Typography
            sx={{ color: "white", fontWeight: "bold", m: "10px 0" }}
            level="h4"
          >
            {userData.username}
          </Typography>
          <p className="p-profile__date">
            登録日：
            {date}
          </p>
        </div>
      )}
      {profileValue && <p className="p-profile__text">{profileValue}</p>}
      <div className="o-home__button">
        <Button
          sx={{ color: "white" }}
          variant="text"
          onClick={() => {
            setIsProfile(!isProfile);
            setError(false);
          }}
        >
          {profileValue
            ? isProfile
              ? "閉じる"
              : "自己紹介を編集"
            : isProfile
            ? "閉じる"
            : "自己紹介を追加"}
        </Button>
      </div>
      {isProfile && (
        <form>
          {/* コンポーネントにhook-formのvalidationをどうやって充てればいいのかわかりませんでした。 */}
          <MyTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProfileText(e.target.value)
            }
          />
          {error && (
            <p style={{ color: "red" }}>80文字以内で入力してください</p>
          )}
          <Button
            sx={{ color: "white" }}
            variant="text"
            onClick={() => pushProfile()}
          >
            追加
          </Button>
        </form>
      )}
    </div>
  );
};
const styles = {
  root: {
    background: "transparent",
  },
  input: {
    color: "white",
  },
};
