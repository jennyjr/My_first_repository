var info_car = {};


// funcion para mostrar en html los elementos
function showProducts() {
  let htmlContentToAppend = ""
  for (let i = 0; i < info_car.length; i++) {
    htmlContentToAppend += `
        <tr>
            <td>
                
                <div> <img src="`+ info_car[i].src + `" alt="..." class="img-thumbnail" style="width: 150px;"></div>
            </td>
            <td>
                <div>
                    <p id="articlesName">`+ info_car[i].name + `</p>
                </div>
                
            </td>
            <td><input id="cantNumber`+ i + `" type="number" data-val="1" min="1" value="` + info_car[i].count + `"onchange="javascript:modifyCant()" style="width: 50px; text-align:center;"></td>
            <td id="valueCost"> `+ info_car[i].unitCost + `<span id="currency"> ` + info_car[i].currency + `</span></td>
            <td ><span id="subtotal_article`+ i + `">` + info_car[i].count * info_car[i].unitCost + `</span><span id="currency` + i + `">` + info_car[i].currency + ` </span></td>
            
        </tr>            
        `

    document.getElementById('myArticles').innerHTML = htmlContentToAppend;

  }
}


function modifyCant() {
  /* 
  funcion para modificar el precio si aumenta la cantidad 
  */

  // calculo del subtotal por articulo
  for (let i = 0; i < info_car.length; i++) {
    let cant_prod = document.getElementById('cantNumber' + i + '').value;
    let cost_prod = info_car[i].unitCost;
    let subtotal_prod = cant_prod * cost_prod;
    document.getElementById('subtotal_article' + i + '').innerHTML = `` + subtotal_prod + ``;
  }

  // calculo de subtotal general
  let subtotal = 0;
  for (let i = 0; i < info_car.length; i++) {

    let cost_art = parseInt(document.getElementById('subtotal_article' + i + '').innerHTML);

    subtotal = subtotal + cost_art;     // sumar de todos los articulos
  }
  document.getElementById('costo_subtotal').innerHTML = subtotal; // escribirlo en el subtotal.

  //escribo la moneda en la tabla de costos
  document.getElementById('moneda_subtotal').innerHTML = info_car[0].currency;
  document.getElementById('moneda_envio').innerHTML = info_car[0].currency;
  document.getElementById('moneda_USD').innerHTML = info_car[0].currency;

  //multiplicar subtotal por porcentaje de envio
  let porcentaje_envio = subtotal * readTypeSend();
  document.getElementById('costo_envio').innerHTML = parseInt(porcentaje_envio);
  //console.log(porcentaje_envio)
  //calculo del total
  document.getElementById('totalCost').innerHTML = (porcentaje_envio + subtotal).toFixed(0);

  // calcular el valor para mostrar en el badge
  let cant_prod = 0
  for (let i = 0; i < info_car.length; i++) {
    cant_prod += parseInt(document.getElementById('cantNumber' + i + '').value);
  }
  sessionStorage.setItem('cant_prod', cant_prod);
  showBadge()

}

//función que lee el tipo de envio seleccionado
function readTypeSend() {
  // leo el tipo de envio seleccionado por el cliente de los radio button
  let tiposDeEnvio = document.getElementsByName('tipo_envio');
  let costTypeSend = 0;
  for (let i = 0; i < tiposDeEnvio.length; i++) {
    if (tiposDeEnvio[i].checked) { costTypeSend = tiposDeEnvio[i].value }
  }
  return costTypeSend
}

// funcion para mostrar la ventana modal
function showModalWindow() {
  htmlContentToAppend =
    `<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Forma de pago</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div>
              <input type="radio" id="target" name="pago"> Pago con tarjeta <br>
              <input type="text" id="numberTarget" placeholder="Número de tarjeta" maxlength="16"> 
            
              <input type="text" id="codigoTarget" placeholder="CVV" maxlength="3"> <br> <br>
             
              <input type="text" id="cadTarget" placeholder="Vencimiento (MM/AA)">
            </div>
             <hr>
            <div>        
              <input type="radio" id="transf" name="pago"> Transferencia bancaria <br>
              <input type="text" id="transfNumber" placeholder="Número de cuenta">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
         
        </div>
      </div>
    </div>
  
    `
  document.getElementById('exampleModal').innerHTML = htmlContentToAppend;

}

//funcion para validar los campos y confirmar la compra
function validation() {
  let street = document.getElementById('calle').value;
  let number = document.getElementById('numero').value;
  let street_corner = document.getElementById('esquina').value;
  let country = document.getElementById('pais').value;
  let target = document.getElementById('target').checked;
  let numero = document.getElementById('numberTarget').value;
  let codigo = document.getElementById('codigoTarget').value;
  let vence = document.getElementById('cadTarget').value;
  let transfNumber = document.getElementById('transfNumber').value;

  let transf = document.getElementById('transf').checked;

  

   if (street && number && street_corner && country && (target && numero && codigo && vence || transf && transfNumber)) {
    getJSONData(CART_BUY_URL).then(function (resultObj) {
      if (resultObj.status === "ok") {

        htmlContentToAppend =
          `<div class="modal-dialog">
                    
                      <!-- Modal content-->
                      <div class="modal-content">
                      <div class="modal-header">
                      <h4 class="modal-title">¡Felicitaciones!</h4>
                        </div>
                        <div class="modal-body">
                          <p>`+ resultObj.data.msg + `</p>
                        </div>
                        <div class="modal-footer">
                          <a class="btn btn-primary" href="index.html" role="button">Seguir comprando</a>
                          <button type="button" class="btn btn-primary" onclick="javascript:logout()">Salir del sitio</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>`
        document.getElementById('myModal').innerHTML = htmlContentToAppend;
      }
    })
  }
  else {
     htmlContentToAppend =
      `<div class="modal-dialog">
                    
                    <!-- Modal content-->
                    <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Faltan campos por llenar</h4>
                      </div>
                      
                        <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>`
    document.getElementById('myModal').innerHTML = htmlContentToAppend; 
    
  } 

};



//para traer los elementos del Json 
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {

      info_car = resultObj.data['articles'];

      info_car[0].currency = "USD" //convierto de UYU a USD
      info_car[0].unitCost /= 40

      showProducts()

      modifyCant()

      readTypeSend()

      showBadge()

    }
  })


  showModalWindow()
});
