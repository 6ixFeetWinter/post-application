import { doc, getDoc } from "firebase/firestore";
import "../../style/style.css";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../../firebase";
import dayjs from "dayjs";
import { profileState } from "../globalState/GlobalState";
type Props = {
  id: string;
};
export const ProfileCard = (props: Props) => {
  const { id } = props;
  const [userData, setUserData] = useState<any>(null);
  const [profile, setProfile] = useState<string | undefined>(undefined);
  const setIsProfile = useSetRecoilState(profileState);
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const userRef = await getDoc(doc(db, "user", id));
        const profRef = await getDoc(doc(db, "user", id, "profile", "data"));
        const userData = userRef.data();
        const prof = profRef.data();
        if (userData) {
          setUserData(userData);
        }
        if (prof === undefined) {
          return setProfile(undefined);
        }
        setProfile(prof.profile);
      }
    };
    getData();
  }, [id]);
  if (userData) {
    return (
      <div className="p-profileCard">
        <div className="p-profileCard__avatarArea">
          <div
            className={`p-profileCard__avatar avatar${userData.imageIndex}`}
          ></div>
        </div>
        <div className="p-profileCard__profArea">
          <button
            className="p-profileCard__close"
            onClick={() => setIsProfile(false)}
          ></button>
          <h4 className="p-profileCard__username">{userData.username}</h4>
          <p className="p-profileCard__id">{`@${userData.uid}`}</p>
          <p className="p-profileCard__date">{`登録日 : ${dayjs(
            userData.created_at.toDate()
          ).format("YYYY/MM/DD")}`}</p>
          {profile ? (
            <p className="p-profileCard__prof">{profile}</p>
          ) : (
            <p className="p-profileCard__prof">自己紹介文はありません</p>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
