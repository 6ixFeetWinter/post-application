import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

const myStyle = {
  "& .MuiInputBase-input": {
    color: "#fff", // 入力文字の色
  },
  "& label": {
    color: "#fff", // 通常時のラベル色
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CCCCCC", // 通常時のボーダー色(アウトライン)
    },
    "&:hover fieldset": {
      borderColor: "#DDDDDD", // ホバー時のボーダー色(アウトライン)
    },
  },
  m: "20px 0",
};

export const MyTextField: React.FC<TextFieldProps> = ({
  onChange,
  ...props
}) => {
  const [rows, setRows] = useState(5);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = Math.floor(e.target.value.length / 20);
    setRows(newRows);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <TextField
      {...props}
      onChange={handleOnChange}
      sx={myStyle}
      fullWidth
      multiline
      rows={rows < 5 ? 5 : rows}
    />
  );
};
