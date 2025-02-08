// EXPRESS IS JUST A FRAMEWORK FOR NODEJS

// const http = require('http');
// const fs = require('fs');
// const url = require("url");

// function myHandler(req, res){
//     if(req.url === '/favicon.ico') return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url} New Request Recieved\n`;
//     const myUrl = url.parse(req.url, true); 
    
//     fs.appendFile("log.txt", log, (err, data) => {
//         switch(myUrl.pathname){ 
//             case '/': if(req.method === "GET") res.end("Home Page");
//             break;

//             case '/about': 
//             const username = myUrl.query.myname;
//             res.end(`Hi, ${username}`); 
//             break;

//             case "/search":
//             const search = myUrl.query.search_query;
//             res.end("Here are your results for"+ search);
//             break;

//             case '/signup':
//             if(req.method === 'GET'){ 
//                 res.end("This is a SignUp form");
//             }
//             else if(req.method === 'POST'){
//                 res.end("Success")
//             }
//             default: res.end("404 Not Found");
//         }
//     })
// }
// const myServer = http.createServer(myHandler);

// myServer.listen(9000, () => console.log('Server Started!'));

//ese code likhne se bht complicated and bada code ho raha aur har case ke liye bht saare if else hojaenge alg alg requests ko handle krne ke liye. also hume query parse krne ke liye alg alg modules download krne padte and that's when express came into frame
//myHandler function express humko likhkr dega 


const express = require('express')
// const http = require('http')

const app = express();
//app is basically the handler function

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
})

// app.METHOD(Path, HANDLER)

//ye sirf iss particual route get method ke liye hai 

app.get('/about', (req, res) => {
    return res.send("Hello from About Page" + " Hey " + req.query.name+ " your age is "+ req.query.age);
})

// app.post('/') ye bi kr skte 

app.listen(9000, () => console.log('Server Started!'))

// const myServer = http.createServer(app);

// myServer.listen(9000, () => console.log('Server Started!'));

//isme query ka bi chinta ni krna hota /about and /about?myname=krishna same hoga 