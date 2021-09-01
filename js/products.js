//CREACIÓN DE LA TABLA DE ARTÍCULOS
const listaArts = (listaArticulos) => {               //Defino la función
  let listado = document.getElementById("Productos"); //Re-Defino como "listado" a lo que sea que encuentre bajo el id "Productos" (el div en products.html)
  listado.innerHTML = "";                             //"Por las dudas", a ese div lo defino como vacío (borra lo que haya)
  for (let articulo of listaArticulos) {              //A cada "artículo" de la "listaArticulos"...
    const fila = document.createElement("div");       //...le creo un div (que irá dentro del div "Productos" de products.html) y será una fila de la tabla final
    fila.innerHTML =                                  //Se define cómo estará estructurada cada fila
      `<div class="row" style="padding-left: 1em; padding-right: 1em ">
            <div class="col-3">
                <img src="` + articulo.imgSrc + `" alt="` + articulo.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + articulo.name + `</h4>
                    <small class="text-muted">` + articulo.soldCount + ` artículos</small>
                </div>
                <p class="mb-1">` + articulo.description + `</p>
                <p class="mb-1">` + articulo.currency + articulo.cost + `</p>
            </div>
        </div>`;

        listado.appendChild(fila)                     //Al div padre original le inserto como hijo cada fila creada
  }
};

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {    
  //PETICIÓN DEL PRODUCTS_URL
  fetch(PRODUCTS_URL)                                           //Con fetch traigo la lista de productos alojada en PRODUCTS_URL
    .then((lista) => lista.json())                              //"Entonces" cuando la trae, la convierte a .json
    .then((lista) => {                                          //Empiezo una función que usará ("hará algo") con esa lista
        listaArts(lista)                                        //Se coloca la tabla terminada en products.html
    });
});


















// const listProds = document.getElementById("Productos");                //Defino como "listProds" a lo que sea que encuentre bajo el id "Productos" (el div)
//         let listado = "";                                              //Definimos un string vacío llamado "listado"
//         for (let i = 0; i < lista.length; i++){                        //"for" define un loop definido en el paréntesis | defino el contador "i" en 0 | condición, "i" no debe ser mayor el nº de elementos de la lista | +1 al valor "actual" de "i"
//             listado += `<div>${lista[i].name}: ${lista[i].description} Precio: $${lista[i].cost}</div>` // Al string vacío de antes lo "relleno" el div definido. "${}" llama cada propiedad (name, cost, etc.) de cada elemento "i" del array
//         }
//         listProds.innerHTML = (listado)                                //Inserta el string (ya no vacío) dentro de listProds, que es a su vez el div #Productos del .html