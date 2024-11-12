"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = sendNotification;
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000");
function sendNotification() {
    console.log("here in function");
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    if (message) {
        const notification = {
            id: Date.now().toString(),
            message: message,
            timestamp: new Date(),
        };
        socket.emit("sendNotification", notification);
        messageInput.value = "";
    }
    else {
        alert("Please enter a message!");
    }
}
socket.on("receiveNotification", (notification) => {
    const notificationArea = document.getElementById("notifications");
    if (notificationArea) {
        const notificationElement = document.createElement("div");
        notificationElement.innerText = `[${notification.timestamp}] ${notification.message}`;
        notificationArea.appendChild(notificationElement);
    }
});
