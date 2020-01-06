function showLogin(){
document.getElementById("divLogin").style.display = "block";
}

function logout(){

}

function showRegister(){
    document.getElementById("divRegister").style.display = "block";
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
            });
        });
    } else {
        alert("Hesla se neshodují!");
        document.getElementById("regPass1").value = "";
        document.getElementById("regPass2").value = "";
    }

}