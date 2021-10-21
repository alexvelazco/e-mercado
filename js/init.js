const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL_D = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
//const CART_TEST = "/json/test.json"

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
//FUNCIÓN DE REDIRECCIÓN
  if (!localStorage.getItem("Usuario") && !window.location.href.includes("login")){     //Si no detecta que existe algo llamado "Usuario" (ver login.js) y en la url no dice "login"...
    window.location.href = "./login.html"                                               //...redirigir a login.html (dentro de la ventana, a una locación específica)
  } else if(!window.location.href.includes("login")){                                    //si no, pero sigue sin decir "login" en la URL...
      document.getElementById("usertag").innerHTML = localStorage.getItem("Usuario");   //Coloca en el div de nombre de usuario (usertag) el valor de "Usuario" del localStorage
      
      //FUNCIÓN DEL BOTÓN DE CIERRE DE SESIÓN
      document.getElementById("SignOff").addEventListener("click", logOff)
  }
});

//FUNCIÓN DE CIERRE DE SESIÓN
const logOff = () => {        //Defino función de deslogueo
  localStorage.clear();       //Borra los datos de localStorage
  window.location.reload();   //Recarga la página
}