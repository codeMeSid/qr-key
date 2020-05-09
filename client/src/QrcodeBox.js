import React from "react";
import { Paper } from "@material-ui/core";
import { QRCode } from "react-qr-svg";
import SkeletonLoader from "react-loading-skeleton";

const QrcodeBox = ({ token }) => {
  return (
    <Paper
      elevation={10}
      style={{ padding: 5, marginBottom: 20, position: "relative" }}
    >
      {token.length !== 0 ? (
        <QRCode
          id={"svg"}
          fgColor="#000000"
          level="L"
          style={{ width: 250 }}
          value={window.location.href + token}
        />
      ) : (
        <React.Fragment>
          <SkeletonLoader
            width={250}
            height={250}
            children={<h1>Type something</h1>}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexWrap: "wrap",
              width: 250,
              textAlign: "center",
              lineHeight: 2,
            }}
          >
            Type your message and secret then click create qr-code
          </div>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default QrcodeBox;
