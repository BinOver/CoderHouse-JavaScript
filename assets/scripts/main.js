//Funcion que valida la cantidad de ejercicios requerida
function validarCantidad (){
    let c = document.getElementById('cant');
    let cant = parseInt(c.value);
    if (cant <= 0 ){
        alert('La cantidad debe ser mayor a 0');
        return 0;
    }
    return cant;
}

// Funcion que devuelve un array con los ejecicios para el musculo seleccionado teniendo en cuenta la cantidad
function darRutina (ejercicios,musculo,cantidad){
    const rutina = ejercicios.filter(eje => eje.musculo == musculo);
    if (cantidad > rutina.length){
        return rutina
    }else{
        return rutina.slice(0,cantidad);
    }
}

// Funcion que muestra la rutina al usuario. IMPORTANTE: los resultados se muestran por Console.table 
function mostrarRutina (rutina){
    let tarjeta = document.getElementById('tarjetas');
    tarjeta.innerHTML = '';
    mostrarFavoritos();
    //Muestra cards en DOM
    for (const rut of rutina) {
        console.table(rut);
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

    //Capturar evento de botones
    rutina.forEach(rut => {
        document.getElementById(`cardbtn${rut.id}`).addEventListener('click',() => agregarAFavoritos(rut));
    });
}

//Funcion que agrega ejercicios a favoritos
function agregarAFavoritos(rut) {
    console.table(rut);
    localStorage.setItem(rut.id,JSON.stringify(rut));
    mostrarFavoritos();

}

//Borrar Favorito de Local Storage
function borrarDeFavoritos(fkey){
    localStorage.removeItem(fkey);
    mostrarFavoritos();
}

//Funcion que trae el valor del Radio 
function obtenerMusculo(){
    let musc = document.getElementsByName('musculo');
    for (const m of musc){
        if(m.checked){
            console.log(m.value);
            return m.value;
        }
    }
}

//Funcion mostrar favoritos
function mostrarFavoritos(){
    let tarjeta = document.getElementById('favoritos');
    tarjeta.innerHTML = '';
    let f=[];
    //Crea Array con los objetos de Local Storage
    for (let [, value] of Object.entries(localStorage)) {
        f.push(JSON.parse(value));
    }
    console.table(f);
    //Muestra cards de los objetos en local storage
    if (f.length > 0) {
        for (const card of f) {
            tarjeta.innerHTML += `
            <div class="col-3 card m-2 p-0">
            <img class="card-img-top" src="${card.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${card.musculo.toUpperCase()}</h5>
                <p class="card-text">Ejercicio: ${card.ejercicio}</p>
                <p class="card-text">Repeticiones: ${card.repeticiones}</p>
                <p class="card-text">Series: ${card.series}</p>
                <button id="cardfavbtn${card.id}" class="btn btn-warning">Borrar</button>
            </div>
        </div>
        `;
        }
        //Captura ejentos de botones
        f.forEach((card) => {
        document.getElementById(`cardfavbtn${card.id}`).addEventListener("click", () => borrarDeFavoritos(card.id));
        });
    }
};

// Funcion que devuelve en el DOM las tarjetas de las rutinas especificas
function pedirRutina(){
    mostrarRutina(darRutina(ejercicios,obtenerMusculo(),validarCantidad()))
};

// Ejecucion
let button = document.getElementById("btnEnviar");
button.addEventListener('click',pedirRutina);

let cardbutton = document.getElementById("cardbtn");

mostrarFavoritos();





