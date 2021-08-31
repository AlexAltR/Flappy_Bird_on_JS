let cvs = document.getElementById("canvas"); // Элемент canvas
let ctx = cvs.getContext("2d"); // Вид игры

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUp.src = "img/pipeUp.png"
pipeBottom.src = "img/pipeBottom.png"


let gap = 90; // Отступ между трубами

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 20;
}

// Создание блоков
let pipe = [];


// Позиция птички
let xPos = 10; 
let yPos = 150;
let grav = 1; // Скорость падения птицы

function draw(){
    // Отрисовка картинок
    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(pipeUp, 100, 0);
    ctx.drawImage(pipeBottom, 100, 0 + pipeUp.height + gap);

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    // Поведение птицы
    yPos += 1;
    requestAnimationFrame(draw);
}


pipeBottom.onload = draw;
