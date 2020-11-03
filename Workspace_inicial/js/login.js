var info_car = {};
// función para llamar al login antes que el index 
function callLogin(){
    let last_conection = localStorage.getItem('last_conection')
    
    if (last_conection !== 'SI') {
        window.location = "login.html";
    }
     
}
//función para cerrar sesión
function logout(){
    localStorage.setItem('last_conection','NO')
    window.location = "index.html";
    
}

// función para poder entrar al index una vez registrado
function callPages() {
    
    let my_user = document.getElementById('correo').value
      localStorage.setItem('correo', my_user)
    let my_pass = document.getElementById('contraseña').value
    
    if (my_user !== '') {
        // cuando el usuario tiene algo  
        if (my_pass !== '') {
            //cuando la csñ tiene algo
            localStorage.setItem('last_conection', 'SI')
            window.location = "index.html";
        }
        else{
            alert('Ingrese contraseña')
        }
    }
    else {
       alert('Ingrese usuario')
    } 
  
}

function readBadge(){
    
    //    Leo el json de articulos en el carrito lo escribo en la var badge del sessionStr.
    
  
    if(!sessionStorage.getItem('cant_prod')){ //se ejecuta si esta vacio cant_prod en el sessionStr
        getJSONData(CART_INFO_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                info_car = resultObj.data['articles'];
            }
            
            // leer las cantidad de articulos del json
            let cant_prod = 0
            
            for (let i = 0; i < info_car.length; i++) {
                cant_prod += info_car[i].count;
            }
            sessionStorage.setItem('cant_prod',cant_prod);
            //console.log(sessionStorage.getItem('cant_prod'))
        })
    }
};

//funcion para mostrar badge en el drodrop down
 function showBadge() {
     /*
        Leo del sessionStr y nuestro en el badge
    */
    cant_prod = sessionStorage.getItem('cant_prod')
    document.getElementById('myBadge').innerHTML = cant_prod ;
 }; 

// mostrar el usuario en la página
document.addEventListener("DOMContentLoaded", function(e){
    let last_conection = localStorage.getItem('last_conection')
    if (last_conection == 'SI') {
        let show_user = document.getElementById('logged_user');
        show_user.innerHTML = localStorage.getItem('correo');
    }
    
    showBadge()

     
})
