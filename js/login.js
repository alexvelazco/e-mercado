//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
//RECEPCIÓN DE INFORMACIÓN DE INICIO DE SESIÓN
  document.getElementById("SignIn").addEventListener("click", (e) => { //Cuando se haga click en el botón "SignIn" ejecutar lo siguiente:
    const user = document.getElementById("inputUser");                 //Defino constante con nombre "user" como "la traida" del objeto "inputUser"
    const pass = document.getElementById("inputPassword");             //Defino constante con nombre "pass" como "la traida" del objeto "inputPassword"
//VALIDACIÓN DE INICIO DE SESIÓN
    if (user.value && pass.value) {                        //Si hay valores ingresados en los inputs (campos) user y password...
      localStorage.setItem("Usuario", user.value);         //...se carga en localStorage un objeto identificador (user.value) con clave/key "Usuario"...
      window.location.href = "./index.html";               //...una vez que reconoce los valores y se cargó lo que se tiene que cargar en localStorage, redirige al index
    }
  });
});