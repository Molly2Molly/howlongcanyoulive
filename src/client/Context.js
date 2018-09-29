import React from "react";
import io from "socket.io-client";
import config from "../../config";

console.log("**Context**");
const socket = io(config.serverBaseUrl);

export const globalContextObject = {
  socket: socket
};

export const GlobalContext = React.createContext(globalContextObject);

// socket.emit("chat message", "hello from client");
socket.on("connection", function(data) {
  console.log("connection: " + JSON.stringify(data));
});
socket.on("disconnect", function(data) {
  console.log("disconnect: " + JSON.stringify(data));
});
socket.on("chat message", function(msg) {
  console.log("receive: " + msg);
});
