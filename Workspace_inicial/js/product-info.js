var product = {};

function showImagesGallery(array){ //función para mostrar las imágenes

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
//agregar nuevo comentario
function addComment (){
    let dateTime = new Date()
    let comments = '';
    
    let monthRaw = dateTime.getMonth()
    monthFormated = (monthRaw<10)? '0'+monthRaw:monthRaw

    let dayRaw = dateTime.getDate()
    dayFormated = (dayRaw<10)? '0'+dayRaw:dayRaw
    
    //tomar fecha y hora en formato 2020-02-21 15:05:22
    dateTime =dateTime.getFullYear()+'-'+ monthFormated +'-'+ dayFormated +' '+dateTime.getHours()+':'+ dateTime.getMinutes() +':'+ dateTime.getSeconds() ;         
    //console.log(dateTime)
    let user = localStorage.getItem('correo');
    //console.log(user)
    let myScore = document.getElementById('myScore').value;
    //console.log(myScore)
    let newComment = document.getElementById('newComment').value;
    document.getElementById('newComment').value = '';
    //console.log(newComment)

    let htmlContentToAppend = ''
    htmlContentToAppend = showStars(myScore)
    htmlContentToAppend +=`
        <p><span>`+ user +`</span>, <span>`+ dateTime +`</span> <br>`+ newComment +`</p>`
        
    document.getElementById('commentList').innerHTML += htmlContentToAppend
}
function showRelatedProductos(relatedProducts){
    // mostrar los productos relacionados
    // relatedProducts = [1,3]

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
                        
            for(let i = 0; i < relatedProducts.length; i++){
                n = relatedProducts[i]
                let htmlContentToAppend = '';
                htmlContentToAppend += `
                <div class="col-lg-3 col-md-4 col-6">
                    <div class="d-block mb-4 h-100">
                        <a href="">`+product[n].name+`
                        <img class="img-fluid img-thumbnail" src="`+product[n].imgSrc+`" alt="">
                        </a>
                    </div>
                </div>
                `
                document.getElementById('relatedProducts').innerHTML += htmlContentToAppend
            }

        }
    });

    
}
//mostrar la informacion de los productos
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
           //declaro cada variable
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldHTML = document.getElementById("productSold");
            let categoryProductHTML = document.getElementById("category");
            
            
            
          //muestra en el html cada elemento del json
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldHTML.innerHTML = product.soldCount;
            categoryProductHTML.innerHTML = product.category;
            
            
            

            //Ejecutar la función para mostrar las imagenes en forma de galería
            showImagesGallery(product.images);

            //mostrar productos relacionados
            showRelatedProductos(product.relatedProducts)
        }
    });

    // mostrar el usuario en la página
    var show_user = document.getElementById('logged_user');
    show_user.innerHTML += localStorage.getItem('correo');
});

 //función para mostrar la puntuación con estrellas
function showStars(amountStars){
    let htmlContentToAppend = "";
    for (let i = 1; i<=5; i++){
        if (i<=amountStars) {htmlContentToAppend += `<span class="fa fa-star checked"></span>`}
        else{ htmlContentToAppend += `<span class="fa fa-star"></span>`}
    }
    return htmlContentToAppend
}

//para traer los comentarios del Json y mostrarlos en el html
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
  if(resultObj.status === "ok")
  {
      comments = resultObj.data;
      for(let i = 0; i < comments.length; i++){
          let htmlContentToAppend = ''
          htmlContentToAppend = showStars(comments [i].score)
          htmlContentToAppend += 
          `<p><span>`+comments[i].user+`</span>, <span>`+ comments[i].dateTime +`</span> <br>`+ comments[i].description+`</p>`
          document.getElementById('commentList').innerHTML += htmlContentToAppend
     }
 }

})




