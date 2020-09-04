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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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
            
            

            //Muestra las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

// mostrar el usuario en la página
document.addEventListener("DOMContentLoaded", function(e){
    var show_user = document.getElementById('logged_user');
    show_user.innerHTML += localStorage.getItem('correo');
})
