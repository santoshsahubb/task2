import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { sendEmail } from './emailService';
import nodemailer from 'nodemailer';
import { notificationValidate } from './validations/notification';
import { z , ZodError} from 'zod';




const app = express();
let formattedErrors: string[] = []; 
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('./'));

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('sendNotification',async (notification) => {
    console.log('Received notification:', notification);
    const messageParts = notification.split(',');
    const name = messageParts[0]?.trim();
    const email = messageParts[1]?.trim();
    console.log("iiii",name,email)
    try{
      notificationValidate.parse({name : name, email :email });
    }catch(error){
      console.log('lll',error)
      if (error instanceof ZodError) {
        formattedErrors = error.errors.map(
          (err) => `Error in field ${err.path.join(".")}: ${err.message}`
        );
          socket.emit('sendNotification', formattedErrors);
        return;
      } else {
        console.error("An unexpected error occurred:", error);
        socket.emit('sendNotification', formattedErrors);
        return;
      }
    }
    io.emit('sendNotification', `${name} has joined the Room`);
    try {
        
        await  sendEmail(name, email);
        socket.emit('sendNotification', `Email sent successfully to you ${name}, welcome again..!!!!`);
      } catch (error) {
        socket.emit('sendNotification', 'Error sending email.');
      }
    
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
