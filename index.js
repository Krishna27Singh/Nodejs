// const express = require('express');
// const app = express();
// const PORT = 8000;
// const users = require('./MOCK_DATA.json')

// //Routes
// app.get("/api/users", (req, res) => {
//     return res.json(users);
// });

// app.get("/users", (req, res) => {
//     const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id); //isse id ko get krlenge 
//     //To find id in the json
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// app.post("/api/users", (req, res) => {
//     //ToDo: create new user
//     return res.json({status  : pending})
// });

// app.patch("/api/users/:id", (req, res) => {
//     //ToDo: edit the user with id
//     return res.json({status  : pending})
// });

// app.post("/api/users/:id", (req, res) => {
//     //ToDo: delete the user with id
//     return res.json({status  : pending})
// });

// app.listen(PORT, console.log(`Server started at Port ${PORT}`))

// //join commmas hatane ke kaam aya 







//ese bi kr skte h

// const express = require('express');
// const app = express();
// const PORT = 8000;
// const users = require('./MOCK_DATA.json')


//Routes
// app.get("/api/users", (req, res) => {
//     return res.json(users);
// });

// app.get("/users", (req, res) => {
//     const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })

// app.route("/api/users/:id").get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// }).patch((req, res) => {
//     //ToDo: edit the user with id
//     return res.json({status  : "pending"})
// }).delete((req, res) => {
//     return res.json({status  : "pending"})
// });

// //ye krne se ye fayda hua ki agr humje route change krna to sbke liye hojaega apne aap

// app.post("/api/users", (req, res) => {
//     //ToDo: create new user
//     return res.json({status  : "pending"})
// });

// app.listen(PORT, console.log(`Server started at Port ${PORT}`))







//POSTMAN, MIDDLEWARE, STATUS CODE

//hum chahte h ki data with id 1001 ko send kre post req krke and vo json file m append hojaye (fs module ka use krna pdega uske liye)

const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json')
const fs = require('fs');
const { log } = require('console');

//Middleware- plugin
app.use(express.urlencoded({extended: false}));
//ye header ko dekhke hi kaam krta h agr header html ya json nhi h to parse krdeta hai 
//is middle ware ko band krne se ye dikhata h body is not defined mtlb ye middlware andr kuch processing krta hai req.body= hdhjd, krke and vo throught the code persist rehta 
//pehle ye vala middleware run hoga then agla
//ye jab bi koi form data ayega use body m daalne ka kaam krega 

// app.use((req, res, next) => {
//     console.log('Hello from Middleware 1');
// });
//isne na response ko end kiya na next function ko call kiya

// app.use((req, res, next) => {
//     console.log('Hello from Middleware 1');
//     return res.json( {mgs: "Hello from Middleware 1"})
// });
//yahi se repsonse end krdiya to aage jayega hi nahi and user nahi dikhayega if we apply http://localhost:8000/api/users

app.use((req, res, next) => {
    console.log('Hello from Middleware 1');
    req.myUserName = "krishnasingh";
    //request ke andr khudse bana ke myusername daaldiya
    //to my username agle middleware m bi available hogi 
    next();
});
//next function ka mtlb h iske baad next chiz run hojaegi and express ko pta chl jayega ki iska kaam hogya

// app.use((req, res, next) => {
//     console.log('Hello from Middleware 2');
//     return res.end("End");
// });
//req res cycle yahi pe end hojaegi and user display nhi honge 

app.use((req, res, next) => {
    console.log('Hello from Middleware 2', req.myUserName);
    //db query
    // req.creditcardnumber = "123";
    // to aage hum deekh skte h ki user ka credit card number kya h 
    next();
});





//creating log file using middleware

//PRACTICAL USE CASE OF MIDDLEWARE
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err,data) =>{
    next();
    })
});

// Routes
app.get("/api/users", (req, res) => {
    res.setHeader("X-myname", "krishna singh"); //custor header bana skte h (this is a response header)
    //hum postman m request header bi daal skte h 
    //always add X to your custon header X-myname
    return res.json(users);
    // console.log('I am in get route', req.myUserName);
    
});

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)

    //IMPLEMENTATION OF 404 NOT FOUND
    if(!user) res.status(404).json({error: "user not found"});

    return res.json(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update the user data with the provided body
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    // Write updated data to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ error: "Failed to update user" });
        }
        // Respond only after successfully writing the file
        res.json({ message: "User updated successfully", user: updatedUser });
    });
}).delete((req, res) => {
    const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the user from the array
        const deletedUser = users.splice(userIndex, 1);

        // Write updated data to the file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).json({ error: "Failed to delete user" });
            }
            res.json({ message: "User deleted successfully", user: deletedUser[0] });
        });
});

//ye krne se ye fayda hua ki agr humje route change krna to sbke liye hojaega apne aap

app.post("/api/users", (req, res) => {
    const body = req.body; // jo bi hum frontend se data sende krte h vo req.body m ajata

    //IMPLEMENTATION OF 404 BAD REQUEST 
    if((!body) || !(body.first_name) || !(body.last_name) || !(body.email) || !(body.gender) || !(body.id) || !(body.ip_address)){
        return res.status(400).json({msg: "all fields are required"});
    }
    //esa krne se koi bi ek field post req m ni denge to 400 error dikhaega 
    // msg mtlb vo user ko dikhta hai jo bi likhte 

    console.log('Body', body); //body undefined ayega cos express ko ni pata ki kis trh ka data hai and use kese handle krna hai, iske liye middleware ka use krna pdega (middlewre is a plugin)
    users.push( {...body, id : users.length +1}); //id increment krne ke liye 
    //ye krne se mock data file m user add hojaega 
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({status  : "Success", id : users.length});
    });
    //esa krne se http://localhost:8000/api/users/1001 ispe get request bhejne pe hume user with id 1001 ka data mill jayega
    //res.status(201) esa krne se postman m 201 dikhaega mtlb new user created 

    // ex:
    // sbse pehle data ko lete h then data ko run krte on db ki ye data valid to hai vagera vagera then hum database ke paas querty krte h and data insert krte and response m id ko return krte hai 
    
});

app.listen(PORT, console.log(`Server started at Port ${PORT}`))


// In web development, params refers to route parameters or path parameters, which are dynamic parts of a URL. These parameters are defined in the route definition and are captured from the URL when a request is made. They are often used to pass information to the server in the URL itself.

// JSON.stringify m null ka mtlb hai 
// This is the replacer parameter. It allows you to control which properties of the object are included in the JSON string.
// When null is passed, no filtering occurs, and all properties are included.

// 2 (Third Argument):

// This is the space parameter. It specifies the number of spaces to use for indentation in the resulting JSON string, making it more readable.
// In this case, an indentation of 2 spaces is applied to the JSON string.