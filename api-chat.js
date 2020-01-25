const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const url = require('url');

let msgs = new Array();

exports.apiChat = function (req, res) {
    let q = url.parse(req.url, true);
    if (req.pathname === "/chat/listmsgs") { //msgs...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));

    } else if (req.pathname === "/chat/addmsg") {

                res.writeHead(200, {
                    "Content-type": "application/json",

                });
                let obj = {};
                obj.text = req.parameters.msg;
                obj.time = new Date();
                msgs.push(obj);
                res.end(JSON.stringify(obj));

    }
};