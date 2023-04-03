//Funcion que valida el ingreso de ejercio
function validarMusculo (){
    let ejercicio = prompt('Ingrece ejercio:\n-Pecho\n-Espalda\n-Brazos\n-Piernas').toLowerCase();
    while (ejercicio !='pecho' && ejercicio != 'espalda' && ejercicio !='brazos' && ejercicio != 'piernas'){
        ejercicio = prompt('Ejercicio inexistente!\nIngrece ejercio:\n-Pecho\n-Espalda\n-Brazos\n-Piernas').toLowerCase();
    }
    return ejercicio;
}

//Funcion que valida la cantidad de ejercicios requerida
function validarCantidad (){
    let cant = 0;
    do{
        cant = Math.floor(prompt('Ingrese la cantidad maxima de ejercicios'));
        if (cant < 0 ){
            alert('La cantidad debe ser mayor a 0');
        }
    }while(cant < 0);
    return cant;
}

// Funcion que devuelve un array con los ejecicios para el musculo seleccionado teniendo en cuenta la cantidad
function darRutina (ejercicios,musculo,cantidad){
    const rutina = ejercicios.filter(eje => eje.musculo == musculo);
    if (cantidad > rutina.leght){
        return rutina
    }else{
        return rutina.slice(0,cantidad);
    }
}

// Funcion que muestra la rutina al usuario. IMPORTANTE: los resultados se muestran por Console.table 
function mostrarRutina (rutina){
    for (const rut of rutina) {
        console.table(rut);
    }
}

// Array de Objetos con los datos de los ejecicios
const ejercicios = [
    {
        musculo:"pecho",
        ejercicio:"Banco Plano c/barra",
        repeticiones:10,
        series:3
    },
    {
        musculo:"pecho",
        ejercicio:"Banco inclinado c/mancuerna",
        repeticiones:15,
        series:4
    },
    {
        musculo:"pecho",
        ejercicio:"Polea",
        repeticiones:10,
        series:4
    },
    {
        musculo:"espalda",
        ejercicio:"Remo c/polea",
        repeticiones:15,
        series:4
    },
    {
        musculo:"espalda",
        ejercicio:"Biceps Martilo",
        repeticiones:10,
        series:3
    },
    {
        musculo:"espalda",
        ejercicio:"Serrucho c/mancuerna",
        repeticiones:12,
        series:4
    },
    {
        musculo:"brazos",
        ejercicio:"Biceps W",
        repeticiones:10,
        series:3
    },
    {
        musculo:"brazos",
        ejercicio:"Biceps Martillo",
        repeticiones:10,
        series:3
    },
    {
        musculo:"brazos",
        ejercicio:"Pull Over",
        repeticiones:12,
        series:4
    },
    {
        musculo:"piernas",
        ejercicio:"Sentadilla",
        repeticiones:10,
        series:3
    },
    {
        musculo:"piernas",
        ejercicio:"Prensa",
        repeticiones:12,
        series:4
    },
    {
        musculo:"piernas",
        ejercicio:"Calf",
        repeticiones:15,
        series:4
    }
]

// Ejecucion
mostrarRutina(darRutina(ejercicios,validarMusculo(),validarCantidad()));



