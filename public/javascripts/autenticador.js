function goToRegister() {
    window.location.href = "/register";
}

function Register() {
    var username = document.getElementById("username").value;
    var senha = document.getElementById("senha").value;
    var senha2 = document.getElementById("senha2").value;
    if (username == "" || senha == "" || senha2 == "") {
        alert("Preencha todos os campos");
        return false;
    }
    if (username.length < 5) {
        alert("Nome de usuário muito curto");
        return false;
    }
    if (senha != senha2) {
        alert("Senhas diferentes");
        return false;
    }

    user = {
        username: username,
        senha: senha    
    }

    alert("Usuário cadastrado com sucesso");
    limparCampos();
    window.location.href = "/login";
    return true;  
}

function limparCampos() {
    document.getElementById("username").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("senha2").value = "";
}
