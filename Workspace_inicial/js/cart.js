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
            <td ><span id="subtotal_article`+ i + `">` + info_car[i].count * info_car[i].unitCost + `</span><span id="currency`+i+`">` + info_car[i].currency + ` </span></td>
        </tr>            
        `

        document.getElementById('myArticles').innerHTML = htmlContentToAppend;

    }
}

//funcion para modificar el precio si aumenta la cantidad
function modifyCant() {
    for (let i = 0; i < info_car.length; i++) {

        let cant_prod = document.getElementById('cantNumber' + i + '').value;
        let cost_prod = info_car[i].unitCost;
        let subtotal_prod = cant_prod * cost_prod;


        document.getElementById('subtotal_article' + i + '').innerHTML = `` + subtotal_prod + ``;

    }
    let subtotal=0;
    for (let i = 0; i < info_car.length; i++){
    // leer costo total del articulo uno
   let cost_art =  parseInt(document.getElementById('subtotal_article'+ i + '').innerHTML);
       
    
    // sumar articulo uno y articulo dos
    subtotal = subtotal + cost_art;
    console.log(subtotal);
    }
    // escribirlo en el subtotal.
    document.getElementById('costo_subtotal').innerHTML = subtotal;
    //escribo la moneda en la tabla de costos
    document.getElementById('moneda_subtotal').innerHTML= info_car[0].currency;
    document.getElementById('moneda_envio').innerHTML= info_car[0].currency;
    document.getElementById('moneda_USD').innerHTML= info_car[0].currency;

    //multiplicar subtotal por porcentaje de envio
    let porcentaje_envio = subtotal*readTypeSend();
    document.getElementById('costo_envio').innerHTML =  parseInt(porcentaje_envio);
 console.log(porcentaje_envio)
    //calculo del total
   document.getElementById('totalCost').innerHTML = (porcentaje_envio+subtotal);
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

        }        
    })
});
