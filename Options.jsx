import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "../SocketContext";

const StyledContainer = styled(Container)({
  width: "600px",
  margin: "35px 0",
  padding: 0,
});

const StyledPaper = styled(Paper)({
  padding: "10px 20px",
  border: "2px solid black",
});

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  // Debug: Log the ID value
  console.log("Current ID (me):", me);

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              {/* Debug: Show the ID value */}
              <Typography
                variant="body2"
                style={{ margin: "10px 0", color: "blue" }}
              >
                Your ID: {me || "Not connected yet..."}
              </Typography>

              <CopyToClipboard
                text={me || ""}
                onCopy={() => alert("ID copied to clipboard!")}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  disabled={!me} // Disable if no ID
                >
                  {me ? "Copy Your ID" : "Connecting..."}
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<span>📞</span>}
                  fullWidth
                  onClick={leaveCall}
                  style={{ marginTop: "20px" }}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<span>📞</span>}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  style={{ marginTop: "20px" }}
                  disabled={!idToCall || !me} // Disable if no ID to call or not connected
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Options;
