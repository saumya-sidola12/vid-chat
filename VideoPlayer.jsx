import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SocketContext } from "../SocketContext";

const StyledVideo = styled("video")(({ theme }) => ({
  width: "550px",
  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledPaper = styled(Paper)({
  padding: "10px",
  border: "2px solid black",
  margin: "10px",
});

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo]);

  return (
    <GridContainer container>
      <StyledPaper>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {name || "Your Name"}
          </Typography>
          {stream ? (
            <StyledVideo playsInline muted ref={myVideo} autoPlay />
          ) : (
            <Typography variant="body1">Waiting for camera access…</Typography>
          )}
        </Grid>
      </StyledPaper>

      {callAccepted && !callEnded && (
        <StyledPaper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Caller Name"}
            </Typography>
            <StyledVideo playsInline ref={userVideo} autoPlay />
          </Grid>
        </StyledPaper>
      )}
    </GridContainer>
  );
};

export default VideoPlayer;
