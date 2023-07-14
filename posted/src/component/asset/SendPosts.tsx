import React, { useState, SetStateAction, useContext } from "react";
import "../../style/style.css";
import { db } from "../../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../providers/AuthProvider";
import { MyTextField } from "../layout/profileData/MyTextField";
import { Button } from "@mui/material";

type Props = {
  update: boolean;
  setUpdate: React.Dispatch<SetStateAction<boolean>>;
};
export const SendPosts = (props: Props) => {
  const { update, setUpdate } = props;
  const [message, setMessage] = useState<string>("");
  const { userData } = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const sendMessage = () => {
    if (message.length > 120 || message.length == 0) {
      return setError(true);
    }
    if (userData) {
      const ref = collection(db, "posts");
      const id = doc(ref).id;
      setDoc(doc(db, "posts", id), {
        body: message,
        created_at: serverTimestamp(),
        email: userData.email,
        imageIndex: userData.imageIndex,
        username: userData.username,
        id: id,
      });
    }
    setError(false);
    setMessage("");
    setUpdate(!update);
  };
  return (
    <div className="p-home__send-area">
      <form>
        <label>
          {/* コンポーネントにhook-formのvalidationをどうやって充てればいいのかわかりませんでした。 */}
          <MyTextField
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
        </label>
      </form>
      {error && (
        <p
          style={{
            color: "red",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            bottom: "35px",
          }}
        >
          入力エラー
        </p>
      )}
      <Button
        sx={{
          borderRadius: "50px",
          position: "absolute",
          bottom: "35px",
          right: "15px",
        }}
        variant="contained"
        onClick={() => sendMessage()}
      >
        送信
      </Button>
    </div>
  );
};
