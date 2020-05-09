import React from "react";
import { TextField, Paper, TextareaAutosize } from "@material-ui/core";
import axios from "axios";
import { verify } from "jsonwebtoken";
import QrcodeBox from "./QrcodeBox";

const DecryptPanel = ({
  match: {
    params: { id },
  },
}) => {
  // states
  const [token, setToken] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  // component did mount
  React.useEffect(() => {
    decodeKey();
  }, []);
  // method
  // for getting key
  const decodeKey = async () => {
    try {
      const url =
        (process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:5000"
          : "") + `/api/sign/${id}`;
      const response = await axios.get(url);
      setToken(response.data);
    } catch (error) {
      const {
        response: { data },
      } = error;
      setAnswer(data);
    }
  };
  // for decoding message
  const decodeMessage = ({ currentTarget: { value } }) => {
    const tokenArray = token.split("+");
    const userToken = tokenArray[0];
    const adminToken = tokenArray[1];
    try {
      const userDecode = verify(userToken, value);
      setAnswer(userDecode);
    } catch (error) {
      setAnswer("Wrong secret key !!!");
    }
    try {
      const adminDecode = verify(adminToken, value);
      setAnswer(`admin says: ${adminDecode}`);
    } catch (error) {}
  };
  // render
  return (
    <React.Fragment>
      <QrcodeBox token={id} />
      <Paper style={{ width: 250, marginBottom: 10 }}>
        <TextField
          style={{ width: "100%", padding: 5 }}
          type={"password"}
          placeholder={"Enter secret word"}
          disabled={token.length === 0}
          onChange={decodeMessage}
        />
      </Paper>
      <Paper style={{ width: 250, marginBottom: 5 }}>
        <TextareaAutosize
          rowsMin={5}
          rowsMax={6}
          style={{ width: "100%", padding: 5 }}
          placeholder={"Type secret key and get your text here."}
          value={answer}
          readOnly
        />
      </Paper>
    </React.Fragment>
  );
};

export default DecryptPanel;
