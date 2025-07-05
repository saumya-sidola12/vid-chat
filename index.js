const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send('server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.emit('me', socket.id);
  
  socket.on('disconnect', () => {
    socket.broadcast.emit("callEnded"); // Fixed event name
  });

  // Fixed event names to match frontend
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal); // Fixed event name
  });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));