//Funcion que valida la cantidad de ejercicios requerida
function validarCantidad (){
    // let cant = 0;
    let c = document.getElementById('cant');
    let cant = parseInt(c.value);
    if (cant <= 0 ){
        alert('La cantidad debe ser mayor a 0');
        return 0;
    }
    console.log(c);
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
            </div>
        </div>
        `
    }
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

// Ejecucion

function pedirRutina(){
    mostrarRutina(darRutina(ejercicios,obtenerMusculo(),validarCantidad()))
};




