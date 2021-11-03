//"use strict";
const ORDER_ASC_BY_COST = "ASC";                      //--\
const ORDER_DESC_BY_COST = "DESC";                    //--->Constantes por comodidad relacionadas los órdenes
const ORDER_BY_SOLD_COUNT = "Rel.";                   //--/
let currentlistaArticulos = [];                       //Define como vacía a currentlistaArticulos, la (actual/current) tabla a mostrar luego de pasar por las funciones "filtradora" y "ordenadora"
let currentCriterioOrden = undefined;                 //Establece como undefined (parecido a vacío) al (actual) criterio de orden para recibir el nuevo
let mincost = undefined;                              //Establece como undefined lo que hay en el input de mínimo (antes de escribir nada)
let maxcost = undefined;                              //Establece como undefined lo que hay en el input de máximo (antes de escribir nada)

//CREACIÓN DE LA TABLA DE ARTÍCULOS
const listaArts = (listaArticulos) => {                 //Defino la función
    let listado = document.getElementById("Productos"); //Re-Defino como "listado" a lo que sea que encuentre bajo el id "Productos" (el div en products.html)
    listado.innerHTML = "";                             //"Por las dudas", a ese div lo defino como vacío (borra lo que haya)
    for (let articulo of listaArticulos) {              //A cada "artículo" de la "listaArticulos"...
      const fila = document.createElement("div");       //...le creo un div (que irá dentro del div "Productos" de products.html) y será una fila de la tabla final
      fila.innerHTML =                                  //Se define cómo estará estructurada cada fila
      `<a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
              <div class="col-md-4">
                  <img src="` + articulo.imgSrc + `" alt="` + articulo.description + `" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">` + articulo.name + `</h4>
                      <small class="text-muted">` + articulo.soldCount + ` artículos</small>
                  </div>
                  <p class="mb-1">` + articulo.description + `</p>
                  <p class="mb-1">` + articulo.currency + " " + articulo.cost + `</p>
              </div>
          </div>
          </a>`;

        if (((mincost === undefined) || (mincost != undefined && parseInt(articulo.cost) >= mincost)) && //Si... mincost es indefinido o si no lo es y lo que hay en ese campo (el precio) es más de lo se pone como mínimo Y
            ((maxcost === undefined) || (maxcost != undefined && parseInt(articulo.cost) <= maxcost))){  //si maxcost es indefinido o si no lo es y lo que hay en ese campo (el precio) es menos de lo que se pone como máximo...

        listado.appendChild(fila)                     //Al div padre original le inserto como hijo cada fila creada
   }
  }
};

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {    
//PETICIÓN DEL PRODUCTS_URL
  fetch(PRODUCTS_URL)                                           //Con fetch traigo la lista de productos alojada en PRODUCTS_URL
    .then((lista) => lista.json())                              //"Entonces" cuando la trae, la nombro "lista" y se convierte a .json
    .then((lista) => {                                          //Empiezo una función que usará ("hará algo") con esa "lista"
      //listaArts(lista)                                        //Se coloca la tabla terminada en products.html
      sortAndShowProductos(ORDER_ASC_BY_COST, lista);           //Llama la función que ordena y muestra los productos (lista) según un orden (ASC como predeterminado)
    });

  //FUNCIÓN DEL BOTÓN PARA ORDEN ASCENDENTE
  document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowProductos(ORDER_ASC_BY_COST);
  });

  //FUNCIÓN DEL BOTÓN PARA ORDEN DESCENDENTE
  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowProductos(ORDER_DESC_BY_COST);
  });

  //FUNCIÓN DEL BOTÓN PARA ORDEN POR RELEVANCIA (CANTIDAD DE VENDIDOS)
  document.getElementById("sortBySoldCount").addEventListener("click", function(){
      sortAndShowProductos(ORDER_BY_SOLD_COUNT);
  });

  //FUNCIÓN DEL BOTÓN E INPUTS DE FILTRADO
  document.getElementById("rangeFilterCost").addEventListener("click", function(){   //Obtengo el mínimo y máximo de los intervalos para filtrar por precio.
      mincost = document.getElementById("rangeFilterCostMin").value;                 //Toma los valores entrados en el input de mínimo
      maxcost = document.getElementById("rangeFilterCostMax").value;                 //Toma los valores entrados en el input de mínimo
      if ((mincost != undefined) && (mincost != "") && (parseInt(mincost)) >= 0){    //Si mincost no está indefinido NI vacío Y lo que recibe del input (pasado a números parseInt) es >= 0...
          mincost = parseInt(mincost);                                               //mincost pasa a ser el valor ingresado en el input
      }
    else{
        mincost = undefined;                                                         //Si nada de lo anterior, vuelve a ser indefinido
    }
    if ((maxcost != undefined) && (maxcost != "") && (parseInt(maxcost)) >= 0){      //Si maxcost no está indefinido NI vacío Y lo que recibe del input (pasado a números parseInt) es >= 0...
        maxcost = parseInt(maxcost);                                                 //maxcost pasa a ser el valor ingresado en el input
    }
    else{
        maxcost = undefined;                                                         //Si nada de lo anterior, vuelve a ser indefinido
    }
    listaArts(currentlistaArticulos);                                                //Muestra de nuevo la lista sin ningún filtro
  });
});

  //FUNCIÓN DEL BOTÓN "LIMPIAR"
  document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";                       //Borra lo que haya en el input de mínimo
    document.getElementById("rangeFilterCostMax").value = "";                       //Borra lo que haya en el input de máximo

    mincost = undefined;                                                            //Resetea a undefined el valor de mincost
    maxcost = undefined;                                                            //Resetea a undefined el valor de maxcost

    listaArts(currentlistaArticulos);                                               //Muestra de nuevo la lista sin filtros y con orden predeterminado
});

//FUNCIÓN QUE ORDENA Y MUESTRA LOS PRODUCTOS (SEGÚN CRITERIO)
function sortAndShowProductos(CriterioOrden, listaArticulos){    //Función que ordena y muestra los productos (listaArticulos) según un orden
  currentCriterioOrden = CriterioOrden;                          //currCritOrd que antes era undefined ahora será lo que el usuario seleccione
  if(listaArticulos != undefined){                               //Si listaArticulos no es indefinido...
      currentlistaArticulos = listaArticulos;                    //...currlistaArticulos toma el valor de listaArticulos
  }
  currentlistaArticulos = sortProductos(currentCriterioOrden, currentlistaArticulos); //currlistaArticulos se define como lo que devuelva sortProductos (con el criterio y lista actuales como parámetros)
  listaArts(currentlistaArticulos);                                                   //Llama la función que arma la lista de artículos pero que mostrará la "versión current" ya pasada por el orden y el filtro
}

function sortProductos(criteria, array){               //Se define la función...
  let result = [];                                     //"Limpia" el campo a utilizar
  if (criteria === ORDER_ASC_BY_COST)                  //Si el criterio es ascendente (el predeterminado)...
  {
      result = array.sort(function(a, b) {             //...funcionamiento normal de función sort...
          if ( a.cost < b.cost ){ return -1; }         //
          if ( a.cost > b.cost ){ return 1; }          //
          return 0;                                    //
      });
  } else if (criteria === ORDER_DESC_BY_COST){         //Si el criterio es descendente...
      result = array.sort(function(a, b) {             //...funcionamiento normal de función sort...
          if ( a.cost > b.cost ){ return -1; }         //
          if ( a.cost < b.cost ){ return 1; }          //
          return 0;                                    //
      });
  } else if (criteria === ORDER_BY_SOLD_COUNT){        //Si el criterio por relevancia...
      result = array.sort(function(a, b) {             //...funcionamiento normal de función sort...
          let asoldCount = parseInt(a.soldCount);      //
          let bsoldCount = parseInt(b.soldCount);      //

          if ( asoldCount > bsoldCount ){ return -1; } //
          if ( asoldCount < bsoldCount ){ return 1; }  //
          return 0;                                    //
      });
  }
  return result;                                       //
}