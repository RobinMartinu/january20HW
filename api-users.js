const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const crypto = require("crypto");
const idLength = 4;

const url = require('url');

let users = [];

exports.apiUser = function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname == "/user/list") { //users...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));

    } else if (q.pathname == "/user/register") {
        let data = "";
        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        });
        req.on('end', function () {
            req.rawBody = data;
            if (data) {
                let body = JSON.parse(data);
                res.writeHead(200, {
                    "Content-type": "application/json",

                });
                let obj = {};
                obj.username = entities.encode(body.name);

                obj.email = entities.encode(body.email);
                obj.password = entities.encode(body.password);
                // obj.time = new Date();
                let id = crypto.randomBytes(idLength/2).toString("hex");
                obj.id = id;

                users.push(obj);

                // users[obj.username] = obj;
                res.end(JSON.stringify(obj));
            }
        })

    }  else if (q.pathname == "/user/login") {
        let data = "";

        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        });
        req.on('end', function () {
            req.rawBody = data;
            if (data) {
                let body = JSON.parse(data);
                res.writeHead(200, {
                    "Content-type": "application/json",

                });
                let obj = {};

                let loginName = entities.encode(body.name);
                let loginPass = entities.encode(body.password);

                for (let i; i < users.length; i++){
                    if (users[i].username === loginName && users[i].password === loginPass ){
                        obj.credentialsCorrect = true;
                        obj.name = entities.decode(users[loginName].name);
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
            }
        })

    }
};