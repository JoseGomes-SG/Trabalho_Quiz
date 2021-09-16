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

const loginForm = document.querySelector("#loginAccount");

// Entra no usuário
loginForm.addEventListener("submit", e => {
    e.preventDefault();

    db.collection("usuarios").where("email", "==", loginForm.email.value)
    .where("senha", "==", loginForm.senha.value)
    .get().then( function(querySnapshot) {

      if (querySnapshot.size > 0) {
          alert("Bem vindo " + querySnapshot.docs[0].data().nome);
      } else {
          alert("Usuário/ Senha inválidos");

          // Limpa os campos 
        createForm.email.value = "";
        createForm.nome.value = "";
        createForm.senha.value = "";
      }
    })
    .catch( function(error) {
        console.log(error);
    });

    // Abre a área do usuário
    window.open("./usuario.html","_self");
});