import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import VideoPlayer from "./components/VideoPlayer.jsx";
import Options from "./components/Options.jsx";
import Notif from "./components/Notif.jsx";
import { ContextProvider } from './SocketContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 100px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const App = () => {
  return (
    <ContextProvider>
      <Wrapper>
        <StyledAppBar position="static" color="inherit">
          <Typography variant="h2" align="center">Video Chat</Typography>
        </StyledAppBar>
        <VideoPlayer />
        <Options />
        <Notif />
      </Wrapper>
    </ContextProvider>
  );
};

export default App;