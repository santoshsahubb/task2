"use strict";
// import { createClient } from "valkey";
Object.defineProperty(exports, "__esModule", { value: true });
// const cache =  createClient({ url : 'redis://localhost:6379'});
// cache.connect().then(() => {
//     console.log('Connected to Redis successfully!');
//   }).catch((error : any) => {
//     console.error('Error connecting to Redis:', error);
//   });
// export default cache;
const iovalkey_1 = require("iovalkey");
const redis = new iovalkey_1.Redis();
// redis.set("mykey", "value");
// redis.get("mykey").then((result) => {
//     console.log(result); // Prints "value"
//   });
exports.default = redis;
