const fs = require("fs");
const os = require("os")

console.log(os.cpus().length); 
//max 8 thread size (8cpus)


console.log('1');

//blocking...
console.log(fs.readFileSync("./contacts.txt", "utf-8"));
//ye iss action ko block krdega and aage vali lines execute nahi hoga jab tk worker isko execute krke result nahi return krta
console.log('2');

console.log('1');

//Non-Blocking...
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    console.log(result);
})
//aage vali lines execute hojaegi

console.log('2');

//default thread pool size - 4
//max? 8 core cpu - max 8 threads