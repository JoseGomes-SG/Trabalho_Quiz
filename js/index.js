// Associa aos formulários 
const loginForm = document.querySelector("#login");
const createForm = document.querySelector("#createAccount");

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {

    // Mostra o formulário de cadastro 
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createForm.classList.remove("form--hidden");
    });

    // Mostra o formulário de login 
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createForm.classList.add("form--hidden");
    });

    // Remove as mensagens de erro 
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});