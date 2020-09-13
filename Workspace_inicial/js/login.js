// función para llamar al login antes que el index 
function callLogin(){
    var last_conection = localStorage.getItem('last_conection')
    
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
    
    var my_user = document.getElementById('correo').value
      localStorage.setItem('correo', my_user)
    var my_pass = document.getElementById('contraseña').value
    
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
       alert('Ingrese correo')
    } 
  
}

 
// mostrar el usuario en la página
document.addEventListener("DOMContentLoaded", function(e){
    var last_conection = localStorage.getItem('last_conection')
    if (last_conection == 'SI') {
        var show_user = document.getElementById('logged_user');
        show_user.innerHTML += localStorage.getItem('correo');
    }
})
