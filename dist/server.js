"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const emailService_1 = require("./emailService");
const notification_1 = require("./validations/notification");
const zod_1 = require("zod");
const app = (0, express_1.default)();
let formattedErrors = [];
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express_1.default.static('./'));
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sendNotification', (notification) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        console.log('Received notification:', notification);
        const messageParts = notification.split(',');
        const name = (_a = messageParts[0]) === null || _a === void 0 ? void 0 : _a.trim();
        const email = (_b = messageParts[1]) === null || _b === void 0 ? void 0 : _b.trim();
        console.log("iiii", name, email);
        try {
            notification_1.notificationValidate.parse({ name: name, email: email });
        }
        catch (error) {
            console.log('lll', error);
            if (error instanceof zod_1.ZodError) {
                formattedErrors = error.errors.map((err) => `Error in field ${err.path.join(".")}: ${err.message}`);
                socket.emit('sendNotification', formattedErrors);
                return;
            }
            else {
                console.error("An unexpected error occurred:", error);
                socket.emit('sendNotification', formattedErrors);
                return;
            }
        }
        io.emit('sendNotification', `${name} has joined the Room`);
        try {
            yield (0, emailService_1.sendEmail)(name, email);
            socket.emit('sendNotification', `Email sent successfully to you ${name}, welcome again..!!!!`);
        }
        catch (error) {
            socket.emit('sendNotification', 'Error sending email.');
        }
    }));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
