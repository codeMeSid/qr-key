import React from "react";
import QrcodeBox from "./QrcodeBox";
import { TextField, TextareaAutosize, Paper, Button } from "@material-ui/core";
import axios from "axios";

const EncryptPanel = () => {
  // states
  const [msg, setMsg] = React.useState("");
  const [secretKey, setSecretKey] = React.useState("");
  const [token, setToken] = React.useState("");
  // methods
  const generateToken = async () => {
    try {
      const url =
        (process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:5000"
          : "") + "/api/sign";
      console.log(url);
      const newToken = await axios.post(url, {
        msg,
        secretKey,
      });
      console.log(newToken.data);
      setToken(newToken.data);
      setMsg("");
      setSecretKey("");
    } catch (error) {
      console.log(error);
    }
  };
  // render
  return (
    <React.Fragment>
      <QrcodeBox token={token} />
      <Paper style={{ width: 250, marginBottom: 10 }}>
        <TextField
          style={{ width: "100%", padding: 5 }}
          type={"password"}
          placeholder={"Enter Secret word"}
          value={secretKey}
          onChange={({ currentTarget: { value } }) => {
            if (value.length <= 20) setSecretKey(value);
            setToken("");
          }}
        />
      </Paper>
      <Paper style={{ width: 250, marginBottom: 5 }}>
        <TextareaAutosize
          rowsMin={5}
          rowsMax={6}
          style={{ width: "100%", padding: 5 }}
          placeholder={"Type message here"}
          value={msg}
          onChange={({ currentTarget: { value } }) => {
            setMsg(value);
            setToken("");
          }}
        />
      </Paper>
      <Button
        style={{ width: 250, marginBottom: 5 }}
        color={"primary"}
        variant={"outlined"}
        disabled={msg.length === 0 || secretKey.length === 0}
        onClick={generateToken}
      >
        create qr-code
      </Button>
      <Button
        style={{ width: 250 }}
        color={"secondary"}
        variant={"outlined"}
        disabled={token.length === 0}
      >
        download
      </Button>
    </React.Fragment>
  );
};

export default EncryptPanel;