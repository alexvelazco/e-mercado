//"use strict";

const rgxCNum = /^\d{12,20}$/
const rgxVenc = /^\d{2}-\d{2}$/
const rgxCVC = /^\d{3}$/

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
  showFormaPago()
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
  tipoEnvioF()
}
//FUNCIÓN PARA RESTAR ARTÍCULOS DEL CARRITO
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
  suma.innerHTML = "Subtotal: $" + new Intl.NumberFormat("es-UY").format(subtotal); //<--Para separador de miles
  return subtotal;
}
//SELECCIONO UN TIPO DE ENVÍO SUMO EL PORCENTAJE CORRESPONDIENTE
function tipoEnvioF(){
  const sumatotal = document.getElementById("total")
  const premium  = document.getElementById("premiumradio")
  const express  = document.getElementById("expressradio")
  const estandar = document.getElementById("estandarradio")

  let total = 0

  if (premium.checked == true){
    total = (subtotal()*1.15);
    sumatotal.innerHTML = "Total: $" + new Intl.NumberFormat("es-UY").format(total);
  }
  if (express.checked == true){
    total = (subtotal()*1.07);
    sumatotal.innerHTML = "Total: $" + new Intl.NumberFormat("es-UY").format(total);
  }
  if (estandar.checked == true){
    total = (subtotal()*1.05);
    sumatotal.innerHTML = "Total: $" + new Intl.NumberFormat("es-UY").format(total);
  }
}
//VALIDO QUE LOS MÉTODOS DE PAGO SE INGRESEN CORRECTAMENTE
function validarPago(){
  let nombre = document.getElementById("nombre").value
  let numeroTarjeta = document.getElementById("numeroTarjeta").value
  let vencimientoTarjeta = document.getElementById("vencimientoTarjeta").value
  let CVCTarjeta = document.getElementById("CVCTarjeta").value
  let numeroCuenta = document.getElementById("numeroCuenta").value

  if (document.getElementById("pagoCredit").checked == true){
    if (nombre !== "" &&
        rgxCNum.test(numeroTarjeta) &&
        vencimientoTarjeta !== "" &&
        rgxCVC.test(CVCTarjeta)){
          $("#modalPago").modal('hide')
    } else {
      alert("Faltan campos por completar")
    } return
  } 
  if (document.getElementById("pagoTrans").checked == true){
    if (numeroCuenta !== ""){
          $("#modalPago").modal('hide')
    } else{
      alert("Ingrese un número de cuenta válido") 
    }
  }
}
//FINALIZA LA COMPRA SI TODOS DATOS FUERON INGRESADOS CORRECTAMENTE
function finalizarCompra(){
  let nombre = document.getElementById("nombre").value
  let numeroTarjeta = document.getElementById("numeroTarjeta").value
  let vencimientoTarjeta = document.getElementById("vencimientoTarjeta").value
  let CVCTarjeta = document.getElementById("CVCTarjeta").value
  let numeroCuenta = document.getElementById("numeroCuenta").value

  if (document.getElementById("pais").value == ""){
    alert("Seleccione un país de envío");
    return
  }

  if (document.getElementById("direccionEnvio").value == ""){
    alert("Indique una dirección de envío");
    return
  }
  
  if (document.getElementById("pagoCredit").checked == true){
    if (nombre == "" &&
        !rgxCNum.test(numeroTarjeta) &&
        vencimientoTarjeta == "" &&
        !rgxCVC.test(CVCTarjeta)){
      alert("Seleccione un método de pago");
    } 
  } if (document.getElementById("pagoTrans").checked == true){
    if (numeroCuenta == ""){
      alert("Seleccione un método de pago") ;
    }
  }
  alert("¡Has comprado con éxito!");
};
//MOSTRAR LOS CAMPOS SEGÚN LA FORMA DE PAGO SELECCIONADA
const showFormaPago = () => {
  document.getElementById("pagoCredit").addEventListener("click", () => {
    document.getElementById("datosTarjeta").style.display = "block";
    document.getElementById("datosCuenta").style.display = "none";
  });
  document.getElementById("pagoTrans").addEventListener("click", () => {
    document.getElementById("datosCuenta").style.display = "block";
    document.getElementById("datosTarjeta").style.display = "none";
  });
};