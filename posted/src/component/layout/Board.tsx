import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  orderBy,
  limit,
  query,
  deleteDoc,
  doc,
  where,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { SendPosts } from "../asset/SendPosts";
import { css } from "@emotion/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getAuth } from "firebase/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, selectState } from "../globalState/GlobalState";
import { ProfileCard } from "./ProfileCard";
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

export const Board = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [isProfile, setIsProfile] = useRecoilState(profileState);
  const select = useRecoilValue(selectState);
  const user = getAuth();
  const userData = user.currentUser;
  const email = userData?.email;
  useEffect(() => {
    if (select === 0) {
      const q = query(
        collection(db, "posts"),
        orderBy("created_at", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(querySnapshot.docs.map((doc) => doc.data()));
      });
      return () => unsubscribe();
    } else {
      if (email) {
        const q = query(
          collection(db, "posts"),
          where("email", "==", email),
          orderBy("created_at", "desc"),
          limit(50)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setPosts(querySnapshot.docs.map((doc) => doc.data()));
        });
        return () => unsubscribe();
      }
    }
  }, [update, select]);
  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    setUpdate(!update);
  };
  const time = (date: Timestamp | null | undefined) => {
    if (date) {
      let timestamp = formatDistance(new Date(), date.toDate(), {
        locale: ja,
      });
      return timestamp;
    } else {
      return "ついさっき";
    }
  };
  return (
    <>
      <SendPosts update={update} setUpdate={setUpdate} />
      <ul css={homeLayout} className="p-home__layout">
        {posts &&
          posts.map((data) => (
            <li key={data.id} className="p-home__list-item">
              <div
                className={`p-home__list-avatar avatar${data.imageIndex}`}
                onClick={() => {
                  setId(data.email);
                  setIsProfile(true);
                }}
              ></div>
              <div className="p-home__list-content">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "20px",
                  }}
                >
                  <h4
                    className="p-home__list-username"
                    onClick={() => {
                      setId(data.email);
                      setIsProfile(true);
                    }}
                  >
                    {data.username}
                  </h4>
                  <p style={{ marginBottom: "10px" }}>
                    {time(data.created_at)}{" "}
                    {time(data.created_at) !== "ついさっき" && "前"}
                  </p>
                </div>
                <p className="p-home__list-body">{data.body}</p>
              </div>
              {email && email == data.email && (
                <DeleteForeverIcon
                  sx={{
                    color: "#657CF1",
                    cursor: "pointer",
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                    transition: "all 0.25s",
                    ":hover": {
                      color: "red",
                    },
                  }}
                  onClick={() => onDelete(data.id)}
                  fontSize="large"
                />
              )}
            </li>
          ))}
      </ul>
      {isProfile && <ProfileCard id={id} />}
    </>
  );
};
const homeLayout = css({
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "red",
});
