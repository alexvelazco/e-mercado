//let articles = []  //

//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL_D).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cart = resultObj.data;           //Al resultado, que es un objeto, se le llama "cart"
      articulos = cart.articles;       //Al array dentro de ese objeto se le llama "articulos" (que original...¬¬)
      showCarrito(articulos);          //Llamo showCarrito y le paso "articulos" (que es lo mismo que "cart.articles")
    }
  });
});

//ARMA Y MUESTRA EN PANTALLA LA INFORMACIÓN DEL JSON Y LLAMA A SUBTOTAL
function showCarrito(cart) {
  let htmlContentToAppend = "";
  for(let i = 0; i < cart.length; i++){
    let article = cart[i];
    htmlContentToAppend +=`
        <div class="artCarrito">
          <div class="col-3 img-cart">
            <img src="` + article.src + `" alt="` + article.name + `" class="img-thumbnail img-carts">
          </div>
          <div class="col-7">
            <div class="d-flex w-100 justify-content-between">
              <h3 class="mb-1">` + article.name + `</h3>
            </div>
            <br>
            <h4 class="mb-1">Precio unitario: ` + article.currency + " " + article.unitCost + `</h4>
            <h4 class="mb-1">Precio: ` + article.currency + " " + Math.round(article.unitCost * article.count) + `</h4>
          </div>
          <div class="add/remove">
            <h5 class="mb-1">` + article.count + ` artículos</h5>
            <div>
              <button class="fas fa-plus-circle btn-info btn-sm" onclick="sumarArticulo(${i})"></button>
              <button class="fas fa-minus-circle btn-danger btn-sm" onclick="restarArticulo(${i})"></button>
            </div>
          </div>
        </div>`                                                                     //"${i}" identifica el botón con un artículo (o una fila en el carrito) específico
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
  }
  subtotal()
}
//FUNCIÓN PARA QUITAR ARTÍCULOS DEL CARRITO
const restarArticulo = (index) => {         //
  if (articulos[index].count === 0) return; //Detiene la función cuando la cuenta de "articulos[index]" llega a 0
  articulos[index].count--                  //"articulos[index]" = indicativo de "ese artículo específico/ese articulo de entre todos, no otro"
  showCarrito(articulos);
}
//FUNCIÓN PARA AGREGAR ARTÍCULOS AL CARRITO
const sumarArticulo = (index) => {
  articulos[index].count++
  showCarrito(articulos);
}
//SUMO LOS TOTALES DE CADA ARTÍCULO Y MULTIPLICO LAS MONEDAS EXTRANJERAS
function subtotal(){
  const suma = document.getElementById("subtotal")
  let subtotal = 0
  for (let i = 0; i < articulos.length; i++){
    if (articulos[i].currency === "USD"){                                     //Si la currency del artículo es "USD"...
      subtotal += Math.round(articulos[i].unitCost * articulos[i].count)*40;  //...el precio por toda la cantidad se multiplica por 40
    } else {
      subtotal += Math.round(articulos[i].unitCost * articulos[i].count);
    }
  }
  suma.innerHTML = "Subtotal: $" + subtotal;
}

//Todo lo comentado
//new Intl.NumberFormat("es-UY").format(subtotal) - Para separador de miles

//document.getElementById("finCompra").addEventListener("click", finalizarCompra)
// const finalizarCompra = () =>{
//   alert("Todavía no se puede comprar... ;)")
// }
// let medioPago = () =>{
// }
// let metodoEnvio = () =>{
// }
// const finalizarCompra = () =>{
//   if (medioPago && metodoEnvio){
//     alert("Compra finalizada con éxito")
//   } else {
//     alert("Seleccione un medio de pago y un método de envío")
//   }
// }

//articulos = cart.articles;       //Al array dentro de ese objeto se le llama "articulos" (que original...¬¬)|Mirándolo bien, esta línea parece no hacer nada útil