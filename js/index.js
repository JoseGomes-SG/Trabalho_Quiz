const errorLog = document.querySelector("#error");

// Função que indica uma falha no login 
falha = function (){
    errorLog.innerHTML = "Usuário ou senha incorretos";
    email.value = "";
    senha.value = "";
}