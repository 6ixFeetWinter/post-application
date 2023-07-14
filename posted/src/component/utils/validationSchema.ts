import { z } from "zod";

export const validationSchemaSignUp = z.object({
  name: z
    .string()
    .nonempty("名前は必須です")
    .max(8, "８文字以内で入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

export const validationSchemaSignIn = z.object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

export const validationSchemaProfile = z.object({
  profile: z.string().max(80, "80文字以内で入力してください"),
});

export const validationSchemaPost = z.object({
  profile: z.string().max(120, "120文字以内で入力してください"),
});
