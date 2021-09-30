const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");

// Estabelece a visibididade dos formulários 
signUp.style.display = "none";
signIn.style.display  = "block";

// Mostra o formulário de cadastro 
function signUpForm() {
    signUp.style.display = "block";
    signIn.style.display  = "none";
}

// Mostra o formulário de login 
function signInForm() {
    signUp.style.display = "none";
    signIn.style.display  = "block";
}

$('#signInForm').click( function(e) {
        e.preventDefault(); 
        signInForm();
        return false; 
    } 
);

$('#signUpForm').click( function(e) {
        e.preventDefault(); 
        signUpForm();
        return false; 
    } 
);

