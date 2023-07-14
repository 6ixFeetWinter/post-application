import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, orderBy, limit, query, getDocs } from "firebase/firestore";
import { SendPosts } from "../SendPosts";
import { css } from "@emotion/react";

export const Board = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "posts"),
        orderBy("created_at"),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    };
    getData();
  }, [update]);
  return (
    <div>
      <SendPosts update={update} setUpdate={setUpdate} />
      {posts && posts.map((data) => <p key={data.id}>{data.body}</p>)}
    </div>
  );
};
const homeLayout = css({
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "red",
});
