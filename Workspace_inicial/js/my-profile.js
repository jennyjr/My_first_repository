function saveChange(){
    // leo los valores de los inputs cuando de guardar cambio
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let age = document.getElementById('age').value;
    let mail = document.getElementById('mail').value;
    let celPhone = document.getElementById('celPhone').value;
    let phone = document.getElementById('phone').value;
    //console.log(name)
   // console.log(lastName)
    //console.log(age)
    //console.log(mail)
    //console.log(celPhone)
    //console.log(phone)
   
    // creo un arreglo con todos los datos leidos
    let array = { "name":name, "lastName":lastName , "age":age, "mail":mail, "celPhone":celPhone, "phone":phone};
    //console.log(array)

    // creo el objeto Json
    let myJSON = JSON.stringify(array);
    //console.log(myJSON)

    // escribo el json en el localStorage para cada usuario registrado
    let userLog = localStorage.getItem('correo')
    localStorage.setItem(userLog, myJSON);


    document.getElementById('changeAlert').innerHTML =  ` <h4 style="color: rgb(79, 161, 236); margin-left: 10mm;"> ¡Los datos fueron modificados correctamente! </h4>`;
   
};

function showInformation(){
 // leo el json del localStorage y lo convierto a objeto a array
 let userLog = localStorage.getItem('correo')
 //console.log(userLog)
 let newArray = JSON.parse(localStorage.getItem(userLog));
 //console.log(newArray)
 // cuando abra la persona anteriormente loggeada se tienen q mostrar los datos
 document.getElementById('name').value = newArray.name;
 document.getElementById('lastName').value = newArray.lastName;
 document.getElementById('age').value = newArray.age;
 document.getElementById('mail').value = newArray.mail;
 document.getElementById('celPhone').value = newArray.celPhone;
 document.getElementById('phone').value = newArray.phone;
}
              
            
            



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
 showInformation()

 
});