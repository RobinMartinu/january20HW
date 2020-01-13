
const crypto = require("crypto");

function hash (hashedWord){
    let mix = crypto.createHash("md5").update(hashedWord).digest("hex");
    mix = mix.split("").reverse().join(""); //pozpatku

    for (let i = 0; i < 10; i++ ) {
        mix = crypto.createHash("md5").update(hashedWord).digest("hex");
    }

    return mix;
}

