function validarEjercico (){
    let ejercicio = prompt('Ingrece ejercio:\n-Pecho\n-Espalda\n-Brazos\n-Piernas').toLowerCase();
    while (ejercicio !='pecho' && ejercicio != 'espalda' && ejercicio !='brazos' && ejercicio != 'piernas'){
        ejercicio = prompt('Ejercicio inexistente!\nIngrece ejercio:\n-Pecho\n-Espalda\n-Brazos\n-Piernas').toLowerCase();
    }
    return ejercicio;
}

function darRutina (ejercicio){
    switch(ejercicio){
        case 'pecho':
            alert('Banco plano con barra: 10x3\nBanco inclinado c/mancuerna: 10x3\nPecho c/polea: 10x3');
            break;
        case 'espalda':
            alert('Remo con polea 10x3\nDorsalera: 10x3\nSerrucho c/mancuerna: 12x4');
            break;
        case 'brazos':
            alert('Biceps W: 10x3\nBiceps Martillo: 10x3\nTriceps pull over: 12x4');
            break;
        case 'piernas':
            alert('Sentadillas 10x3\nPrensa: 12x4\nCalf 12x4');
            break;
    }

}


let ejercicio = validarEjercico();
darRutina(ejercicio);



