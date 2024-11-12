// import { createClient } from "valkey";


// const cache =  createClient({ url : 'redis://localhost:6379'});

// cache.connect().then(() => {
//     console.log('Connected to Redis successfully!');
//   }).catch((error : any) => {
//     console.error('Error connecting to Redis:', error);
//   });
// export default cache;

import { Redis } from "iovalkey";
const redis = new Redis();
// redis.set("mykey", "value");


// redis.get("mykey").then((result) => {
//     console.log(result); // Prints "value"
//   });


  export default redis;
