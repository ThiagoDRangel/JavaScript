var input = document.getElementById('board-size');
var cor = '#'
var valor = 0;
var cores = [];
var pixels = [];
var pixelBoard = document.getElementById('pixel-board');
var paleta = document.getElementById('color-palette');
var capture = document.querySelector('.selected').style.backgroundColor;
var paletaDeCores = JSON.parse(localStorage.getItem('colorPalette'));
var draw = JSON.parse(localStorage.getItem('pixelBoard'));


window.onload = colorStorage(), boardStorage(), saveDraw();
function saveDraw () {
    if (draw !== null) {
        pixelBoard.innerHTML = draw;
    }
}
function boardStorage () {
    valor = localStorage.getItem('boardSize');
    if (valor !== null) {
        pixelBoard.innerText = '';

        if (valor > 4 && valor < 51) {
            for (let index = 0; index < valor; index ++){
                board();
            }
        } else if (valor < 5 && valor > 0) {
            for (let index = 0; index < 5; index ++){
                board();
            }
        }else if (valor > 50) {
            for (let index = 0; index < 50; index ++){
                board();
            }
        }
    }

    
}
function colorStorage () {
    let paleta1 = document.querySelector('.cor1')
    let paleta2 = document.querySelector('.cor2')
    let paleta3 = document.querySelector('.cor3')
    if (paletaDeCores !== null) {
        paleta1.style.backgroundColor = paletaDeCores[0];
        paleta2.style.backgroundColor = paletaDeCores[1];
        paleta3.style.backgroundColor = paletaDeCores[2];

    }
}
function criaBoard () {
    valor = input.value;
    localStorage.setItem('boardSize', valor);
    pixelBoard.innerText = '';

    if (valor > 4 && valor < 51) {
        for (let index = 0; index < valor; index ++){
            board();
        }
    } else if (valor < 5 && valor > 0) {
        for (let index = 0; index < 5; index ++){
            board();
        }
    }else if (valor > 50) {
        for (let index = 0; index < 50; index ++){
            board();
        }
    }else {
        alert('Board inválido!')
    }document.getElementById('board-size').value='';
}
function setColor () {
    cores = [];
    for (index = 1; index <= 3; index++){
        randomColor();
        cores.push(cor)
        document.querySelectorAll('.color')[index].style.backgroundColor = `${cor}` 
    }localStorage.setItem('colorPalette', JSON.stringify(cores));
    removeSelected();
}
function randomColor () {
    cor = '#'
    for (let index = 0; index < 6; index ++){
        cor += parseInt(Math.random(9) * 10);
    }
    return cor;
}
function board () {
    let row = document.createElement('div');
    row.className = 'test'
    if (valor > 4 && valor < 51) {
        for (let boardIndex = 0; boardIndex < valor; boardIndex++) {
        row.innerHTML += '<div class ="pixel"></div>'
        }pixelBoard.appendChild(row);
    } else if (valor < 5 && valor > 0) {
        for (let boardIndex = 0; boardIndex < 5; boardIndex++) {
            row.innerHTML += '<div class ="pixel"></div>'
            }pixelBoard.appendChild(row);
    } else if (valor > 50) {
        for (let boardIndex = 0; boardIndex < 50; boardIndex++) {
            row.innerHTML += '<div class ="pixel"></div>'
            }pixelBoard.appendChild(row);
    }
}
function removeSelected () {
    var pallete = document.querySelectorAll('.color')
    for (let index = 0; index < pallete.length; index ++ ){
        pallete[index].classList.remove('selected');
    }
}
function reset () {
    var pixel = document.querySelectorAll('.pixel')
    for (let index = 0; index < pixel.length; index ++ ){
        pixel[index].style.backgroundColor = 'white';
    }pixels = [];
    localStorage.removeItem('pixelBoard');

}


paleta.addEventListener('click', function(event){
    var target = event.target.className;
    if (target === 'color black' || target === 'color cor1' || target === 'color cor2' || target === 'color cor3'){
        removeSelected();
        event.target.classList.add('selected');
        capture = document.querySelector('.selected').style.backgroundColor;
    }
    
});

pixelBoard.addEventListener('click', function(event){
    event.target.style.backgroundColor = capture;
    pixels = pixelBoard.innerHTML;
    localStorage.setItem('pixelBoard', JSON.stringify(pixels));

});