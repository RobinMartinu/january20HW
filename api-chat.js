const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const url = require('url');
const {getLoggedUser} = require("./api-users");

let msgs = new Array();

exports.apiChat = function (req, res) {
    let q = url.parse(req.url, true);
    if (req.pathname === "/chat/listmsgs") { //msgs...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        let loggedUser = getLoggedUser(req.parameters.token);
        let obj = {};

        if (loggedUser && getLoggedUser(loggedUser.token)){
            obj.messages = msgs;
        } else {
            obj.messages = "Uživatel není přihlášený."
        }

        res.end(JSON.stringify(obj));

    } else if (req.pathname === "/chat/addmsg") {

        res.writeHead(200, {
                    "Content-type": "application/json",

        });
        let obj = {};
        let loggedUser = getLoggedUser(req.parameters.token);

        if (loggedUser && getLoggedUser(loggedUser.token)){
            obj.text = req.parameters.msg;
            obj.time = new Date();
            obj.sent = true;
            msgs.push(obj);
        } else {
           obj.sent = false;
        }

        res.end(JSON.stringify(obj));

    }
};