//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) { //Defino constantes con lo ingresado en cada input
  const name     = document.getElementById("inputName");
  const lastname = document.getElementById("inputLastname");
  const age      = document.getElementById("inputAge");
  const email    = document.getElementById("inputE-mail");
  const phone    = document.getElementById("inputPhone");

  userInfo = JSON.parse(localStorage.getItem("infoPerfil")); //userInfo = el parseo de la clave "infoPerfil"
  if(!userInfo){
    userInfo = [];                                           //Si no hay userInfo, es un array vacío, no trae nada.
  } else {                                                   //Else, imprime en cada input el valor de su contraparte del array de LStg
    name.value = userInfo.name;
    lastname.value = userInfo.lastname;
    age.value = userInfo.age;
    email.value = userInfo.email;
    phone.value = userInfo.phone; 
  }

  document.getElementById("SaveUser").addEventListener("click", (e) => { //Click en SaveUser guarda/actualiza el objeto userInfo 
    userInfo = {                                                         //Cada elemento del objeto se rellena con los valores de su respectivo input
      name: name.value, 
      lastname: lastname.value, 
      age: age.value, 
      email: email.value, 
      phone: phone.value,
    };
    localStorage.setItem("infoPerfil", JSON.stringify(userInfo));        //userInfo es stringifeado y guardado con clave "infoPerfil" en LStg
    alert("Información actualizada con éxito")
  });
});



//Algo que no sirvió
// document.addEventListener("DOMContentLoaded", function (e) {
//     //RECEPCIÓN DE INFORMACIÓN DE USUARIO
//       document.getElementById("SaveUser").addEventListener("click", (e) => { //Cuando se haga click en el botón "SaveUser" ejecutar lo siguiente:
//         const name = document.getElementById("inputName");
//         const lastname = document.getElementById("inputLastname");
//         const age  = document.getElementById("inputAge")
//         const email  = document.getElementById("inputE-mail")
//         const phone = document.getElementById("inputPhone")
//     //VALIDACIÓN DE INICIO DE SESIÓN
//         //if (name.value && lastname.value && age.value && email.value && phone1.value) {
//           localStorage.setItem("Nombre", name.value);
//           localStorage.setItem("Apellido", lastname.value);
//           localStorage.setItem("Edad", age.value);
//           localStorage.setItem("e-mail", email.value);
//           localStorage.setItem("Teléfono", phone.value);
//         //}
//       });
//     });