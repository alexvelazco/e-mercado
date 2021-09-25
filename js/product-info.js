let product = {};

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
  document.addEventListener("DOMContentLoaded", function (e) {    
//TRAIGO LA INFORMACIÓN DEL PRODUCTO DESDE EL .JSON...
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){ //Traeme el los datos del .json "cuando tengas un ratito", cuando lo hagas ejecutá el "then" (función sin nombre con parámetro "" [respuesta de la promesa]), 
        if (resultObj.status === "ok"){                     //y si ese "resultObj" fue traido sin problemas...
            product = resultObj.data;                       //...los datos de ese objeto se renombran "product"

//renombra como "xxx"HTML a cada párrafo con id "xxx" correspondiente del HTML...
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let currencyHTML = document.getElementById("currency")
            let costHTML = document.getElementById("cost")
            let soldCountHTML = document.getElementById("soldCount");
            let categoryHTML = document.getElementById("category");

//...y luego se indica dónde colocar cada dato entrecomillado del recientemente nombrado "product" traído del .json en el "molde" del HTML
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            currencyHTML.innerHTML = product.currency
            costHTML.innerHTML = product.cost
            soldCountHTML.innerHTML = product.soldCount;
            categoryHTML.innerHTML = product.category;
  
//y finalmente muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    fetch(PRODUCT_INFO_COMMENTS_URL)                                     //Con fetch traigo la información del producto alojada en PRODUCTS_INFO_URL
    .then((listaComentarios) => listaComentarios.json())                 //"Entonces" al traerla,, la nombra "listaComentarios" y la convierte a .json
    .then((listaComentarios) => {                                        //Empiezo una función que usará ("hará algo") con esa lista
        //FUNCIÓN PARA ORDENAR LOS COMENTARIOS (POR FECHA)
        const comentariosOrdenados = listaComentarios.sort((a, b) => {   //
            if ( a.dateTime < b.dateTime ){ return -1; }                 //"Si a es menor b, se mueve pa'bajo...
            if ( a.dateTime > b.dateTime ){ return 1; }                  //...si a es mayor que b, se mueve pa'rriba... 
            return 0;                                                    //...si son iguales, se queda en el lugar"
        });
    comentarios(comentariosOrdenados)                                    //A "comentarios" le paso "comentariosOrdenados" como parámetro
    });
});

//FUNCIÓN QUE CARGA LA GALERÍA DE IMÁGENES
function showImagesGallery(galeria){                  //
    let htmlContentToAppend = "";                     //Dejo limpio el lugar donde irá lo que se va a insertar
    for(let i = 0; i < galeria.length; i++){          //Defino i como 0, mientras i sea menor al largo de la galeria, i suma 1
        let imageSrc = galeria[i];                    //Siendo i el número de lugar en el array/galeria, se le asigna el nombre imageSrc
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;       //Coloca cada foto formateada en el div con ese id.
    }
}

const comentarios = (comentarios) => {                           //Defino la función
    let info = document.getElementById("comentarios");           //Re-Defino como "info" a lo que sea que encuentre bajo el id "comentarios"
    info.innerHTML = "";                                         //Dejo vacío el lugar donde irá lo que se va a insertar
    for (let comentario of comentarios) {                        //A cada "comentario" de "comentarios"...
      const fila = document.createElement("div");                //...le creo un div que será cada comentario
      fila.innerHTML =                                           //Se define cómo estará estructurada cada comentario
      `<div class="list-group-item list-group-item-action">
      <div class="row" style="padding-left: 5px; padding-right: 5px">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + comentario.user + `</h4>
                    <p class="mb">` + comentario.dateTime + `</p>
                </div>
                <p class="mb-1">` + comentario.description + `</p>
                <p class="mb">` + estrellas(comentario.score) + `</p>
            </div>
        </div>
        </div>
        <br>`
          info.appendChild(fila)                                             //Coloca el comentario procesado en la lista de comentarios
    }
  };

//FUNCIÓN QUE COLOCA ESTRELLAS
  const estrellas = (score) => {                                              //Definición
      let puntaje = "";                                                       //Defino "puntaje" como algo vacío a usar después
      for (let i = 0; i < 5; i++){                                            //i empieza en 0, mientras i sea menor a 5, i suma 1
          if(i < score) puntaje += '<span class="fa fa-star checked"></span>' //Mientras i sea menor que el score, "puntaje" agrega una estrella chequeada...
          else puntaje += '<span class="fa fa-star"></span>'                  //...cuando i supere el valor del score, terminará de agregar estrellas no chequeadas hasta 5
      }
      return puntaje                                                          //
  }

//FUNCIÓN DE "ENVIAR" COMENTARIO
const enviarComentario = () =>{
    //VARABLES DE CADA ESTRELLA PARA COMENTAR
    let star1 = document.getElementById("star1")
    let star2 = document.getElementById("star2")
    let star3 = document.getElementById("star3")
    let star4 = document.getElementById("star4")
    let star5 = document.getElementById("star5")
    let puntuación = 0;
    if(star1.checked){
        puntuación = 5
    }
    if(star2.checked){
        puntuación = 4
    }
    if(star3.checked){
        puntuación = 3
    }
    if(star4.checked){
        puntuación = 2
    }
    if(star5.checked){
        puntuación = 1
    }
    //AGREGA EL NUEVO COMENTARIO Y PUNTUACIÓN
    let info = document.getElementById("comentarios");    //Re-Defino como "info" a lo que sea que encuentre bajo el id "comentarios"
      const fila = document.createElement("div");         //Se crea un div para cada nuevo comentario
      fila.innerHTML =`
      <div class="list-group-item list-group-item-action">
      <div class="row" style="padding-left: 5px; padding-right: 5px">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + localStorage.getItem("Usuario") + `</h4>
                    <p class="mb">` + new Date() + `</p>
                </div>
                <p class="mb-1">` + document.getElementById("nuevocomentariotxt").value + `</p>
                <p class="mb">` + estrellas(puntuación) + `</p>
            </div>
        </div>
        </div>
        <br>`
          info.appendChild(fila)
    

    //RESETEO DE LA CAJA DE TEXTO Y DE LAS ESTRELLAS
    document.getElementById("nuevocomentariotxt").value = ""
    document.getElementById("star1").checked = false
    document.getElementById("star2").checked = false
    document.getElementById("star3").checked = false
    document.getElementById("star4").checked = false
    document.getElementById("star5").checked = false
  }

  //FUNCIÓN DEL BOTÓN DE ENVIAR COMENTARIO
  document.getElementById("btnEnviarComentario").addEventListener("click", enviarComentario);





  
// let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' +  hoy.getDate();
// let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
// let fechaYHora = fecha + ' ' + hora;

// let hoy = new Date();
// let año = hoy.getFullYear();
// let mes = hoy.getMonth();
//     // mes = ('0' + mes).slice(-2)
// let dia = hoy.getDate();
//     // dia = ('0' + dia).slice(-2)
// let hora = hoy.getHours();
// let minutos = hoy.getMinutes();
// let segundos = hoy.getSeconds();

// let fechaFormato = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`

//console.log(fechaFormato)
// console.log(año)
// console.log(mes)
// console.log(dia)