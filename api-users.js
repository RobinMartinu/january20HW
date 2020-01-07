const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const url = require('url');

let users = new Array();

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
                obj.time = new Date();
                users.push(obj);
                res.end(JSON.stringify(obj));
            }
        })

    }
};