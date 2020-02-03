const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const crypto = require("crypto");
const fs = require("fs");

const idLength = 4;

const url = require('url');

let users = [];
let loggedUsersArr = [];

if(fs.existsSync("users.json")){
    users = JSON.parse(fs.readFileSync("users.json").toString());
}

function hash (hashedWord){
    let mix = crypto.createHash("md5").update(hashedWord).digest("hex");
    mix = mix.split("").reverse().join(""); //pozpatku

    for (let i = 0; i < 10; i++ ) {
        mix = crypto.createHash("md5").update(mix).digest("hex");
    }

    return mix;
}


exports.apiUser = function (req, res) {
    
    if (req.pathname === "/user/list") { //users...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));

    } else if (req.pathname === "/user/register") {

                res.writeHead(200, {
                    "Content-type": "application/json",

                });
                let obj = {};
                obj.username = req.parameters.name;

                obj.email = req.parameters.email;
                obj.password = hash(req.parameters.password);
                // obj.time = new Date();
                let id = crypto.randomBytes(idLength).toString("hex");
                obj.id = id;

                users.push(obj);
                fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

                // users[obj.username] = obj;
                res.end(JSON.stringify(obj));



    }  else if (req.pathname === "/user/login") {
    console.log ("fetch na login");
                res.writeHead(200, {
                    "Content-type": "application/json",

                });
                let obj = {};

                let loginName = req.parameters.name;
                let loginPass = hash(req.parameters.password);

                //let i = 0; i < users.length; i++
                //let i of users
                for (let u of users){
                    if (u && u.username === loginName && u.password === loginPass ){
                        obj.credentialsCorrect = true;
                        let token = crypto.randomBytes(16).toString("hex");
                        obj.name = entities.decode(u.username);
                        u.token = token; // set into array
                        obj.token = token;
                        let loggedUser = {};
                        loggedUser.name = obj.name;
                        loggedUser.token = obj.token;
                        loggedUsersArr[token] = loggedUser;
                        console.log(loggedUsersArr);
                        break;
                    }
                    obj.credentialsCorrect = false;
                }

                /*
               if (users[loginName] && users[loginName].password === loginPass){
                   obj.credentialsCorrect = true;
                   obj.name = entities.decode(users[loginName].name);
               } else
                 {
                   obj.credentialsCorrect = false;
                 }

                 */

                res.end(JSON.stringify(obj));

    }else if (req.pathname === "/user/logout") {
    console.log ("fetch na logout");
        res.writeHead(200, {
            "Content-type": "application/json",

        });
        let obj = {};

        let logoutToken = req.parameters.logoutToken;
        console.log(loggedUsersArr);
        if (loggedUsersArr[logoutToken]){
            loggedUsersArr[logoutToken] = "";
            console.log(loggedUsersArr);
        }
        res.end(JSON.stringify(obj));

    }


};

exports.getLoggedUser = function (token){
    let u = loggedUsersArr[token];
    return u;
};