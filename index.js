let user = {};
user.logged = false;

let isLogin = false;
let isRegister = false;

function showLogin(){
    if (isLogin){
        document.getElementById("divLogin").style.display = "none";
        isLogin = false;
    } else {
        document.getElementById("divLogin").style.display = "block";
        isLogin = true;
    }
}

function login(){
 let name = document.getElementById("logName").value;
 let pass = document.getElementById("logPass").value;

 let body = {};
    body.name = name;
    body.password = pass;
    let opt = {};
    opt.method = "POST";
    opt.body = JSON.stringify(body);

    fetch(HOST+"/user/login", opt).then(function(response) {
        response.text().then(function(text) {
            // nemusim delat nic
            // uz musi i POST
            let obj = JSON.parse(text);

            if (obj.credentialsCorrect) {
                user.logged = true;
                user.name = obj.name;

                document.getElementById("divLogin").style.display = "none";
                document.getElementById("btnLogout").style.display = "inline";
            } else {
                alert ("Nesprávné jméno, heslo nebo nezaregistrovaný uživatel.");
            }

        });
    });

}

function logout(){
    location.reload();
}

function showRegister(){
    if (isRegister){
        document.getElementById("divRegister").style.display = "none";
        isRegister = false;
    } else {
        document.getElementById("divRegister").style.display = "block";
        isRegister = true;
    }
}

function register(){
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let pass1 = document.getElementById("regPass1").value;
    let pass2 = document.getElementById("regPass2").value;
    let matchPass;

    if (pass1 === pass2){
        matchPass = pass1;

        let body = {};
        body.name = name;
        body.email = email;
        body.password = matchPass;
        let opt = {};
        opt.method = "POST";
        opt.body = JSON.stringify(body);

        fetch(HOST+"/user/register", opt).then(function(response) {
            response.text().then(function(text) {
                // nemusim delat nic
                    // uz musi i POST

                let obj = JSON.parse(text);
                user.id = obj.id;
                user.logged = true;
                user.name = name;

                document.getElementById("divRegister").style.display = "none";
                document.getElementById("btnLogout").style.display = "inline";

            });
        });




    } else {
        alert("Hesla se neshodují!");
        document.getElementById("regPass1").value = "";
        document.getElementById("regPass2").value = "";
    }

}