"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("./emailService");
(0, emailService_1.sendEmail)('John Doe', 'john.doe@example.com')
    .then(() => {
    console.log('Email sent successfully!');
})
    .catch((error) => {
    console.error('Error sending email:', error);
});
