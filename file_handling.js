
const fs = require('fs');

//synchronous call
// fs.writeFileSync("./test.txt", "Hey, this is file handling synchronous");

//asynchrous call
// fs.writeFile("./test.txt", "Hey, this is file handling Asynchronous", (err) => {}); 
//ye ek callback function leta hai 
//ye upr vali created file ko overwrite krdega, isme essentially ek error function bi lagana pdta hai 

// const result = fs.readFileSync('./contacts.txt', "utf-8")
// console.log(result); 
//file read ese krte hai 

// const result = fs.readFile('./contacts.txt', "utf-8")
//esa nahi kr skte coz ye return nahi krta 

// fs.readFile('./contacts.txt', "utf-8", (err, result) => {
//     if(err){
//         console.log('error', err);
//     }
//     else{
//         console.log(result);
//     }
// });

//asynchronous m return nahi krta, callback expect krta hai 

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
//ye date append krdega 
// fs.appendFileSync("./test.txt", `hey there\n`);
//ye users ke log bnane kaam ata hai ki uska ip address kya hai aur unhone kya request kiya hai kiss time pe 
// fs.appendFileSync("./test.txt", `${Date.now()}hey there\n`)

// fs.cpSync("./test.txt", "./copy.txt");
//ye test.txt ki copy banadega that is copy.txt
// fs.unlinkSync("./copy.txt")
//isse copy.txt delete hojaegi 

console.log(fs.statSync("./test.txt"));
//ye statistics dega file ke 
console.log(fs.statSync("./test.txt").isFile());
fs.mkdirSync("my-docs/a/b", {recursive: true})
//folders bi bana skte hai 

// "my-docs/a/b": This is the path to the directory you want to create. In this case, it's a nested directory structure:

// my-docs: The top-level directory.
// a: A subdirectory within my-docs.
// b: A subdirectory within a.

// recursive: When set to true, it tells mkdirSync() to create all the intermediate directories in the path if they don't already exist.

// If my-docs doesn't exist, it will be created.
// If my-docs exists but a doesn't, it will create a within my-docs.
// Finally, it will create b within a.