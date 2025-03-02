const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000", // frontend’s house
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("Someone’s here, yo");

  // new user jumps in
  socket.on("new-user-add", (newUserId) => {
    console.log("Hooking up...");
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New buddy connected:", activeUsers);
    }
    io.emit("get-users", activeUsers); // tell everyone who’s here
    console.log("All set...");
  });

  // user bails
  socket.on("disconnect", () => {
    console.log("Disconnecting...");
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("Buddy’s out:", activeUsers);
    io.emit("get-users", activeUsers); // update the crew
  });

  // send a msg
  socket.on("send-message", (data) => {
    console.log("Ready to send some chatter...");
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending to:", receiverId);
    console.log("Msg data:", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data); // fixed typo
      console.log("Sent it!");
    } else {
      console.log("Dude’s not online");
    }
  });
});

// just in case
io.on("error", (err) => {
  console.log("Socket’s mad:", err.message);
});