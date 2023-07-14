import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";
import { AuthContext } from "./providers/AuthProvider";
import { loginState } from "./globalState/GlobalState";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import {
  validationSchemaSignIn,
  validationSchemaSignUp,
} from "./utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
const defaultTheme = createTheme();
type LoginForm = {
  name?: string;
  email: string;
  password: string;
};
export const SignUp = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { setUser } = useContext(AuthContext);
  const setLogin = useSetRecoilState(loginState);
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(
      isLogin ? validationSchemaSignUp : validationSchemaSignIn
    ),
  });
  const signUpEmail = (data: LoginForm) => {
    const rdmNum: number = Math.floor(Math.random() * 10);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((currentUser) => {
        setUser(currentUser.user);
        setLogin(true);
        if (currentUser.user.email) {
          setDoc(doc(db, "user", currentUser.user.email), {
            uid: currentUser.user.uid,
            username: data.name,
            email: currentUser.user.email,
            created_at: serverTimestamp(),
            imageIndex: rdmNum,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode}:${errorMessage}`);
      });
  };
  const signInEmail = (data: LoginForm) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((currentUser) => {
        setUser(currentUser.user);
        setLogin(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode}:${errorMessage}`);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          color="primary"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign up" : "Sign in"}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                autoComplete="Username"
                autoFocus
                {...register("name")}
              />
            )}
            <p style={{ color: "red" }}>
              {errors.name?.message as React.ReactNode}
            </p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <p style={{ color: "red" }}>
              {errors.email?.message as React.ReactNode}
            </p>
            <TextField
              sx={{ mb: "5px" }}
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <p style={{ color: "red" }}>
              {errors.password?.message as React.ReactNode}
            </p>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={
                isLogin ? handleSubmit(signUpEmail) : handleSubmit(signInEmail)
              }
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin ? "Back to sign in" : "Create account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
