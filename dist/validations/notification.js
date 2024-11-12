"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationValidate = void 0;
const zod_1 = require("zod");
exports.notificationValidate = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email format" })
});
