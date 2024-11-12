import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export function sendNotification() {
    console.log("here in function")
    const messageInput = document.getElementById("message") as HTMLInputElement;
    const message = messageInput.value;
  
    if (message) {
      const notification = {
        id: Date.now().toString(),
        message: message,
        timestamp: new Date(),
      };
  
      socket.emit("sendNotification", notification);
  
      messageInput.value = "";
    } else {
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

