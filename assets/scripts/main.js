//Funcion que valida la cantidad de ejercicios requerida.
function validarCantidad (){
    let c = document.getElementById('cant');
    let cant = parseInt(c.value);
    //Validacion de cantidad
    if (cant <= 0 || isNaN(cant)){
        mostrarError();
        return 0;
    }
    return cant;
}

// Funcion que devuelve un array con los ejecicios para el musculo seleccionado teniendo en cuenta la cantidad.
function darRutina (ejercicios,musculo,cantidad){
    const rutina = ejercicios.filter(eje => eje.musculo == musculo);
    //Si la cantida ingresada es mayor a la cantidad de ejercicios disponible se envian todos.
    if (cantidad > rutina.length){
        //Mensaje Toastify que muestra la cantidad de ejercicios disponibles.
        Toastify({
            text:"Solo se cuenta con "+ rutina.length + " ejercicios de " + musculo + ".",
            duration:3000
        }).showToast();
        //Devuelve el total de ejercicios disponibles.
        return rutina
    //Si se ingresa una cantidad negativa, 0 o no se elige musculo se devuelve vacio.
    }else if(cantidad<=0 || musculo==undefined){
        return [];
    //Si se ingresa una cantidad menor a los ejercicios disponibles se devuelve la cantidad enviada.
    }else{
        //Mensaje Toastify que muestra la cantidad de ejercicios incertados.
        Toastify({
            text:"Se agregaron "+ cantidad + " ejercicios de " + musculo + ".",
            duration:3000
        }).showToast();
        //Devuelve la cantidad de ejercicios solicitados.
        return rutina.slice(0,cantidad);

    }
}

// Funcion que muestra la rutina al usuario en tarjetas incertadas en el DOM.
function mostrarRutina (rutina){
    let tarjeta = document.getElementById('tarjetas');
    tarjeta.innerHTML = '';
    mostrarFavoritos();
    //Muestra cards en DOM
    for (const rut of rutina) {
        tarjeta.innerHTML += `
        <div class="col-3 card m-2 p-0">
            <img class="card-img-top" src="${rut.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${(rut.musculo).toUpperCase()}</h5>
                <p class="card-text">Ejercicio: ${rut.ejercicio}</p>
                <p class="card-text">Repeticiones: ${rut.repeticiones}</p>
                <p class="card-text">Series: ${rut.series}</p>
                <button id="cardbtn${rut.id}" class="btn btn-warning">Favoritos</button>
            </div>
        </div>
        `
    }
    //Capturar evento de botones.
    rutina.forEach(rut => {
        document.getElementById(`cardbtn${rut.id}`).addEventListener('click',() => agregarAFavoritos(rut));
    });
}

//Funcion que agrega ejercicios a favoritos.
function agregarAFavoritos(rut) {
    localStorage.setItem(rut.id,JSON.stringify(rut));
    mostrarFavoritos();
}

//Borrar Favorito de Local Storage.
function borrarDeFavoritos(fkey){
    localStorage.removeItem(fkey);
    mostrarFavoritos();
}

//Funcion que serve de cierre manual limpiando tanto el DOM como la local Storage.
function limpiarDOM(){
    //Limpia local storage.
    localStorage.clear();
    //Limpia tarjetas de rutina.
    let domFavoritos = document.getElementById('favoritos');
    domFavoritos.innerHTML = ``;
    //Limpia tarjetas en Favoritos.
    let domEjercicios = document.getElementById('tarjetas');
    domEjercicios.innerHTML = ``;
}

//Funcion que trae el valor del Radio.
function obtenerMusculo(){
    let musc = document.getElementsByName('musculo');
    //Validacion de seleccion de musculo.
    for (const m of musc){
        if(m.checked){
            return m.value;
        }
    }
    //Ejecuta la funcion para que se muestra un banner de error.
    mostrarError();
}

//Funcion mostrar favoritos.
function mostrarFavoritos(){
    let tarjeta = document.getElementById('favoritos');
    tarjeta.innerHTML = '';
    let f=[];
    //Crea Array con los objetos de Local Storage.
    for (let [, value] of Object.entries(localStorage)) {
        f.push(JSON.parse(value));
    }
    //Muestra cards de los objetos en local storage.
    if (f.length > 0) {
        for (const card of f) {
            tarjeta.innerHTML += `
            <div class="col-3 card m-2 p-0">
                <img class="card-img-top" src="${card.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${(card.musculo).toUpperCase()}</h5>
                    <p class="card-text">Ejercicio: ${card.ejercicio}</p>
                    <p class="card-text">Repeticiones: ${card.repeticiones}</p>
                    <p class="card-text">Series: ${card.series}</p>
                    <button id="cardfavbtn${card.id}" class="btn btn-warning">Borrar</button>
                </div>
            </div>
            `;
        }
        //Captura ejentos de botones.
        f.forEach((card) => {
        document.getElementById(`cardfavbtn${card.id}`).addEventListener("click", () => borrarDeFavoritos(card.id));
        });
    }
};

// Muestra en pantalla un banner de error con SweetAlert2.
function mostrarError(){
    Swal.fire({
        icon: 'error',
        title: 'Error en ingreso de datos!',
        text: 'Por favor seleccione un musculo e ingrese una cantidad mayor a 0 de ejercicios'
    });
}

// Funcion que trae la base los datos de db.json como Promesa.
async function traerDB(){
    let respuesta = await fetch("/assets/data/db.json")
    let data = await respuesta.json()
    return data.ejercicios
}

// Funcion que devuelve en el DOM las tarjetas de las rutinas especificas. 
// "traerDB()" devuelve como "Object Promeses" la informacion de ejercicios, luego con .then se utilizar el resultado como parametro en darRutina().
function pedirRutina(){
    traerDB()
        .then(db =>mostrarRutina(
            darRutina(db,obtenerMusculo(),validarCantidad())
            )
        );
};


////// Ejecucion
// Trae las tarjetas de rutinas segun el ejercicio y cantidades enviadas al presionar el boton Enviar.
let buttonEnviar = document.getElementById("btnEnviar");
buttonEnviar.addEventListener('click',pedirRutina);

//Limpia el DOM y el local storage, sirve como cierre manual.
let buttonLimpiar = document.getElementById("btnLimpiar");
buttonLimpiar.addEventListener('click',limpiarDOM);

// Muestra las tarjetas enviadas a Favoritos.
mostrarFavoritos();




