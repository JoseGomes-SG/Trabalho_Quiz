const firebaseConfig = {
    apiKey: "AIzaSyCRPfI1Mkrhcta15kWTzBFQeslztvMUPIU",
    authDomain: "form-f5d6e.firebaseapp.com",
    projectId: "form-f5d6e",
    storageBucket: "form-f5d6e.appspot.com",
    messagingSenderId: "391345569169",
    appId: "1:391345569169:web:68dc5bdb320cc39b072e30",
    measurementId: "G-6NLYV6PCDL"
};

// Conecta ao banco de dados
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const createForm = document.querySelector("#createAccount");

// Cadastrar Usuário
createForm.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("usuarios").add({
  email: createForm.email.value,
  nome: createForm.nome.value,
  senha: createForm.senha.value,
  });

  alert("Cadastro Concluído");
  
  createForm.email.value = "";
  createForm.nome.value = "";
  createForm.senha.value = "";

});