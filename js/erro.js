// Função que indica uma falha no login 
failResponse = function (nature){

    var element;

    if (nature == "incomplete"){
        element = document.querySelector("#incomplete");
        element.innerHTML = "Faltam dados no cadastro";
    }else {
        element = document.querySelector("#error");
        element.innerHTML = "Usuário ou senha incorretos";
    }

    email.value = "";
    senha.value = "";
}