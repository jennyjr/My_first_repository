// función para validar correo q ver si funciona
//function validarCorreo(correo){
  //  var expReg=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;
 //   var esValido= expReg.test(correo);
 //   if (esValido=false){
 //       alert('El correo no válido, por favor ingrese nuevamente');
 //   }
//}

function callLogin(){
    var last_conection = localStorage.getItem('last_conection')
    console.log(last_conection)
    if (last_conection !== 'SI') {
        window.location = "login.html";
    }
     
}


function callPages() {
    
    var my_user = document.getElementById('correo').value
    var my_pass = document.getElementById('contraseña').value
    console.log(my_user)
    console.log(my_pass)
    if (my_user !== '') {
        // cuando el usuario tiene algo  
        if (my_pass !== '') {
            //cuando la csn tiene algo
            localStorage.setItem('last_conection', 'SI')
            window.location = "index.html";
        }
        else{
            alert('Ingrese contraseña')
        }
    }
    else {
       alert('Ingrese correo')
    } 
  
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){


