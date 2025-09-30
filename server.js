import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server, Socket } from "socket.io";
import { ChatService } from "./services/chatService.js";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  })

  const io = new Server(server);

  io.on("connection", (socket) => {        
    socket.on("room:join", (data) => {
      socket.join(data.chat_id);
    });

    socket.on("room:leave", (data) => {
      socket.leave(data.chat_id);
    });

    socket.on("message:new", (data) => {
      socket.to(data.chat_id).emit("message:new", data);
    });
  });
  
  server.once("error", (err) => {
    console.error(err);
    process.exit(1);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
});
