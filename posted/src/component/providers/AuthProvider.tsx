import { getDoc, doc } from "firebase/firestore";
import { createContext, useState, useEffect, SetStateAction } from "react";
import { db } from "../../firebase";

export const AuthContext = createContext(
  {} as {
    user: any;
    setUser: React.Dispatch<SetStateAction<any>>;
    userData: any;
  }
);

export const AuthProvider = (props: any) => {
  const { children } = props;
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    if (user) {
      const getData = async () => {
        const Doc = await getDoc(doc(db, "user", user.email));
        setUserData(Doc.data());
      };
      getData();
    } else {
      setUserData(null);
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
